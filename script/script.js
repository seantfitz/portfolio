const getQueryParams = (qs)=>{
	qs = qs.split('+').join(' ');

	let params = {},
	tokens,
	re = /[?&]?([^=]+)=([^&]*)/g;

	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	}
	return params;
};

/*****/
// localStorage.clear();
/*****/

// const theGroups = [
// 	'design',
// 	'infographic',
// 	'interactive',
// 	'video',
// 	'about',
// ];

let active;
let selected;
let query = getQueryParams(document.location.search)

$('.sideMenu .navBtns button').on('click',(e)=>{
	$('.active, #preview').removeClass('active');
	$(`#${e.target.name}, button[name=${e.target.name}]`).addClass('active');
	active = $('.section.active')[0].id;
	$(`.topMenu select`).val(active);
	$('.infoText').html('');
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;

	if(typeof(Storage) !== "undefined"){
		localStorage.setItem('active',active);
	}
	// $(document).unbind();
	// $('main').addClass(`bg_${active}`)
});

$('.topMenu select').on('change',(e)=>{
	$(`button[name=${e.target.value}]`).click();
});

$('.thumb').on('click',(e)=>{

	selected = e.target.name;

	switch(active){

		case 'infographic':
		$('#preview').html(`
			<div class="item">
				<div class="cycle" id="prev" title="Previous"></div>
				<div class="cycle" id="back" title="Close"></div>
				<div class="cycle" id="next" title="Next"></div>
				<img class="infographic" draggable="false" src="infographic/${selected}.jpg">
			</div>
			<div class="infoText"></div>
		`)

		$('.infoText').html(`
			<div class="h1">${details[active][selected]['title']}</div>
			<p>${details[active][selected]['description']}</p>
			<span>${details[active][selected]['disclaimer']}</span>
		`)
		break;

		case 'interactive':

		$('#preview').html(`
			<div class="item">
				<div class="cycle" id="prev" title="Previous"></div>
				<div class="cycle" id="back" title="Close"></div>
				<div class="cycle" id="next" title="Next"></div>
				<div class="containerOuter" id="container_${selected}">
					<div class="containerInner">
						<iframe frameborder="0" scrolling="no" src="${details[active][selected]['url']}"></iframe>
					</div>	
				</div>
			</div>
			<div class="infoText"></div>
		`)

		$('.infoText').html(`
			<div class="h1">${details[active][selected]['title']}</div>
			<p>${details[active][selected]['description']}</p>
			<span>${details[active][selected]['disclaimer']}</span>
		`)
		break;

		case 'video':
		$('#preview').html(`
			<div class="item">
				<div class="cycle" id="prev" title="Previous"></div>
				<div class="cycle" id="back" title="Close"></div>
				<div class="cycle" id="next" title="Next"></div>
				<div class="containerOuter">
					<video id="vid" controls="" controlslist="nodownload" prelolad="none" poster="video/${selected}.jpg">
						<source src="video/${selected}.mp4" type="video/mp4">
					</video>
				</div>
			</div>
			<div class="infoText"></div>
		`)

		$('.infoText').html(`
			<div class="h1">${details[active][selected]['title']}</div>
			<p>${details[active][selected]['description']}</p>
			<span>${details[active][selected]['disclaimer']}</span>
		`)
		break;

		case 'design':
		let ext = 'jpg';
		switch(selected){
			case 'bilt':
			case 'neonsign':
			ext = 'gif'
		}
		$('#preview').html(`
			<div class="item">
				<div class="cycle" id="prev" title="Previous"></div>
				<div class="cycle" id="back" title="Close"></div>
				<div class="cycle" id="next" title="Next"></div>
				<img class="design" draggable="false" src="design/${selected}.${ext}">
			</div>
			<div class="infoText"></div>
		`)

		$('.infoText').html(`
			<div class="h1">${details[active][selected]['title']}</div>
			<p>${details[active][selected]['description']}</p>
		`)
		break;
	}

	$('.cycle').unbind().on('click',cycle);
	$('.section').removeClass('active');
	$('#preview').addClass('active');
	// $(document).unbind().on("keydown", keyPress);
});

// const keyPress = (e)=>{
// 	switch(e.keyCode){
// 		case 37: $('#prev').click(); break;
// 		case 39: $('#next').click(); break;
// 		case 27: $('#back').click(); break;
// 	}
// };

const cycle = (e)=>{
	
	let thisButton = e.target.id;

	let theGroups = Object.keys(details);
	let groupsLength = theGroups.length;
	let selectedIndex = theGroups.indexOf(active);
	
	let thisGroup = Object.keys(details[active]);
	let groupLength = thisGroup.length;
	let thisIndex = thisGroup.indexOf(selected);
		
	switch(true){
		case thisButton == 'prev' && thisIndex == 0:

		if(selectedIndex == 0){
			selectedIndex = groupsLength - 1;
		}else{
			selectedIndex --;
		}
		thisGroup = Object.keys(details[theGroups[selectedIndex]])
		thisIndex = thisGroup.length - 1;
		break;

		case thisButton == 'next' && thisIndex == groupLength - 1:
		
		if(selectedIndex == groupsLength - 1){
			selectedIndex = 0;
		}else{
			selectedIndex ++;
		}
		thisGroup = Object.keys(details[theGroups[selectedIndex]])
		thisIndex = 0
		break;

		case thisButton == 'prev':
		thisIndex --
		break;

		case thisButton == 'next':
		thisIndex ++
		break;

		case thisButton == 'back':
		$(`.sideMenu button[name=${active}]`).click();
		return false;
	}

	active = theGroups[selectedIndex]
	$(`.sideMenu button`).removeClass('active');
	$(`.sideMenu button[name=${active}]`).addClass('active');
	$(`.topMenu select`).val(active);
	$(`.thumb[name=${thisGroup[thisIndex]}`).click();
};

$(document).ready(()=>{
	if(typeof(Storage) !== "undefined" && localStorage['active']){
		active = localStorage['active'];
	}else if(!!query.l){
		active = theGroups[query.l];
	}else{
		active = Object.keys(details)[0];
	};
	$('.section, button').removeClass('active');
	$(`#${active}, button[name=${active}]`).addClass('active');
	$(`.topMenu select`).val(active);
})

$(document).bind("contextmenu",function(e) {
	return false;
});