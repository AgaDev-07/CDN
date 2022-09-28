"use strict";

let agacraft = "https://raw.githubusercontent.com/AdrianCraft07/CDN/main"

const input = include(agacraft+"/functions/input.js")
include(agacraft+"/functions/colors.js");

const classes = {
    number: (str) => Number(str),
    boolean: (str) => str === 'true',
    string: (str) => str,
    object: (str) => new Function(`return ${str}`)(),
};
module.exports = function prompt(inputs) {
    return new Promise(resolve => {
        const obj = {};
        inputs.map(Input => {
            return obj[Input.name] = classes[Input.type]((0, input.default)({
                ask: Input.message,
                callback(str) {
                    let valid = !((Input.type === 'number' && isNaN(Number(str))) ||
                        (Input.type === 'boolean' && str !== 'true' && str !== 'false') ||
                        (Input.type === 'object' &&
                            new Function(`let res;try{res=new Function('return ${str}')()}catch(e){}return res`)() === undefined));
                    let res = str;
                    if (valid)
                        res = res.green;
                    else
                        res = res.redBright;
                    return {
                        valid,
                        value: str,
                    };
                },
            }));
        });
        return resolve(obj);
    });
};
