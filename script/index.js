const body = document.getElementsByTagName('body')[0];
const html = document.documentElement;
const header = document.getElementsByTagName('header')[0];
const down = document.getElementsByClassName('down')[0];
const nav = header.getElementsByTagName('nav')[0];
const nav_span = header.getElementsByTagName('span')[1];
const after = window.getComputedStyle(nav_span,'::after');
const hamburger = header.getElementsByClassName('hamburger')[0];
const vertNav = document.getElementById('vertNav');
const vert_A = vertNav.getElementsByTagName('a');

const sections = document.querySelectorAll('section');

// for(i of sections){
// 	console.log(i.getBoundingClientRect())

// 	window[i.id] = i;
// }

let loaded = [];

const between = (x, min, max)=>{
	return x >= min && x <= max;
}

const min_height = 50;
let prevScroll = 0;
let isScrolling;

const scrollPlay = ()=>{

	let bodyHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
	let windowHeight = window.innerHeight;
	let currentScroll = window.pageYOffset;
	let bg_opacity = ((currentScroll - windowHeight) + (min_height * 3)) / 100;
	let down_opacity = (300 - currentScroll) / 300;

	if(bg_opacity <= 0){bg_opacity = 0;}
	if(bg_opacity >= 1){bg_opacity = 1;}

	if(down_opacity <= 0){down_opacity = 0;}
	if(down_opacity >= 1){down_opacity = 1;}

	if(windowHeight - currentScroll >= min_height){
		header.style.height = `${windowHeight - currentScroll}px`;
		vertNav.style.top = `${windowHeight - currentScroll}px`;
		vertNav.style.height = `calc(100vh - ${windowHeight - currentScroll}px)`;
	}else{
		header.style.height = `${min_height}px`;
		vertNav.style.top = `${min_height}px`;
		vertNav.style.height = `calc(100vh - ${min_height}px)`;
	}

	header.style.backgroundImage = `linear-gradient(rgba(26,78,255,${bg_opacity}), rgba(29,126,253,${bg_opacity}))`;
	header.style.boxShadow = `0px 2px 3px rgba(0,0,0,${bg_opacity / 2})`;
	down.style.opacity = down_opacity;
	nav_span.style.transform = `scale(${1.6 - (0.6 * bg_opacity)})`;
	hamburger.style.transform = `scale(${bg_opacity})`;
	hamburger.classList.remove('active');
	vertNav.classList.remove('active');

	/* * * * */

	// if((currentScroll > windowHeight * 2) && (currentScroll > prevScroll)){
	// 	//scrolling down
	// 	document.getElementById('top').classList.add('shown')
	// }else{
	// 	//scrolling up
	// 	document.getElementById('top').classList.remove('shown')
	// }

	if(currentScroll < prevScroll){
		// console.log('up')
		document.getElementById('top').classList.add('shown')
	}else{
		// console.log('down')
		document.getElementById('top').classList.remove('shown')
	}

	if((currentScroll < windowHeight * 2) || (currentScroll + windowHeight * 1.5 >= bodyHeight)){
		// console.log('end bit')
		document.getElementById('top').classList.remove('shown')
	}

	prevScroll = currentScroll;

	/* * * * */

	for(i of loaded){
		i.classList.add('scrolling');
	}
	clearTimeout(isScrolling);
	isScrolling = setTimeout(()=>{
		for(i of loaded){
			i.classList.remove('scrolling');
		}
		// for(i of sections){
		// 	if(i.getBoundingClientRect().top <= windowHeight / 2 - 200 && i.getBoundingClientRect().bottom > windowHeight / 2){
		// 		console.log(i.id)
		// 		window.location.hash = i.id;
		// 	}
		// }
	},125)

	/* * * * */
	// console.clear()
	// document.querySelectorAll('a').classList.remove('selected')
	// for(i of sections){
	// 	if(i.getBoundingClientRect().top <= windowHeight / 2 - 200 && i.getBoundingClientRect().bottom > windowHeight / 2){
	// 		console.log(i.id)
	// 		// window.location.hash = i.id;
	// 		document.querySelectorAll('a').classList.remove('selected')
	// 		document.querySelectorAll(`a[href="#${i.id}"]`)[0].classList.add('selected');
	// 		console.log(document.querySelectorAll(`a[href="#${i.id}"]`)[0])
	// 	}
	// }
};

document.addEventListener('scroll',scrollPlay)
scrollPlay();

hamburger.addEventListener('click',()=>{
	hamburger.classList.toggle('active');
	vertNav.classList.toggle('active');
});

for(i of vert_A){
	i.addEventListener('click',()=>{
		hamburger.classList.remove('active');
		vertNav.classList.remove('active');
	})
}

/*******************************************************************/

document.getElementById('top').addEventListener('click',()=>{
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
})

/*******************************************************************/

const containers = document.querySelectorAll(".container.inner");

for(let i = 0; i < containers.length; i++){
	
	containers[i].id = `container_${i}`;

	window[`loader_${i}`] = document.getElementById(`container_${i}`).getElementsByClassName('loader')[0];
	window[`iframe_${i}`] = document.getElementById(`container_${i}`).getElementsByTagName('iframe')[0];

	window[`iframe_${i}`].addEventListener('load',()=>{
		window[`iframe_${i}`].style.opacity = 1;
		// window[`loader_${i}`].remove();
		window[`loader_${i}`].classList.add('loaded');

		loaded = document.querySelectorAll(".loader.loaded");
	})
}