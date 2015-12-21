"use strict";
const ROOT = global.root;
const CONFIGDIR = ROOT + '/config';

/**
 * you can use this. eg:require('package.json')
 * @param  filename
 * @return json
 */
var loadJsonConfig = function(fileName) {
	return require(CONFIGDIR + '/' + fileName + '.json');
}

/**
 * help me load the yaml file. eg:.yml
 * @param  filename
 * @return json
 */
var yaml = require('js-yaml');
var fs = require('fs');
var loadSomeYaml = function(path) {
	return yaml.safeLoad(fs.readFileSync(path));
}

var loadYamlConfig = function(fileName) {
	try {
		return loadSomeYaml(CONFIGDIR + '/' + fileName + '.yml');
	} catch(e) {
		return {'error': e};
	}
}

var writeYamlConfig = function(fileName, json) {
	let path = CONFIGDIR + '/' + fileName + '.yml';
	let config = loadSomeYaml(path);
	for(let k in json) {
		config[k] = "'"+ json[k] + "'";
	}
	let configStr = JSON.stringify(config);
	let newConfigStr = configStr.replace(/","/g, '\n').replace(/:/g, ': ').replace(/[{}"]/g, '');
	fs.writeFileSync(path, newConfigStr);
}

/**
 * L 语言调用
 * default zh.yml
 */
const LANGDIR = ROOT + '/languages';
const DEFAULTLANG = 'zh';
var L = function(lang) {
	let langJson = yaml.safeLoad(fs.readFileSync(LANGDIR + '/' + DEFAULTLANG + '.yml'));
	return langJson(lang);
}
/**
 * public function
 */
module.exports = {
	loadJson: loadJsonConfig,
	loadYaml: loadYamlConfig,
	writeYaml: writeYamlConfig,
	L: L,
}
