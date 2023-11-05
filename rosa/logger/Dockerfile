FROM gradle
WORKDIR /app
COPY ./ ./
RUN gradle clean build
CMD ["java", "-jar", "./build/libs/logger-0.0.1-SNAPSHOT.jar"]