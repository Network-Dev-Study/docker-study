``` sh
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out nginx-selfsigned.crt
```

**명령어**
* `req`: 인증서 요청 관련 작업을 수행하는 OpenSSL 하위 명령어 중 하나입니다.
* `-x509`: X.509 형식의 인증서를 생성한다는 옵션입니다.
* `-nodes`: 개인 키를 암호화하지 않는다는 옵션입니다. 즉, 암호를 사용하지 않는 노드(비암호화된 형태)로 개인 키를 생성합니다.
* `-days 365`: 생성된 인증서의 유효 기간이 365일(1년)로 설정됩니다.
* `-newkey rsa:2048`: RSA 알고리즘을 사용하며, 2048 비트의 키 쌍(개인 키와 공개 키)을 생성한다는 옵션입니다.
* `-keyout nginx-selfsigned.key`: 생성된 개인 키를 'nginx-selfsigned.key' 파일로 출력한다는 옵션입니다.
* `-out nginx-selfsigned.crt`: 생성된 X.509 형식의 자체 서명된 인증서를 'nginx-selfsigned.crt' 파일로 출력한다는 옵션입니다.

**주의**
* 이 명령어를 실행하면, 현재 디렉토리에 'nginx-selfsigned.key'와 'nginx-selfsigned.crt' 파일이 생성되며, 이것들은 자체 서명된 SSL/TLS 인증서의 개인 키와 공개 키를 포함하게 됩니다.
* 이러한 인증서는 테스트 환경이나 개발 환경에서 사용할 수 있습니다.
* 하지만, 실제 운영 환경에서는 보다 신뢰성 있는 인증서를 구입하거나 신뢰할 수 있는 인증 기관에서 발급받는 것이 권장됩니다.