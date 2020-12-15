
let solve_part1 = (input:Array<number>, iterations:number) => {
    let memory = new Array(iterations);
    let counter = input.length;
    let last_number = input[input.length-1];
    input.forEach((value, idx) => memory[value] = idx+1)
    while(counter < iterations) {
        if(memory[last_number]) {
            let temp = memory[last_number];
            memory[last_number] = counter;
            last_number = counter - temp;
        }
        else {
            memory[last_number] = counter;
            last_number = 0;
        }
        counter++;
    }
    return last_number;
}

console.log(`Part 1: ${solve_part1([0,13,16,17,1,10,6], 2020)}`);
console.log(`Part 2: ${solve_part1([0,13,16,17,1,10,6], 30000000)}`);
