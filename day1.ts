import axios from 'axios';
import * as config from './config.json';

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://adventofcode.com/2020/day"
})

instance.get('/1/input', {headers:{
    Cookie: `session=${config.session};`
}})
.then(res => {solve_part1(res.data.split('\n')); solve_part2(res.data.split('\n'))})
.catch(err => console.log(err))

function solve_part1(input_array:Array<string>){
    for (let cell of input_array){
        if (input_array.includes(String(2020-Number(cell)))) console.log(Number(cell)*(2020-Number(cell)));
    }
}

function solve_part2(input_array:Array<string>){
    for(let cell1 of input_array){
        let intermediate = 2020 - Number(cell1);
        for (let cell2 of input_array){
            let number_to_find = intermediate - Number(cell2);
            if(input_array.includes(String(number_to_find))) console.log(Number(cell1)*Number(cell2)*number_to_find);
        }
    }
}