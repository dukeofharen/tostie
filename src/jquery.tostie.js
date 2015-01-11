/*
* Tostie jQuery toast messages 0.1
* Project by Duco Winterwerp
* Licensed under MIT
Copyright (c) 2015 Duco Winterwerp

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
$.fn.tostie = function(options) {
	var opts = $.extend( {}, $.fn.tostie.defaults, options );
	var inOutType = "";
	
	switch(opts.inOutType){
		case "fade":
			inOutType = "fade";
			break;
		default:
		case "slide":
			inOutType = "slide";
			break;
	}
	
	switch(opts.type){
		case "success":
			type = "success";
			break;
		case "error":
			type = "error";
			break;
		case "warning":
			type = "warning";
			break;
		default:
		case "notice":
			type = "notice";
			break;
	}

	var $elem = $('.tostie-toast');
	var removeMessage = function(){
		opts.beforeClose();
		var removeFunction = function(){
			msgDiv.remove();
			opts.afterClose();
		};
		if(inOutType == "slide"){
			msgDiv.slideUp(opts.inOutDuration, removeFunction);
		}
		else if(inOutType == "fade"){
			msgDiv.fadeOut(opts.inOutDuration, removeFunction);
		}
	};
	if($elem.length == 0){
		$elem = $('<div class="tostie-toast"></div>');
		$('body').prepend($elem);
	}
	
	var msgDiv = $('<div class="'+type+'"><a href="" class="toast-close">'+opts.message+'</a></div>');
	msgDiv.css({display:'none'});
	$elem.append(msgDiv);
	
	if(inOutType == "slide"){
		msgDiv.slideDown(opts.inOutDuration);
	}
	else if(inOutType == "fade"){
		msgDiv.fadeIn(opts.inOutDuration);
	}
	
	setTimeout(function(){
		removeMessage();
	}, opts.toastDuration);
	msgDiv.find(".toast-close").click(function(){
		removeMessage();
		return false;
	});
};

$.fn.tostie.defaults = {
	message: "",
	type: "notice",
	toastDuration: 3000,
	inOutDuration: 300,
	inOutType: "slide",
	beforeClose: function(){},
	afterClose: function(){}
};