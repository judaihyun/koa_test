FROM node:current-alpine AS base

WORKDIR /base
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS build

ENV NODE_ENV=development

WORKDIR /build

COPY --from=base /base ./
RUN npm run build

FROM node:current-alpine AS production

RUN npm install -g sequelize-cli
ENV NODE_ENV=development


WORKDIR /app
COPY swagger-config.yaml ./
COPY entry.sh ./

COPY --from=build /build/spec ./spec
COPY --from=build /build/dist ./dist
COPY --from=build /build/package*.json ./

RUN npm install --only=production
RUN npm install sqlite3

EXPOSE 5000

# RUN chmod +x entry.sh
# RUN sh entry.sh
CMD npm run start

