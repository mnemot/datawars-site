loaded = false;

elemCardFrame = document.getElementById('cardframe');
elemCardContainer = document.getElementById('cardcontainer');
elemMenuFrame = document.getElementById('menuframe');
elemMenuContainer = document.getElementById('menucontainer');

valSeries = getQueryVariable("s")
valCard = getQueryVariable("i");
valAction = getQueryVariable("t");
valSorting = getQueryVariable("o");

elemCardFrame.addEventListener("load", function() {
	elemMenuFrame.style.height = elemMenuFrame.contentDocument.body.scrollHeight + 'px';
	if (loaded) { return; }
	loaded = true;
	var to = Array(document.getElementById('toPrev'), document.getElementById('toNext'), document.getElementById('toSrch'));
	if (valSeries && valCard) {
		if (elemCardFrame.src != "s" + valSeries + valCard + ".html") { elemCardFrame.src = "s" + valSeries + valCard + ".html"; }
		setCookie("card", valCard);
		setCookie("series", valSeries);
		var i = Array(valSeries, (parseInt(valCard) - 1).toString().padStart(3, '0'), (parseInt(valCard) + 1).toString().padStart(3, '0')), u;
		u = Array("index.html?s=" + i[0] + "&i=" + i[1] + "&t=prev", "index.html?s=" + i[0] + "&i=" + i[2] + "&t=prev");
		if (valSorting) {
			u[0] += "&o=" + valSorting;
			u[1] += "&o=" + valSorting;
			if (valSorting != "number") {
				to[0].style.display = "none";
				to[1].style.display = "none";
			}
		}
		to[0].setAttribute('href', u[0]);
		to[1].setAttribute('href', u[1]);
		if (valCard == "001") { to[0].style.display = "none"; }
		else if (valCard == "060") { to[1].style.display = "none"; }
	}
	else {
		to[0].style.display = "none";
		to[1].style.display = "none";
		to[2].style.display = "none"; 
	}
	if (valSorting) {
		setCookie("sorting", valSorting);
		console.log("starting");
		if (elemMenuFrame.src != "by" + valSorting + ".html") { elemMenuFrame.src = "by" + valSorting + ".html"; }
		console.log("done");
	}
}, false);

