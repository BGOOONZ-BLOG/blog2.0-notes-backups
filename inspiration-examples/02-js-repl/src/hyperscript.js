/*
 * @author Daisuke Homma
 */

{ // namespace boundary

jsrepl.hyperscript = function(tag, ...args) {

  const elem = handleTag(tag);
  handleArgs(elem, args);

  return elem;

}

// utility functions
const isNull = val => val == null;
const isString = val => typeof val === "string";
const isNumber = val => typeof val === "number";
const isDate = val => val instanceof Date;
const isBoolean = val => typeof val === "boolean";
const isHTMLElement = val => ( (val instanceof Node) ||
                               (val instanceof HTMLElement) );
const isObject = val => typeof val === "object";
const toCamel = str => str.replace(/-([a-z])/g,
                                   (match, p1) => p1.toUpperCase());

const handleTag = tag => {

  if(!isString(tag)) { console.error("tag should be a string") }

  const [t1, id] = tag.split("#");
  const [t2, ...cls] = t1.split(".");
  const klass = cls.join(" ");

  const t3 = t2 || "div";

  const elem = document.createElement(t3);
  elem.id = id;
  elem.class = klass;

  return elem;

}

const handleArgs = (elem, args) => {

  const handleStyle = style => {
    for(var prop in style) {

      elem.style[toCamel(prop)] = style[prop];

    }
  }

  const handle = val => {

    if(isNull(val)) { // children - null

      // do nothing

    } else if(isString(val)) { // children - string

      elem.innerText = val;

    } else if( isNumber(val) || isDate(val) || isBoolean(val) ) {
               // children - other data

      elem.innerText = val.toString();

    } else if(isHTMLElement(val)) { // children - HTMLElement

      elem.appendChild(val);

    } else if(Array.isArray(val)) { // children - Array

      val.forEach(v => elem.appendChild(v));

    } else if(isObject(val)) { // Attribute

      for(var prop in val) {

        if(prop == "style") {
          handleStyle(val[prop]);
        } else {
          elem[prop] = val[prop];
        }

      }
    } else {

      console.log("unknown value found: ", val);

    }
  }

  args.forEach(handle);

}

} // namespace boundary
