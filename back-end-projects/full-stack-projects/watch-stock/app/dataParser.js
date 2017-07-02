// this file returns stock data that can be accepted by hightStock api

const parseStockData = (data, id, hide) => {
  var name = data.dataset.name.split(" ");
  name = name.slice(0, name.length - 5).join(" ");
  name = name.slice(0, name.length - 1);

  return {
    code: data.dataset.dataset_code.toUpperCase(),
    name: name,
    data: data.dataset.data.map(
      elem => [parseInt(new Date(elem[0]).getTime(), 10),
              parseFloat(elem[1], 10)]
    ),
    id: id,
    hide: hide
  };
};

module.exports = parseStockData;
