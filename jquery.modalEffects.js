//Button Trigger
(function($){
	var $this = new Object();
  	var methods = {
		init : function(options) {
			$this =  $.extend({}, this, methods);
        	$this.searching = false;
        	$this.o = new Object();
  			
        	var defaultOptions = {
        		overlaySelector: '.md-overlay',
           	closeSelector: '.md-close',
           	classAddAfterOpen: 'md-show',
           	modalAttr: 'data-modal',
           	perspectiveClass: 'md-perspective',
           	perspectiveSetClass: 'md-setperspective',
           	afterOpen: function(button, modal) {
            	//打开模态框后
            	openCallback = button.attr('data-openevent');
					    if(typeof(openCallback) != undefined){
						    eval(openCallback);
					    }
    				
           	},
           	afterClose: function(button, modal) {
            	//d关闭模态框后
            	closeCallback = button.attr('data-closeevent');
            	if(typeof(closeCallback) != undefined){
            		eval(closeCallback);
            	}
            	
           	}
        	};
        	
        	$this.o = $.extend({}, defaultOptions, options);
        	$this.n = new Object();
       	
       	
        	var overlay = $($this.o.overlaySelector);
        	$(this).click(function() {
        		var modal = $('#' + $(this).attr($this.o.modalAttr)),
        			close = $($this.o.closeSelector, modal);
          	var el = $(this);       	
      		$(modal).addClass($this.o.classAddAfterOpen);
      		/* overlay.removeEventListener('click', removeModalHandler );
      		overlay.addEventListener('click', removeModalHandler ); */
          	$(overlay).on('click', function () {
             	removeModalHandler();
             	$this.afterClose(el, modal);
             	$(overlay).off('click');
          	});
      		if($(el).hasClass($this.o.perspectiveSetClass) ) {
      			setTimeout(function() {
      				$(document.documentElement).addClass($this.o.perspectiveClass);
      			}, 25 );
      		}
          	
          	$this.afterOpen(el, modal);
        		setTimeout(function() {
            	modal.css({'perspective':'none'});
            	
            	//3D Blur Bug Fix
            	if(modal.height() % 2 != 0){modal.css({'height':modal.height() + 1});}
            	
          	}, 500 ); 
          	
        		function removeModal(hasPerspective) {
        			$(modal).removeClass($this.o.classAddAfterOpen);
             	modal.css({'perspective':'1300px'});
        			if(hasPerspective) {
        				$(document.documentElement).removeClass($this.o.perspectiveClass);
        			}
        		}
        		
        		function removeModalHandler() {
        			removeModal($(el).hasClass($this.o.perspectiveSetClass)); 
        		}
        		
        		$(close).off('click').on('click', function(ev) {
        			ev.stopPropagation();
        			removeModalHandler();
            	$this.afterClose(el, modal);
        		});
        		
        	});
       	
     	},
     	afterOpen: function (button, modal) {
        	$this.o.afterOpen(button, modal);
     	},
     	afterClose: function (button, modal) {
        	$this.o.afterClose(button, modal);  
     	}
  	};
	
  	$.fn.modalEffects = function(method) {
    	if (methods[method] ) {
      	return methods[method].apply(this, Array.prototype.slice.call(arguments, 1 ));
    	} else if (typeof method === 'object' || ! method ) {
      	return methods.init.apply(this, arguments );
    	} else {
      	$.error('Method ' +  method + ' does not exist on jQuery.modalEffects' );
    	}    
  	
  	};
	function is_touch_device(){
		return !!("ontouchstart" in window) ? 1 : 0;
	}
})(jQuery );
