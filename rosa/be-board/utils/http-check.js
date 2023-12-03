const http = require('http');

// 목표 URL 설정
const targetUrl = process.argv[2];

// HTTP GET 요청 보내기
http
  .get(targetUrl, (response) => {
    let data = '';

    // 데이터 수신 이벤트 핸들러
    response.on('data', (chunk) => {
      data += chunk;
    });

    // 데이터 수신 완료 이벤트 핸들러
    response.on('end', () => {
      console.log(data);
    });
  })
  .on('error', (error) => {
    console.error('Error making request:', error.message);
    process.exit(1);
  });
