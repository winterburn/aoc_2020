import { Utility } from './utils';
import { cloneDeep } from 'lodash';

let utils = new Utility()

let memory:Array<Array<string>> = [];
let solve_part1 = () => {
    let [normal, acc] = run_program(cloneDeep(memory));
    console.log(`Part 1: ${acc}`);
}

let solve_part2 = () => {
    for (let index in memory) {
        let mem = cloneDeep(memory);
        let normal:any = false;
        let value:any = 0;
        let cmd = mem[index][0];
        if (cmd === 'acc') continue;
        else if (cmd === 'nop') {
            mem[Number(index)][0] = 'jmp';
            [normal, value] = run_program(mem);
        }
        else if (cmd === 'jmp') {
            mem[Number(index)][0] = 'nop';
            [normal, value] = run_program(mem);
        }
        if (normal) {
            console.log(`part 2: ${value}`);
            break;
        }
    }
}

let run_program = (mem:Array<Array<string>>) => {
    let acc = 0;
    let visited = new Set();
    let pointer = 0;
    while (!(visited.has(pointer)) && pointer < mem.length) {
        visited.add(pointer);
        let [cmd, value] = mem[pointer];
        if (cmd === 'nop') {
            pointer++;
            continue;
        }
        if (cmd === 'acc') {
            acc += Number(value);
            pointer++;
            continue;
        }
        if (cmd === 'jmp') {
            pointer += Number(value);
            continue;
        }
    }
    return [pointer >= mem.length, acc];
}
let parse_input = (input:Array<string>) => {
    for (let line of input)  {
        if (line === '') continue;
        memory.push(line.split(' '));
    }
}


utils.getInput(8).then(res => {parse_input(res); solve_part1(); solve_part2();})
