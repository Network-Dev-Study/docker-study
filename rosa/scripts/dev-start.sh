# image build
source "$(pwd)/scripts/dev-build.sh"

# data 디렉토리 생성
source "$(pwd)/scripts/create-data-directory.sh"

# docker compose 실행
docker-compose -f ./docker-compose.yaml -f ./docker-compose-dev.yaml up -d