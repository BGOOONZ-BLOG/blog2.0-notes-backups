// There are 00000010 people in the world, those that understand binary and those that don't.


// CPU - on/off - 0/1

/*

1 place: 
 0 - 0
 1 - 1

2 places(bits)

 00 - 0
 01 - 1
 10 - 2
 11 - 3

3 bits
 000 - 0
 001 - 1
 010 - 2
 011 - 3
 100 - 4
 101 - 5
 110 - 6
 111 - 7

 3rdplace(x4)           2ndplace(x2)    1stplace (x1)
 0                      0               0

 With an 8-bit binary number, how do we represent 42?

 00101010 - 42
 10011100 - 156

*/


/*

Base 16 - Hexadecimal

11111111 - 255

FF - 255



*/

require("fs").readFile("./myname.txt", (err, contents) => {
    console.log(contents);
});