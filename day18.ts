import { Utility } from './utils';

let utils = new Utility();

let solve = (input:Array<string>) => {
    let sum = 0;
    for (let line of input) {
        if (line === '') continue;
        let result = add_up(line);
        sum += +result;
    }

    console.log(sum);
}

let add_up = (line:string) => {
    let memory:Array<string> = [];
    for (let i = 0; i < line.length; i++) {
        if (line[i] === ' ') continue;
        if (line[i] === '('){
            let idx = find_pair(line.slice(i));
            memory.push(add_up(line.slice(i+1, idx+i)));
            i += idx;
        }
        else memory.push(line[i])
    }
    let memory2:Array<number> = [];
    let operator = 'null';
    let tmp = 0;
    memory.forEach((char, idx) => {
        if (char === '+') {
            operator = '+';
            return;
        }
        else if (char === '*') {
            operator = '*';
            memory2.push(tmp)
            return;
        }
        if (operator === 'null') tmp = +char;
        else if (operator === '+') tmp += +char;
        else if (operator === '*') tmp = +char;
    })
    memory2.push(tmp)
    return String(memory2.reduce((a, b) => a * b));
}

let find_pair = (line:string) => {
    let count = 0;
    for (let i = 0; i < line.length; i++) {
        if (line[i] === '(') count++;
        else if (line[i] === ')') count--;
        if (count === 0) return i;
    }
    return line.length - 1;
}


utils.getInput(18).then(res => {solve(res)})
