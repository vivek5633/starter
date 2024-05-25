
import axios from "axios";

var options = {
  method: 'POST',
  url: 'https://control.msg91.com/api/v5/flow/',
  headers: {
    authkey: '422647AWRRh9VldHq6650826aP1',
    accept: 'application/json',
    'content-type': 'application/JSON'
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});