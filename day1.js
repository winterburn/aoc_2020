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
    .then(function (res) { solve_part1(res.data.split('\n')); solve_part2(res.data.split('\n')); })["catch"](function (err) { return console.log(err); });
function solve_part1(input_array) {
    for (var _i = 0, input_array_1 = input_array; _i < input_array_1.length; _i++) {
        var cell = input_array_1[_i];
        if (input_array.includes(String(2020 - Number(cell))))
            console.log(Number(cell) * (2020 - Number(cell)));
    }
}
function solve_part2(input_array) {
    for (var _i = 0, input_array_2 = input_array; _i < input_array_2.length; _i++) {
        var cell1 = input_array_2[_i];
        var intermediate = 2020 - Number(cell1);
        for (var _a = 0, input_array_3 = input_array; _a < input_array_3.length; _a++) {
            var cell2 = input_array_3[_a];
            var number_to_find = intermediate - Number(cell2);
            if (input_array.includes(String(number_to_find)))
                console.log(Number(cell1) * Number(cell2) * number_to_find);
        }
    }
}
