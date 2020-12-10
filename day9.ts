import { Utility } from './utils';
import { sum } from 'lodash';

let solve_part1 = (input:Array<string>) => {
    let preamble = 25;
    for (let idx in input) {
        let pair = false;
        if (+idx < preamble) continue;
        for (let i = +idx - preamble; i < Number(idx); i++) {
            for (let j = +idx - preamble; j < Number(idx); j++) {
                if (j === i || pair) continue;
                if (+input[i] + +input[j] === +input[idx]) {
                    pair = true;
                }
            }
        }
        if (!pair) {
            console.log(`part 1: ${input[idx]}`);
            return Number(input[idx]);
        }
    }
    return 0;
}

let solve_part2 = (input:Array<string>, magic:number) => {
    let converted_input = [];
    for (let num of input){converted_input.push(+num)};
    for (let idx in converted_input) {
        for (let idx2 in converted_input.slice(+idx)) {
            let slice = converted_input.slice(+idx, +idx2);
            if (sum(slice) === magic){
                console.log(`part2 : ${Math.min(...slice) + Math.max(...slice)}`)
                return;
            }
            else if (sum(slice) > magic) break;
        }
    }
}

let utils = new Utility();
utils.getInput(9).then(res => {let magic = solve_part1(res); solve_part2(res, magic)});
