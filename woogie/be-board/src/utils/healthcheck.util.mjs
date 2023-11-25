import http from 'http';

const makeHttpRequest = async () => {
  const options = {
    hostname: '',
    port: 4000,
    path: '/health',
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';

      if (res.statusCode !== 200) {
        resolve(JSON.stringify({ healthy: 0 }));
        return;
      }

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (data.length > 0) {
          resolve(data);
        } else {
          resolve(JSON.stringify({ healthy: 0 }));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
};

const run = async () => {
  try {
    const response = await makeHttpRequest();
    return JSON.parse(response);
  } catch (error) {
    return { healthy: 0 };
  }
};

const { healthy } = await run();

if (healthy !== 1) {
  process.exit(1);
}