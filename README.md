# docker-todo

프로젝트 -> ToDo 리스트 (CRUD)

* FE
    * Typesciprt -> react
* BE
    * Java -> log 서비스
    * Python -> todo 서비스
* 유틸리티 -> 각 언어별로 만든다 (health check)
* CI/CD -> GitHub Action / Jenkins

* 로컬용
* 개발용
* 프로덕션용

## 1주차

* 도커 환경에서 개발 (fe - ts, bff - python, log - java, board - node, db - mysql)
    * 로컬용 컴포즈 파일 작성
* 애플리케이션 개발
    * Fe에서 BFF로 호출하도록 endpoint 변경
    * BFF 생성 > Backend for Frontend > python > CRUD
    * 로그 서비스 생성 > java

## 2주차

* 서비스 명칭 통일
* 로그 포맷 정하기
* docker-compose 개발, 운영 나누기
* 이미지 최적화

## 3주차

* 언어별로 유틸리티 애플리케이션 생성 > node util/health-checker.js [api 주소를 받음]
* 헬스체크
* 디펜던시 체크

## 4주차

* reverse proxy
* 애플리케이션 보완
