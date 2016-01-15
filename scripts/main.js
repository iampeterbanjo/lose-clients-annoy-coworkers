console.log('ready');

var App = App || function(args) {
	var _ = this;
	_.options = args || {};
	_.next = -1;
	_.limit = _.options.limit || -1;
	_.data;
	
	return {
		// get a url and call success or error functions
		get: function(url, success, error) {
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
		, display: function(text) {
			document.getElementById('offense').innerHTML = text;
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
		, getData: function() {
			return JSON.parse(localStorage['data']);
		}
		, saveData: function(data) {
			localStorage['limit'] = this.getLimit();
			localStorage['data'] = JSON.stringify(data);
		}
		, showNextDescription: function() {
			var count = this.getNext();

			this.display(this.getData()[count].description);
			
			localStorage['count'] = count;
		}
		, showLastDescripition: function() {
			var data = localStorage['data']
					, count = localStorage['count'];
					
			if(data && count) {
				data = JSON.parse(data);
				
				if(data[count] && data[count].description) {
					this.display(data[count].description);
				}
			}
		}
		, checkFirstTime: function() {
			if(!localStorage['count']) {
				this.showNextDescription();
			}
		}
		// make new request for data and show it
		, reloadData: function() {
			var self = this;
			
			self.changeState('LOADING');
			
			self.get('data/how-to.json',
			function(json){
				var data = JSON.parse(json);
				
				self.changeState('DONE');
				self.setLimit(data.length);
				self.saveData(data);
				
				self.checkFirstTime();
			});
		}
		// assumes we are working with a zero based
		// array index
		, getNext: function() {
			if(_.limit !== -1) {
				_.next = _.next + 1 > _.limit - 1 ? 0 : _.next + 1;
			}
			
			return _.next;
		}
		, getLimit: function() {
			return _.limit; 
		}
		, setLimit: function(newLimit) {
			_.limit = newLimit;
		}
	}
}

document.addEventListener('DOMContentLoaded', function() {
	var app = new App();
	
	app.showLastDescripition();
	app.reloadData();
	
	document.getElementById('refresh').addEventListener('click', function() {
		app.showNextDescription();
	});
	
	document.getElementById('make-suggestion').addEventListener('click', function(){
		app.changeState('SUGGESTION');
	});
	
	document.getElementById('close-suggestion').addEventListener('click', function(){
		app.changeState('CLOSE-SUGGESTION');
	});
	// setInterval(go, 2000);
});
