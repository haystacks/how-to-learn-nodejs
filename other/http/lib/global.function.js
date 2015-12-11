"use strict";
const ROOT = global.root;
const CONFIGDIR = ROOT + '/config';

/**
 * you can use this. eg:require('package.json')
 * @param  filename
 * @return json
 */
var loadJsonConfig = function(fileName) {
	return require(CONFIGDIR + '\\' + fileName + '.json');
}

/**
 * help me load the yaml file. eg:.yml
 * @param  filename
 * @return json
 */
var yaml = require('js-yaml');
var fs = require('fs');
var loadYamlConfig = function(fileName) {
	try {
		return yaml.safeLoad(fs.readFileSync(CONFIGDIR + '\\' + fileName + '.yml'));
	} catch(e) {
		return {'error': e};
	}
}

/**
 * public function
 */
module.exports = {
	loadJson: loadJsonConfig,
	loadYaml: loadYamlConfig,
}