import { keys } from 'lodash';
import { Utility } from './utils';


let utils = new Utility();



utils.getInput(6).then(res => {part1(res); part2(res);})

let part1 = (input:Array<string>) => {
    let sum = 0;
    let answers = new Set();
    for (let line of input) {
        if (line === '') {
            sum += answers.size;
            answers = new Set();
        }
        [...line].forEach(char => {
            answers.add(char);
        })
    }
    console.log(`Part 1: ${sum}`);
}

let part2 = (input:Array<string>) => {
    let sum = 0;
    let line_count = 0;
    let counts: { [index:string]: number } = {};
    for (let line of input) {
        if (line === '') {
            for (const key of keys(counts)) {
                if (counts[key] === line_count) sum += 1;         
            }
            line_count = 0;
            counts = {};
            continue
        }
        line_count += 1;
        [...line].forEach(char => {
            if (!(char in counts)){
                counts[char] = 0;
            }
            counts[char] += 1;
        })
    }
    console.log(`Part 2: ${sum}`);

}