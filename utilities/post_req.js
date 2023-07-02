import Cookies from 'js-cookie';
import http from 'http';

const postRequest = async (data, path) => {
  const token = Cookies.get('token');

  const requestData = JSON.stringify(data);

  const options = {
    hostname: 'localhost',
    port: 5298,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': requestData.length,
      'Authorization': `Bearer ${token}`,
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(responseData);
          resolve(response);
        } catch (error) {
          reject(error);
        }

      });
    });

    req.on('error', (error) => {
      console.error('Error:', error.message);
      reject(error);
    });

    req.write(requestData);
    req.end();
  });
};

export default postRequest;
