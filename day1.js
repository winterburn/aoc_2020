"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var config = require("./config.json");
var instance = axios_1["default"].create({
    withCredentials: true,
    baseURL: "https://adventofcode.com/2020/day"
});
instance.get('/1/input', { headers: {
        Cookie: "session=" + config.session + ";"
    } })
    .then(function (res) { return solve(res.data); })["catch"](function (err) { return console.log(err); });
function solve(input) {
    var input_array = input.split('\n');
    for (var _i = 0, input_array_1 = input_array; _i < input_array_1.length; _i++) {
        var cell = input_array_1[_i];
        if (input_array.includes(String(2020 - Number(cell))))
            console.log(Number(cell) * (2020 - Number(cell)));
    }
}
