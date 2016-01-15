// tests
function assert(test, description) {
	var status = !!test ? 'PASSED' : 'FAILED';
	
	console[ !!test ? 'info': 'warn' ]('%s : %s', status, description);
}

assert(true, 'sanity check');

function testAppHasGetNextFunction() {
	var app = new App();
	assert(typeof app.getNext == 'function', 'app has getNext function');
}
testAppHasGetNextFunction();
