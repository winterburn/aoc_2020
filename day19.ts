import { Utility } from './utils';
let utils = new Utility();

let rules: {[key:string]: string[][]} = {};

let rule_strings: string[] = [];

let add_rule = (line:string) => {
    let split = line.split(":");
    rules[split[0]] = [];
    split[1].split('|').forEach(pair => {
        if (pair.trim() === '"a"') rules[split[0]].push(['a']);
        else if (pair.trim() === '"b"') rules[split[0]].push(['b']);
        else rules[split[0]].push(pair.trim().split(' '));
    });


};

let generate_string = (key: string) => {
    if (key === 'a' || key === 'b') return [key];
    let returnable: string[] = [];
    rules[key].forEach(pair => {
        let pairStrings: string[] = [];
        pair.forEach(rule => {
            if (!pairStrings.length)pairStrings = generate_string(rule);
            else {
                let tmpPairStrings: string[] = [];
                let tmpRules: string[] = generate_string(rule);
                pairStrings.forEach(item => {
                    tmpRules.forEach(item2 => {
                        tmpPairStrings.push(item.concat(item2));
                    });
                });
                pairStrings = tmpPairStrings;
            }
        });
        returnable = returnable.concat(pairStrings);
    });
    return returnable;
};

let solve = (input:Array<string>, part:number) => {
    let matching_strings: number = 0;
    let rules_done = false
    input.forEach(line => {
        if (line === '') {
            rules_done = true;
            rule_strings = generate_string('0')}
        if (!rules_done) {add_rule(line)}
        else {
            if(rule_strings.includes(line)) matching_strings++;
        }
    });
    return matching_strings;

};



utils.getInput(19).then(res => {console.log('part1:', solve(res, 1))})
