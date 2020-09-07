let nav = (e)=>{
	
}

// const queryStrings = {
// 	"covid":{
// 		"str":"covid"//4:3 - min-width: 700px; max-width: 900px;
// 	},
// 	"election":{
// 		"str":"election"//1000 * 704
// 	},
// 	"tennis":{
// 		"str":"tennis"//600 * 800
// 	},
// 	"tdf":{
// 		"str":"tdf"//min-width: 670px - 1:1, or not...
// 	},
// 	"memory":{
// 		"str":"memory"//630 / 744 = 84.67741935483871
// 	},
// 	"racing":{
// 		"str":"racing"//max-height: 900px - 4:3, or not...
// 	},
// 	"season":{
// 		"str":"season"//490 * 800
// 	},
// 	"grandfinal":{
// 		"str":"grandfinal"//790 * 650
// 	},
// 	"nzelection":{
// 		"str":"nzelection"//700 * 750
// 	}
// }

const queryStrings = {
	"covid": "//hosted.aap.com.au/interactives/covid19/index.html",
	"election": "//hosted.aap.com.au/interactives/election_2019/houseofreps/index.html",
	"tennis": "//hosted.aap.com.au/interactives/tennis_20/index.html?t=au",
	"tdf": "//hosted.aap.com.au/interactives/tourdefrance_2016/index.html",
	"memory": "//hosted.aap.com.au/interactives/memory/index.html?g=harry",
	"racing": "//hosted.aap.com.au/interactives/springcarnival2019/index.html?domain=aap&meeting=mel",
	"season": "//hosted.aap.com.au/interactives/nrl_19/index.html",
	"grandfinal": "//hosted.aap.com.au/interactives/grandfinal_19/nrl/index.html",
	"nzelection": "//hosted.aap.com.au/interactives/nzelection2014/stateoftheparliament/index.html",
}

const thumbPanels = document.getElementsByClassName('thumbnails');
let thumbsArray = [];

for(let i = 0; i < thumbPanels.length; i++){
	thumbsArray.push(thumbPanels[i].id);
	if(i == 0){
		$('nav').append(`<button class="navBtn active" name="${thumbPanels[i].id}">${thumbPanels[i].id.replace(/_/g,'&nbsp;')}</button>`);
	}else{
		$('nav').append(`<button class="navBtn" name="${thumbPanels[i].id}">${thumbPanels[i].id.replace(/_/g,'&nbsp;')}</button>`);
	}
}


$('.navBtn').on('click',(e)=>{
	let matched = false;

	$('video').trigger('pause');

	$('#preview').removeClass('leftZero');//.html('');

	$('.active').removeClass('active').addClass('previousActive');
	for(let i in thumbsArray){
		if(thumbsArray[i] == e.target.name){//it's the selected one
			matched = true;
			$(`#${thumbsArray[i]}`).addClass('animateLeft active').removeClass('offLeft previousActive');
		}else{
			if(!matched){//comes before the selected one, move it to the left
				if($(`#${thumbsArray[i]}`).hasClass('previousActive')){//it was the last one selected, animate it off screen
					$(`#${thumbsArray[i]}`).addClass('animateLeft offLeft').removeClass('previousActive');
				}else{//it was NOT on screen already, shift it without animation
					$(`#${thumbsArray[i]}`).removeClass('animateLeft previousActive').addClass('offLeft');
				}
			}else{//comes after the selected one, move it off screen to the right
				if($(`#${thumbsArray[i]}`).hasClass('previousActive')){//it was the last one selected, animate it off screen
					$(`#${thumbsArray[i]}`).addClass('animateLeft').removeClass('previousActive offLeft');
				}else{//it was NOT on screen already, shift it without animation
					$(`#${thumbsArray[i]}`).removeClass('animateLeft previousActive offLeft');
				}
			}
		}
	}

	$('.navBtn').removeClass('active');
	$(e.target).addClass('active');
})

$('.thumb').on('click',(e)=>{
	$('.thumbnails').removeClass('animateLeft').addClass('offLeft');
	$('.thumbnails.active').removeClass('active').addClass('animateLeft');
	$('#preview').addClass('leftZero');

	let section = $(e.target).parent()[0].id;

	switch(section){

		case 'interactive':
		$('#preview').html(`
			<div class="containerOuter" id="container_${e.target.name}">
				<div class="containerInner">
					<div class="loading_icon"></div>
					<iframe frameborder="0" scrolling="no" src="${queryStrings[e.target.name]}"></iframe>
				</div>
				<div class="infoBtn"></div>
				<div class="infoText">
					I'm baby tumeric pitchfork tattooed heirloom photo booth portland thundercats lumbersexual locavore cray letterpress poutine. Salvia master cleanse pabst, DIY four loko chia shaman direct trade tousled flexitarian vegan. Activated charcoal prism microdosing intelligentsia, photo booth celiac authentic yuccie vaporware deep v. Selvage man bun pug, deep v hella vice photo booth hexagon beard. Listicle blog aesthetic artisan direct trade wayfarers vaporware. IPhone fanny pack tumblr pok pok jean shorts echo park. Art party occupy tousled tacos dreamcatcher.
				</div>
				<button class="back">back</button>
			</div>
		`)
		break;

		case 'video':
		$('#preview').html(`
			<div class="containerOuter" style="width: 704px; height: 396px;">
				<video id="vid" controls="" controlslist="nodownload" prelolad="none" poster="video/${e.target.name}.jpg" width="704" height="396">
					<source src="video/${e.target.name}.mp4" type="video/mp4">
				</video>
				<div class="infoBtn"></div>
				<div class="infoText">
					I'm baby tumeric pitchfork tattooed heirloom photo booth portland thundercats lumbersexual locavore cray letterpress poutine. Salvia master cleanse pabst, DIY four loko chia shaman direct trade tousled flexitarian vegan. Activated charcoal prism microdosing intelligentsia, photo booth celiac authentic yuccie vaporware deep v. Selvage man bun pug, deep v hella vice photo booth hexagon beard. Listicle blog aesthetic artisan direct trade wayfarers vaporware. IPhone fanny pack tumblr pok pok jean shorts echo park. Art party occupy tousled tacos dreamcatcher.
				</div>
				<button class="back">back</button>
			</div>
		`)
		break;
	}

	$('.back').unbind().on('click',(e)=>{
		$('.navBtn.active').click()
	})
	$('.infoBtn').unbind().on('click',(e)=>{
		if($('.infoText').hasClass('active')){
			$('.infoText').removeClass('active');//.html('');
			$('.containerOuter').removeClass('wide');
		}else{
			$('.infoText').addClass('active');
			$('.containerOuter').addClass('wide');
		}
	})
})