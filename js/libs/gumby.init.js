// initialize Gumby
window.Gumby.init();

// if AMD return Gumby object to define
if(typeof define == "function" && define.amd) {
	define(window.Gumby);
}
