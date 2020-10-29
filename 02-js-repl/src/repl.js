/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const h = jsrepl.hyperscript;

const repl = function(root) {

  this.root = root;
  this.width = root.clientWidth;
  this.height = root.clientHeight;

  this.view = null;
  this.logArea = null;
  this.currentArea = null;
  this.prompt = null;
  this.editArea = null;
  this.paddingArea = null;
  this.sandboxFrame = null;

  this.sandbox = null;

  this.currentLog = null;

  this.history = null;

  this.init();

};

jsrepl.repl = repl;

repl.prototype.init = function() {

  this.createView();

  this.view = document.getElementById("view");
  this.logArea = document.getElementById("logArea");
  this.currentArea = document.getElementById("currentArea");
  this.prompt = document.getElementById("prompt");
  this.editArea = document.getElementById("editArea");
  this.paddingArea = document.getElementById("paddingArea");
  this.sandboxFrame = document.getElementById("sandboxFrame").contentWindow;

  this.sandbox = new jsrepl.sandbox(this);
  this.history = new jsrepl.history();

  this.editArea.focus();
  // this.resetEditArea();

}

repl.prototype.createView = function() {

  // HyperScript Notation
  const html = h(
    "div#view",
    {style: {"width": this.width,
             "height": this.height,
             // "overflow-x": "visible",
             // "overflow-y": "auto"},
             },
     ontouchstart: e => this.onViewTouchStart(e)},
    h("div#logArea",
      {style: {"width": this.width}}),
    h("div#currentArea",
      {style: {"width": this.width}},
      h("div#prompt",
        jsrepl.config.prompt,
        {style: {"color": "black",
                 "background-color": "white",
                 "display": "inline-block",
                 "vertical-align": "top",
                 "margin-right": "8px",
                 "font-family": "monospace"}}),
      h("div#editArea",
        {contentEditable: true,
         style: {"color": "black",
                 "display": "inline-block",
                 "vertical-align": "top",
                 "font-family": "monospace"},
         onkeypress: e => this.onEditAreaKeyPress(e),
         onkeydown: e => this.onEditAreaKeyDown(e)
        })),
    h("div#paddingArea",
      {style: {"display": "block"}}),
    h("iframe#sandboxFrame",
      {style: {display: "none"}})
    )   

  this.root.appendChild(html);

}

repl.prototype.processCode = function(code) {

  const log = new jsrepl.log(this);
  this.currentLog = log;

  const result = this.evalCode(code);

  this.history.push(code);

  log.code(code);
  log.result(result);
  log.display();

  this.resetEditArea();
  jsrepl.nebug(this.editArea.innerHTML);

}

repl.prototype.evalCode = function(code) {

  let result = "";

  try {

    result += this.sandboxFrame.eval(code);

  } catch(e) {

    result += e;

  }

  return result;

}

} // namespace boundary
