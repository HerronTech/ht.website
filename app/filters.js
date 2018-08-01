"use strict";
app.filter('filterPicker', function ($filter) {
	return function (value, filterName) {
		if (Array.isArray(filterName) && filterName.length === 0) {
			return value;
		}
		return $filter(filterName)(value);
	}
});

app.filter('prettyLocalDate', function () {
	return function (text) {
		if (!text) {
			return '';
		}
		return new Date(text).toLocaleString();
	};
});

app.filter('fulldate', function () {
	return function (text) {
		if (!text) {
			return '';
		}
		return new Date(text).toISOString();
	};
});

app.filter('toTrustedSrc', ['$sce', function ($sce) {
	return function (src) {
		return $sce.trustAsResourceUrl(src);
	};
}]);

app.filter('toTrustedHtml', ['$sce', function ($sce) {
	return function (text) {
		return $sce.trustAsHtml(text);
	};
}]);

app.filter('trimmed', ['$sce', function ($sce) {
	function hed(text) {
		return text.replace(/(<([^>]+)>)/ig, "").toString();
	}

	return function (value) {
		value = hed(value);
		if (value.length > 170) {
			value = value.slice(0, 170) + " ...";
		}
		return value;
	};
}]);

app.filter('object', ['$sce', function ($sce) {
	function stringifyCamelNotation(value) {
		if (translation[value] && translation[value][LANG]) {
			return translation[value][LANG];
		}
		return value.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
			return str.toUpperCase();
		});
	}

	function iterateAndPrintObj(obj) {
		var string = '';
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				if (Array.isArray(obj[i])) {
					string += "<b>" + stringifyCamelNotation(i) + "</b>: <br/>";
					var t = [];
					for (var e = 0; e < obj[i].length; e++) {
						if (typeof(obj[i][e]) === 'object') {
							if (e === 0) {
								t.push('<span class="noWrap"> &nbsp; ' + iterateAndPrintObj(obj[i][e]).replace(/<br \/>/g, " ") + '</span>');
							}
							else {
								t.push('<br/><span class="noWrap"> &nbsp; ' + iterateAndPrintObj(obj[i][e]).replace(/<br \/>/g, " ") + '</span>');
							}
						}
						else {
							t.push(obj[i][e]);
						}
					}
					string += t + "<br />";
				}
				else if (typeof(obj[i]) === 'object') {
					string += iterateAndPrintObj(obj[i]);
					//string += (obj[i]);
				}
				else {
					if (i !== '$$hashKey') {
						string += "<b>" + stringifyCamelNotation(i) + "</b>:&nbsp;" + obj[i] + "<br />";
					}
				}
			}
		}
		return string;
	}

	return function (obj) {
		if (typeof(obj) === 'object') {
			var txt = iterateAndPrintObj(obj);
			return $sce.trustAsHtml(txt);
		}
		else {
			return obj;
		}
	};

}]);