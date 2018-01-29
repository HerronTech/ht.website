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
		"ENG": "Please enter a new password",
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
	"oldPassword": {
		"ENG": "Old Password",
		"FRA": "Ancien Mot de passe"
	},
	"EnterOldPassword": {
		"ENG": "Enter your Old Password",
		"FRA": "Entrer votre ancien Mot de passe"
	},
	"newEmail": {
		"ENG": "New Email",
		"FRA": "New Email"
	},
	"register": {
		"ENG": "Register",
		"FRA": "Register"
	}
};

for (var attrname in accTranslation) {
	translation[attrname] = accTranslation[attrname];
}

var loginConfig = {
	formConf: {
		'name': 'login',
		'label': translation.login[LANG],
		'msgs': {
			'footer': ''
		},
		'entries': [
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
			'header': translation.pleaseEnterNewPassword[LANG],
			'footer': ''
		},
		'entries': [
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

var setPasswordConfig = {
	formConf: {
		'name': 'resetPw',
		'label': translation.setYourPassword[LANG],
		'entries': [
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
				'label': translation.username[LANG] + ' /  ' + translation.email[LANG],
				'type': 'text',
				'placeholder': translation.enterUsernameEmail[LANG],
				'value': '',
				'tooltip': translation.enterUserNameEmailPasswordChange[LANG],
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
				'label': translation.oldPassword[LANG],
				'type': 'password',
				'placeholder': translation.EnterOldPassword[LANG],
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
				'label': translation.newEmail[LANG],
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
				'label': translation.lastName[LANG],
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
		'instructions': ' instructions ',
		'entries': []
	}
};