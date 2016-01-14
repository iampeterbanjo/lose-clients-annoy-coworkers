console.log('ready');

// get a url and call success or error functions
function get(url, success, error) {
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
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// set state of the app
function changeState(newState) {
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

function go() {
	changeState('LOADING');
	
	get('/data/how-to.json',
	function(text){
		changeState('DONE');
		
		var data = JSON.parse(text),
				offense = document.getElementById('offense'),
				random = data[getRandomInt(0, data.length -1)],
				description = random.description !== '' ? random.description : '';
		
		localStorage['last'] = description;
				
		offense.innerHTML = description;
	});
}

document.getElementById('offense').innerHTML = localStorage['last'];

go();

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('refresh').addEventListener('click', go);
	changeState('DONE');
	
	document.getElementById('make-suggestion').addEventListener('click', function(){
		changeState('SUGGESTION');
	});
	
	document.getElementById('close-suggestion').addEventListener('click', function(){
		changeState('CLOSE-SUGGESTION');
	});
	// setInterval(go, 2000);
});
