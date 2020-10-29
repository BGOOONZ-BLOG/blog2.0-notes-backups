/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const debug = function(str) {
    console.log(str);
}

// no debug
const nebug = function() {}

jsrepl.debug = debug;
jsrepl.nebug = nebug;

} // namespace boundary
