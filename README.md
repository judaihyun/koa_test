# Backend - Typescript/Koa 채용 과제

### 과제명 - 영화관 좌석예매 프로그램


## 개발환경
OS: win 10, vscode
ORM : sequelize

## 실행

``
npm run start
``
<br>
<br>
~~docker image build -t mycroft:1 .~~ <br>
~~docker container run -p 5000:5000 -it mycroft:1~~


## API
[O] 서버 로그인<br>
[O] 로그인 외 API jwt인증<br>
[O] 여러 좌석을 선택 후 그에 대한 좌석 정보<br>
( 기능설명의 2,3을 같은 프로세스로 봤습니다.)<br>
[O] 좌석별 금액 정의 <br>
( /src/db/seeders/seeder-seat.js의 pricing 함수 )<br>
[O] 예매 하기<br>
[O] 예매 후 티켓 발행<br>
[O] 티켓 조회<br><br>
## 환경
[O] SQLite 사용 (storage 방식[X])<br>
[O] 서버 구동 시마다 schema 초기화 및 기초 데이터 생성<br>
[O] Swagger UI<br>
[O] 추가 DB -> screen(상영목록) 테이블 추가<br>
[O] 비밀번호 base64 저장<br><br>
## API예외 처리
[O] 로그인 하지 않고 API 접근 시도 - 403<br>
[O] 로그인 정보 입력 후 로그인 - 200<br>
[O] 전체 영화 리스트 조회 - 200<br>
[O] 영화별 상영관 정보 조회 - 200<br>
[O] 상영관 좌석정보 조회 - 200<br>
[O] 이미 예매가 확정된 좌석의 예매를 시도 - 409<br>
[O] 빈 좌석의 예매를 진행 > 할당된 좌석 금액과 미일치 - 422<br>
[O] 빈 좌석의 예매를 진행 > 할당된 좌석 금액과 일치 - 200<br>
[O] 완료된 예매정보 조회 - 200<br><br>

## API추가분
파라미터 미충족시 400 - bad request<br>
컨텐츠(데이터)가 없을때 204 - no contents<br><br>

## 못한 부분
1. SQLite in-memory<br>
-> 원인은 파악했으나, 옵션 적용 못함 (더 찾아보는중) <br>
2. Swagger UI <br>
-> JWT, cookie 관련 인증못하는 문제<br>
( https://github.com/swagger-api/swagger-js/issues/1163 ) (더 찾아보는중)<br>
-> 조회 부분은 response scheme까지 작성하였는데 나머지는 미작성되었습니다. 대신, postman 파일을 업로드합니다.<br>
3. docker <br>
-> koa까지 실행되지만, scheme 초기화 기초 데이터 생성은 실패.<br>
-> npm run start로 docker를 사용하지 않고 구동가능.<br>



<br><br><br><br>
# 기존 readme

- 기능설명
  1. 예매를 위해 서버에 로그인한다.
  2. 예매자는 선호하는 좌석을 설정할 수 있다.
  3. 선호좌석 중 예매 가능한 좌석정보를 제공한다.
  4. 좌석별 금액은 상이하다. (앞열 / 중간열 / 뒷열에 따라 가격상이)
  5. 예매 완료 시 티켓을 발행한다.
  6. 티켓정보로 예매한 내역을 조회할 수 있다.

### 프로그램 구현 환경구성 조건

- Database 는 `SQLite` DB를 이용한다. (In-Memory Database로 활용)
- 서버 구동 시마다 DB Schema가 초기화되도록 구성한다.
- 서버 구동 시 기초데이터가 생성되도록 작성한다. [기초데이터 생성규칙 참조](#initDataRules)
- 작성된 API는 API사용자에게 `Swagger UI`를 통해 제공될 수 있어야 한다.
- 인증(로그인)을 제외한 API 호출 시 `JWT` 를 이용한 보안이 전제되도록 구성한다.

### 프로그램 구현 가산점

- RxJs를 이용한 반응형 프로그래밍
- Jest를 이용한 API 테스트 코드 작성
- 추가적인 API 예외처리

### Entity 필수 구성정보

<pre>
1. 아래 Entity 의 Relation 관계를 재정의하여 구현해도 무관하다.
2. 과제 완성을 위해 아래 Entity 외 추가 Entity 생성이 필요하다.
</pre>

- 사용자
- 영화
- 상영관
- 좌석
- 예매정보

### <a id="initDataRules" name="initDataRules"></a>기초데이터 생성 규칙

- 사용하는 ORM의 종류에 따라 적절한 seeding 도구를 사용할 수 있다
- 사용자 데이터 3건 생성 (booker1, booker2, booker3)
  - 비밀번호는 아이디와 동일하게 설정하되, Base64 해시해서 저장
- 영화 데이터 2건 생성
- 상영관 데이터 2건 생성
- 좌석 정보 생성 (상영관A: 10x8의 좌석배치 구조 / 상영관B: 8x7의 좌석배치 구조)

### API 필수 예외처리

1. 로그인 하지 않고 영화정보 조회 시도 - 403
2. 로그인 정보 입력 후 로그인 - 200
3. 전체 영화 리스트 조회 - 200
4. 영화별 상영관 정보 조회 - 200
5. 상영관 좌석정보 조회 - 200
6. 이미 예매가 확정된 좌석의 예매를 시도 - 409
7. 빈 좌석의 예매를 진행 > 할당된 좌석 금액과 미일치 - 422
8. 빈 좌석의 예매를 진행 > 할당된 좌석 금액과 일치 - 200
9. 완료된 예매정보 조회 - 200
