const Cryptr = require('cryptr');
const cryptr = new Cryptr('restopos@36547858');
const config = {
 //baseUrl: "https://www.clientconnect.ai:3308",
 baseUrl: "http://localhost:3308",
  //baseUrl: "http://3.137.189.97:3308",
    cryptr: cryptr
}

export default config;