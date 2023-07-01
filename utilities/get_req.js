import http from 'http';
import Cookies from 'js-cookie';


export default function getRequest(path) {
  const token = Cookies.get('token');

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5298,
      path: path,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(responseData));
      });
    });

    req.on('error', (error) => {
      console.error('Error:', error.message);
      reject(error);
    });

    req.end();
  });
}
