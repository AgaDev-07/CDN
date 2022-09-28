"use strict";
module.exports = function toValue(value) {
    let regex = [
        /^([Ff][Aa][Ll][Ss][Ee])?([Nn]([Oo][Tt]?)?)?$/,
        /^([Tt][Rr][Uu][Ee])?([Yy]([Ee][Ss])?)?$/,
        /^([0-9])*(.[0-9]*)?$/,
    ];
    if (regex[0].test(value))
        return false;
    else if (regex[1].test(value))
        return true;
    else if (regex[2].test(value))
        return +value;
    return value;
};
