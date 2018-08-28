"use strict";
var accTranslation = {
	"myAccount": {
		"ENG": "My Account",
		"FRA": "My Account"
	},
	//controller
	"changeEmail": {
		"ENG": "Change Email",
		"FRA": "Changer l'e-mail"
	},
	"changePassword": {
		"ENG": "Change Password",
		"FRA": "Changer le mot de passe"
	},
	"errorMessageChangePassword": {
		"ENG": "Your password and confirm password fields do not match!",
		"FRA": "Your password and confirm password fields do not match!"
	},
	"successMsgChangePassword": {
		"ENG": "Password Updated Successfully.",
		"FRA": "Mot de passe Updated Successfully."
	},
	"editProfile": {
		"ENG": "Edit Profile",
		"FRA": "Edit Profile"
	},
	"errorInvalidProfileJsonObject": {
		"ENG": "Error: Invalid Profile Json object",
		"FRA": "Error: Invalid Profile Json object"
	},
	"profileUpdatedSuccessfully": {
		"ENG": "Profile Updated Successfully.",
		"FRA": "Profile Updated Successfully."
	},
	"JSONObjectRepresentingYourProfile": {
		"ENG": "JSON object representing your profile",
		"FRA": "JSON object representing your profile"
	},
	"fillYourAdditionalProfileInformation": {
		"ENG": "Fill in your additional profile information",
		"FRA": "Fill in your additional profile information"
	},
	"youNeedToLoginFirst": {
		"ENG": "You need to Login first",
		"FRA": "You need to Login first"
	},
	"yourEmailValidatedChangedSuccessfully": {
		"ENG": "Your email was validated and changed successfully.",
		"FRA": "Your email was validated and changed successfully."
	},
	"youAreAlreadyLoggedIn": {
		"ENG": "You are already logged in.",
		"FRA": "You are already logged in."
	},

	"youAlreadyLoggedInLogOutFirst": {
		"ENG": "You are already logged in. Log out first",
		"FRA": "You are already logged in. Log out first"
	},
	"passwordSetSuccessfully": {
		"ENG": "Password was set successfully.",
		"FRA": "Mot de passe was set successfully."
	},
	"yourPasswordReset": {
		"ENG": "Your password was reset.",
		"FRA": "Your Mot de passe was reset."
	},
	//directives
	//forgotPassword
	"goBackToLogin": {
		"ENG": "Go Back to Login",
		"FRA": "Go Back to Login"
	},
	//myAccount
	"changEmail": {
		"ENG": "Change Email",
		"FRA": "Change Email"
	},
	//config
	"enterPassword": {
		"ENG": "Enter Password",
		"FRA": "Votre Mot de passe"
	},
	"forgotYourPassword": {
		"ENG": "Forgot your password?",
		"FRA": "Forgot your Mot de passe?"
	},
	"resetPassword": {
		"ENG": "Reset Password",
		"FRA": "Reset Mot de passe"
	},
	"pleaseEnterNewPassword": {
		"ENG": "",
		"FRA": "Please enter a nouveau mot de passe"
	},
	"newPassword": {
		"ENG": "New Password",
		"FRA": "New Mot de passe"
	},
	"setYourPassword": {
		"ENG": "Set your Password",
		"FRA": "Fixer votre Mot de passe"
	},
	"forgotPassword": {
		"ENG": "Forgot Password",
		"FRA": "Oublié le mot de passe"
	},
	"forgetPasswordMsgHeader": {
		"ENG": "Please enter your account email address or username to reset your password",
		"FRA": "Please enter your account email address or username to reset your Mot de passe"
	},
	"enterUsernameEmail": {
		"ENG": "Enter Username or E-mail",
		"FRA": "Enter Username or E-mail"
	},
	"enterUserNameEmailPasswordChange": {
		"ENG": "Enter your Username or E-mail to ask for a password change",
		"FRA": "Enter your Username or E-mail to ask for a Mot de passe change"
	},

	"EnterOldPassword": {
		"ENG": "",
		"FRA": "Entrer votre ancien Mot de passe"
	},
	"newEmail": {
		"ENG": "",
		"FRA": "New Email"
	},
	"register": {
		"ENG": "Register",
		"FRA": "Register"
	},
	"areYouSureWantDeleteSelectedGroup": {
		"ENG": "Are you sure you want to delete the selected group(s)?",
		"FRA": "Are you sure you want to delete the selected group(s)?"
	},
	"areYouSureWantDeleteGroup": {
		"ENG": "Are you sure you want to delete this group?",
		"FRA": "Are you sure you want to delete this group?"
	}
};

for (var attrname in accTranslation) {
	translation[attrname] = accTranslation[attrname];
}

var loginConfig = {
	formConf: {
		'name': 'login',
		'label': "Login",
		'msgs': {
			'footer': ''
		},
		'entries': [
			{
				'name': 'username',
				'label': translation.username[LANG],
				'hideLabel': true,
				'type': 'text',
				'placeholder': translation.enterUsername[LANG],
				'value': '',
				'tooltip': translation.usernamesToolTip[LANG],
				'required': true
			},
			{
				'name': 'password',
				'label': translation.password[LANG],
				'hideLabel': true,
				'type': 'password',
				'placeholder': translation.enterPassword[LANG],
				'value': '',
				'fieldMsg': ' <a href="/members/forgetPw">' + translation.forgotYourPassword[LANG] + '</a>',
				'tooltip': translation.passwordsToolTip[LANG],
				'required': true
			}
		]
	}
};

var resetPwConfig = {
	formConf: {
		'name': 'resetPw',
		'label': translation.resetPassword[LANG],
		'msgs': {
			'header': "Please enter a new password",
			'footer': ''
		},
		'entries': [
			{
				'name': 'password',
				'hideLabel': true,
				'label': translation.newPassword[LANG],
				'type': 'password',
				'placeholder': translation.newPasswordPlaceholder[LANG],
				'value': '',
				'tooltip': translation.passwordsToolTip[LANG],
				'required': true
			},
			{
				'name': 'confirmPassword',
				'hideLabel': true,
				'label': translation.confirmPassword[LANG],
				'type': 'password',
				'placeholder': translation.confirmPasswordPlaceholder[LANG],
				'value': '',
				'tooltip': translation.passwordsToolTip[LANG],
				'required': true
			}
		]

	}
};

var setPasswordConfig = {
	formConf: {
		'name': 'resetPw',
		'label': translation.setYourPassword[LANG],
		'entries': [
			{
				'name': 'password',
				'label': "Password",
				'type': 'password',
				'placeholder': translation.enterPassword[LANG],
				'value': '',
				'tooltip': translation.passwordsToolTip[LANG],
				'required': true
			},
			{
				'name': 'confirmPassword',
				'label': translation.confirmPassword[LANG],
				'type': 'password',
				'placeholder': translation.confirmPasswordPlaceholder[LANG],
				'value': '',
				'tooltip': translation.passwordsToolTip[LANG],
				'required': true
			}
		]
	}
};

var forgetPwConfig = {
	formConf: {
		'name': 'forgotPw',
		'label': translation.forgotPassword[LANG],
		'msgs': {
			'header': translation.forgetPasswordMsgHeader[LANG],
			'footer': ''
		},
		'entries': [
			{
				'name': 'username',
				'hideLabel': true,
				'label': 'Username or Email',
				'type': 'text',
				'placeholder': "Enter Username or E-mail",
				'value': '',
				'tooltip': 'Enter your Username or E-mail to ask for a password change',
				'required': true
			}
		]

	}
};

var changePwConfig = {
	formConf: {
		'name': 'changePassword',
		'label': '',
		'entries': [
			{
				'name': 'oldPassword',
				'label': "Old Password",
				'type': 'password',
				'placeholder': "Enter your Old Password",
				'value': '',
				'tooltip': translation.passwordsToolTip[LANG],
				'required': true
			},
			{
				'name': 'password',
				'label': translation.newPassword[LANG],
				'type': 'password',
				'placeholder': translation.newPasswordPlaceholder[LANG],
				'value': '',
				'tooltip': translation.passwordsToolTip[LANG],
				'required': true
			},
			{
				'name': 'confirmPassword',
				'label': translation.confirmPassword[LANG],
				'type': 'password',
				'placeholder': translation.confirmPasswordPlaceholder[LANG],
				'value': '',
				'tooltip': translation.passwordsToolTip[LANG],
				'required': true
			}
		]
	}
};

var changeEmailConfig = {
	formConf: {
		'name': '',
		'label': '',
		'entries': [
			{
				'name': 'email',
				'label': "New Email",
				'type': 'email',
				'placeholder': translation.enterEmail[LANG],
				'value': '',
				'tooltip': translation.emailToolTip[LANG],
				'required': true
			}
		]
	}
};

var registerConfig = {
	formConf: {
		'name': 'newProfile',
		'label': translation.register[LANG],
		'entries': [
			{
				'name': 'firstName',
				'label': translation.firstName[LANG],
				'type': 'text',
				'placeholder': translation.enterFirstName[LANG],
				'value': '',
				'tooltip': translation.enterFirstNameUser[LANG],
				'required': true
			},
			{
				'name': 'lastName',
				'label': "Last Name",
				'type': 'text',
				'placeholder': translation.enterLastName[LANG],
				'value': '',
				'tooltip': translation.enterLastNameUser[LANG],
				'required': true
			},
			{
				'name': 'email',
				'label': translation.email[LANG],
				'type': 'email',
				'placeholder': translation.enterEmail[LANG],
				'value': '',
				'tooltip': translation.emailToolTip[LANG],
				'required': true
			},
			{
				'name': 'username',
				'label': translation.username[LANG],
				'type': 'text',
				'placeholder': translation.enterUsername[LANG],
				'value': '',
				'tooltip': translation.usernamesToolTip[LANG],
				'required': true
			},
			{
				'name': 'password',
				'label': translation.password[LANG],
				'type': 'password',
				'placeholder': translation.enterPassword[LANG],
				'value': '',
				'tooltip': translation.passwordsToolTip[LANG],
				'required': true
			},
			{
				'name': 'confirmPassword',
				'label': translation.confirmPassword[LANG],
				'type': 'password',
				'placeholder': translation.confirmPasswordPlaceholder[LANG],
				'value': '',
				'tooltip': translation.passwordsToolTip[LANG],
				'required': true
			}
		]
	}
};

var profileConfig = {
	formConf: {
		'name': 'editProfile',
		'label': '',
		'instructions': '',
		'entries': []
	}
};

var membersConfig = {
	grid: {
		recordsPerPageArray: [5, 10, 50, 100],
		'columns': [
			{ 'label': 'Username', 'field': 'username' },
			{ 'label': 'First Name', 'field': 'firstName' },
			{ 'label': 'Last Name', 'field': 'lastName' },
			{ 'label': 'Email', 'field': 'email' },
			{ 'label': 'Status', 'field': 'status' }
			// { 'label': 'Groups', 'field': 'grpsArr' },
			// { 'label': 'Projects', 'field': 'projectsArr' }
		],
		'leftActions': [],
		'topActions': [],
		'defaultSortField': '',
		'defaultLimit': 10
	},
	
	form: {
		'name': '',
		'label': '',
		'actions': {},
		'entries': [
			{
				'name': 'username',
				'label': 'Username',
				'type': 'text',
				'placeholder': translation.enterUsername[LANG],
				'value': '',
				'tooltip': translation.usernamesToolTip[LANG],
				'required': true
			},
			{
				'name': 'email',
				'label': 'Email',
				'type': 'email',
				'placeholder': translation.enterEmail[LANG],
				'value': '',
				'tooltip': translation.emailToolTip[LANG],
				'required': true
			},
			{
				'name': 'firstName',
				'label': 'First Name',
				'type': 'text',
				'placeholder': translation.enterFirstName[LANG],
				'value': '',
				'tooltip': translation.enterFirstNameUser[LANG],
				'required': true
			},
			{
				'name': 'lastName',
				'label': "Last Name",
				'type': 'text',
				'placeholder': translation.enterLastName[LANG],
				'value': '',
				'tooltip': translation.enterLastNameUser[LANG],
				'required': true
			}
		]
	},
	
	permissions: {
		"adminAll": ['urac', '/admin/all', 'get'],
		'adminUser': {
			'list': ['urac', '/admin/listUsers', 'get'],
			'changeStatusAccess': ['urac', '/admin/changeUserStatus', 'get'],
			'editUser': ['urac', '/admin/editUser', 'post'],
			'addUser': ['urac', '/admin/addUser', 'post']
		},
		'adminGroup': {
			'list': ['urac', '/admin/group/list', 'get'],
			'add': ['urac', '/admin/group/add', 'post'],
			'edit': ['urac', '/admin/group/edit', 'post'],
			'delete': ['urac', '/admin/group/delete', 'delete'],
			'addUsers': ['urac', '/admin/group/addUsers', 'post']
		}
	}
};

var groupsConfig = {
	grid: {
		recordsPerPageArray: [5, 10, 50, 100],
		'columns': [
			{ 'label': "Code", 'field': 'code' },
			{ 'label': "Name", 'field': 'name' },
			{
				'label': "Description", 'field': 'description'
			}
		],
		'leftActions': [],
		'topActions': [],
		'defaultSortField': '',
		'defaultLimit': 10
	},
	form: {
		'name': '',
		'label': '',
		'actions': {},
		'entries': [
			{
				'name': 'code',
				'label': 'Code',
				'type': 'text',
				'placeholder': "Enter the Code of the group",
				'value': '',
				'tooltip': "Group codes are alphanumeric. Maximum length 20 characters",
				'required': true
			},
			{
				'name': 'name',
				'label': "Name",
				'type': 'text',
				'placeholder': "Enter the Name of the group",
				'value': '',
				'tooltip': '',
				'required': true
			},
			{
				'name': 'description',
				'label': "Description",
				'type': 'textarea',
				'rows': 2,
				'placeholder': "Enter the Description of the Group",
				'value': '',
				'tooltip': '',
				'required': true
			}
		]
	},
	users: {
		'name': '',
		'label': '',
		'msgs': {},
		'actions': {},
		'entries': [
			{
				'name': 'users',
				'label': "Users",
				'type': 'checkbox',
				'placeholder': '',
				'value': [],
				'tooltip': "Check to add user to group",
				'required': true
			}
		]
	}
};