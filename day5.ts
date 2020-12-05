import { Utility } from './utils';

let utils = new Utility();

utils.getInput(5).then(res => {part1(res)})


let part1 = (input:Array<string>) => {
    let list_of_seats_ids:Array<number> = [];
    for (let seat of input) {
        let [row, column, seat_id] = seat_check(seat);
        list_of_seats_ids.push(seat_id);
        }
    console.log(`Part 1: Highest seat id = ${Math.max(...list_of_seats_ids)}`)
    find_your_seat(list_of_seats_ids);
}

let seat_check = (row_designator:string) => {
    let row_area_left = [0, 127];
    let column_area_left = [0, 7];
    for (let instruction of row_designator) {
        let split = Math.ceil((row_area_left[1] - row_area_left[0]) / 2);
        let column_split = Math.ceil((column_area_left[1] - column_area_left[0]) / 2);
        if (instruction === 'F') row_area_left[1] -= split;
        if (instruction === 'B') row_area_left[0] += split;
        if (instruction === 'L') column_area_left[1] -= column_split;
        if (instruction === 'R') column_area_left[0] += column_split;
    }
    let seat_id = row_area_left[0] * 8 + column_area_left[0];
    return [row_area_left[0], column_area_left[0], seat_id];
}

let find_your_seat = (list_of_ids:Array<number>) => {
    list_of_ids.sort();
    for (let i = 0; i < list_of_ids.length - 2; i++) {
        if ((list_of_ids[i+1] - list_of_ids[i]) === 2){
            console.log(`Your seat is ${list_of_ids[i]+1}`);
        }
    }
}