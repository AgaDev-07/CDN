"use strict";
class Json {
    constructor(obj = {}) {
        if (typeof obj == 'object')
            this._object = JSON.parse(JSON.stringify(obj));
        else
            throw TypeError(`"${obj}" not is a json valid`);
    }
    toObject() {
        return this._object;
    }
    toString() {
        return JSON.stringify(this._object, null, 2);
    }
    compare(Json) {
        return Json.toObject().compare(this._object);
    }
    copy() {
        return new Json(this.toObject());
    }
}
function type(data) {
    return toString.call(data);
}
function isArray(data) {
    return type(data) === '[object Array]';
}
function isObject(data) {
    return type(data) === '[object Object]';
}
function isIterable(data) {
    return isObject(data) || isArray(data);
}
let addFunctionObject = function (name, func) {
    Object.prototype[name] = func;
};
addFunctionObject('toJson', function () {
    return new Json(this);
});
addFunctionObject('_toString', function () {
    return JSON.stringify(this, null, 2);
});
addFunctionObject('toArray', function () {
    return Object.entries(this);
});
addFunctionObject('keys', function () {
    return Object.keys(this);
});
addFunctionObject('format', function (obj = {}) {
    let bool = false;
    this.keys()
        .filter(value => typeof this[value] == typeof obj[value] || obj[value] == undefined)
        .forEach(value => (bool = bool || !!value));
    return bool;
});
addFunctionObject('compare', function (obj = {}) {
    if (!isObject(obj))
        throw new TypeError(`${obj} is not Object`);
    return (this.keys().every(name => {
        if (isIterable(this[name]))
            return this[name].compare(obj[name]);
        return this[name] === obj[name];
    }) &&
        this.keys().every(name => {
            if (isIterable(obj[name]))
                return this[name].compare(obj[name]);
            return obj[name] === this[name];
        }));
});
addFunctionObject('getData', function (route) {
    if (route == undefined)
        return this;
    let routes = route.split('.');
    if (routes.length == 1)
        return this[routes[0]];
    return isIterable(this[routes[0]])
        ? this[routes[0]].getData(routes.deleteIndex().join('.'))
        : this[routes[0]];
});
addFunctionObject('delete', function (key) {
    delete this[key];
    return this;
});
addFunctionObject('search', function (item) {
    let self = this.keys();
    let object = self.filter(key => isIterable(this[key])), keys;
    if (isIterable(item))
        if (isArray(item))
            keys = self
                .filter(key => isIterable(this[key]))
                .filter(key => this[key].compare(item));
        else
            keys = self
                .filter(key => isIterable(this[key]))
                .filter(key => this[key].compare(item));
    else
        keys = self
            .filter(key => !isIterable(this[key]))
            .filter(key => this[key] === item);
    keys.push(...object
        .map(key => this[key]
        .search(item)
        .map((value) => `${key}.${value || ''}`))
        .map(v => v.filter(v => !v.endsWith('.')))
        .upLevel());
    return keys.filter(value => value);
});
