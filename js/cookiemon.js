function setCookie(key, value) { document.cookie = key + "=" + value; }
function getCookie(key) {
	var name, this_cookie, crumbs, i;
	name = key + "=";
	this_cookie = decodeURIComponent(document.cookie);
	crumbs = this_cookie.split(';');
	for (i = 0; i < crumbs.length; i++) {
		var crumb = crumbs[i];
		while (crumb.charAt(0) == ' ') { crumb = crumb.substring(1); }
		if (crumb.indexOf(name) == 0) { return crumb.substring(name.length, crumb.length); }
	}
	return "";
}