FROM node:current-alpine AS base

WORKDIR /base
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS build

ENV NODE_ENV=production

WORKDIR /build

COPY --from=base /base ./
RUN npm run build

FROM node:current-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /build/spec ./spec
COPY --from=build /build/dist ./dist
COPY --from=build /build/package*.json ./

RUN npm install --only=production

ENV DATABASE_URL="mysql://foobar:password@127.0.0.1:3306/mydatabase"
ENV PORT=5000
ENV JWT_SECRET="jwtsecret"
ENV JWT_AUDIENCE="http://myapi/protected"
ENV JWT_ISSUER="http://issuer"

EXPOSE 5000

CMD npm run start
