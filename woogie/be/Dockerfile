# Node.js를 기반으로 하는 공식 Node 이미지 사용
FROM node:16
ENV NODE_ENV development

# 앱 디렉토리를 만들고 컨테이너 내에서 작업 디렉토리로 설정
WORKDIR /app

# 앱 종속성 설치
COPY ./package*.json .
RUN npm install
RUN npm install -g ts-node

# 앱 소스 코드 복사
COPY . .

# 컨테이너를 실행할 때 사용할 명령 설정
CMD ["npm", "start"]
