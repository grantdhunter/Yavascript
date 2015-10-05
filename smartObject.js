function SmartObject() {}

SmartObject.prototype.call = function () {
    var method = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);

    if (!this.hasOwnProperty(method)) {
        var argFunc = this.generateFunction(args.length);
        this[method] = Function.apply(this, argFunc);
    }

    return this[method].apply(this, args);
}


SmartObject.prototype.generateFunction = function (argLength) {
    var vars = [];
    var funcArray = []

    for (var i = 0; i < argLength; i++) {
        vars.push('x' + i);
    }
    funcArray = funcArray.concat(vars);

    if (argLength === 0) {
        funcArray.push('console.log("hi there!")')
    }
    if (argLength === 1) {
        funcArray.push('console.log(' + vars[0] + ')')
    }
    if (argLength > 1) {
        funcArray.push('return ' + vars.join('+'))
    }

    return funcArray;
}


module.exports = new SmartObject();