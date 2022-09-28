"use strict";
function getClass(obj) {
    if (typeof obj == 'function')
        return obj.prototype ? obj.prototype.constructor : obj.constructor;
    if (typeof obj != 'undefined')
        return obj.constructor;
    return undefined;
}
getClass.getName = function (obj) {
    let name = (getClass(obj) || {}).name;
    return name == '' ? '<anonymous>' : name;
};
getClass.isClass = function (obj = () => { }) {
    return typeof obj == 'function' && !!obj.prototype && !!obj.prototype.constructor;
};
module.exports = getClass;
