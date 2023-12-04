## 설정
``` sh
➜ echo $'127.0.0.1 fe-web.local' | sudo tee -a /etc/hosts
```

## 실행
``` sh
# 개발 모드
➜ sh scripts/dev-start.sh

# 운영 모드
➜ sh scripts/prod-start.sh
```

## 정지
``` sh
# 개발 모드
➜ sh scripts/dev-stop.sh

# 운영 모드
➜ sh scripts/prod-stop.sh
```