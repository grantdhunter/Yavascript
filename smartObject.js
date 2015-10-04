function SmartObject() {

}

SmartObject.prototype.addMethod = function(method) {
    if (this.hasOwnProperty(method)) {
        return true;
    }

    this.prototype[method] = this.generateFunction()
}


SmartObject.prototype.generateFunction = function() {
    var func = new (Function.prototype.bind.apply(this, arguments));

    return function () {

        return func(arguments);
    }
}


module.exports = new SmartObject();