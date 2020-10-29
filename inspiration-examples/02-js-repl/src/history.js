/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const history = function() {

  this.history = [];
  this.current = -1;

}

jsrepl.history = history;

history.prototype.push = function(code) {

  jsrepl.nebug("history: push code.");

  if( (code == null) || (code == "") || (typeof code === "undefined") ) {
    return
  }

  jsrepl.nebug("history: push", this.current, code);

  this.history.push(code);
  this.current = this.history.length - 1;

}

history.prototype.previous = function() {

  jsrepl.nebug("history: prev.", this.current);

  if(this.current < 0) {

    return null; 

  }

  const ret = this.history[this.current];
  jsrepl.nebug("history: prev", this.current, this.history[this.current]);

  if(this.current != 0) {
    this.current--;
  }

  return ret;

}

history.prototype.next = function() {

  jsrepl.nebug("history: next", this.current);

  if(this.current == this.history.length - 1) {

    return null; 

  }

  this.current++;
  jsrepl.nebug("history: next", this.current, this.history[this.current]);

  return this.history[this.current];

}

} // namespace boundary
