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

//set the key
var myKey = "507db56cc1fecfde8d4853334cdbb0f08181d7a09d20ef7d79ed0622dc2d47c477c7c10da077fad0b70fe9eedada19bda7ade58adccc8045ba779376062da9bd637d9a39f43072b8d8ab82fed474896154843fb57bffbb4088b43973c98c2e28";

var whitelistedDomain = ['localhost', '127.0.0.1', mydomainAPI + '.' + mydomain];
var apiConfiguration = {
	domain: protocol + '//' + mydomainAPI + '.' + mydomain,
	key: myKey
};
var translation = {};

let cloudUri = 'https://cloud.herrontech.com/';