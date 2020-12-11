import { Utility } from './utils';

let utils = new Utility();

let solve_part1 = (input:Array<string>) => {
    let adapters:Array<number> = [];
    let difference_count:Array<number> = [0, 0];
    input.forEach(value => {adapters.push(+value)});
    adapters = adapters.sort((n1, n2) => n1 - n2);
    adapters.forEach((value, idx) => {
        if (idx+1 === adapters.length) {difference_count[1]++; return}
        if (adapters[idx+1] - value === 1) difference_count[0]++;
        else if (adapters[idx+1] - value === 3) difference_count[1]++;
    })
    console.log(`Part 1: ${difference_count[0] * difference_count[1]}`)
}

let solve_part2 = (input:Array<string>) => {
    let adapters:Array<number> = [];
    input.forEach(value => {adapters.push(+value)});
    adapters.push(0);
    adapters.push(Math.max(...adapters)+3);
    adapters = adapters.sort((n1, n2) => n1 - n2);
    let ways = new Array(adapters.length).fill(0);
    ways[0] = 1;
    for (let i = 0; i < adapters.length; ++i ) {
        for (let j = i + 1; j < adapters.length; ++j) {
            if (adapters[j] - adapters[i] > 3) break;
            ways[j] += ways[i];
        }
    }
    console.log(`part 2: ${ways[ways.length - 1] / 2}`);
}

utils.getInput(10).then(res => {solve_part1(res); solve_part2(res)})
