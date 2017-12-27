import assert from 'assert';
import lib from '../src';

describe('library', function () {
	it('task', function () {
		document.body.innerHTML = window.__html__['index.html'];
		assert(lib());
	});
});
