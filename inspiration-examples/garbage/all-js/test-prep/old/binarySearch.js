// Definition of a node, a key and a left and right children (a node in a binary tree)
var Node = function(k, l, r) {
  this.key = k;
  this.left = l;
  this.right = r;
};

// Binary search using recursion until it either reaches the node having the key
// or a leaf
// This only works on a binary tree (left.key < key < right.key)
function binarySearch(t, k) {
  if(!t)
    return null;

  if(k < t.key)
    return binarySearch(t.left, k);
  else if(t.key < k)
    return binarySearch(t.right, k);

  return t;
}

// Binary search using continuations. This will go all the way down left, until
// it reaches a leaf, then it will call the continuation which will be used to
// look in the right branch
function depthFirstSearch(t, k, cont) {
  if(!t)
    return cont();
  if(t.key === k)
    return t;
  return depthFirstSearch(t.left, k, function(){return depthFirstSearch(t.right, k, cont);});
}

// Sample tree
var n = new Node(100, new Node(50, new Node(10), new Node(60)), new Node(101, null, new Node(130, new Node(123), new Node(140))));

console.log(binarySearch(n, 50));
console.log(depthFirstSearch(n, 140, function(){ return "Not Found";}));
