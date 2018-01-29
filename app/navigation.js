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
        'id': 'homeagility',
        'label': 'homeagility',
        'title': 'Durable Digital Agility',
        'description': '',
        'keywords': '',
        'url': '/homeagility',
        'tplPath': 'sections/homeagility/page.html',
        'scripts': ['sections/homeagility/controller.js']
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
		'id': 'digitization',
		'label': 'With Us',
		'title': 'Herron Tech | No Barrier to Digitization',
		'url': '/digitization',
		'tplPath': 'sections/digitization/page.html',
		'scripts': ['sections/digitization/controller.js']
	},
	{
		'id': 'disruption',
		'label': 'The Disruption',
		'title': 'Herron Tech | Why digital agility',
		'url': '/disruption',
		'tplPath': 'sections/disruption/page.html',
		'scripts': ['sections/disruption/controller.js']
	},
	{
		'id': 'modernize',
		'label': 'Modernize Your IT Ecosystem',
		'title': 'Herron Tech | Modernize Your IT Ecosystem',
		'url': '/modernize',
		'tplPath': 'sections/modernize/page.html',
		'scripts': ['sections/modernize/controller.js']
	},
	{
		'id': 'platform',
		'label': 'Our Platform',
		'title': 'Herron Tech | Our Platform',
		'url': '/platform',
		'tplPath': 'sections/platform/page.html',
		'scripts': ['sections/platform/controller.js']
	},
	{
		'id': 'projects',
		'title': 'Herron Tech | Projects',
		'url': '/members/projects',
		'tplPath': 'sections/account/members/projects.html',
		'scripts': ['sections/account/members/controller.js']
	},
	{
		'id': 'profile',
		'label': 'Login',
		'title': 'Herron Tech | My Account',
		'url': '/members/profile',
		'tplPath': 'sections/account/members/profile.html',
		'scripts': ['sections/account/config.js', 'sections/account/members/controller.js']
	},
	{
		'id': 'billing',
		'label': 'Login',
		'title': 'Herron Tech | Billing',
		'url': '/members/billing',
		'tplPath': 'sections/account/members/billing.html',
		'scripts': ['sections/account/config.js', 'sections/account/members/controller.js']
	},
	{
		'id': 'register',
		'label': 'Register',
		'title': 'Herron Tech | Join',
		'url': '/members/register',
		'tplPath': 'sections/account/register/page.html',
		'scripts': ['sections/account/register/controller.js']
	},
	{
		'id': 'forgetPw',
		'title': 'Herron Tech | Forget Password',
		'url': '/members/forgetPw',
		'tplPath': 'sections/account/login/forgetPw.html',
		'scripts': [
			'sections/account/config.js',
			'sections/account/login/controller.js'
		]
	},
	{
		'id': 'resetPw',
		'title': 'Herron Tech | Reset Password',
		'url': '/members/resetPw',
		'tplPath': 'sections/account/login/resetPw.html',
		'scripts': ['sections/account/config.js', 'sections/account/login/controller.js']
	},
	{
		'id': 'validateEmail',
		'title': 'Herron Tech | Validate Email',
		'url': '/members/validateEmail',
		'tplPath': 'sections/account/login/validate.html',
		'scripts': ['sections/account/config.js', 'sections/account/login/controller.js']
	},
	{
		'id': 'memberarea',
		'label': 'Register',
		'title': 'Join Herron Tech',
		'url': '/memberarea',
		'tplPath': 'sections/account/register/page.html',
		'scripts': ['sections/account/register/controller.js']
	},
	{
		'id': 'login',
		'label': 'Login',
		'title': 'Herron Tech | Login',
		'url': '/members/login',
		'tplPath': 'sections/account/login/login.html',
		'scripts': [
			'sections/account/config.js',
			'sections/account/login/controller.js'
		]
	}


];

var whitelistedDomain = ['localhost'];
