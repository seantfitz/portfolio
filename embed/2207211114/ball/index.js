(()=>{
const create_UUID = ()=>{
	let dt = new Date().getTime();
	let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=>{
		let r = (dt + Math.random()*16)%16 | 0;
		dt = Math.floor(dt/16);
		return (c=='x' ? r :(r&0x3|0x8)).toString(16);
	});
		
	return uuid.replace(/[0-9]/, Math.random().toString(36).replace(/[^a-z]+/g, '')[0]);
}

let container = document.currentScript.parentNode;
let UUID = create_UUID();
container.id = UUID;

document.head.innerHTML += `
	<style type="text/css" class="graphics-container">
		.content{
			overflow: unset;
		}
		#${UUID}{
			position: relative;
			width: 100vw;
			height: calc(100vh - 50px);
			display: flex;
			margin-bottom: 20px;
			margin-left: calc(340px - 50vw);
			justify-content: center;
			align-items: center;
			overflow: hidden;
			font-family: 'Benton-Sans';
		}
		#${UUID} .background-container{
			position: absolute;
			width: 110%;
			height: 110%;
			background-image: url('jpg/59.jpeg');
			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;
		}
		#${UUID} .ball-container{
			width: 100%;
			height: 100%;
			z-index: 0;
		}
		#${UUID} .no-scroll{
			touch-action: none;
		}
		#${UUID} .card-container{
			position: absolute;
			pointer-events: none;
			max-width: 300px;
			max-height: 400px;
			width: 100vw;
			top: 50px;
			right: 50px;
			bottom: 10px;
		}
		#${UUID} .card{
			position: absolute;
			max-width: 300px;
			max-height: 400px;
			width: 100%;
			height: 100%;
			background-color: #efefef;
			border-radius: 10px;
			overflow: hidden;
			top: 0px;
			right: -350px;
			transform: rotateZ(-180deg) rotateY(90deg);
			pointer-events: auto;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			box-shadow: rgba(0,0,0,0.75) -10px 10px 10px;
			border: solid 2px #efefef;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			-ms-box-sizing: border-box;
			box-sizing: border-box;
			background-size: cover;
			background-position: top;
			background-repeat: no-repeat;
			background-image: url('jpg/59.jpeg');
		}
		#${UUID} .card .text-box{
			background-color: rgba(0, 0, 0, 0.5);
			-webkit-backdrop-filter: blur(5px);
			-moz-backdrop-filter: blur(5px);
			-ms-backdrop-filter: blur(5px);
			backdrop-filter: blur(5px);
			color: #fff;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			-ms-box-sizing: border-box;
			box-sizing: border-box;
			display: flex;
		}
		#${UUID} .card .text-box.player-name{
			padding: 10px;
			font-size: 20px;
			justify-content: space-between;
			align-items: center;
			line-height: 1;
		}
		#${UUID} .card .text-box .small-text{
			font-size: 14px;
		}
		#${UUID} .card .text-box .flag{
			width: auto;
			height: 30px;
		}
		#${UUID} .card .text-box.player-stats{
			flex-direction: column;
			text-align: center;
		}
		#${UUID} .card .text-box.player-stats .info{
			border-bottom: solid 1px #fff;
			width: fit-content;
			margin: 0 auto;
			padding: 5px;
		}
		#${UUID} .card .text-box .honours{
			font-size: 14px;
			line-height: 16px;
			margin-block-start: 0.5em;
			margin-block-end: 0.5em;
			padding-inline-start: 0px;
			list-style-type: none;
		}
		#${UUID} .card-nav{
			position: absolute;
			width: 40px;
			height: 40px;
			background-color: #5bc4f1;
			color: #fff;
			display: none;
			justify-content: center;
			align-items: center;		
			font-size: 20px;
			font-weight: bold;
			border-radius: 50%;
			cursor: pointer;
			top: 50%;
			margin-top: -20px;
			z-index: 2;
			pointer-events: auto;
		}
		#${UUID} .card-prev{
			left: 0px;
			margin-left: -20px;
		}
		#${UUID} .card-next, .card-hide{
			right: 0px;
			margin-right: -20px;
		}
		#${UUID} .card-hide{
			top: 0px;
		}
		@media (max-width: 1320px){
			#${UUID}{
				margin-left: calc(340px - 50vw);
			}
		}
		@media (max-width: 1200px){
			#${UUID}{
				margin-left: calc(-16.75vw - 25px);
				height: calc(100vh - 70px);
			}
		}
		@media (max-width: 767px){
			#${UUID}{
				margin-left: calc(-2.5vw - 16px);
				height: calc(100vh - 102px);
			}
			#${UUID} .card-container{
				top: 20px;
				left: 50%;
				margin-left: -150px;
			}
			#${UUID} .card-hide{
				margin-top: -15px;
				right: 5px;
			}
		}
		@media (max-width:  479px){
			#${UUID}{
				margin-left: -25px;
			}
		}
		@media (max-width: 340px){
			#${UUID} .card-container{
				width: 90vw;
				right: unset;
				left: unset;
				margin: 0 auto;
			}
			#${UUID} .card-prev{
				left: 5px;
			}
			#${UUID} .card-next{
				right: 5px;
			}
		}
	</style>
	<script src="script/three.min.js"></script>
	<script src="script/GLTFLoader.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.0/gsap.min.js"></script>
`;

container.innerHTML = `
	<div class="background-container"></div>
	<div class="ball-container"></div>
	<div class="card-container">
		<div class="card-nav card-prev player-info"></div>
		<div class="card-nav card-next player-info"></div>
		<div class="card-nav card-hide player-info"></div>
	</div>
`

window.addEventListener('load',()=> {

let current_player = 0;
let this_card = null;
let prev_card = null;
let card_shown = false;

const backgroundContainer = container.querySelector(`.background-container`);
const ballContainer = container.querySelector(`.ball-container`);
const cardContainer = container.querySelector(`.card-container`);

const renderer = new THREE.WebGLRenderer({
	antialias: true,
	autoSize: true,
	alpha: true
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setClearColor( 0x000000, 0 );

const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 1000);
const spotLight = new THREE.SpotLight( 0xffffff );
const scene = new THREE.Scene();
const raycaster = new THREE.Raycaster()
const sceneMeshes = new Array()

let ball;

let ballX = 0;
let ballY = 0.25;
let ballZ = 0;

let z_zoom_out = 1.5;
let z_zoom_in = 1.125;
let y_zoom = 0.25;

if(window.innerWidth <= 720){
	z_zoom_out = 2;
	z_zoom_in = 1.5;
	y_zoom = 0.5;
}

let camX = 0;
let camY = y_zoom;
let camZ = z_zoom_out;

let moving = true;
let velocity = {x:0,y:0};

let grabbed = false;
let animating = false;

let inertia = false;
let resetting = false;

let onDown = null;

const oscillateParams = {
	w: 0.0025,
	A: 0,
	phase: 0
};

let t = 0;
let oscillation = 0;

let dir_y = 'neg';
let dur_y = 1;
let rate_y = 0;

const pi2 = Math.PI * 2;

let previousTouch;

const players = {
	"cristiano_ronaldo": {
		"name": "Cristiano Ronaldo",
		"country": "Portugal",
		"DOB": "05/02/1985",
		"current_club": "Manchester United (TBC)",
		"world_cup_appearances": "5 (2006, 2010, 2014, 2018, 2022)",
		"honours": [
			"2016 European Championship winner",
			"5 x Ballon d’Or winner",
			"5 x UEFA Champions League winner"
		],
		"x":1,
		"y":3.75
	},
	"lionel_messi": {
		"name": "Lionel Messi",
		"country": "Argentina",
		"DOB": "24/06/1987",
		"current_club": "PSG",
		"world_cup_appearances": "5 (2006, 2010, 2014, 2018, 2022)",
		"honours": [
			"2021 Copa America winner",
			"7 x Ballon d’Or winner",
			"4 x UEFA Champions League winner"
		],
		"x":0.3,
		"y":3.75
	},
	"neymar": {
		"name": "Neymar",
		"country": "Brazil",
		"DOB": "05/02/1992",
		"current_club": "PSG",
		"world_cup_appearances": "3 (2014, 2018, 2022)",
		"honours": [
			"1 x UEFA Champions League winner",
			"2 x La Liga champion",
			"4 x Ligue 1 champion",
			"Copa America runner-up 2021"
		],
		"x":0.3,
		"y":2.75
	},
	"kevin_de_bruyne": {
		"name": "Kevin de Bruyne",
		"country": "Belgium",
		"DOB": "28/06/1991",
		"current_club": "Manchester City",
		"world_cup_appearances": "3 (2014, 2018, 2022)",
		"honours": [
			"2 x Premier League player of the year",
			"4 x Premier League winner",
			"3rd 2018 World Cup"
		],
		"x":0.3,
		"y":1.75
	},
	"kylian_mbappe": {
		"name": "Kylian Mbappe",
		"country": "France",
		"DOB": "20/12/1998",
		"current_club": "PSG",
		"world_cup_appearances": "2 (2018, 2022)",
		"honours": [
			"2018 World Cup winner",
			"3 x Ligue 1 player of the year",
			"4 x Ligue 1 champion"
		],
		"x":0.3,
		"y":0.75
	},
	"sadio_mane": {
		"name": "Sadio Mane",
		"country": "Senegal",
		"DOB": "10/04/1992",
		"current_club": "Bayern Munich",
		"world_cup_appearances": "2 (2018, 2022)",
		"honours": [
			"2021 Africa Cup of Nations winner",
			"PFA Fans' player of the year 2019-20",
			"1 x Premier League golden boot"
		],
		"x":0.3,
		"y":4.75
	},
	"ansu_fati": {
		"name": "Ansu Fati",
		"country": "Spain",
		"DOB": "31/10/2002",
		"current_club": "Barcelona",
		"world_cup_appearances": "1 (2022)",
		"honours": [
			"1 x Copa del Rey winner"
		],
		"x":3.7,
		"y":0.25
	},
	"harry_kane": {
		"name": "Harry Kane",
		"country": "England",
		"DOB": "28/07/1993",
		"current_club": "Tottenham Hotspur",
		"world_cup_appearances": "2 (2018, 2022)",
		"honours": [
			"2021 European Championship runner-up",
			"3 x Premier League golden boot winner",
			"Champions League runner-up 2019"
		],
		"x":3.7,
		"y":1.25
	},
	"robert_lewandowski": {
		"name": "Robert Lewandowski",
		"country": "Poland",
		"DOB": "21/08/1988",
		"current_club": "Barcelona",
		"world_cup_appearances": "2 (2018, 2022)",
		"honours": [
			"1 x UEFA Champions League winner",
			"10 x Bundesliga winner",
			"7 x Bundesliga top scorer"
		],
		"x":3.7,
		"y":2.25
	},
	"christian_pulisic": {
		"name": "Christian Pulisic",
		"country": "United States",
		"DOB": "18/09/1998",
		"current_club": "Chelsea",
		"world_cup_appearances": "1 (2022)",
		"honours": [
			"1 x UEFA Champions League winner",
			"3 US Soccer male athlete of the year",
			"1 x FIFA Club World Cup winner"
		],
		"x":3.7,
		"y":3.25
	},
	"son_heung_min": {
		"name": "Son Heung-min",
		"country": "South Korea",
		"DOB": "08/07/1992",
		"current_club": "Tottenham Hotspur",
		"world_cup_appearances": "3 (2014, 2018, 2022)",
		"honours": [
			"1 x Premier League golden boot",
			"3 x Tottenham Hotspur player of the year",
			"Champions League runner-up 2019"
		],
		"x":3.7,
		"y":4.25
	},
	"luka_modric": {
		"name": "Luka Modric",
		"country": "Croatia",
		"DOB": "09/09/1985",
		"current_club": "Real Madrid",
		"world_cup_appearances": "4 (2006, 2014, 2018, 2022)",
		"honours": [
			"5 x UEFA Champions League winner",
			"3 x La Liga winner",
			"FIFA World Cup runner-up 2018",
			"2018 Ballon d’Or winner"
		],
		"x":3,
		"y":0.25
	}
}
const player_keys = Object.keys(players);

const getAge = (dateString)=>{//yyyy/mm/dd
	let today = new Date();
	let birthDate = new Date(dateString);
	let age = today.getFullYear() - birthDate.getFullYear();
	let m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

for(let i of player_keys){
	
	let node = players[i];
	let dmy = node['DOB'].split('/');
	let age = getAge(`${dmy[2]}/${dmy[1]}/${dmy[0]}`)

	cardContainer.innerHTML += `
	<div class="player-info card" id="${i}">
		<div class="text-box player-name">
			<div>
				${node['name']}<br><span class="small-text">${node['country']} - Age: ${age}</span>
			</div>
			<img class="flag" title="${node['country']}" src="svg/${node['country'].toLowerCase().replace(/ /g,'_')}.svg">
		</div>
		<div class="text-box player-stats">
			<div class="info">
				<span class="small-text">Club:</span>
				&nbsp;${node['current_club']}
			</div>
			<div class="info">
				<span class="small-text">World Cup Appearances</span>
				<br>
				${node['world_cup_appearances']}
			</div>
			<ul class="honours" id="${i}_honours"></ul>
		</div>
	</div>
	`

	let honours = document.getElementById(`${i}_honours`);

	for(let j of node['honours']){
		let li = document.createElement('li');
		li.innerHTML = `&#8226; ${j}`;
		honours.appendChild(li);
	}
};

function init() {
	// scene.background = new THREE.Color('#fff');
	camera.position.set(camX, camY, camZ);
	camera.lookAt(new THREE.Vector3(ballX,ballY,ballZ))

	renderer.setSize(window.innerWidth, window.innerHeight);
	ballContainer.appendChild(renderer.domElement);

	const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
	ambientLight.intensity = 1.5;
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.25 );
	directionalLight.position.set(0, 1, 0);
	scene.add(directionalLight);

	//Set up shadow properties for the light
	directionalLight.shadow.mapSize.width = 512; // default
	directionalLight.shadow.mapSize.height = 512; // default
	directionalLight.shadow.camera.near = 0.5; // default
	directionalLight.shadow.camera.far = 500; // default

	spotLight.intensity = 1;
	spotLight.position.set(camX - 0, camY + 1, camZ + 10);
	spotLight.distance = camZ * 20
	spotLight.penumbra = 1
	spotLight.decay = camZ * 1
	spotLight.castShadow = true;
	scene.add( spotLight );

	//Load background texture
	// const loader = new THREE.TextureLoader();
	// loader.load('jpg/1024_x_576_football_stadium_image.jpeg' , function(texture){
	// 	scene.background = texture;  
	// });

	const ballLoader = new THREE.GLTFLoader();

	ballLoader.load('gltf2/ball-02.gltf', (gltf) => {

		ball = gltf.scene;
		ball.traverse(function(child){

			if(child.isMesh){
				child.castShadow = true;
				child.receiveShadow = false;
				sceneMeshes.push(child)
			}
		})
		scene.add(ball);
		ball.position.x = ballX;
		ball.position.y = ballY;
		ball.position.z = ballZ;
		ball.castShadow = true;
		spotLight.target = ball;
	});

	animate();
};

function animate() {

	if(ball && ball.rotation && moving){

		if(oscillateParams.A < 1){
			oscillateParams.A += 0.0025;
		}
		if(oscillateParams.A > 1){
			oscillateParams.A = 1;
		}

		if(rate_y < 0.0025){
			rate_y += 0.000025;
		}
		if(rate_y > 0.0025){
			rate_y = 0.0025;
		}

		oscillation = oscillateParams.A * Math.sin(t * oscillateParams.w + oscillateParams.phase);
		t++;

		switch(dir_y){
			case 'neg': ball.rotation.y -= rate_y; break;
			case 'pos': ball.rotation.y += rate_y; break;
		}

		ball.rotation.x = oscillation;
	}else if(ball && ball.rotation && !moving){
		oscillation = oscillation;
		t = t;
	}

	/*velocity/decay*/
	if(velocity.x > 0){
		velocity.x --;
	}
	if(velocity.x < 0){
		velocity.x ++;
	}
	if(velocity.y > 0){
		velocity.y --;
	}
	if(velocity.y < 0){
		velocity.y ++;
	}
	/*velocity/decay*/

	if(ball && !grabbed && !animating){//spinning with inertia

		ball.rotation.y += velocity.x * 0.0005;
		ball.rotation.x += velocity.y * 0.0005;

		if(ball.rotation.x <= 0){
			ball.rotation.x = pi2 + oscillation;
		}
		if(ball.rotation.x > pi2){
			ball.rotation.x = 0;
		}

		if(ball.rotation.y <= 0){
			ball.rotation.y = pi2;
		}
		if(ball.rotation.y > pi2){
			ball.rotation.y = 0;
		}
	}

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
};

const drag = (event)=>{

	ballContainer.style.cursor = 'grabbing';

	ball.rotation.y += event.movementX * 0.0025;
	ball.rotation.x += event.movementY * 0.0025;

	if(ball.rotation.x <= 0){
		ball.rotation.x = pi2;
	}
	if(ball.rotation.x > pi2){
		ball.rotation.x = 0;
	}

	if(ball.rotation.y <= 0){
		ball.rotation.y = pi2;
	}
	if(ball.rotation.y > pi2){
		ball.rotation.y = 0;
	}

	velocity.x = event.movementX;
	velocity.y = event.movementY;

	if(velocity.x < 0){
		dir_y = 'neg'
	}else if(velocity.x > 0){
		dir_y = 'pos'
	}
};

const dragTouch = (e)=>{

	const touch = e.touches[0];

	if(previousTouch){
		velocity.x = Math.round(touch['pageX'] - previousTouch['pageX']);
		velocity.y = Math.round(touch['pageY'] - previousTouch['pageY']);
		ball.rotation.x += velocity.y * 0.0075;
		ball.rotation.y += velocity.x * 0.0075;
	}

	previousTouch = touch;

	if(ball.rotation.x <= 0){
		ball.rotation.x = pi2;
	}
	if(ball.rotation.x > pi2){
		ball.rotation.x = 0;
	}

	if(ball.rotation.y <= 0){
		ball.rotation.y = pi2;
	}
	if(ball.rotation.y > pi2){
		ball.rotation.y = 0;
	}

	if(velocity.x < 0){
		dir_y = 'neg'
	}else if(velocity.x > 0){
		dir_y = 'pos'
	}
}

const touchStart = (e)=>{

	let event = e.targetTouches[0];

	dur_y = 1;

	let mouse = new THREE.Vector2();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	let raycaster = new THREE.Raycaster();
	raycaster.setFromCamera(mouse,camera);
	let intersects = raycaster.intersectObjects(sceneMeshes, false);

	if(intersects.length > 0 && !animating){

		let all_cards = container.querySelectorAll('.player-info');

		all_cards.forEach(card => {
			card.style.pointerEvents = 'none';
		})

		ballContainer.addEventListener('touchmove',dragTouch);
		ballContainer.classList.add('no-scroll');

		moving = false;
		grabbed = true;
		velocity = {x:0,y:0};
		rate_y = 0;

		let material = intersects[0]['object']['material']['name'];
		if(material == 'white_leather'){
			ballContainer.style.cursor = 'grabbing';
			onDown = null;
			camZ = z_zoom_out;
			hideCards();
		}else{
			onDown = material;
		}
	}else{
		onDown = null;
		ballContainer.classList.remove('no-scroll');
	}
};

ballContainer.addEventListener('touchstart',touchStart);

ballContainer.addEventListener('touchend',(e)=>{

	let event = e.changedTouches[0];
	
	previousTouch = null;
	grabbed = false;

	let all_cards = container.querySelectorAll('.player-info');

	ballContainer.removeEventListener('touchmove',dragTouch);
	ballContainer.classList.remove('no-scroll');

	let mouse = new THREE.Vector2();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	let raycaster = new THREE.Raycaster();
	raycaster.setFromCamera(mouse,camera);
	let intersects = raycaster.intersectObjects(sceneMeshes, false);

	if(onDown != null && !animating){
		showCards(onDown);
		camZ = z_zoom_in;
	}	

	if(intersects.length > 0){
		let material = intersects[0]['object']['material']['name'];
		if(material == 'white_leather'){
			ballContainer.style.cursor = 'grab';
		}else{
			ballContainer.style.cursor = 'pointer';
		}
	}

	gsap.to(camera.position,{
		duration:0.5,
		x:camX,
		y: camY,
		z: camZ,
		ease: "back.out(1)",
	})
});

const hideCards = ()=>{

	for(let i of card_nav){
		i.style.display = 'none';
	}

	if(prev_card != null){

		prev_card.style.zIndex = 0;
		gsap.to(prev_card,{
			duration:0.5,
			top:'100vh',
			rotateY:'90deg',
			rotateZ:'-270deg',
			ease:'expo-in',
			onComplete:()=>{
				let all_cards = container.querySelectorAll('.card');

				all_cards.forEach(card => {
					card.style.top = '0px';
					card.style.right = '-350px';
					card.style.transform = 'rotateZ(-180deg) rotateY(90deg)';
				})

				prev_card = null;
			}
		})
	}
	card_shown = false;
};

const showCards = (material)=>{

	moving = false;
	animating = true;

	let node = players[material];
	let to_x = (pi2 / 4) * node['x'];
	let to_y = (pi2 / 5) * node['y'];

	for(let i in player_keys){
		if(material == player_keys[i]){
			current_player = i;
		}
	}
	
	if(Math.abs(ball.rotation.x - (pi2 / 4) * node['x']) > 2){
		if(ball.rotation.x > (pi2 / 4) * node['x']){
			ball.rotation.x -= pi2;
		}else{
			ball.rotation.x += pi2;
		}
	}

	if(Math.abs(ball.rotation.y - (pi2 / 5) * node['y']) > 2){
		if(ball.rotation.y > (pi2 / 5) * node['y']){
			ball.rotation.y -= pi2;
		}else{
			ball.rotation.y += pi2;
		}
	}

	if(Math.abs(to_x - (pi2 / 4) * node['x']) > 2){
		if(to_x > (pi2 / 4) * node['x']){
			to_x -= pi2;
		}else{
			to_x += pi2;
		}
	}

	if(Math.abs(to_y - (pi2 / 5) * node['y']) > 2){
		if(to_y > (pi2 / 5) * node['y']){
			to_y -= pi2;
		}else{
			to_y += pi2;
		}
	}

	gsap.to(ball.rotation,{
		duration:dur_y,
		x:to_x,
		y:to_y,
		ease: "elastic.out(0.5, 0.4)",
		onComplete:()=>{
			animating = false;
		}
	})

	this_card = container.querySelector(`#${material}`);

	if(prev_card != this_card){

		if(prev_card != null && card_shown){
			prev_card.style.zIndex = 0;
			gsap.to(prev_card,{
				duration:0.5,
				// top:'calc(100vh - 200px)',
				top:'100vh',
				rotateY:'90deg',
				rotateZ:'-270deg',
				ease:'expo-in',
				onComplete:()=>{
					prev_card.style.top = '0px';
					prev_card.style.right = '-350px';
					prev_card.style.transform = 'rotateZ(-180deg) rotateY(90deg)';
					prev_card = null;
				}
			})
		}

		this_card.style.top = '0px';
		this_card.style.right = '-350px';
		this_card.style.transform = 'rotateZ(-180deg) rotateY(90deg)';
		this_card.style.zIndex = 1;

		gsap.to(this_card,{
			duration:dur_y,
			right:'0px',
			rotateY:'0deg',
			rotateZ:'0deg',
			ease: "elastic.out(0.5, 0.4)",
			onComplete:()=>{
				prev_card = this_card;
				card_shown = true;

				for(let i of card_nav){
					i.style.display = 'flex';
				}
			}
		})
	}
};

const restartRotation = ()=>{

	hideCards();

	let to_x = 0;

	if(ball.rotation.x > 2){
		to_x = pi2;
	}

	t = 0;
	oscillateParams.A = 0;

	gsap.to(ball.rotation,{
		duration:1,
		x: to_x,
		ease: "expo.out",
		onComplete:()=>{moving = true}
	})

	camZ = z_zoom_out;

	gsap.to(camera.position,{
		duration:0.5,
		x:camX,
		y: camY,
		z: camZ,
		ease: "back.out(1)",
	})
};

ballContainer.addEventListener('mousemove',()=>{

	let mouse = new THREE.Vector2();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	let raycaster = new THREE.Raycaster();
	raycaster.setFromCamera(mouse,camera);
	let intersects = raycaster.intersectObjects(sceneMeshes, false);

	if(intersects.length > 0){

		let material = intersects[0]['object']['material']['name'];

		if(material == 'white_leather'){
			ballContainer.style.cursor = 'grab';
		}else{
			ballContainer.style.cursor = 'pointer';
		}
	}else{
		ballContainer.style.cursor = 'default';
	}

	spotLight.position.set(
		camX + mouse.x * 2,
		camY + mouse.y * 2,
		camZ + 10
	);
});

ballContainer.addEventListener('mousedown',()=>{

	dur_y = 1;

	let mouse = new THREE.Vector2();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	let raycaster = new THREE.Raycaster();
	raycaster.setFromCamera(mouse,camera);
	let intersects = raycaster.intersectObjects(sceneMeshes, false);

	if(intersects.length > 0 && !animating){

		let all_cards = container.querySelectorAll('.player-info');

		all_cards.forEach(card => {
			card.style.pointerEvents = 'none';
		})

		ballContainer.addEventListener('mousemove',drag);

		moving = false;
		grabbed = true;
		velocity = {x:0,y:0};
		rate_y = 0;

		let material = intersects[0]['object']['material']['name'];
		if(material == 'white_leather'){
			ballContainer.style.cursor = 'grabbing';
			onDown = null;
			camZ = z_zoom_out;
			hideCards();
		}else{
			onDown = material;
		}
	}else{
		onDown = null;
	}
});

ballContainer.addEventListener('mouseup',()=>{

	grabbed = false;

	let all_cards = container.querySelectorAll('.player-info');

	ballContainer.removeEventListener('mousemove',drag);

	let mouse = new THREE.Vector2();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	let raycaster = new THREE.Raycaster();
	raycaster.setFromCamera(mouse,camera);
	let intersects = raycaster.intersectObjects(sceneMeshes, false);

	if(onDown != null && !animating){
		showCards(onDown);
		camZ = z_zoom_in;
	}	

	if(intersects.length > 0){
		let material = intersects[0]['object']['material']['name'];
		if(material == 'white_leather'){
			ballContainer.style.cursor = 'grab';
		}else{
			ballContainer.style.cursor = 'pointer';
		}
	}

	gsap.to(camera.position,{
		duration:0.5,
		x:camX,
		y: camY,
		z: camZ,
		ease: "back.out(1)",
	})
});

const card_navigation = (e)=>{

	let x = e.target;

	if(!animating){

		dur_y = 0.5;
		camZ = z_zoom_in;

		gsap.to(camera.position,{
			duration:0.5,
			x:camX,
			y: camY,
			z: camZ,
			ease: "back.out(1)",
		})

		switch(x.classList[1]){
			case 'card-prev':
			current_player --;
			break;

			case 'card-next':
			current_player ++;
			break;

			case 'card-hide':
			restartRotation();
			return false;
		}

		if(current_player < 0){
			current_player = player_keys.length - 1;
		}
		if(current_player > player_keys.length - 1){
			current_player = 0;
		}

		showCards(player_keys[current_player]);
	}
};

const card_nav = container.getElementsByClassName('card-nav');

for(let i of card_nav){
	i.addEventListener('click',card_navigation,false);
};

document.addEventListener('mouseup',()=>{

	let all_cards = container.querySelectorAll('.player-info');

	all_cards.forEach(card => {
		card.style.pointerEvents = 'auto';
	})
});

// document.addEventListener('mousemove',(e)=>{
// 	let offsetX = ((e.offsetX - (window.innerWidth / 2)) / window.innerWidth) * 2;
// 	let offsetY = ((e.offsetY - (window.innerHeight / 2)) / window.innerHeight) * 2;

// 	let tiltY = 5 * offsetX;
// 	let tiltX = 0 * offsetY;

// 	backgroundContainer.style.transform = `perspective(100vw) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
// });

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {

	if(card_shown){
		restartRotation();
	}

	if(window.innerWidth <= 720){
		z_zoom_out = 2;
		z_zoom_in = 1.5;
		y_zoom = 0.5;
	}else{
		z_zoom_out = 1.5;
		z_zoom_in = 1.125;
		y_zoom = 0.25;
	}

	camZ = z_zoom_out;
	camY = y_zoom;

	camera.position.set(camX, camY, camZ);
	camera.lookAt(new THREE.Vector3(ballX,ballY,ballZ))

	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
};

init();
})
})()