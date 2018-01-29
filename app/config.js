'use strict';
var sitekey = "6LfA6ykUAAAAAJlJ9MDpdGKL2HuKK9JvC5UUWzq5";
var captcha1;
var iCaptcha1Value;

var myCallBack = function () {
    $("input[type=submit]").removeAttr("disabled");
	//Render the recaptcha1 on the element with ID "recaptcha1"
	captcha1 = grecaptcha.render('captcha1', {
		'sitekey': sitekey,
		"callback": function (value) {
			iCaptcha1Value = value;
		}
	});
};

var LANG = 'ENG';

var translation = {
	'home': {
		"ENG": "Home",
		"FRA": "Acceuil"
	},
	'welcome': {
		"ENG": "Welcome",
		"FRA": "Bienvenue"
	},
	'help': {
		"ENG": "Help",
		"FRA": "Aide"
	},
	"logout": {
		"ENG": "Logout",
		"FRA": "Sign out"
	},
	"refreshListing": {
		"ENG": "Refresh Listing",
		"FRA": "Recharger la liste"
	},
	"getPrevious": {
		"ENG": "Previous",
		"FRA": "Précéd"
	},
	"getNext": {
		"ENG": "Next",
		"FRA": "Suivant"
	},
	"username": {
		"ENG": "Username",
		"FRA": "Nom d'utilisateur"
	},
	"password": {
		"ENG": "Password",
		"FRA": "Mot De Passe"
	},
	"confirmPassword": {
		"ENG": "Confirm Password",
		"FRA": "Confirm Password"
	},
	"confirmPasswordPlaceholder": {
		"ENG": "Re-Enter Password",
		"FRA": "Re-Enter Password"
	},
	"newPasswordPlaceholder": {
		"ENG": "Enter a new password",
		"FRA": "Enter a new password"
	},
	"passwordsToolTip": {
		"ENG": "Passwords are alphanumeric and support _ character only",
		"FRA": "Passwords are alphanumeric and support _ character only"
	},
	"usernamesToolTip": {
		"ENG": "Usernames are alphanumeric and support  _ & -  character only",
		"FRA": "Usernames are alphanumeric and support  _ & -  character only"
	},
	"emailToolTip": {
		"ENG": "myemail@example.domain",
		"FRA": "myemail@example.domain"
	},
	"firstName": {
		"ENG": "First Name",
		"FRA": "Prenom"
	},
	"lastName": {
		"ENG": "Last Name",
		"FRA": "Nom"
	},
	"email": {
		"ENG": "Email",
		"FRA": "Email"
	},
	"status": {
		"ENG": "Status",
		"FRA": "Status"
	},
	"merchant": {
		"ENG": "Merchant",
		"FRA": "Merchant"
	},
	"dateCreated": {
		"ENG": "Date Created",
		"FRA": "Date de Création"
	},
	"dateModified": {
		"ENG": "Date Modified",
		"FRA": "Date Modifié"
	},
	"yes": {
		"ENG": "Yes",
		"FRA": "Oui"
	},
	"no": {
		"ENG": "No",
		"FRA": "Non"
	},
	"member": {
		"ENG": "Member",
		"FRA": "Member"
	},
	"product": {
		"ENG": "Product",
		"FRA": "Product"
	},
	"package": {
		"ENG": "Package",
		"FRA": "Package"
	},
	"packages": {
		"ENG": "Packages",
		"FRA": "Packages"
	},
	"develop": {
		"ENG": "Develop",
		"FRA": "Develop"
	},
	"code": {
		"ENG": "Code",
		"FRA": "Code"
	},
	"name": {
		"ENG": "Name",
		"FRA": "Name"
	},
	"description": {
		"ENG": "Description",
		"FRA": "Description"
	},
	"hours": {
		"ENG": "hours",
		"FRA": "hours"
	},
	"days": {
		"ENG": "days",
		"FRA": "jours"
	},
	"envCode": {
		"ENG": "Environment Code",
		"FRA": "Environment Code"
	},
	"cancel": {
		"ENG": "Cancel",
		"FRA": "Annuler"
	},
	"submit": {
		"ENG": "Submit",
		"FRA": "Soumettre"
	},
	"warning": {
		"ENG": "warning",
		"FRA": "warning"
	},
	"groups": {
		"ENG": "Groups",
		"FRA": "Groups"
	},
	"noSearchResultsFound": {
		"ENG": "No search results found for",
		"FRA": "No search results found for"
	},
	"expandApplications": {
		"ENG": "Expand Applications",
		"FRA": "Expand Applications"
	},
	"collapseApplications": {
		"ENG": "Collapse Applications",
		"FRA": "Collapse Applications"
	},
	"oAuthUsers": {
		"ENG": "oAuth Users",
		"FRA": "oAuth Users"
	},
	"updateoAuthUser": {
		"ENG": "Update oAuth User",
		"FRA": "Update oAuth User"
	},
	"addNewoAuthUser": {
		"ENG": "Add New oAuth User",
		"FRA": "Add New oAuth User"
	},
	"addoAuthUser": {
		"ENG": "Add oAuth User",
		"FRA": "Add oAuth User"
	},
	"updateUser": {
		"ENG": "Update User",
		"FRA": "Update User"
	},
	"userID": {
		"ENG": "User Id",
		"FRA": "User Id"
	},
	"deleteoAuthInfo": {
		"ENG": "Delete oAuth Info",
		"FRA": "Delete oAuth Info"
	},
	"formUserIdPlaceHolder": {
		"ENG": "oauthUser",
		"FRA": "oauthUser"
	},
	"formUserIdToolTip": {
		"ENG": "Enter the user Id.",
		"FRA": "Enter the user Id."
	},
	"oAuthFrmPasswordTooltip": {
		"ENG": "Keep it empty to maintain the old password.",
		"FRA": "Keep it empty to maintain the old password."
	},
	"oAuthConfirmPasswordTooltip": {
		"ENG": "Confirm oAuth user password.",
		"FRA": "Confirm oAuth user password."
	},
	"formOathPasswordTooltip": {
		"ENG": "Enter oAuth user password.",
		"FRA": "Enter oAuth user password."
	},
	"TenantInfoUpdatedSuccessfully": {
		"ENG": "Tenant Info Updated Successfully",
		"FRA": "Tenant Info Updated Successfully"
	},
	"TenantUpdatedSuccessfully": {
		"ENG": "Tenant Updated Successfully",
		"FRA": "Tenant Updated Successfully"
	},
	"TenantRemovedSuccessfully": {
		"ENG": "Tenant removed Successfully.",
		"FRA": "Tenant removed Successfully."
	},
	"TenantAddedSuccessfully": {
		"ENG": "Tenant Added Successfully",
		"FRA": "Tenant Added Successfully"
	},
	"TenantOAuthDeletedSuccessfully": {
		"ENG": "Tenant OAuth Deleted Successfully",
		"FRA": "Tenant OAuth Deleted Successfully"
	},
	"userUpdatedSuccessfully": {
		"ENG": "User Updated Successfully",
		"FRA": "User Updated Successfully"
	},
	"userAddedSuccessfully": {
		"ENG": "User Added Successfully",
		"FRA": "User Added Successfully"
	},
	"userDeletedSuccessfully": {
		"ENG": "User Deleted Successfully",
		"FRA": "User Deleted Successfully"
	},
	"applicationAddedSuccessfully": {
		"ENG": "Application Added Successfully",
		"FRA": "Application Added Successfully"
	},

	"applicationKeyAddedSuccessfully": {
		"ENG": "Application Key Added Successfully",
		"FRA": "Application Key Added Successfully"
	},
	"keyConfigurationUpdatedSuccessfully": {
		"ENG": "Key Configuration Updated Successfully",
		"FRA": "Key Configuration Updated Successfully"
	},
	"errorInvalidConfigJsonObject": {
		"ENG": "Error: Invalid Config Json object",
		"FRA": "Error: Invalid Config Json object"
	},
	"errorInvalidDeviceJsonObject": {
		"ENG": "Error: Invalid device Json object",
		"FRA": "Error: Invalid device Json object"
	},
	"errorInvalidGeoJsonObject": {
		"ENG": "Error: Invalid geo Json object",
		"FRA": "Error: Invalid geo Json object"
	},
	"errorInvalidJsonObject": {
		"ENG": "Error: Invalid Json object",
		"FRA": "Error: Invalid Json object"
	},
	"externalKeyAddedSuccessfully": {
		"ENG": "External Key Added Successfully",
		"FRA": "External Key Added Successfully"
	},
	"externalKeyUpdatedSuccessfully": {
		"ENG": "External Key Updated Successfully",
		"FRA": "External Key Updated Successfully"
	},
	"externalKeyRemovedSuccessfully": {
		"ENG": "External Key Removed Successfully",
		"FRA": "External Key Removed Successfully"
	},
	"mySecretPhrase": {
		"ENG": "My secret phrase",
		"FRA": "My secret phrase"
	},
	"applicationKeyRemovedSuccessfully": {
		"ENG": "Application Key Removed Successfully",
		"FRA": "Application Key Removed Successfully"
	},
	"manageApplications": {
		"ENG": "Manage Applications",
		"FRA": "Manage Applications"
	},
	"formTntNamePlaceHolder": {
		"ENG": "Test Tenant",
		"FRA": "Test Tenant"
	},
	"formTentNameToolTip": {
		"ENG": "Enter Tenant Name.",
		"FRA": "Enter Tenant Name."
	},
	"formTentDescriptionPlaceHolder": {
		"ENG": "Testing Tenant, used by developers and does not reach production server...",
		"FRA": "Testing Tenant, used by developers and does not reach production server..."
	},
	"formDescriptionTenantToolTip": {
		"ENG": "Enter a description explaining the usage of this tenant",
		"FRA": "Enter a description explaining the usage of this tenant"
	},
	"formTagPlaceHolder": {
		"ENG": "Example: testing",
		"FRA": "Example: testing"
	},
	"formTagToolTip": {
		"ENG": "Optional: Choose a tag to better organize your tenants",
		"FRA": "Optional: Choose a tag to better organize your tenants"
	},
	"formTagFieldMsg": {
		"ENG": "Choose a tag to better organize your tenants.",
		"FRA": "Choose a tag to better organize your tenants."
	},
	"removeTenant": {
		"ENG": "Remove Tenant",
		"FRA": "Remove Tenant"
	},
	"editTenant": {
		"ENG": "Edit Tenant",
		"FRA": "Edit Tenant"
	},
	"updateOAuth": {
		"ENG": "Update oAuth",
		"FRA": "Update oAuth"
	},
	"areUASureUWantClearAcl": {
		"ENG": "Are you sure you want to clear the ACL?",
		"FRA": "Are you sure you want to clear the ACL?"
	},
	"users": {
		"ENG": "Users",
		"FRA": "Users"
	},
	"profile": {
		"ENG": "Profile",
		"FRA": "Profile"
	},
	"enterFirstName": {
		"ENG": "Enter First Name",
		"FRA": "Enter First Name"
	},
	"enterFirstNameUser": {
		"ENG": "Enter the First Name of the User",
		"FRA": "Enter the First Name of the User"
	},
	"enterLastName": {
		"ENG": "Enter Last Name",
		"FRA": "Enter Last Name"
	},
	"enterLastNameUser": {
		"ENG": "Enter the Last Name of the User",
		"FRA": "Enter the Last Name of the User"
	},
	"enterEmail": {
		"ENG": "Enter Email",
		"FRA": "Enter Email"
	},
	"enterUsername": {
		"ENG": "Enter Username",
		"FRA": "Enter Username"
	},
	"login": {
		"ENG": "Login",
		"FRA": "Login"
	},
	"save": {
		"ENG": "Save",
		"FRA": "Save"
	},
	"saveChanges": {
		"ENG": "Save Changes",
		"FRA": "Save Changes"
	},
	"close": {
		"ENG": "Close",
		"FRA": "Fermer"
	},
	"active": {
		"ENG": "Active",
		"FRA": "Active"
	},
	"inactive": {
		"ENG": "Inactive",
		"FRA": "Inactive"
	},
	"requestTimeout": {
		"ENG": "Request Timeout",
		"FRA": "Request Timeout"
	},
	"requestTimeoutRenewal": {
		"ENG": "Request Timeout Renewal",
		"FRA": "Request Timeout Renewal"
	},
	"servicePort": {
		"ENG": "Service Port",
		"FRA": "Service Port"
	},
	"enterServicePortNumber": {
		"ENG": "Enter the Service port number",
		"FRA": "Enter the Service port number"
	},
	"serviceName": {
		"ENG": "Service Name",
		"FRA": "Service Name"
	},
	"done": {
		"ENG": "Done",
		"FRA": "Done"
	},
	"aPILabel": {
		"ENG": "API Label",
		"FRA": "API Label"
	},
	"aPIGroup": {
		"ENG": "API Group",
		"FRA": "API Group"
	},
	"label": {
		"ENG": "Label",
		"FRA": "Label"
	},
	"route": {
		"ENG": "Route",
		"FRA": "Route"
	},
	"addNewAPI": {
		"ENG": "Add New API",
		"FRA": "Add New API"
	},
	"author": {
		"ENG": "Author",
		"FRA": "Author"
	},
	"createdOn": {
		"ENG": "Created On",
		"FRA": "Created On"
	},
	"lastModified": {
		"ENG": "Last Modified",
		"FRA": "Last Modified"
	},
	"version": {
		"ENG": "Version",
		"FRA": "Version"
	},
	"contentBuilder": {
		"ENG": "Content Builder",
		"FRA": "Content Builder"
	},
	"environments": {
		"ENG": "Environments",
		"FRA": "Environments"
	},
	"cluster": {
		"ENG": "Cluster",
		"FRA": "Cluster"
	},
	"tenantSpecific": {
		"ENG": "Tenant Specific",
		"FRA": "Tenant Specific"
	},
	"created": {
		"ENG": "Created",
		"FRA": "Created"
	},
	"multiTenancy": {
		"ENG": "Multi-Tenancy",
		"FRA": "Multi-Tenancy"
	},
	"ok": {
		"ENG": "OK",
		"FRA": "OK"
	},
	"awareness": {
		"ENG": "Awareness",
		"FRA": "Awareness"
	},
	"deploy": {
		"ENG": "Deploy",
		"FRA": "Deploy"
	},
	"removeAPI": {
		"ENG": "Remove API",
		"FRA": "Remove API"
	},
	"extKeyRequired": {
		"ENG": "External Key Required",
		"FRA": "External Key Required"
	},
	"port": {
		"ENG": "Port",
		"FRA": "Port"
	},
	//api-permission
	"restrictAccessSelectedApis": {
		"ENG": "Restrict Access to Selected Apis",
		"FRA": "Restrict Access to Selected Apis"
	},
	"public": {
		"ENG": "public",
		"FRA": "public"
	},
	"private": {
		"ENG": "private",
		"FRA": "private"
	},
	"owner": {
		"ENG": "owner",
		"FRA": "owner"
	},
	"administrator": {
		"ENG": "administrator",
		"FRA": "administrator"
	},
	"InheritFromService": {
		"ENG": "inherit from service",
		"FRA": "inherit from service"
	},
	"warningMsgAcl": {
		"ENG": "Your system still uses the old ACL configuration; Your ACL has been cloned to all environments listed below and will be migrate once you click SAVE!",
		"FRA": "Your system still uses the old ACL configuration; Your ACL has been cloned to all environments listed below and will be migrate once you click SAVE!"
	},
	//list-applications
	"availableApplications": {
		"ENG": "Available Applications",
		"FRA": "Available Applications"
	},
	"areYouSureRemoveSelectedApp": {
		"ENG": "Are you sure you want to remove the selected application",
		"FRA": "Are you sure you want to remove the selected application"
	},
	"removeApplication": {
		"ENG": "Remove Application",
		"FRA": "Remove Application"
	},
	"ACLUpdatedSuccessfully": {
		"ENG": "ACL Updated Successfully.",
		"FRA": "ACL Updated Successfully."
	},
	"activate": {
		"ENG": "Activate",
		"FRA": "Activer"
	},
	"deactivate": {
		"ENG": "Deactivate",
		"FRA": "Désactiver"
	},
	//list-keys
	"tenantApplicationKeys": {
		"ENG": "Tenant Application Keys",
		"FRA": "Tenant Application Keys"
	},
	"addkey": {
		"ENG": "Add New Key",
		"FRA": "Ajouter New key"
	},
	"areYouSureYouWantDeleteKey": {
		"ENG": "Are you sure you want to delete this key?",
		"FRA": "Are you sure you want to delete this key?"
	},
	"removeKey": {
		"ENG": "Remove Key",
		"FRA": "Remove Key"
	},
	"environment": {
		"ENG": "Environment",
		"FRA": "Environment"
	},
	"editServiceConfiguration": {
		"ENG": "Edit Service Configuration",
		"FRA": "Edit Service Configuration"
	},
	"emptyServiceConfiguration": {
		"ENG": "Empty Service Configuration",
		"FRA": "Empty Service Configuration"
	},
	"displayKeyInformation": {
		"ENG": "Display Key Information",
		"FRA": "Display Key Information"
	},
	"keyEnvironmentConfiguration": {
		"ENG": "Key Environment Configuration",
		"FRA": "Key Environment Configuration"
	},
	"externalKeys": {
		"ENG": "External Keys",
		"FRA": "External Keys"
	},
	"addNewApplicationExternalKey": {
		"ENG": "Add New Application External Key",
		"FRA": "Add New Application External Key"
	},
	"areYouSureWantRemoveExternalKey": {
		"ENG": "Are you sure you want to remove this external key?",
		"FRA": "Are you sure you want to remove this external key?"
	},
	"removeExternalKey": {
		"ENG": "Remove External Key",
		"FRA": "Remove External Key"
	},
	"addNewApplicationKey": {
		"ENG": "Add New Application Key",
		"FRA": "Add New Application Key"
	},
	"removeApplicationKey": {
		"ENG": "Remove Application Key",
		"FRA": "Remove Application Key"
	},
	"updateKeyConfiguration": {
		"ENG": "Update Key Configuration",
		"FRA": "Update Key Configuration"
	},
	"addNewExternalKey": {
		"ENG": "Add New External Key",
		"FRA": "Add New External Key"
	},
	"externalKeyValue": {
		"ENG": "External Key Value",
		"FRA": "External Key Value"
	},
	"editExternalKey": {
		"ENG": "Edit External Key",
		"FRA": "Edit External Key"
	},
	//service-name
	"minimize": {
		"ENG": "Minimize",
		"FRA": "Minimize"
	},
	"expand": {
		"ENG": "Expand",
		"FRA": "Expand"
	},
	//list-oauth-users
	"tenantoAuthUsers": {
		"ENG": "Tenant oAuth Users",
		"FRA": "Tenant oAuth Users"
	},
	"authorization": {
		"ENG": "Authorization",
		"FRA": "Authorization"
	},
	"editoAuthUser": {
		"ENG": "Edit oAuth User",
		"FRA": "Edit oAuth User"
	},
	"removeoAuthUser": {
		"ENG": "Remove oAuth User",
		"FRA": "Remove oAuth User"
	},
	"oAuthSecret": {
		"ENG": "oAuth Secret",
		"FRA": "oAuth Secret"
	},
	"formSecretPlaceHolder": {
		"ENG": "SECRET...",
		"FRA": "SECRET..."
	},
	"formSecretToolTip": {
		"ENG": "Enter Tenant oAuth Secret.",
		"FRA": "Enter Tenant oAuth Secret."
	},
	"areYouSureRemoveUser": {
		"ENG": "Are you sure you want to remove this user?",
		"FRA": "Are you sure you want to remove this user?"
	},
	"formProductPackageDescriptionTooltip": {
		"ENG": "Enter a description explaining the usage of this application",
		"FRA": "Enter a description explaining the usage of this application"
	},
	"formTTLToolTip": {
		"ENG": "Pick a time to live value for this package.",
		"FRA": "Pick a time to live value for this package."
	},
	"formEnvCodeTooltip": {
		"ENG": "Enter the environment code for the key configuration.",
		"FRA": "Enter the environment code for the key configuration."
	},
	"configuration": {
		"ENG": "Configuration",
		"FRA": "Configuration"
	},
	"formConfigToolTip": {
		"ENG": "Enter the application key configuration.",
		"FRA": "Enter the application key configuration."
	},
	"formExpDateTooltip": {
		"ENG": "Pick the Expiry Date of the external key. If empty, the key will not expire",
		"FRA": "Pick the Expiry Date of the external key. If empty, the key will not expire"
	},
	"device": {
		"ENG": "Device",
		"FRA": "Device"
	},
	"formDeviceTooltip": {
		"ENG": "Specify the Device Security for the external key.",
		"FRA": "Specify the Device Security for the external key."
	},
	"formGEOToolTip": {
		"ENG": "Specify the GEO Security for the external key.",
		"FRA": "Specify the GEO Security for the external key."
	},
	"key": {
		"ENG": "key",
		"FRA": "key"
	},
	"externalKey": {
		"ENG": "External Key",
		"FRA": "External Key"
	},
	"expiryDate": {
		"ENG": "Expiry Date",
		"FRA": "Expiry Date"
	},
	"dashboardAccess": {
		"ENG": "Proxy Support",
		"FRA": "Proxy Support"
	},
	"edit": {
		"ENG": "Edit",
		"FRA": "Modifié"
	},
	"delete": {
		"ENG": "Delete",
		"FRA": "Effacer"
	},
	"remove": {
		"ENG": "Remove",
		"FRA": "Remove"
	},
	"passwordConfirmFieldsNotMatch": {
		"ENG": "Password and Confirm Password fields do not match",
		"FRA": "Password and Confirm Password fields do not match"
	},
	"operate": {
		"ENG": "Operate",
		"FRA": "Operate"
	},
	"noRecordsFound": {
		"ENG": "No Records Found.",
		"FRA": "Aucun Records Found"
	},
	"All": {
		"ENG": "All",
		"FRA": "Tous"
	},
	"None": {
		"ENG": "None",
		"FRA": "Aucun"
	},
	"moreAction": {
		"ENG": "More Action",
		"FRA": "Plus Action"
	},
	"clearGridSearch": {
		"ENG": "Clear",
		"FRA": "Éffacé"
	},
	"searchGrid": {
		"ENG": "Search",
		"FRA": "Recherche"
	},
	"previous": {
		"ENG": "Previous",
		"FRA": "Précédent"
	},
	"next": {
		"ENG": "Next",
		"FRA": "Suivant"
	},
	"first": {
		"ENG": "First",
		"FRA": "Début"
	},
	"last": {
		"ENG": "Last",
		"FRA": "Dernière"
	},
	"select": {
		"ENG": "Select",
		"FRA": "Sélectionner"
	},
	"displaying": {
		"ENG": "Displaying",
		"FRA": "Résultats"
	},
	"of": {
		"ENG": "of",
		"FRA": "de"
	},
	"expiredSessionPleaseLogin": {
		"ENG": "Session expired. Please login.",
		"FRA": "Session expired. Please login."
	},
	"language": {
		"ENG": "Language",
		"FRA": "language"
	},
	"manage": {
		"ENG": "Manage",
		"FRA": "Manage"
	},
	"back2List": {
		"ENG": "Back to List",
		"FRA": "Back to List"
	},
	"preview": {
		"ENG": "Preview",
		"FRA": "Preview"
	},
	"missingRequiredFields": {
		"ENG": "Missing Required Fields",
		"FRA": "Missing Required Fields"
	},
	"enterAPImethodProceed": {
		"ENG": "Enter the API method to proceed",
		"FRA": "Entrer la méthode de l'API pour continuer"
	},
	"enterAPItypeProceed": {
		"ENG": "Enter the API type to proceed",
		"FRA": "Entrer le type de l'API pour continuer"
	},
	"enterErrorCodeProceed": {
		"ENG": "Enter the error code(s) to proceed",
		"FRA": "Entrer les codes des erreurs pour continuer"
	},
	"checkInputrequiredProceed": {
		"ENG": "Check if the input is required or not",
		"FRA": "Vérifier si ce paramètre est requise ou non"
	},
	"enterInputlistingPropertiesProceed": {
		"ENG": "Enter the input listing properties to proceed",
		"FRA": "Entrer les propriétés de la liste de donnée pour continuer"
	},
	"entertypeForUIProceed": {
		"ENG": "Enter the UI type to proceed",
		"FRA": "Entrer le type du UI pour continuer"
	},
	"enterAPIlabelProceed": {
		"ENG": "Enter the API label to proceed",
		"FRA": "Entrer l'étiquette de l'API pour continuer"
	},
	"enterAPIgroupProceed": {
		"ENG": "Enter the API group to proceed",
		"FRA": "Entrer le groupe de l'API pour continuer"
	},
	"enterAPIgroupMainProceed": {
		"ENG": "Enter the API groupMain to proceed",
		"FRA": "Entrer le group principal de l'API pour continuer"
	},
	"enterAPIinputsProceed": {
		"ENG": "Enter the API inputs to proceed",
		"FRA": "Entrer les paramètres de l'API pour continuer"
	},
	"pleaseinsertErrorCode": {
		"ENG": "Please insert your error code(s)",
		"FRA": "Prière d'insérer votre code"
	},
	"progress": {
		"ENG": "Progress",
		"FRA": "Progress"
	}
};