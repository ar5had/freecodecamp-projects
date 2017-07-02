var rp = require('request-promise');
var moment = require('moment');

const getApiUrl = (symbol, date) => {
  return `https://www.quandl.com/api/v3/datasets/WIKI/${symbol}\
.json?order=asc&column_index=4&start_date=${date}&api_key=${process.env.QKEY}`;
};

const getStockData = symbol => {
  const startDate = moment().subtract(4, 'month').format('YYYY-MM-DD');
  const url = getApiUrl(symbol, startDate);
  const reqOpt = {
    url: url,
    json: true
  };
  return rp(reqOpt);
};

module.exports = getStockData;
