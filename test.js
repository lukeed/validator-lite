import test from 'ava';
import fn from './lib';

test('title', t => {
	t.is(fn('unicorns'), 'unicorns & rainbows');
});
