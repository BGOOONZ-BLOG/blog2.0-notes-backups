/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const repl = jsrepl.repl;

repl.prototype.onViewTouchStart = function(e) {

  this.editArea.focus();

}

repl.prototype.onEditAreaKeyDown = function(e) {

  jsrepl.nebug(e);
  jsrepl.nebug(e.keyCode);
  jsrepl.nebug(e.key);


  // when ctrl key is pressed.
  if(e.ctrlKey) {

    if( e.key == "l" ) {

      this.clearScreen();

    } else if ( e.key == "p" ) {

      // History back
      this.setEditAreaPrevious();
      e.preventDefault();

    } else if ( e.key == "n" ) {

      // History forward
      this.setEditAreaNext();
      e.preventDefault();

    }

  } else {

    if ( e.key == "ArrowUp" ) {

      // History back
      this.setEditAreaPrevious();
      e.preventDefault();

    } else if ( e.key == "ArrowDown" ) {

      // History forward
      this.setEditAreaNext();
      e.preventDefault();

    }

  }

}

repl.prototype.onEditAreaKeyPress = function(e) {

  jsrepl.nebug(e);
  jsrepl.nebug(e.keyCode);
  jsrepl.nebug(e.key);

  if( e.key == "Enter" ) {

    this.handleEnterKey(e);

  } else if( e.key == "c" ) {

    if(e.ctrlKey) {
      this.handleCancel();
    }

  }

}

repl.prototype.handleEnterKey = function(event) {

  const code = this.editArea.innerText;

  try {
    esprima.parseScript(code);
  } catch(error) {

    /* will not handle error. just ignoring it for now.
    if(error.description == "Unexpected token ILLEGAL") {
      console.log(error);
      this.handleIllegalCodeError();
    }
    */

    return;
  }

  event.preventDefault();
  this.processCode(code);

}

} // namespace boundary
