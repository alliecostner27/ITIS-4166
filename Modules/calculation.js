function add(x,y){
    return x+y;
}

function subtract(x,y){
    return x-y;
}

exports.add = add;
exports.subtract = subtract;

//module.exports = {} initializes an empty object

//module.exports.add = add; //.add is the name of the field and add refers to the function add, so .add can be named anything

//exports = module.exports;  exports is intialized as module.exports
//function wrappers returns module.exports

//exports.add = add; 
//exports is a reference to module.exports, so this is the same as module.exports.add = add

