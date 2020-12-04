import { Utility } from './utils';

let utils = new Utility();

utils.getInput(4).then(res => {part1(res)})


function part1(input:Array<string>) {
    let passports = parse_passports(input);
    let count = count_valid_passports(passports);
    console.log(`part1: valid passports ${count}`);

}

interface Passport {
    [key: string]: string | number | undefined;
    byr?: number,
    iyr?: number,
    eyr?: number,
    hgt?: string,
    hcl?: string,
    ecl?: string,
    pid?: string,
    cid?: string,
}

function parse_passports(input:Array<string>) {
    let passports:Array<Passport> = [];
    let temp_password:Passport = {}
    for (let line of input) {
        if (!line.length) {
            passports.push({...temp_password});
            temp_password = {};
            continue;
        }
        for (let pair of line.split(' ')){
            let [key, value] = pair.split(':', 2);
            temp_password[key] = value;
        }
    }
    return passports;
}

function count_valid_passports(passports:Array<Passport>) {
    let count = 0;
    for (let passport of passports) {
        if (is_valid_passport(passport)) count += 1;
    }
    return count;
}

function is_valid_passport(passport:Passport) {
    let required_fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    let result = true;
    for (let field of required_fields) {
        if (passport[field] ===  undefined) {
            result = false;
            return result;
        }
    }
    if (2002 < Number(passport['byr']) || Number(passport['byr']) < 1920) result = false;
    if (Number(passport['iyr']) < 2010 || Number(passport['iyr']) > 2020) result = false;
    if (Number(passport['eyr']) < 2020 || Number(passport['eyr']) > 2030) result = false;
    if (!valid_height(passport['hgt'])) result = false;
    if (!valid_hair_color(passport['hcl'])) result = false;
    if (!valid_eye_color(passport['ecl'])) result = false;
    if (!valid_pid(passport['pid'])) result = false;

    return result;
}

function valid_height(height:string | undefined) {
    if (height === undefined) return false;
    let type_ = height.slice(-2);
    let num = Number(height.slice(0, -2));
    if (!['cm', 'in'].includes(type_)) return false;
    if (type_ === 'cm' && (num < 150 || num > 193)) return false;
    else if (type_ === 'in' && (num < 59 || num > 76)) return false;
    return true;
}

function valid_hair_color(color:string | undefined) {
    if (color === undefined) return false;
    if (color[0] !== '#') return false;
    let match = color.match(/[a-z0-9]/g);
    if (match !== null) {
        if (match.length !== 6) return false;
    }
    else return false;
    return true;
}

function valid_eye_color(color:string | undefined) {
    if (color === undefined) return false;
    if (!['amb', 'blu', 'gry', 'brn', 'grn', 'hzl', 'oth'].includes(color)) return false;
    return true;
}

function valid_pid(pid:string | undefined) {
    if (pid === undefined) return false;
    let match = pid.match(/[0-9]/g);
    if (match !== null) {
        if (match.length !== 9) return false;
    }
    else return false;
    return true;
}
