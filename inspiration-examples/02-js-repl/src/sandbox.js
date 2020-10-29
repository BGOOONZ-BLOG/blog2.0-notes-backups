/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const sandbox = function(repl) {

  // sandbox window (iframe's contentWindow)
  this.win = repl.sandboxFrame;

  this.win.console = new console(repl); 
  this.win.load = path  => load(this.win, path);

  // will not activate this feature which opens external web site
  // this.win.open = url => open(this.win, url);

};

jsrepl.sandbox = sandbox;

// sandbox console

const console = function(repl) {

  this.repl = repl;

};

// ToDo:
// more functions are needed to be implemented.
// https://developer.mozilla.org/ja/docs/Web/API/console

// general output function
console.prototype.write = function(text) {

  this.repl.currentLog.output(text);
  window.console.log(text);

}

// normal output
console.prototype.log = function(content) {

  const text = "" + content;
  this.write(text);

}

// apply JSON.stringify before output for printing objects
console.prototype.json = function(content) {

  const text = JSON.stringify(content);
  this.write(text);

}

// apply Object.keys before output for printing object keys
console.prototype.keys = function(content) {

  const text = "" + Object.keys(content);
  this.write(text);

}

// apply Object.getOwnPropertyNames before output for printing object keys
console.prototype.props = function(content) {

  const text = "" + Object.getOwnPropertyNames(content);
  this.write(text);

}

// sandbox loader
const load = function(win, path) {

  jsrepl.nebug(win);

  const el = win.document.createElement('script');

  el.type = "text/javascript";
  el.src = path;

  win.document.head.appendChild(el);

}

// interact with other site
// it is difficult to make it work as expected because of X-Frame-Options.
const open = function(win, url) {

  jsrepl.nebug(win);

  // create iframe inside sandbox
  const el = win.document.createElement("iframe");
  el.class = "extern";  
  el.src = url;
  el.style["display"] = "none";

  win.document.body.appendChild(el);

  return el;

}

} // namespace boundary

