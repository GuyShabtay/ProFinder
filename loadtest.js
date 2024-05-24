import { sleep,check } from 'k6';
import http from 'k6/http';

export let options = {
  stages: [
    { duration: '20s', target: 3000 }, // Ramp up to 50 users over 1 minute
    { duration: '20s', target: 3000 }, // Stay at 50 users for 3 minutes
    { duration: '20s', target: 0 },  // Ramp down to 0 users over 1 minute
  ],
};



export default function () {
  let res = http.get('https://profinder-vzbv.onrender.com/');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1); // 1 second sleep between iterations


  // let signUpPageRes = http.get('https://profinder-vzbv.onrender.com/RegisterPage');
  // check(signUpPageRes, {
  //   'Registertion Page page status is 200': (r) => r.status === 200,
  // });
  // sleep(1);


  // let loginPageRes = http.get('https://profinder-vzbv.onrender.com/LoginPage');
  // check(loginPageRes, {
  //   'login page status is 200': (r) => r.status === 200,
  // });
  // sleep(1);
}
