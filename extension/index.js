"use strict";
let agacraft = "https://raw.githubusercontent.com/AdrianCraft07/CDN/main"
include(`${agacraft}/extension/Array.js`);
include(`${agacraft}/extension/Number.js`);
include(`${agacraft}/extension/Object.js`);
include(`${agacraft}/extension/String.js`);

let createAddProperty = (Class) => function (name, func) {
    Class.prototype.__defineGetter__(name, func);
};
let createAddFunction = (Class) => function (name, func) {
    Class.prototype[name] = func;
};
module.exports = {
    createAddProperty,
    createAddFunction,
};
