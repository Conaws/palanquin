import * as _ from 'ramda';


const logger = (x) => {console.log(x); return x};

const storageSetter = _.curry(function(key, value){ return localStorage[key] = value });
const storageDefault = _.curry(function(def, key){return localStorage[key] || def });
const storageGetter = storageDefault("[]");
// setLocalJSON("Brave New World")({brave: "new world"});
const setLocalJSON = (term) => {return _.compose(storageSetter(term), JSON.stringify)}
const getLocalJSON = _.compose(JSON.parse, storageGetter);


const setLocalState = (data) => setLocalJSON("state")(data);
const getLocalState = () => getLocalJSON("state");


const addToHistory = _.curry((state) => {
	let myhistory = getLocalJSON("History");
	setLocalJSON("History")(myhistory.concat(state));
});






export default {getLocalJSON, setLocalJSON, logger, addToHistory};