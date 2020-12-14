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


let solve_part2 = (input:Array<string>) => {
    let memory:{[key: number]: number} = {};
    let mask: Array<string> = [];
    for (let line of input) {
        let split = line.match(re);
        if (split === null) continue;
        if (split[0] === 'mask') {
            mask = split[1].split('');
            continue;
        }
        let binary_rep = (+split[1]).toString(2).split('');
        binary_rep = new Array<string>(36-binary_rep.length).fill('0').concat(binary_rep);
        for (let idx in binary_rep) {
            if (mask[idx] === '0') continue;
            binary_rep[idx] = mask[idx];
        }
        calculate_addresses([...binary_rep], memory, +split[2]);
    }
    let sum = 0;
    Object.values(memory).forEach(value => {
        sum += value;
    });
    console.log(`Part 2: ${sum}`);
}

let calculate_addresses = (address:Array<string>, memory:{[key: number]: number}, value:number) => {
    let first_x = address.findIndex((element) => element === 'X');
    if (first_x === -1) {
        memory[parseInt(address.join(''), 2)] = value;
        return;
    }
    let modified0 = [...address];
    modified0[first_x] = '0';
    let modified1 = [...address];
    modified1[first_x] = '1';
    calculate_addresses(modified0, memory, value);
    calculate_addresses(modified1, memory, value);

}

utils.getInput(14).then(res => {solve_part1(res); solve_part2(res)})
