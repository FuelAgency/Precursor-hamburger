//	Hamburger navigation
'use strict';

(function( window ){

	var MobileSidebar = function(){},
		proto = MobileSidebar.prototype;

	proto.init = function(){
		var _this = this;

		//	Set the toggled class
		_this.toggled = false;

		//	DOM objects
		_this.dom = {
			toggle: 	document.querySelectorAll('.sidebar-toggle')[0],
			html: 		document.getElementsByTagName('html')[0],
			sidebar: 	document.querySelectorAll('.sidebar-overlay')[0]
		};

		//	Add the click handler
		_this.addEvent(_this.dom.toggle, 'click', _this.toggle);
		_this.addEvent(_this.dom.sidebar, 'click', _this.close);

	};

	proto.toggle = function(){
		var _this = mobileSidebar;

		//	Flip the toggle
		_this.toggled = _this.toggled ? false : true;

		//	Define the proto action
		var	_action = _this.toggled ? 'add' : 'remove';

		//	Apply the class
		_this.handleClass(_action, _this.dom.html, 'sidebar-visible');
	};

	proto.close = function(){
		var _this = mobileSidebar;

		//	falsify the toggle
		_this.toggled = false;

		//	Apply the class
		_this.handleClass('remove', _this.dom.html, 'sidebar-visible');
	};

	proto.handleClass = function(command, obj, _class) {
		/** 
		 * @param {Obj, String}
		 * Adds, removes and destroys all classes
		 */
		var cmd = {
			remove: function(){
				var newClassName = "", i;
				var classes = obj.className.split(" ");
				for(i = 0; i < classes.length; i++) {
					if(classes[i] !== _class) {
						newClassName += classes[i] + " ";
					}
				}
				obj.className = newClassName.replace(/(^[\s]+|[\s]+$)/g, '');
			},
			add: function(){
				obj.className += " " + _class;
			},
			removeAll: function(){
				obj.className = "";
			}
		};
		return cmd[command]();
	};

	proto.addEvent = function(obj, event, func, callback){
		/** 
		 * @param {Object, String, String, Args}
		 * Adds an event listener to the object, and exports
		 * its action to the action function
		 */ 
		var _this = this,
			scope = obj,
			args = arguments;

		event = event.split('|');

		if (!obj.addEventListener) {
		    obj.attachEvent(event[1], function(){
		    	func.apply(this, args);
		    	return callback;
		    });
		} else {
		    obj.addEventListener(event[0], function(ev){
				func.apply(this, args);
				return callback;
			});
		}
	};

	proto.isMobile = function(){
		return navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry)/) ? true : false;
	};

	var mobileSidebar = new MobileSidebar();

	// ------- TRANSPORT -------- //
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define("mobileSidebar", mobileSidebar );
	} else {
		// Browser Global
		window.mobileSidebar = mobileSidebar;
	}
	
})( this );