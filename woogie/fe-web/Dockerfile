# ===build===
FROM node:16 AS builder

WORKDIR /src

COPY ./package*.json .
RUN npm install

# ===app===
FROM node:16

# 컨테이너를 실행할 때 사용할 명령 설정
CMD ["npm", "start"]

# 앱 디렉토리를 만들고 컨테이너 내에서 작업 디렉토리로 설정
WORKDIR /app

RUN npm install -g serve

# build 단계에서 설치한 패키지 사용
COPY --from=builder /src/node_modules/ /app/node_modules/

# 앱 소스 코드 복사
COPY . .
