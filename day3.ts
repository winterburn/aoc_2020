import { Utility } from './utils';

let utils = new Utility();
utils.getInput(3)
    .then(res => {
        solve_part1(res);
        solve_part2(res);
    });

function solve_part1(input:Array<string>) {
    console.log(input)
    let tree_count = go_down_slope(input, [3,1]);

    console.log(`part 1: ${tree_count}`);

}
function solve_part2(input:Array<string>) {
    let tree_multiplier = 1;
    for (let slope of [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]) {
        let tree_count = go_down_slope(input, slope);
        console.log(tree_count)
        tree_multiplier = tree_multiplier * tree_count;
    }
    console.log(`part 2: ${tree_multiplier}`);

}

function go_down_slope(map:Array<string>, step:Array<number>){
    let tree_count = 0;
    let current_position = [0, 0];
    while(true){
        current_position = [(current_position[0] + step[0]) % map[current_position[1]].length,
                            current_position[1] + step[1]];
        if (map[current_position[1]][current_position[0]] === '#') tree_count++;
        if (map.length <= current_position[1] + step[1]) break;
    }
    return tree_count;
}
