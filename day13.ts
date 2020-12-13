import { time } from 'console';
import { Utility } from './utils';

let solve_part1 = (timestamp: number, ids:Array<number>) => {
    let bus_id = 0;
    let wait_time = timestamp;
    for (let id of ids) {
        if (id - timestamp % id < wait_time) {
            bus_id = id;
            wait_time = id - timestamp % id;
        }
    }
    console.log(`Part 1: ${bus_id * wait_time}`);
}

let utils = new Utility();

utils.getInput(13).then(res => {
    let ids:Array<number> = [];
    res[1].split(',').forEach(value => {
        if (value !== 'x') ids.push(+value);
    })
    solve_part1(+res[0], ids);
})