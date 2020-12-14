import { Utility } from './utils';

let re = new RegExp(/(\w{1,})/g)
let utils = new Utility();

let solve_part1 = (input:Array<string>) => {
    let memory:{[key: number]: number} = {};
    let mask: Array<string> = [];
    for (let line of input) {
        let split = line.match(re);
        if (split === null) continue;
        if (split[0] === 'mask') {
            mask = split[1].split('');
            continue;
        }
        let binary_rep = (+split[2]).toString(2).split('');
        binary_rep = new Array<string>(36-binary_rep.length).fill('0').concat(binary_rep);
        for (let idx in binary_rep) {
            if (mask[idx] === 'X') continue;
            binary_rep[idx] = mask[idx];
        }
        memory[+split[1]] = parseInt(binary_rep.join(''), 2);
    }
    let sum = 0;
    Object.values(memory).forEach(value => {
        sum += value;
    });
    console.log(`Part 1: ${sum}`);
}


utils.getInput(14).then(res => {solve_part1(res)})
