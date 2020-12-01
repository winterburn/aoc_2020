import axios from 'axios';
import * as config from './config.json';

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://adventofcode.com/2020/day"
})

instance.get('/1/input', {headers:{
    Cookie: `session=${config.session};`
}})
.then(res => solve(res.data))
.catch(err => console.log(err))

function solve(input:string){
    let input_array:Array<string> = input.split('\n');
    for (let cell of input_array){
        if (input_array.includes(String(2020-Number(cell)))) console.log(Number(cell)*(2020-Number(cell)));
    }
}