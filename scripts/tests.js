// tests
function assert(test, description) {
	var status = !!test ? 'PASSED' : 'FAILED';
	
	console[ !!test ? 'info': 'warn' ]('%s : %s', status, description);
}

assert(true, 'sanity check');

