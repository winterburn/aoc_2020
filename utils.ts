import axios from 'axios';
import { readFileSync } from 'fs';
import * as config from './config.json';

export class Utility {
    private input: Array<string> = [];

    private instance = axios.create({
        withCredentials: true,
        baseURL: "https://adventofcode.com/2020/day"
    })

    public getInput = async (day:number, path?:string) => {
        if (path) {
            let file = readFileSync(path, 'utf-8');
            this.input = file.split('\n');
        }
        else {
            let res = await this.instance.get(`/${day}/input`, {headers:{
                Cookie: `session=${config.session};`
            }})
            this.input = res.data.split('\n');
        }
        return this.input;
    }
}



