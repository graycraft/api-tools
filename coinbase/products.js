'use strict';

const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api.coinbase.com/api/v3/brokerage/products',
  headers: {
    'Content-Type': 'application/json',
  },
};

axios
  .request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
