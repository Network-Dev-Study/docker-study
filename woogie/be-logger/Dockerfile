# 사용할 베이스 이미지
FROM maven:3.8.4-openjdk-17 AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 프로젝트 파일 복사
COPY . .

# Maven을 사용하여 애플리케이션 빌드
RUN mvn clean package

# 다른 베이스 이미지로 변경 (Spring Boot 애플리케이션을 실행하는 이미지)
FROM openjdk:17.0.1-jdk-slim

# 애플리케이션 실행
CMD ["java", "-jar", "/app/cube.jar"]

# 애플리케이션 JAR 파일 복사
COPY --from=builder ./app/target/cube-0.0.1-SNAPSHOT.jar /app/cube.jar
