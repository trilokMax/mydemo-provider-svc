FROM openjdk:11-jdk-slim
EXPOSE 8081
VOLUME /tmp
ENV keycloak.auth.server.url KEYCLOAK_AUTH_SERVER_URL
COPY build/libs/mytest-provider-svc-*.jar mytest-provider-svc.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/mytest-provider-svc.jar"]
