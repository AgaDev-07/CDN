"use strict";
function addFunctionNumber(name, func) {
    Number.prototype[name] = func;
}
;
addFunctionNumber('round', function (precision = 0) {
    return Math.round(this * (10).raised(precision)) / (10).raised(precision);
});
addFunctionNumber('absolute', function () {
    return Math.abs(this);
});
addFunctionNumber('raised', function (raised) {
    return Math.pow(this, raised);
});
addFunctionNumber('root', function (root) {
    return this.raised(1 / root);
});
