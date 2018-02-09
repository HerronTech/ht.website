"use strict";
/**
 * Custom configuration values
 */
var mydomain = "herrontech.com";

//detect domain
if (location && location.host) {
	var customDomain = location.host;
	customDomain = customDomain.split(":")[0];
	customDomain = customDomain.split(".");
	customDomain.shift();
	customDomain = customDomain.join(".");
	mydomain = customDomain;
}

var protocol = window.location.protocol;

//detect port
var mydomainport = (protocol === 'https:') ? 443 : 80;
if (location && location.port && parseInt(location.port) !== 80) {
	mydomainport = location.port;
}
mydomain += ":" + mydomainport;

//set the api domain
var mydomainAPI = "cloud-api";
if(customSettings && customSettings.api && customSettings.api !== ''){
	mydomainAPI = customSettings.api;
}

//set the key
var myKey = "9b96ba56ce934ded56c3f21ac9bdaddc8ba4782b7753cf07576bfabcace8632eba1749ff1187239ef1f56dd74377aa1e5d0a1113de2ed18368af4b808ad245bc7da986e101caddb7b75992b14d6a866db884ea8aee5ab02786886ecf9f25e974";

if(customSettings && customSettings.key && customSettings.key !== ''){
	myKey = customSettings.key;
}

var whitelistedDomain = ['localhost', '127.0.0.1', mydomainAPI + '.' + mydomain];
var apiConfiguration = {
	domain: protocol + '//' + mydomainAPI + '.' + mydomain,
	key: myKey
};
var translation = {};

let cloudUri = protocol + '//cloud.' + mydomain + "/";