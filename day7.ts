import { Utility } from './utils';

let package_index: { [key :string]: { [key: string]: number }; } = {};


let parse_input = ( input:Array<string> ) => {
    for (let line of input) {
        if (line === '') continue;
        let [key, contents] = line.split('contain ');
        let split_key = key.split(' ');
        key = `${split_key[0]}_${split_key[1]}`;
        package_index[key] = {};
        if (contents === 'no other bags.') continue;
        let inside_contents = contents.split(', ');
        for (let p_type of inside_contents) {
            let splitted = p_type.split(' ');
            package_index[key][`${splitted[1]}_${splitted[2]}`] = Number(splitted[0]);

        }
    }
}

let solve_part1 = (input:Array<string>) => {
    parse_input(input);
    let count = 0;
    for (let bag of Object.keys(package_index)) {
        if (down_the_rabbit_hole(bag)) count += 1;
    }
    console.log(`part1: ${count}`);
}

let solve_part2 = (input:Array<string>) => {
    parse_input(input);
    console.log(`required packs count: ${count_packages('shiny_gold')}`)
}

let down_the_rabbit_hole = (key: string) => {
    if (package_index[key] === {}) return false;
    for (let bag of Object.keys(package_index[key])) {
        if (bag === 'shiny_gold') return true;
        if (down_the_rabbit_hole(bag)) return true;
    }
}

let count_packages = (key: string) => {
    if (package_index[key] === {}) return 0
    let count = 0;
    for (let bag of Object.keys(package_index[key])) {
        count += package_index[key][bag];
        count += package_index[key][bag] * count_packages(bag);
    }
    return count;
}
let utils = new Utility();
utils.getInput(7).then(res => { solve_part1(res); solve_part2(res); }).catch(err => console.log(err));
