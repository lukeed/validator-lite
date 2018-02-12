// Default Test Methods
// -- if (condition is true) then (no error) else (error msg)

export function min(val, arg) {
	return (val.length < arg) && `Please enter at least ${arg} characters`;
}

export function max(val, arg) {
	return (val.length > arg) && `Please enter ${arg} characters or less`;
}

export function between(val, a, b) {
	return min(val, a) || max(val, b);
}

export function equals(val, arg) {
	return (val !== arg) && 'These values do not match';
}

export function email(val) {
	// return /^(?:\w+\-?\.?\+?)*\w+@(?:\w+\.\-?)+\w+$/.test(val) ? false : 'Please provide a valid email address';
	return !/^[a-z0-9+_-]+(?:\.[a-z0-9+_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(val) && 'Please provide a valid email address';
}

export function url(val) {
	// requires http(s):// to start
	return !/((https?):\/\/)+(www\.)?[^\s\.]+\.[^\s]{2,}/gi.test(val) && 'Please provide a valid URL.';
}

export function password(val, arg) {
	let min = arg.min || 8;
	if (val.length < min) return 'Password must be at least ' + min + ' characters';
	if (arg.upp && !/^(?=.*[A-Z]).*$/.test(val)) return 'Password must contain at least one uppercase letter';
	if (arg.low && !/^(?=.*[a-z]).*$/.test(val)) return 'Password must contain at least one lowercase letter';
	if (arg.sym && !/^(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]).*$/.test(val)) return 'Password must contain at least one symbol';
	return false;
}
