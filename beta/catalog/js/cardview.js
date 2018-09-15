elemCardFrame = document.getElementById('cardframe');
elemCardContainer = document.getElementById('cardcontainer');
elemMenuFrame = document.getElementById('menuframe');
elemMenuContainer = document.getElementById('menucontainer');

valSeries = getQueryVariable("s")
valCard = getQueryVariable("i");
valAction = getQueryVariable("t");

function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function updateDimensions() { elemMenuFrame.style.height = elemMenuFrame.contentWindow.document.body.scrollHeight + 'px'; }

function showCard(e) {
	document.getElementById("disp").src = "s" + e.target.id + ".html";
}

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
	setTimeout(update, 100);
}

(function() {
	update();
	var to = Array(document.getElementById('toPrev'), document.getElementById('toNext'), document.getElementById('toSrch'));
	setCookie("currentAction", valAction);
	if (valSeries && valCard) {
		setCookie("currentCard", valCard);
		setCookie("currentSeries", valSeries);
		elemCardFrame.src = "s" + valSeries + valCard + ".html";
		var i = Array(valSeries, (parseInt(valCard) - 1).toString().padStart(3, '0'), (parseInt(valCard) + 1).toString().padStart(3, '0'));
		to[0].setAttribute('href', 'index.html?s=' + i[0] + "&i=" + i[1] + "&t=prev");
		to[1].setAttribute('href', 'index.html?s=' + i[0] + "&i=" + i[2] + "&t=next");
		if (valCard == "001") { to[0].style.display = "none"; }
		else if (valCard == "060") { to[1].style.display = "none"; }
	}
	else {
		elemCardFrame.src = "search.html";
		to[0].style.display = "none";
		to[1].style.display = "none";
		to[2].style.display = "none"; 
	}
})();