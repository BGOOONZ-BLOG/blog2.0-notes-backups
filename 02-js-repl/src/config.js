/*
 * @author Daisuke Homma
 */

const jsrepl = {};

{ // namespace boundary

jsrepl.config = {};
const config = jsrepl.config;

config.rootElementId = "js-repl";
config.prompt = ">";
config.resultPrompt = "=>";

config.debug = false;

} // namespace boundary
