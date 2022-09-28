"use strict";

let agacraft = "https://raw.githubusercontent.com/AdrianCraft07/CDN/main"
include(agacraft+"/extension/Object.js");
include(agacraft+"/extension/Array.js");
class Json {
    #object;
    constructor(obj = {}) {
        if (typeof obj == 'object')
            this.#object = JSON.parse(JSON.stringify(obj));
        else
            throw TypeError(`"${obj}" not is a json valid`);
    }
    toObject() {
        return this.#object;
    }
    toString() {
        return JSON.stringify(this.#object, null, 2);
    }
    compare(Json) {
        return Json.toObject().compare(this.#object);
    }
    copy() {
        return new Json(this.toObject());
    }
}
module.exports = Json;
