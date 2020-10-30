// This is an implementation of a stack (last in first out)

function Stack(x) {
  var curStack = x || {};

  curStack.add = function(newElement) {
    return Stack({remaining: curStack, el: newElement});
  };

  curStack.get = function(index) {
    if(index === 0) {
      return x.el;
    } else {
      return x.remaining.get(index - 1);
    }
  };

  curStack.remove = function(index) {
    if(index === 0) {
      return curStack.remaining;
    } else {
      return Stack({remaining: curStack.remaining.remove(index - 1), el: curStack.el});
    }
  };

  return curStack;
}


var s = Stack();

s = s.add(1).add(2).add(3).add(4);

// Get the 2nd element
console.log(s.get(2)); // returns "2" (because 0 is 4, 1 is 3 and 2 is 2)

// We remove the 2nd element
s = s.remove(1);
console.log(s.get(2)); // returns "1"