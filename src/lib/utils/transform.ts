import {checkIfEmpty} from "./checkIfEmpty";

interface people {
    full_name?: string;
}
interface movie {
    title?: string;
    year?: number;
    type?: string;
    people?: any[];
}

export const transform = (data: string): movie[] => {
    const arr = data.split('\n');
    if (checkIfEmpty(arr)) throw new Error('Your file is empty, please fill it');
    const mainArr = [];
    let obj: movie = {};
    let cnt = 0;
    for (let val of arr) {
        if (val === '') {
            cnt = 0;
            obj = {};
        } else {
            const match = val.match(/.*[a-z]:/g);
            if (!match) throw new Error('Something wrong with your file');
            if (match[0] === 'Title:') {
                obj.title = val.match(/:.*/)[0].substring(1).trim();
            } else if (match[0] === 'Release Year:') {
                val = val.substring(2);
                obj.year = +val.match(/:.*/)[0].substring(1).trim();
            } else if (match[0] === 'Format:') {
                val = val.substring(2);
                obj.type = val.match(/:.*/)[0].substring(1).trim();
            } else if (match[0] === 'Stars:') {
                val = val.substring(2);
                let arr = val.match(/:.*/)[0].substring(1).trim().split(',');
                arr = arr.map((p) => p.trim());

                obj.people = arr.map((p) => {
                    const x: people = {};
                    x.full_name = p;
                    return x;
                });
            } else {
                throw new Error('Wrong file');
            }
            cnt++;
            if (cnt === 4) {
                mainArr.push(obj);
            }
        }
    }
    return mainArr;
};
