elemCardFrame = document.getElementById('cardframe');
elemCardContainer = document.getElementById('cardcontainer');
elemMenuFrame = document.getElementById('menuframe');
elemMenuContainer = document.getElementById('menucontainer');

valSeries = getQueryVariable("s")
valCard = getQueryVariable("i");
valAction = getQueryVariable("t");
valSorting = getQueryVariable("o");

function showCard(e) { document.getElementById("disp").src = "s" + e.target.id + ".html"; }

/*
https://github.com/jfriend00/docReady
*/
(function(funcName, baseObj) {
    "use strict";
    // The public function name defaults to window.docReady
    // but you can modify the last line of this function to pass in a different object or method name
    // if you want to put them in a different namespace and those will be used instead of 
    // window.docReady(...)
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;
    
    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }
    
    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }
    
    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function(callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        // IE only safe when readyState is "complete", others safe when readyState is "interactive"
        if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);
// modify this previous line to pass in your own method name 
// and object for the method to be attached to


elemCardFrame.contentWindow.addEventListener("load", function(e) {
	elemMenuFrame.style.height = elemMenuFrame.contentWindow.document.body.scrollHeight + 'px';
	var to = Array(document.getElementById('toPrev'), document.getElementById('toNext'), document.getElementById('toSrch'));
	if (valSeries && valCard) {
		elemCardFrame.src = "s" + valSeries + valCard + ".html";
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
		elemCardFrame.src = "search.html";
		to[0].style.display = "none";
		to[1].style.display = "none";
		to[2].style.display = "none"; 
	}
	if (valSorting) {
		setCookie("sorting", valSorting);
		elemMenuFrame.src = "by" + valSorting + ".html";
	}
});

