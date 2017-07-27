"use strict";
var navigation = [
	{
		'id': 'home',
		'label': 'home',
		'title': 'Herron Tech',
		'description': '',
		'keywords': '',
		'url': '/',
		'tplPath': 'sections/home/page.html',
		'scripts': ['sections/home/controller.js']
	},
  {
    'id': 'digital',
    'label': 'A change is happening',
    'title': 'Herron Tech | We give you digital agility',
    'url': '/digital',
    'tplPath': 'sections/digital/page.html',
    'scripts': ['sections/digital/controller.js']
  },
  {
    'id': 'disruption',
    'label': 'The Disruption',
    'title': 'Herron Tech | Why digital agility',
    'url': '/disruption',
    'tplPath': 'sections/disruption/page.html',
    'scripts': ['sections/disruption/controller.js']
  }
  ,
  {
    'id': 'platform',
    'label': 'Our Platform',
    'title': 'Herron Tech | Our Platform',
    'url': '/platform',
    'tplPath': 'sections/platform/page.html',
    'scripts': ['sections/platform/controller.js']
  }


];

var whitelistedDomain = ['localhost'];
