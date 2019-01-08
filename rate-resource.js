var urljoin = require('url-join');
var request = require('request-promise-native').defaults({json: true});
var CommandFactory = require('hystrixjs').commandFactory;
var ratesServer = (process.env.RATES_URL || 'https://api.exchangeratesapi.io/latest');


function getRateBase() {
    console.log(ratesServer);
    return request.get(ratesServer);
}

var getRateCommand = CommandFactory.getOrCreate("Get rate")
    .run(getRateBase)
    .timeout(500)
    .build()

function getRate() {
    return getRateCommand.execute();
}

module.exports = {
    getRate
}