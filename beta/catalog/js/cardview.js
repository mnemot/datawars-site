elemCardFrame = document.getElementById('cardframe');
elemCardContainer = document.getElementById('cardcontainer');
elemMenuFrame = document.getElementById('menuframe');
elemMenuContainer = document.getElementById('menucontainer');

valSeries = getQueryVariable("s")
valCard = getQueryVariable("i");

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

function updateDimensions() {
	elemMenuContainer.addEventListener('scroll', function(e) { setCookie("sidebar-yscroll", e.target.scrollTop); });
	elemMenuFrame.style.height = elemMenuFrame.contentWindow.document.body.scrollHeight + 'px';
	/*elemCardFrame.style.width = elemCardContainer.innerWidth + 'px';
	elemCardFrame.style.height = elemCardFrame.contentWindow.document.body.scrollHeight + 'px';*/
	var scroll;
	if (getCookie("sidebar-yscroll") != "") {
		scroll = getCookie("sidebar-yscroll");
	}
	else if (valSeries && valCard) { scroll = Math.max(0, 5 + ((parseInt(valCard) * 25.5) - elemMenuContainer.offsetHeight)); }
	elemMenuContainer.scrollTo(0, scroll);
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

function update() {
	updateDimensions();
	window.requestAnimationFrame(function(){setTimeout(update, 1000);});
}

(function() {
	update();
	if (valSeries && valCard) {
		elemCardFrame.src = "s" + valSeries + valCard + ".html";
	}
	else { elemCardFrame.src = "search.html"; }
})();