'use strict';
var program = require('commander');

program
    .version('0.0.1')
    .option('-i, --input <n>..<m>', 'input values', list)
    .option('-o, --output <n>', 'desired output values', parseInt)
    .parse(process.argv);

var inputs = program.input;
var output = program.output;
var fstring = 'return 0;';

var func
var result = output + 2;
var oldParams = [];

var params = generateParams(inputs.length);
var i = 0;
debugger;

while (i < 100000 && Math.abs(result - output) > 0.1) {
    var f = params.slice();

    f.push(fstring);

    func = createFunction(f);

    result = func.apply(null, inputs)


    var newParams = [];
    if (result > output) {

        newParams = params.map(function (p) {
            return p + '* -' + Math.random()
        })
    } else if (result < output) {
        newParams = params.map(function (p) {
            return p + '*' + Math.random() * 10
        })
    }

    oldParams = oldParams.concat(newParams)

    fstring = 'return ' + oldParams.join('+')

    
    i++;
}

console.log('result: ', result);
console.log('result: ', func.toString());



function generatePolynomial(){
    
}



function createFunction(args) {
    return Function.apply(null, args)
}


function generateParams(length) {
    var params = [];
    for (var i = 0; i < length; i++) {
        params.push('x' + i);
    }
    return params;
}

function list(val) {
    return val.split(',').map(function (v) {
        return parseInt(v);
    });
}