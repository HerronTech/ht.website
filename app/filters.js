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