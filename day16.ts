import { Utility } from './utils';

let utils = new Utility();

let keyRe = new RegExp(/(.*\w{1,}):/g);
let digitRe = new RegExp(/(\d{1,})/g);

let constraints: { [key: string]: Array<number> } = {};
let your_ticket:Array<string> = [];
let tickets:Array<Array<string>> = [];
let valid_tickets:Array<Array<string>> = [];

let parse_input = (input:Array<string>) => {
    for (let line of input) {
        if (line === '') continue;
        let match = line.match(keyRe);
        if (match !== null) {
            let key = match[0];
            let limits = line.match(digitRe);
            if (limits !== null && key !== null) {
                constraints[key] = [];
                limits.forEach(v => constraints[key].push(+v));
            }
        }
        else {
            if (!your_ticket.length) your_ticket = line.split(',');
            else tickets.push(line.split(','));
        }
    }
};

let invalid_fields = (line:Array<string>) => {
    let invalid:Array<number> = [];
    for (let num of line) {
        let valid = false;
        for (const [key, value] of Object.entries(constraints)) {
            if (( +num >= value[0] && +num <= value[1] ) || (+num >= value[2] && +num <= value[3])) valid = true;
        }
        if (!valid) invalid.push(+num);
    }

    return invalid;
}

let solve_part1 = () => {
    let count = 0;
    for (const ticket of tickets) {
        let invalid = invalid_fields(ticket);
        if (!invalid.length) valid_tickets.push(ticket);
        count += invalid.reduce((a,b) => {return a+b}, 0);
    }
    console.log(`Part 1: ${count}`);
}

let reduce_field = (idx:number, possible_keys:Array<string>) => {
    let keys:Array<string> = [];
    for (const key of possible_keys) {
        let valid = true;
        for (const ticket of valid_tickets) {
            if (( +ticket[idx] < constraints[key][0] || +ticket[idx] > constraints[key][1] )
                && (+ticket[idx] < constraints[key][2] || +ticket[idx] > constraints[key][3])) valid = false;
        }
        if (valid) keys.push(key);
    }
    return keys;
}
let solve_part2 = () => {
    let ticket:{ [key: string]:number } = {};
    let possible_fields: Array<Array<string>> = new Array(your_ticket.length);
    for (const idx in your_ticket) {
        possible_fields[idx] = reduce_field(+idx, Object.keys(constraints));
    }
    for (let i = 0; i < possible_fields.length; i++) {
        let idx = possible_fields.findIndex(v => v === possible_fields.find(v => v.length === 1))
        let key =possible_fields[idx][0];
        ticket[key] = +your_ticket[idx];
        for (let field of possible_fields) {
            let field_idx = field.indexOf(key);
            field.splice(field_idx, 1);
        }
    }
    console.log(ticket)
    let sum = 1;
    for (const key of Object.keys(ticket)) {
        if (!key.startsWith('departure')) continue;
        sum *= ticket[key];
    }
    console.log(`Part 2: ${sum}`);


}

utils.getInput(16).then(res => {parse_input(res); solve_part1(); solve_part2()});
