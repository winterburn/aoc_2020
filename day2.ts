
import axios from 'axios';
import * as config from './config.json';
import { Dictionary } from 'lodash';

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://adventofcode.com/2020/day"
})

instance.get('/2/input', {headers:{
    Cookie: `session=${config.session};`
}})
.then(res => {solve_part1(res.data.split('\n')); solve_part2(res.data.split('\n'))})
.catch(err => console.log(err))

function solve_part1(passwords:Array<string>) {
    let count = 0;
    for (let password of passwords){
        if (password === '') continue;
        let [min, max, letter, pass] = split_password(password);
        let letter_count = count_letters(String(pass));
        if (letter_count[letter] >= min && letter_count[letter] <= max) count++;
    }
    console.log(count);

}

function solve_part2(passwords:Array<string>) {
    let count = 0;
    for (let password of passwords) {
        if (password === '') continue;
        let [pos1, pos2, letter, pass] = split_password(password);
        pos1 = Number(pos1);
        pos2 = Number(pos2);
        if (String(pass)[pos1-1] === letter && String(pass)[pos2-1] === letter) continue;
        else if (String(pass)[pos1-1] === letter || String(pass)[pos2-1] === letter) count++;
    }
    console.log(count);

}

function count_letters(password:string) {
    let letters:Dictionary<number> = {};
    for (let letter of password) {
        if (letter in letters) letters[letter]++;
        else letters[letter] = 1;
    }
    return letters
}

function split_password(password:string) {
    let splitted = password.split(' ');
    let [min, max] = splitted[0].split('-');
    let letter = splitted[1].slice(0, 1);
    return [Number(min), Number(max), letter, splitted[2]]
}
