import axios from 'axios';
import * as config from './config.json';

export class Utility {
    private input: Array<string> = [];

    private instance = axios.create({
        withCredentials: true,
        baseURL: "https://adventofcode.com/2020/day"
    })

    public getInput = async (day:number) => {
        let res = await this.instance.get(`/${day}/input`, {headers:{
            Cookie: `session=${config.session};`
        }})
        this.input = res.data.split('\n');
        return this.input;
    }
}



