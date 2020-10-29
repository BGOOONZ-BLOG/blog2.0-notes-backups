/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const h = jsrepl.hyperscript;

const log = function(repl) {

  this.repl = repl;
  this.width = repl.width;

  this.codeElem = null;
  this.outputElem = [];
  this.resultElem = null;

}

jsrepl.log = log;

log.prototype.display = function() {

  const elem = h(
    "div.log",
    this.codeElem,
    this.outputElem,
    this.resultElem
  )
    
  this.repl.logArea.appendChild(elem);

}

log.prototype.code = function(code) {

  this.codeElem = this.createCodeElem(code);

}

log.prototype.output = function(output) {

  this.outputElem.push(this.createOutputElem(output));

}

log.prototype.result = function(result) {

  this.resultElem = this.createResultElem(result);

}

log.prototype.createCodeElem = function(code) {

  const elem = h(
    "div.code",
    {style: {"width": this.width}},
    h("div.codePrompt",
      jsrepl.config.prompt,
      {style: {"color": "black",
               "background-color": "white",
               "display": "inline-block",
               "vertical-align": "top",
               "margin-right": "8px",
               "font-family": "monospace"}}),
     h("div.codeText",
       code,
       {style: {"color": "black",
                // "float": "right",
                "display": "inline-block",
                "vertical-align": "top",
                "font-family": "monospace"}})
  )   

  return elem;
 
}

log.prototype.createOutputElem = function(content) {

  const elem = h(
    "div.output",
    {style: {"width": this.width}},
     h("div.output",
       content,
       {style: {"color": "black",
                "width": this.width,
                "vertical-align": "top",
                "word-wrap": "break-word",
                "font-family": "monospace"}})
  )   

  return elem;
 
}

log.prototype.createResultElem = function(result) {

  const elem = h(
    "div.result",
    {style: {"width": this.width}},
    h("div.resultPrompt",
      jsrepl.config.resultPrompt,
      {style: {"color": "black",
               "background-color": "white",
               // "float": "left",
               "display": "inline-block",
               "vertical-align": "top",
               "margin-right": "8px",
               "font-family": "monospace"}}),
     h("div.resultText",
       result,
       {style: {"color": "black",
                // "float": "right",
                "display": "inline",
                "vertical-align": "top",
                "word-wrap": "break-word",
                "font-family": "monospace"}})
  )   

  return elem;
 
}

} // namespace boundary
