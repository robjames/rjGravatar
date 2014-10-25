/* global angular,CryptoJS *//* https://github.com/robjames/rjGravatar */
	angular.module('rjGravatar', [])
	.run(function(){
        var md5 = document.createElement('script'); md5.type = 'text/javascript'; md5.async = true;
        md5.src = 'https://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(md5, s);
	})
	.directive('rjGravatar', [function() {
		return {
			restrict:'A',
			link: function(scope, element, attrs){
				function getAttr(str, attr, def){
					var val = (!!attrs[attr]) ? attrs[attr].replace(/\s/, '') : def || '';
					return (!val) ? '' : '&' + str + '=' + val;
				}
				
				var getGrav = function(email){
					var email = attrs.rjGravatar;
					if(!email) return;
	
					var size = getAttr('s','size');
					var defaultImage = encodeURI(getAttr('d','default'));
					var forceDefaultImage = getAttr('f','force');
					var rating = getAttr('r','rating');
	
					var options = size+defaultImage+forceDefaultImage+rating;
					options = options.replace('&', '?');
					(function waiter(){
						if(!window.CryptoJS){ return setTimeout(waiter, 37); }
						var hash = CryptoJS.MD5(email);
						var src = 'https://secure.gravatar.com/avatar/'+hash.toString()+'/'+options;
						element.attr('src', src);
					}());
				};
				
				attrs.$observe('rjGravatar', function(newVal){
					getGrav(newVal);
				});
				
			}
		};
	}]);