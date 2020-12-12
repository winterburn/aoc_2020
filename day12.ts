import { pseudoRandomBytes } from 'crypto';
import { Utility } from './utils';

let utils = new Utility();

interface direction {
    x: number;
    y: number;
    angle: number;
}

interface position extends direction {
    facing: string;
}
const regex: RegExp = /([A-Z])(\d*)/;
let ship_pos: position = {x:0, y:0, angle: 90, facing:'E'};
let pos: position = {x:10, y:1, angle:90, facing:'E'};
let directions: {[key: string]: direction} = {'N': {x:0, y:1, angle: 0}, 'S': {x:0, y:-1, angle: 180},
                                             'E': {x: 1, y:0, angle: 90}, 'W': {x: -1, y: 0, angle: 270}};


let calculate_facing = (direction: string, angle: number, part2?: boolean) => {
    if (part2){
        if (direction === 'L') {
            for (let i = 0; i < angle / 90; i++){
                let x = -pos.y;
                let y = pos.x;
                pos.x = x;
                pos.y = y;
            }
        }   
        else if (direction === 'R') {
            for (let i = 0; i < angle / 90; i++){
                let x = pos.y;
                let y = -pos.x;
                pos.x = x;
                pos.y = y;
            }
        }
    }
    else {
        if (direction === 'L') pos.angle = (pos.angle - angle + 360) % 360;
        if (direction === 'R') pos.angle = (pos.angle + angle + 360) % 360;
        for (const [key, value] of Object.entries(directions)) {
            if (value.angle === pos.angle) pos.facing = key;
        }
    }

}

let calculate_position = (direction: string, steps: number, part2: boolean = false) => {
    if (['L', 'R'].includes(direction)) {calculate_facing(direction, steps, part2); return;}
    if (part2){
        if (direction === 'F'){
            ship_pos.x += pos.x * steps;
            ship_pos.y += pos.y * steps;
        }
        else {
            pos.x += directions[direction].x * steps;
            pos.y += directions[direction].y * steps;
        }
    }
    else {
        if (direction === 'F') direction = pos.facing;
        pos.x += directions[direction].x * steps;
        pos.y += directions[direction].y * steps;
    }

}

let solve_part1 = (input: Array<string>) => {
    pos = {x:0, y:0, angle: 90, facing: 'E'};
    for (const instruction of input){
        const matches = instruction.match(regex);
        if (matches) {
            let [_, dir, value] = matches;
            calculate_position(dir, +value);
        }
    }
    let manhattan = Math.abs(pos.x) + Math.abs(pos.y);
    console.log(`Part 1: ${manhattan}`);
}

let solve_part2 = (input: Array<string>) => {
    pos = {x:10, y:1, angle: 90, facing: 'E'};
    for (const instruction of input){
        const matches = instruction.match(regex);
        if (matches) {
            let [_, dir, value] = matches;
            calculate_position(dir, +value, true);
        }
    }
    let manhattan = Math.abs(ship_pos.x) + Math.abs(ship_pos.y);
    console.log(`Part 1: ${manhattan}`);
}

utils.getInput(12).then(res => {solve_part1(res), solve_part2(res)});
