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

(function() {
	var display = document.getElementById('disp')
	var menu = document.getElementById('menu');
	var container = document.getElementById('menucontainer');
	container.style.height = 464;
	menu.style.height = 1536;
	var series = getQueryVariable("s"), card = getQueryVariable("i");
	if (series && card) {
		var scroll = Math.max(0, 5 + ((parseInt(card) * 25.5) - container.offsetHeight));
		display.src = "s" + series + card + ".html";
		container.scrollTo(0, scroll);
		console.log(scroll);
	}
	else { document.getElementById('disp').src = "search.html"; }
})();