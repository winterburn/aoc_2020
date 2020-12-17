import { Utility } from './utils';

let active_cubes: Array<string> = [];
let energy: { [key: string]: number} = {};
let parse_input = (input:Array<string>) => {
    input.forEach((line, y) => {
        if (line === '') return;
        line.split('').forEach(( value, x ) => {
            if (value === '#') active_cubes.push(`${x}_${y}_0_0`);
        });
    });
}

let spread_energy = (center:string) => {
    const [x, y , z, w] = center.split('_');
    for (let i = +x - 1; i < +x + 2; i++) {
        for (let j = +y - 1; j < +y + 2; j++) {
            for (let k = +z - 1; k < +z + 2; k++) {
                for (let g = +w - 1; g < +w + 2; g++) {
                    let key = `${i}_${j}_${k}_${g}`;
                    if (key === center) continue;
                    if (!(key in energy)) energy[key] = 1;
                    else energy[key] += 1;
                }
            }
        }
    }
}

let update_universe = () => {
    let updated_cubes: Array<string> = [];
    Object.keys(energy).forEach(key => {
        if (+energy[key] > 3 || +energy[key] < 2) return;
        else if (active_cubes.includes(key)) {updated_cubes.push(key)}
        else if (+energy[key] === 3) {updated_cubes.push(key)}
    });
    active_cubes = [...updated_cubes];
}

let solve = (part:number) => {
    for (let i = 0; i < 6; i++) {
        energy = {};
        for (let cube of active_cubes) {
            spread_energy(cube);
        }
        update_universe();
    }
    console.log(`Part ${part}: ${active_cubes.length}`)

};

let utils = new Utility();

utils.getInput(17).then(res => {parse_input(res); solve(2)});
