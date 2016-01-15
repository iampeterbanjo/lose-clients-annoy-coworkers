console.log('ready');

var App = App || function() {
	
	return {
		previousOffense: -1
		// get a url and call success or error functions
		, get: function(url, success, error) {
			var request = new XMLHttpRequest();
			request.open('GET', url, true);

			request.onload = function() {
				if(request.status >= 200 && request.status < 400) {
					success(request.responseText);
				}
			}

			request.onerror = function() {
				error(request.status, request.responseText);
			}

			request.send();
		}
		// return random integer between range
		, getRandomInt: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		// set state of the app
		,  changeState: function(newState) {
			var body = document.querySelector('body'),
					state = newState;

			switch (state) {
				case 'LOADING':
					body.classList.add('loading');
					body.classList.remove('loaded');
					break;
				case 'DONE':
					body.classList.remove('loading');
					body.classList.add('loaded');
					break;
				case 'SUGGESTION':
					body.classList.add('suggestion');
					body.classList.remove('close-suggestion');
					break;
				case 'CLOSE-SUGGESTION':
					body.classList.remove('suggestion');
					body.classList.add('close-suggestion');
					break;
			}
		}
		// make new request for data and show it
		, reloadData: function() {
			var self = this;
			
			self.changeState('LOADING');
			
			self.get('data/how-to.json',
			function(text){
				self.changeState('DONE');
				
				var data = JSON.parse(text),
						offense = document.getElementById('offense'),
						random = data[self.getRandomInt(0, data.length -1)],
						description = random.description !== '' ? random.description : '';
				
				localStorage['last'] = description;
						
				offense.innerHTML = description;
			});
		}
		, getNext: function() {
			return this.previousOffense += 1;
		}
	}
}

document.addEventListener('DOMContentLoaded', function() {
	var app = new App();
	
	document.getElementById('offense').innerHTML = localStorage['last'] || 'Loading..';
	
	app.reloadData();
	
	document.getElementById('refresh').addEventListener('click', app.reloadData);
	app.changeState('DONE');
	
	document.getElementById('make-suggestion').addEventListener('click', function(){
		app.changeState('SUGGESTION');
	});
	
	document.getElementById('close-suggestion').addEventListener('click', function(){
		app.changeState('CLOSE-SUGGESTION');
	});
	// setInterval(go, 2000);
});
