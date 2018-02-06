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