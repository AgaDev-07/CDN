'use strict';

const agacraft = "https://raw.githubusercontent.com/AdrianCraft07/CDN/main"

const classes = include(agacraft+"/classes/index.js");
const functions = include(agacraft+"/functions/index.js");
const extension = include(agacraft+"/extension/index.js");

module.exports = {
    classes,
    functions,
    extension
};
