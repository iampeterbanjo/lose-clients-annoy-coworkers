// tests
var Test = Test || function() {
	return {
		assert: function(test, description) {
			var status = !!test ? 'PASSED' : 'FAILED';
	
			console[ !!test ? 'info': 'warn' ]('%s : %s', status, description);
		}
		, appHasGetNextFunction: function() {
			var app = new App();
			
			this.assert(typeof app.getNext == 'function', 'app has getNext function');
		}
		, callingGetNextWithoutALimitReturnsMinusOne: function () {
			var app = new App();
			
			this.assert(app.getNext() == -1, 'calling app.getNext() without a limit returns minus one');
		}
		, appGetNextFunctionStartsAtZero: function() {
			var app = new App({limit: 2});
			
			this.assert(app.getNext() === 0, 'app.getNext() starts at zero');
		}
		, callingGetNextTwiceReturnsOne: function() {
			var app = new App({limit: 5}), count;
			
			app.getNext();
			count = app.getNext();
			
			this.assert(count === 1, 'calling app.getNext() twice returns 1');
		}
		, reachingTheAppLimitGetNextReturnsZero: function() {
			// imagine there are 3 items in the array..
			var	max = 3
					, app = new App({limit: max});
			
			while(max--){
				app.getNext();
			}
			
			// ..when app.getNext is called the fourth time..
			this.assert(app.getNext() === 0, 'reaching the app limit, get next returns zero');
		}
	}
}

if ((window.outerHeight - window.innerHeight) > 100) {
	console.log('** Docked inspector open >> running tests << **');
	
	var test = new Test();
	
	test.assert(true, 'sanity check');
	
	test.appHasGetNextFunction();
	test.callingGetNextWithoutALimitReturnsMinusOne();
	test.appGetNextFunctionStartsAtZero();
	test.callingGetNextTwiceReturnsOne();
	test.reachingTheAppLimitGetNextReturnsZero();
}
