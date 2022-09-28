"use strict";
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
let addPropertyArray = function (name, func) {
    Array.prototype.__defineGetter__(name, func);
};
let addFunctionArray = function (name, func) {
    Array.prototype[name] = func;
};
addFunctionArray('toObject', function () {
    return Object.fromEntries(this);
});
addFunctionArray('_toString', function () {
    return JSON.stringify(this, null, 2);
});
addFunctionArray('search', function (item) {
    let self = this.map((value, index) => [value, index]);
    let object = self.filter(key => isIterable(key[0])), keys;
    if (isIterable(item))
        if (isArray(item))
            keys = self
                .filter(key => isIterable(key[0]))
                .filter(key => key[0].compare(item))
                .map(value => value[1]);
        else
            keys = self
                .filter(key => isIterable(key))
                .filter(key => key[0].compare(item))
                .map(value => value[1]);
    else
        keys = self.filter(key => key[0] === item).map(value => value[1]);
    keys.push(...object
        .map(key => key[0].search(item).map((value) => `${key[1]}.${value || ''}`))
        .map(v => v.filter(v => !v.endsWith('.'))).upLevel());
    return keys.filter(value => value);
});
addFunctionArray('deleteIndex', function (spaces = 0) {
    let array = [];
    if (typeof spaces === 'number') {
        this.forEach((_, i) => {
            if (spaces !== i)
                array.push(this[i]);
        });
    }
    else if (typeof spaces === 'object') {
        if (!isArray(spaces))
            throw new TypeError(`"${spaces}" is not valid`);
        array = this;
        spaces.sort((a, b) => a - b).forEach((number, index) => {
            array = array.deleteIndex(number - index);
        });
    }
    return array;
});
addFunctionArray('getData', function (route) {
    let routes = route.split('.');
    return isIterable(this[routes[0]])
        ? this[routes[0]].getData(routes.deleteIndex().join('.'))
        : this[routes[0]];
});
addFunctionArray('max', function (number) {
    let array = [];
    if (typeof number === 'number')
        array = this.filter((_, index) => index < number);
    return array;
});
addPropertyArray('end', function () {
    return this.length - 1;
});
addFunctionArray('endItem', function () {
    return this[this.end];
});
addFunctionArray('endDelete', function () {
    return this.max(this.end);
});
addFunctionArray('compare', function (arr) {
    if (!isArray(arr))
        throw new TypeError(`${arr} is not Array`);
    if(arr.length!==this.length) return false;
    for(let i=0;i<this.length;i++){
      if(isIterable(this[i]))
        if(!this[i].compare(arr[i]))
          return false
      else
        if(this[i]!==arr[i])
          return false
    }
    return true
});
addFunctionArray('upLevel', function () {
    let response = [];
    this.map(value => isArray(value) ? response.push(...value.upLevel()) : response.push(value));
    return response;
});
