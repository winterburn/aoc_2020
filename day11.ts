import { Utility } from './utils';
import * as _ from 'lodash';

let map: Array<Array<string>> = [];
let map_copy: Array<Array<string>> = [...map];
let check_seat = (coords:Array<number>) => {
    let nearby_count = 0;
    for (let i = coords[0] - 1; i < coords[0] + 2; i++){
        if ( i < 0 || i >= map.length) continue;
        for (let j = coords[1] - 1; j < coords[1] + 2; j++) {
            if ( j < 0 || j >= map[i].length || _.isEqual([i, j], coords)) continue;
            if (map[i][j] === '#') nearby_count++;
        }
    }
    if (nearby_count >= 4 && map[coords[0]][coords[1]] === '#') map_copy[coords[0]][coords[1]] = 'L';
    else if (nearby_count === 0 && map[coords[0]][coords[1]] === 'L') map_copy[coords[0]][coords[1]] = '#';
    else return false;
    return true;
}

let utils = new Utility();

let parse_input = (input:Array<string>) => {
    map = [];
    input.forEach(value => {
        if (value === '') return;
       map.push(value.split(''));
    });
}


let part2_check_seat = (coords:Array<number>) => {
    let directions = [[1,1], [1,0],[0,1],[-1, -1], [-1, 0], [0,-1], [1, -1], [-1, 1]]
    let occupied_count = 0;
    let counter = 1;
    while(directions.length > 0) {
        directions.forEach((dir, idx) => {
            if (!(dir.length > 0)) return;
            let x = coords[0] + dir[0]*counter;
            let y = coords[1] + dir[1]*counter;
            if (x < 0 || y < 0 || x > map[0].length-1 || y > map.length - 1) {
                directions[idx] = [];
                return;
            }

            if (map[y][x] === '#') {
                directions[idx] = [];
                occupied_count++;
                return;
            }
            if (map[y][x] === 'L') {
                directions[idx] = [];
            }
        })
        let new_directions:Array<Array<number>> = [];
        directions.forEach(value => {if (value.length > 0) new_directions.push(value)});
        directions = new_directions;
        counter++;
    }
    if (occupied_count >= 5 && map[coords[1]][coords[0]] === '#') map_copy[coords[1]][coords[0]] = 'L';
    else if (occupied_count === 0 && map[coords[1]][coords[0]] === 'L') map_copy[coords[1]][coords[0]] = '#';
    else return false;
    return true;


}
let solve_part2 = (input:Array<string>) => {
    parse_input(input);
    while (true) {
        let change = false;
        map_copy = _.cloneDeep(map);
        for (let y in map) {
            for (let x in map[y]) {

                if (part2_check_seat([+x, +y]) && !change) change = true;
            }
        }

        map = _.cloneDeep(map_copy);
        if (!change) break;
    }
    let count = 0;
    map.forEach(value => {value.forEach(seat => {
        if (seat === '#') count ++;
    })})
    console.log(`Part 2: ${count}`);
}

let solve_part1 = (input:Array<string>) => {
    parse_input(input);
    while (true) {
        let change = false;
        map_copy = _.cloneDeep(map);
        for (let x in map) {
            for (let y in map[x]) {

                if (check_seat([+x, +y]) && !change) change = true;
            }
        }

        map = _.cloneDeep(map_copy);
        if (!change) break;
    }
    let count = 0;
    map.forEach(value => {value.forEach(seat => {
        if (seat === '#') count ++;
    })})
    console.log(`Part 1: ${count}`);




}

utils.getInput(11).then(res => {solve_part1(res); solve_part2(res)})
