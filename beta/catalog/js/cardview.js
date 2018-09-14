function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function showCard(e) {
	document.getElementById("disp").src = "s" + e.target.id + ".html";
}

function cookieSave(name, val) { document.cookie = name.toString() + "=" + val.toString(); }

function setCookie(cname, cvalue) {
    document.cookie = cname.toString() + "=" + cvalue.toString();
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

(function() {
	var display = document.getElementById('disp')
	var menu = document.getElementById('menu');
	var container = document.getElementById('menucontainer');
	container.style.height = 464;
	container.addEventListener('scroll', function(e) { setCookie("sidebar-yscroll", e.target.scrollTop); console.log(e.target.scrollTop); });
	menu.style.height = 1536;
	var series = getQueryVariable("s"), card = getQueryVariable("i");
	if (series && card) {
		var scroll;
		if (getCookie("sidebar-yscroll") != "") {
			scroll = getCookie("sidebar-yscroll");
		}
		else { scroll = Math.max(0, 5 + ((parseInt(card) * 25.5) - container.offsetHeight)); }
		display.src = "s" + series + card + ".html";
		container.scrollTo(0, scroll);
		console.log(scroll);
	}
	else { document.getElementById('disp').src = "search.html"; }
})();