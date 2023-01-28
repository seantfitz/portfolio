/*GLOBAL VARIABLES*/
var log_position = 0;

var swing_to_labor = 0;
var swing_to_coalition = 0;

var swing_labor = {};
var swing_coalition = {};
var swing_crossbench = {};

var seats_labor = 0;
var seats_coalition = 0;
var seats_crossbench = 0;

var sorted_crossbench;
var sorted_labor;
var sorted_coalition;

var initial_seats_labor;
var initial_seats_coalition;
var initial_seats_crossbench;

var results = {};
var result_time = {};
var sorted_results = [];

var percentage = 'Swing-O-Meter 0%';
var mode = 'swingo';
var manual_move = false;

var slider = document.getElementById('slider');

//var image_path = './images/penpix/';
var image_path = './images/id/';

var counted_total = 0;
var counted_labor = 0;
var counted_coalition = 0;
var counted_crossbench = 0;

var isIE = false;

var interval = false;
var timer = 5;//minute
var counter = timer * 60;
var minutes;
var seconds;

var start_time = 1558162800000;//Saturday, 18 May 2019 17:00:00 GMT+10:00
var slow_time = 1558187999000;//Saturday, 18 May 2019 23:59:59 GMT+10:00
var stop_time = 1558249200000;//Sunday, 19 May 2019 17:00:00 GMT+10:00
var now;
/*GLOBAL VARIABLES*/

function init(){
	// console.warn('init()')
	// console.log(fetchHeader('script/json/may_16_01.js?t=' + new Date().getTime(),'Last-Modified'));
	// console.log(fetchHeader('script/json/electorates_post_redist.js?t=' + new Date().getTime(),'Last-Modified'));
	// $.getJSON('script/json/electorates_pre_redist.js?t=' + new Date().getTime(), function(data){
	$.getJSON('script/json/electorates_post_redist.js?t=' + new Date().getTime(), function(data){
	// $.getJSON('script/json/may_10_03.js?t=' + new Date().getTime(), function(data){
	// $.getJSON('script/json/may_13_02.js?t=' + new Date().getTime(), function(data){
	
	// $.getJSON('script/json/may_16_01.js?t=' + new Date().getTime(), function(data){
		electorates = data;
	})
	.done(function(){
		electorate_list = Object.keys(electorates);
		electorate_list.sort();
		render();
	})

	// now = new Date().getTime();
	// console.log('now',now,'\nnow >= start_time',now >= start_time,'\nnow >= slow_time',now >= slow_time,'\nnow >= stop_time',now >= stop_time);

	// setTimeout(init,600000);
	// setTimeout(refresh,300000);//190218 - captioned out to stop refreshing for testing...
	// if(mode == 'live'){
	// 	interval = setInterval(countDown,1000);
	// }
	// setTimeout(refresh,5000)
};

function countDown(){
	
	minutes = Math.floor(counter / 60);
	seconds = counter - minutes * 60;
	if(minutes < 10){
		minutes = '0' + minutes;
	}
	if(seconds < 10){
		seconds = '0' + seconds;
	}
	if(counter <= 0){
		refresh();
	}
	$('#counter').html('Refreshing in ' + minutes + ':' + seconds);
	counter --;
};

function refresh(){//console.log('refresh()')
	// location.reload();
	$('.seat_box, .option, #info_panel').remove();

	log_position = 0;
	swing_to_labor = 0;
	swing_to_coalition = 0;
	swing_labor = {};
	swing_coalition = {};
	swing_crossbench = {};
	seats_labor = 0;
	seats_coalition = 0;
	seats_crossbench = 0;
	// sorted_crossbench;
	// sorted_labor;
	// sorted_coalition;
	// initial_seats_labor;
	// initial_seats_coalition;
	// initial_seats_crossbench;
	results = {};
	result_time = {};
	sorted_results = [];
	percentage = 'Swing-O-Meter 0%';
	//mode = 'swingo';
	manual_move = false;
	counted_total = 0;
	counted_labor = 0;
	counted_coalition = 0;
	counted_crossbench = 0;

	counter = timer * 60;

	init();
}

function render(){//console.log('render()')

	for(var i = 0; i < electorate_list.length; i++){

		var state = electorates[electorate_list[i]].state;
		var held = electorates[electorate_list[i]].held_by;

		if(electorates[electorate_list[i]].results){//if there are results to show, the mode should be set to live
			results[electorate_list[i]] = electorates[electorate_list[i]].results;
			result_time[electorate_list[i]] = electorates[electorate_list[i]].results[0].time_stamp;
			// mode = 'live';
			// $('#live').prop('checked',true);
		}

		if(held == 'ALP'){
			seats_labor ++
			swing_labor[electorate_list[i]] = electorates[electorate_list[i]].swing_2pp;
		}else if(held == 'LP' || held == 'NP' || held == 'LNP' || held == 'CLP'){
			seats_coalition ++
			swing_coalition[electorate_list[i]] = electorates[electorate_list[i]].swing_2pp;
		}else{
			seats_crossbench ++
			swing_crossbench[electorate_list[i]] = electorates[electorate_list[i]].swing_2pp;
		}

		$('#selectorate').append('<option class="option" value="' + electorate_list[i] + '">' + electorate_list[i] + ' ' + state + '</option>')
	}

	sorted_crossbench = Object.keys(swing_crossbench).sort(function(a,b){return swing_crossbench[b]-swing_crossbench[a]});
	sorted_labor = Object.keys(swing_labor).sort(function(a,b){return swing_labor[b]-swing_labor[a]});
	sorted_coalition = Object.keys(swing_coalition).sort(function(a,b){return swing_coalition[b]-swing_coalition[a]});

	initial_seats_labor = sorted_labor.length;
	initial_seats_coalition = sorted_coalition.length;
	initial_seats_crossbench = sorted_crossbench.length;

	for(var i = 0; i < sorted_crossbench.length; i++){
		// console.log(electorates[sorted_crossbench[i]])
		var this_sitting_pic = image_path + electorates[sorted_crossbench[i]].candidates[0].Id + '.jpg';////////////////////////////// 8 change to ' /////
		var this_labor_pic;
		
		for(var j = 0; j < electorates[sorted_crossbench[i]].candidates.length; j++){

			if(electorates[sorted_crossbench[i]].candidates[j].party == 'ALP'){
				this_labor_pic = image_path + electorates[sorted_crossbench[i]].candidates[j].Id + '.jpg';
				// console.warn(this_labor_pic)
				break;
			}
		}

		var this_coalition_pic;
		for(var j = 0; j < electorates[sorted_crossbench[i]].candidates.length; j++){
			
			var party_abbrev = electorates[sorted_crossbench[i]].candidates[j].party;

			if(party_abbrev == 'LP'){
				this_coalition_pic = image_path + electorates[sorted_crossbench[i]].candidates[j].Id + '.jpg';
				break;
			}else if(party_abbrev == 'NP' || party_abbrev == 'LNP' || party_abbrev == 'CLP'){
				if(party_abbrev == 'NP'){
					this_coalition_pic = image_path + electorates[sorted_crossbench[i]].candidates[j].Id + '.jpg';
					break;
				}else if(party_abbrev == 'LNP' || party_abbrev == 'CLP'){
					if(party_abbrev == 'LNP'){
						this_coalition_pic = image_path + electorates[sorted_crossbench[i]].candidates[j].Id + '.jpg';
						break;
					}else{
						this_coalition_pic = image_path + electorates[sorted_crossbench[i]].candidates[j].Id + '.jpg';
					}
				}
			}
		}
		// console.warn(this_coalition_pic)
		// console.log('\n\n* * * * *\n\n')

		var this_top = $($('.x_box')[i]).position().top;
		var this_left = $($('.x_box')[i]).position().left;

		/*190218*/var this_swing = electorates[sorted_crossbench[i]].swing_2pp;/*190218*/
		var seat_box = document.createElement('div');
		// seat_box.className = 'seat_box seat_crossbench undecided orig_crossbench_pos_' + i + ' crossbench_pos_' + i + ' ' + sorted_crossbench[i].replace(/[ ,-,',.]/g,'_');//190218
		seat_box.className = 'seat_box seat_crossbench undecided orig_crossbench_pos_' + i + ' crossbench_pos_' + i + ' ' + sorted_crossbench[i].replace(/[ ,-,',.]/g,'_') + ' swing_to_coalition_' + (Math.ceil((this_swing * 10) / 5) * 5) + ' swing_to_labor_' + (Math.ceil((this_swing * 10) / 5) * 5);
		seat_box.electorateName = sorted_crossbench[i];
		seat_box.id = 'crossbench_pos_' + i;
		seat_box.position_attr = 'crossbench_pos_' + i;
		
		if(electorates[sorted_crossbench[i]].candidates[0].party == 'GRN' || electorates[sorted_crossbench[i]].candidates[0].party == 'GVIC'){//808
			seat_box.innerHTML = '<div class="front"><div class="crossbench_pic green_pic" style="background-image:url(' + this_sitting_pic + ');"></div></div><div class="back"><div class="star"></div><div class="display_none coalition_pic"  style="background-image:url(' + this_coalition_pic + ');"></div><div class="display_none labor_pic"  style="background-image:url(' + this_labor_pic + ');"></div></div>';
		}else{	
			seat_box.innerHTML = '<div class="front"><div class="crossbench_pic" style="background-image:url(' + this_sitting_pic + ');"></div></div><div class="back"><div class="star"></div><div class="display_none coalition_pic"  style="background-image:url(' + this_coalition_pic + ');"></div><div class="display_none labor_pic"  style="background-image:url(' + this_labor_pic + ');"></div></div>';
		}

		$('.container').append(seat_box);
		$('.crossbench_pos_' + i).css({top:this_top,left:this_left});
		$('#crossbench_pos_' + i).attr({'tabindex':'0','role':'button','title':sorted_crossbench[i]})
		$('#crossbench_pos_' + i).on('mouseover',function(){$(this).focus()})
	}

	for(var i = 0; i < sorted_labor.length; i++){

		var crossbench_candidate = true;

		var this_sitting_pic = image_path + electorates[sorted_labor[i]].candidates[0].Id + '.jpg';
		
		var this_coalition_pic;
		for(var j = 0; j < electorates[sorted_labor[i]].candidates.length; j++){
			var party_abbrev = electorates[sorted_labor[i]].candidates[j].party

			if(party_abbrev == 'LP'){
				this_coalition_pic = image_path + electorates[sorted_labor[i]].candidates[j].Id + '.jpg';
				break;
			}else if(party_abbrev == 'NP' || party_abbrev == 'LNP' || party_abbrev == 'CLP'){
				if(party_abbrev == 'NP'){
					this_coalition_pic = image_path + electorates[sorted_labor[i]].candidates[j].Id + '.jpg';
					break;
				}else if(party_abbrev == 'LNP' || party_abbrev == 'CLP'){
					if(party_abbrev == 'LNP'){
						this_coalition_pic = image_path + electorates[sorted_labor[i]].candidates[j].Id + '.jpg';
						break;
					}else{
						this_coalition_pic = image_path + electorates[sorted_labor[i]].candidates[j].Id + '.jpg';
					}
				}
			}
		}//console.log(sorted_labor[i],this_coalition_pic)

		var this_crossbench_pic;
		for(var j = 0; j < electorates[sorted_labor[i]].candidates.length; j++){
			var party_abbrev = electorates[sorted_labor[i]].candidates[j].party

			if(party_abbrev != 'ALP' && party_abbrev != 'LP' && party_abbrev != 'NP' && party_abbrev != 'LNP' && party_abbrev != 'CLP'){
				if(electorates[sorted_labor[i]].candidates[j]){
					this_crossbench_pic = image_path + electorates[sorted_labor[i]].candidates[j].Id + '.jpg';
					break;
				}else{
					//NO CROSSBENCH CANDIDATE
					crossbench_candidate = false;
				}
			}
		}

		var this_swing = electorates[sorted_labor[i]].swing_2pp;
		var seat_box = document.createElement('div');
		
		if(crossbench_candidate){
			seat_box.className = 'seat_box seat_labor undecided orig_labor_pos_' + i + ' labor_pos_' + i + ' swing_to_coalition_' + (Math.ceil((this_swing * 10) / 5) * 5) + ' ' + sorted_labor[i].replace(/[ ,-,',.]/g,'_');
		}else{
			seat_box.className = 'seat_box no_cross seat_labor undecided orig_labor_pos_' + i + ' labor_pos_' + i + ' swing_to_coalition_' + (Math.ceil((this_swing * 10) / 5) * 5) + ' ' + sorted_labor[i].replace(/[ ,-,',.]/g,'_');
		}
		seat_box.id = 'labor_pos_' + i;
		seat_box.electorateName = sorted_labor[i];
		seat_box.position_attr = 'labor_pos_' + i;
		seat_box.innerHTML = '<div class="front"><div class="labor_pic" style="background-image:url(' + this_sitting_pic + ');"></div></div><div class="back"><div class="star"></div><div class="coalition_pic"  style="background-image:url(' + this_coalition_pic + ');"></div><div class="display_none crossbench_pic"  style="background-image:url(' + this_crossbench_pic + ');"></div></div>';
		$('.container').append(seat_box);
		$('#labor_pos_' + i).attr({'tabindex':'0','role':'button','title':sorted_labor[i]})
		$('#labor_pos_' + i).on('mouseover',function(){$(this).focus()})
	}

	for(var i = 0; i < sorted_coalition.length; i++){

		var crossbench_candidate = true;

		var this_sitting_pic = image_path + electorates[sorted_coalition[i]].candidates[0].Id + '.jpg';
		var this_labor_pic;

		for(var j = 0; j < electorates[sorted_coalition[i]].candidates.length; j++){
			if(electorates[sorted_coalition[i]].candidates[j].party == 'ALP'){
				this_labor_pic = image_path + electorates[sorted_coalition[i]].candidates[j].Id + '.jpg';
				break;
			}
		}

		var this_crossbench_pic;
		for(var j = 0; j < electorates[sorted_coalition[i]].candidates.length; j++){
			var party_abbrev = electorates[sorted_coalition[i]].candidates[j].party

			if(party_abbrev != 'ALP' && party_abbrev != 'LP' && party_abbrev != 'NP' && party_abbrev != 'LNP' && party_abbrev != 'CLP'){
				if(electorates[sorted_coalition[i]].candidates[j]){
					this_crossbench_pic = image_path + electorates[sorted_coalition[i]].candidates[j].Id + '.jpg';
					break;
				}else{
					//NO CROSSBENCH CANDIDATE
					crossbench_candidate = false;
				}
			}
		}

		var this_swing = electorates[sorted_coalition[i]].swing_2pp;
		var seat_box = document.createElement('div');

		if(crossbench_candidate){
			seat_box.className = 'seat_box seat_coalition undecided orig_coalition_pos_' + i + ' coalition_pos_' + i + ' swing_to_labor_' + (Math.ceil((this_swing * 10) / 5) * 5) + ' ' + sorted_coalition[i].replace(/[ ,-,',.]/g,'_');
		}else{
			seat_box.className = 'seat_box no_cross seat_coalition undecided orig_coalition_pos_' + i + ' coalition_pos_' + i + ' swing_to_labor_' + (Math.ceil((this_swing * 10) / 5) * 5) + ' ' + sorted_coalition[i].replace(/[ ,-,',.]/g,'_');
		}

		seat_box.id = 'coalition_pos_' + i;
		seat_box.electorateName = sorted_coalition[i];
		seat_box.position_attr = 'coalition_pos_' + i;
		// seat_box.innerHTML = '<div class="front"><img class="coalition_pic" src="' + this_sitting_pic + '"></div><div class="back"><div class="star"></div><img class="labor_pic" src="' + this_labor_pic + '"><img class="display_none crossbench_pic" src="' + this_crossbench_pic + '"></div>';
		seat_box.innerHTML = '<div class="front"><div class="coalition_pic" style="background-image:url(' + this_sitting_pic + ');"></div></div><div class="back"><div class="star"></div><div class="labor_pic"  style="background-image:url(' + this_labor_pic + ');"></div><div class="display_none crossbench_pic"  style="background-image:url(' + this_crossbench_pic + ');"></div></div>';

		$('.container').append(seat_box);
		$('#coalition_pos_' + i).attr({'tabindex':'0','role':'button','title':sorted_coalition[i]})
		$('#coalition_pos_' + i).on('mouseover',function(){$(this).focus()})
	}

	if(isIE){
		$('.seat_box').addClass('isIE');
	}

	$('.seat_box').mouseover(hover);
	$('.seat_box').mouseout(hover);
	// $('.seat_box').mousedown(grab);
	$('.seat_box').click(details);

	if(mode == 'live'){
		loading();
	}else{
		set_mode(mode);
	}
};

function hover(e){
	if(!e) e = window.event;
	var x = e.target || e.srcElement;

	if(e.type == 'mouseover'){
		var this_top = $(this).offset().top - 10;
		var this_left = $(this).offset().left + (($(this).width() / 2) - 10);
		var wrapper_width = $('#wrapper').width();

		$('#tool_tip_arrow').css({top:this_top,left:this_left}).removeClass('display_none');
		$('#tool_tip_body').html(this.electorateName.replace(/ /g,'&nbsp;') + ',&nbsp;' + electorates[this.electorateName].state);

		var txt_left = this_left - $('#tool_tip_body').width() / 2;

		if(txt_left <= 2){
			txt_left = 2;
		}

		if((txt_left + $('#tool_tip_body').width()) >= (wrapper_width - 20)){
			txt_left = wrapper_width - ($('#tool_tip_body').width() + 20);
		}

		$('#tool_tip_body').css({top:(this_top - 30),left:txt_left}).removeClass('display_none');
	}
	if(e.type == 'mouseout'){
		$('#tool_tip_arrow, #tool_tip_body').addClass('display_none');
	}
};

function details(){
	// console.log(Array.from(this.classList).indexOf('orig_crossbench_pos_'))
	var this_electorate = this.electorateName;
	var members = electorates[this_electorate].candidates;

	localStorage.setItem('details_shown',this_electorate.replace(/[ ,-,',.]/g,'_'));

	$('#tool_tip_arrow, #tool_tip_body').addClass('display_none');

	if(results[this_electorate] && mode == 'live'){
		$('#wrapper').append(
			'<div tabindex="0" id="info_panel" class="colour_' + results[this_electorate][0].party.toUpperCase() + '">' +
				'<div class="info_block_top">' +
					'<table width="100%" cellpadding="0" cellspacing="0">'+
						'<tr><td colspan="2" class="info_head coloured">' + this_electorate + ',&nbsp;' + electorates[this_electorate].state + '</td></tr>'+
						'<tr class="coloured"><td>' + results[this_electorate][0].party + '</td><td>' + results[this_electorate][0].Seat_Status + '</td></tr>'+
					'</table>'+
				'</div>'+'<div class="info_hr"></div>'+
			'</div>'
		);
		$('#info_panel').focus();

		for(var i = 0; i < results[this_electorate].length; i ++){

			var PartyName;
			var Profession;
			var Votes;

			if(results[this_electorate][i]['PartyName'] != undefined){
				PartyName = '<tr><td>' + results[this_electorate][i]['PartyName'] + '</td></tr>'
			}else{
				PartyName = '<tr><td>' + results[this_electorate][i]['party'] + '</td></tr>'
			}

			if(results[this_electorate][i]['Profession'] != undefined){
				Profession = '<tr><td>Profession: ' + results[this_electorate][i]['Profession'] + '</td></tr>'
			}else{
				Profession = '';
			}

			if(results[this_electorate][i]['Votes'] != undefined){
				Votes = '<tr><td>Votes: <strong>' + results[this_electorate][i]['Votes'] + '</strong></td></tr>'
			}else{
				Votes = '';
			}

			if(results[this_electorate][i].Status != 'TEMPORARY'){

				$('#info_panel').append(
					'<div class="info_block candidate_' + results[this_electorate][i].party.toUpperCase() + '">' +
						'<table width="100%" cellpadding="0" cellspacing="0">'+
							'<tr><td colspan="2"><div class="member_status">' + results[this_electorate][i].Status + '</div></td></tr>'+
							'<tr><td class="info_pic" rowspan="5"><div style="background-image:url(' + image_path + results[this_electorate][i].Id + '.jpg);"></div></td></tr>'+
							'<tr><td><strong>' + results[this_electorate][i].Name + '</strong></td></tr>'+
							PartyName + Profession + Votes +
						'</table>'+
					'</div>'
				);
			}
		}
	}else{
		$('#wrapper').append(
			'<div tabindex="0" id="info_panel" class="colour_' + electorates[this_electorate].held_by.toUpperCase() + '">' +
				'<div class="info_block_top">' +
					'<table width="100%" cellpadding="0" cellspacing="0">'+
						'<tr><td colspan="2" class="info_head coloured">' + this_electorate + ',&nbsp;' + electorates[this_electorate].state + '</td></tr>'+
						// '<tr class="coloured"><td>' + electorates[this_electorate].held_by + '</td><td>' + electorates[this_electorate].swing_2pp + '%</td></tr>'+
						'<tr class="coloured"><td>' + electorates[this_electorate].held_by + '</td><td>' + electorates[this_electorate].swing_2pp + '%</td></tr><tr><td>' + electorates[this_electorate].prediction + '</td></tr>'+
					'</table>'+
				'</div>'+'<div class="info_hr"></div>'+
			'</div>'
		);
		$('#info_panel').focus();

		for(var i = 0; i < members.length; i ++){

			var PartyName;
			var Profession;
			var Votes;

			if(members[i]['PartyName'] != undefined){
				PartyName = '<tr><td>' + members[i]['PartyName'] + '</td></tr>'
			}else{
				PartyName = '<tr><td>' + members[i]['party'] + '</td></tr>'
			}

			if(members[i]['Profession'] != undefined){
				Profession = '<tr><td>Profession: ' + members[i]['Profession'] + '</td></tr>'
			}else{
				Profession = '';
			}

			if(members[i]['Votes'] != undefined){
				Votes = '<tr><td>Votes: <strong>' + members[i]['Votes'] + '</strong></td></tr>'
			}else{
				Votes = '';
			}

			if(members[i].Status != 'TEMPORARY'){	//console.log(members[i])
				$('#info_panel').append(
					'<div class="info_block candidate_' + members[i].party.toUpperCase() + '">' +
						'<table width="100%" cellpadding="0" cellspacing="0">'+
							'<tr><td colspan="2"><div class="member_status">' + members[i].Status + '</div></td></tr>'+
							'<tr><td class="info_pic" rowspan="5"><div style="background-image:url(' + image_path + members[i].Id + '.jpg);"></div></td></tr>'+
							'<tr><td><strong>' + members[i].Name + '</strong></td></tr>'+
							PartyName + Profession + Votes +
						'</table>'+
					'</div>'
				);
			}
		}
	}

	$('#info_panel').click(function(){
		$(this).remove();
		localStorage.removeItem('details_shown');
	})	
};

function set_mode(mode){
	//console.warn('set_mode()')

	reset_seats();

	// if(interval != false){
	// 	clearInterval(interval);
	// }

	if(mode == 'swingo'){
		$('#log_frame').addClass('display_none');
		$('#swing_o_frame').removeClass('display_none');
		$('.undecided').removeClass('transparent');
		$('#counter').addClass('display_none');
		arrange();
		clearInterval(interval);
	}
	if(mode == 'live'){
		// $('.load').removeClass('display_none');
		$('#counter').removeClass('display_none');
		check_results();

		// setTimeout(function(){
		// 	clearInterval(interval);
		// 	interval = setInterval(countDown,1000);
		// },1000)	
	}
	// console.log('interval',interval)
};

function reset_seats(){
	// console.log('reset_seats');
	$('#slider').val(100);
	swing_value();

	for(var i = 0; i < sorted_labor.length; i++){
		var this_target = $('.orig_labor_pos_' + i)[0].id;
		var orig_pos = 'labor_pos_' + i;
		$('#' + this_target).removeClass(this_target + ' gained_coalition gained_labor gained_crossbench').removeAttr('style').addClass(orig_pos);
	}

	for(var i = 0; i < sorted_coalition.length; i++){
		var this_target = $('.orig_coalition_pos_' + i)[0].id;
		var orig_pos = 'coalition_pos_' + i;
		$('#' + this_target).removeClass(this_target + ' gained_coalition gained_labor gained_crossbench').removeAttr('style').addClass(orig_pos);
	}

	for(var i = 0; i < sorted_crossbench.length; i++){
		var this_target = $('.orig_crossbench_pos_' + i)[0].id;
		var orig_pos = 'crossbench_pos_' + i;
		$('#' + this_target).removeClass(this_target + ' gained_coalition gained_labor gained_crossbench').removeAttr('style').addClass(orig_pos);

		if(mode == 'swingo'){
			// console.log(electorates[sorted_crossbench[i]]['candidates'][0])

			if(electorates[sorted_crossbench[i]]['candidates'][0]['party'] == 'GRN' || electorates[sorted_crossbench[i]]['candidates'][0]['party'] == 'GVIC'){//207
				// this_block = 'crossbench';
				$('#' + this_target + ' .crossbench_pic').addClass('green_pic').css({'background-image':'url(' + image_path + electorates[sorted_crossbench[i]]['candidates'][0].Id + '.jpg)'});
			}else{
				// this_block = 'crossbench';	
				$('#' + this_target + ' .crossbench_pic').removeClass('green_pic').css({'background-image':'url(' + image_path + electorates[sorted_crossbench[i]]['candidates'][0].Id + '.jpg)'});
			}
		}
	}

	for(var i = 0; i < sorted_labor.length; i++){
		$('.orig_labor_pos_' + i).attr('id','labor_pos_' + i)
	}
	for(var i = 0; i < sorted_coalition.length; i++){
		$('.orig_coalition_pos_' + i).attr('id','coalition_pos_' + i)
	}
	for(var i = 0; i < sorted_crossbench.length; i++){
		$('.orig_crossbench_pos_' + i).attr('id','crossbench_pos_' + i)
	}

	seats_labor = initial_seats_labor;
	seats_coalition = initial_seats_coalition;
	seats_crossbench = initial_seats_crossbench;

	$('.labor_pic, .coalition_pic, .crossbench_pic').removeClass('display_none');

	/*LOCAL STORAGE*/
	if(typeof(Storage) !== "undefined"){

		if(localStorage.highlighted){
			// $('[name=selectorate]').val(localStorage.highlighted)
			$('#selectorate').val(localStorage.highlighted)

			if(isIE){
				$('.seat_box').removeClass('highlightIE');
				$('.' + localStorage.highlighted.replace(/[ ,-,',.]/g,'_')).addClass('highlightIE');
			}else{
				$('.seat_box').removeClass('highlight');
				$('.' + localStorage.highlighted.replace(/[ ,-,',.]/g,'_')).addClass('highlight');
			}
		}

		if(localStorage.details_shown){
			$('.' + localStorage.details_shown).click();/*¡2019!*/
		}
	}
	/*LOCAL STORAGE*/

	arrange();
};

function arrange(){
	// console.log('arrange()')
	// console.log(seats_labor, seats_coalition, seats_crossbench)
	var wrapper_width = $('#wrapper').width();

	$('#percentage').html(percentage);

	if(wrapper_width < 760){
		$('.left_block').css({width:(Math.ceil(seats_labor / 15) * 6.666666667) + '%'});
		$('.right_block').css({width:(Math.ceil(seats_coalition / 15) * 6.666666667) + '%'});
	}else{
		$('.left_block').css({width:(Math.ceil(seats_labor / 10) * 5.263157894737) + '%'});
		$('.right_block').css({width:(Math.ceil(seats_coalition / 10) * 5.263157894737) + '%'});
	}

	$('#top_left').css({width:'35%'})
	$('#top_right').css({width:'35%'})

	for(var i = 0; i < seats_crossbench; i++){
		var this_top = $($('.x_box')[i]).position().top;
		var this_left = $($('.x_box')[i]).position().left;
		$('.crossbench_pos_' + i).css({top:this_top,left:this_left});
	}

	var divisor = 75;
	var graph_step;

	if(mode == 'swingo'){

		if(seats_labor >= 76){
			$('#graph_caption').html('Labor Government');
			divisor = seats_labor
		}else if(seats_coalition >= 75){
			$('#graph_caption').html('Coalition Government');
			divisor = seats_coalition
		}else if(seats_crossbench >= 76){
			$('#graph_caption').html('')//('Hung Parliament');
			divisor = seats_crossbench
		}else{
			$('#graph_caption').html('Hung Parliament');
		}

		graph_step = (($('#graph_frame').width()) / divisor);
		
		$('#graph_body').css({width:(graph_step * divisor)});
		$('#bar_labor').css({width:(graph_step * seats_labor)});	
		$('#bar_crossbench').css({width:(graph_step * seats_crossbench)});
		$('#bar_coalition').css({width:(graph_step * seats_coalition)});
		$('#finish_line').css({left:(graph_step * 75)});

		$('#labor_count').html(seats_labor);
		$('#crossbench_count').html(seats_crossbench);
		$('#coalition_count').html(seats_coalition);
	}else if(mode == 'live'){
		
		if(counted_labor >= 76){
			$('#graph_caption').html('Labor Government');
			divisor = counted_labor
		}else if(counted_coalition >= 76){
			$('#graph_caption').html('Coalition Government');
			divisor = counted_coalition
		}else if(counted_crossbench >= 76){
			$('#graph_caption').html('')//('Hung Parliament');
			divisor = counted_crossbench
		}else{
			$('#graph_caption').html('')//('Hung Parliament');
		}

		graph_step = (($('#graph_frame').width()) / divisor);

		$('#graph_body').css({width:(graph_step * divisor)});
		$('#bar_labor').css({width:(graph_step * counted_labor)});	
		$('#bar_crossbench').css({width:(graph_step * counted_crossbench)});
		$('#bar_coalition').css({width:(graph_step * counted_coalition)});
		$('#finish_line').css({left:(graph_step * 75)});

		$('#labor_count').html(counted_labor);
		$('#crossbench_count').html(counted_crossbench);
		$('#coalition_count').html(counted_coalition);
		$('#tally').html('<span id="decided"></span> of ' + electorate_list.length + '<span class="wide"> decided</span>')
		$('#decided').html(counted_total);
	}

	$('.labor_pic, .coalition_pic, .crossbench_pic').removeClass('display_none');

	$('.gained_labor .labor_pic').removeClass('display_none');
	$('.gained_labor .coalition_pic, .gained_labor .crossbench_pic').addClass('display_none');

	$('.gained_coalition .coalition_pic').removeClass('display_none');
	$('.gained_coalition .crossbench_pic').addClass('display_none');

	$('.gained_crossbench .crossbench_pic').removeClass('display_none');
	$('.gained_crossbench .labor_pic, .gained_crossbench .coalition_pic').addClass('display_none');

	if(isIE){
		$('.gained_labor .coalition_pic').addClass('display_none');
		$('.gained_coalition .labor_pic').addClass('display_none');
	}
};

function swing_value(){

	var slider_value = Number(slider.value);

	for(var i = initial_seats_labor; i < seats_labor; i++){
		var restore_this = $('.labor_pos_' + i)[0].id;
		$('#' + restore_this).removeClass('gained_labor labor_pos_' + i).addClass(restore_this);
	}

	for(var i = initial_seats_coalition; i < seats_coalition; i++){
		var restore_this = $('.coalition_pos_' + i)[0].id;
		$('#' + restore_this).removeClass('gained_coalition coalition_pos_' + i).addClass(restore_this);
	}
	/*1902*/
	for(var i = initial_seats_crossbench; i < seats_crossbench; i++){
		var restore_this = $('.crossbench_pos_' + i)[0].id;//console.log(restore_this)
		$('#' + restore_this).removeClass('gained_crossbench crossbench_pos_' + i).addClass(restore_this);
	}
	/*1902*/
	seats_labor = initial_seats_labor;
	seats_coalition = initial_seats_coalition;
	seats_crossbench = initial_seats_crossbench;

	if(slider_value <= 100){
		swing_to_coalition = 0;
		swing_to_labor = 0 - (slider_value - 100);
		percentage = 'Labor ' + (0 - ((slider_value - 100) / 10)) + '%';
		$('#tally').html('Simulated Swing (2pp)');
	}
	if(slider_value >= 100){
		swing_to_labor = 0;
		swing_to_coalition = slider_value - 100;
		percentage = 'Coalition ' + ((slider_value - 100) / 10) + '%';
		$('#tally').html('Simulated Swing (2pp)');
	}
	if(slider_value == 100){
		percentage = 'Swing-O-Meter 0%';
		$('#tally').html('Pre-election');
	}

	var labor_blocks = swing_to_labor / 5;
	var coalition_blocks = swing_to_coalition / 5;

	for(var i = 1; i < (labor_blocks + 1); i++){

		var group = Number($('.swing_to_labor_' + (i * 5)).length)

		if(group > 0){
			for(var j = 0; j < group; j++){

				var swing_this = $('.swing_to_labor_' + (i * 5))[j].id;

				$('#' + swing_this).removeAttr('style').removeClass(swing_this).addClass('gained_labor labor_pos_' + seats_labor);
				// $('#' + swing_this).removeClass(swing_this).addClass('gained_labor labor_pos_' + seats_labor);

				seats_labor ++;

				if($('#' + swing_this).hasClass('seat_coalition')){
					seats_coalition --;
				}else if($('#' + swing_this).hasClass('seat_crossbench')){
					seats_crossbench --;
				}
			}
		}
	}

	for(var i = 1; i < (coalition_blocks + 1); i++){
				
		var group = Number($('.swing_to_coalition_' + (i * 5)).length)

		if(group > 0){
			for(var j = 0; j < group; j++){

				var swing_this = $('.swing_to_coalition_' + (i * 5))[j].id;//console.log(swing_this)

				$('#' + swing_this).removeAttr('style').removeClass(swing_this).addClass('gained_coalition coalition_pos_' + seats_coalition);
				// $('#' + swing_this).removeClass(swing_this).addClass('gained_coalition coalition_pos_' + seats_coalition);

				seats_coalition ++;
				
				if($('#' + swing_this).hasClass('seat_labor')){
					seats_labor --;
				}else if($('#' + swing_this).hasClass('seat_crossbench')){
					seats_crossbench --;
				}
			}
		}
	}

	/*190218*/
	// var crossbench_blocks
	// console.log('swing_to_labor', swing_to_labor)
	// console.log('swing_to_coalition', swing_to_coalition)
	/*190218*/

	arrange();
};

function check_results(){//console.log('check_results()')

	var result_list = Object.keys(result_time).sort(function(a,b){return result_time[a]-result_time[b]});
	// console.log(result_list)
	sorted_results = [];

	for(var i = 0; i < result_list.length; i++){
		var this_val = result_list[i].replace(/[ ,-,',.]/g,'_');
		var this_result = results[result_list[i]];
		var this_target = $('.' + this_val)[0].id;

		var key = result_list[i];

		sorted_results[sorted_results.length] = this_result;

		$('#' + this_target).removeClass('undecided');

		var new_party = this_result[0].party;
		var this_block;

		if(new_party == 'ALP'){
			this_block = 'labor';
			$('#' + this_target + ' .labor_pic').css({'background-image':'url(' + image_path + this_result[0].Id + '.jpg)'});
		}else if(new_party == 'LP' || new_party == 'NP' || new_party == 'LNP' || new_party == 'CLP'){
			this_block = 'coalition';
			$('#' + this_target + ' .coalition_pic').css({'background-image':'url(' + image_path + this_result[0].Id + '.jpg)'});
		}else if(new_party == 'GRN' || new_party == 'GVIC'){//207
			this_block = 'crossbench';
			$('#' + this_target + ' .crossbench_pic').addClass('green_pic').css({'background-image':'url(' + image_path + this_result[0].Id + '.jpg)'});
		}else{
			this_block = 'crossbench';	
			$('#' + this_target + ' .crossbench_pic').removeClass('green_pic').css({'background-image':'url(' + image_path + this_result[0].Id + '.jpg)'});
		}

		drop(this_target,this_block);

		if(i == result_list.length - 1){
			refresh_log(result_list);
		}
	}

	now = new Date().getTime();//console.log('now',now)
	if(now >= slow_time){
		timer = 30;
	}
	if(now >= start_time && now < stop_time){//console.log('go')
		setTimeout(function(){
			clearInterval(interval);
			interval = setInterval(countDown,1000);
		},1000)
		// $('.load').addClass('display_none');
	}else{
		clearInterval(interval);
		$('#counter').html('');
		// console.log('stop')
		// $('.load').addClass('display_none');
	}loaded();

	$('#swing_o_frame').addClass('display_none');
	$('.undecided').addClass('transparent');
};

function refresh_log(result_list){

	counted_total = 0;
	counted_labor = 0;
	counted_coalition = 0;
	counted_crossbench = 0;

	$('.log').remove();

	for (var i = 0; i < sorted_results.length; i++) {

		var this_result = sorted_results[i];
		var new_party = this_result[0].party;

		$('#log').append('<div class="log"><table width="100%" height="70px" cellpadding="0" cellspacing="0"><tr><td>'+
			'<div class="log_pic" style="background-image:url('+
			image_path + this_result[0].Id + '.jpg)' +
			'"></div></td><td>'+
			'<strong>'+
			result_list[i] + ' - ' + electorates[result_list[i]].state +
			'</strong><br>'+
			this_result[0].Seat_Status + ' by ' + new_party +
			'<br>'+
				this_result[0].Name +
			'<br>'+
				this_result[0].Status +
			'</td></tr></table></div>'
		);

		if(new_party == 'ALP'){
			counted_labor ++;
		}else if(new_party == 'LP' || new_party == 'NP' || new_party == 'LNP' || new_party == 'CLP'){
			counted_coalition ++;
		}else{
			counted_crossbench ++;
		}
	};

	counted_total = counted_labor + counted_coalition + counted_crossbench;
	log_position = counted_total - 1;

	if(counted_total <= 0){
		$('#log_frame').addClass('display_none');
	}else{
		$('#log_frame').removeClass('display_none');
	}

	if(log_position <= 0){
		log_position = 0;
		$('#log_up').addClass('display_none');
	}else if(log_position >= (counted_total - 1)){
		log_position = (counted_total - 1);
		$('#log_down').addClass('display_none');
	}else{
		$('#log_up, #log_down').removeClass('display_none');
	}
	$('#log').css({top:-(log_position * 70)});

	arrange();
};

$('.log_nav').click(function(){

	if(this.id == 'log_up'){
		log_position --;
	}
	if(this.id == 'log_down'){
		log_position ++;
	}
	if(log_position <= 0){
		log_position = 0;
		$('#log_up').addClass('display_none');
		$('#log_down').removeClass('display_none');
	}else if(log_position >= (counted_total - 1)){
		log_position = (counted_total - 1);
		$('#log_down').addClass('display_none');
		$('#log_up').removeClass('display_none');
	}else{
		$('#log_up, #log_down').removeClass('display_none');
	}
	$('#log').css({top:-(log_position * 70)});
});

function grab(e){

	if(!e) e = window.event;

	if(mode == 'swingo' && slider.value == 100){

		manual_move = true;

		var container_width = $('#container').width();
		var left_block_width = $('#left_block').width();
		var right_block_width = $('#right_block').width();

		var this_top = $(this).position().top;
		var this_left = $(this).position().left;

		var start_top = e.clientY;
		var start_left = e.clientX;

		$(this).addClass('seat_drag');

		document.onmousemove = function(e){

			if(!e) e = window.event;

			var to_y = this_top + (e.clientY - start_top);
			var to_x = this_left + (e.clientX - start_left);

			$('.seat_drag').css({top:to_y,left:to_x});

			$(document).unbind();
			$(document).mouseup(function(){

				$('.seat_box').unbind();

				setTimeout(function(){
					$('.seat_box').mouseover(hover);
					$('.seat_box').mouseout(hover);
					// $('.seat_box').mousedown(grab)
					$('.seat_box').click(details);
				},50)

				var container_width = $('#container').width();
				var left_block_width = $('#left_block').width();
				var right_block_width = $('#right_block').width();

				var this_id = $('.seat_drag')[0].id;
				var this_x = parseInt($('.seat_drag')[0].style.left);
				var into;

				if(this_x < left_block_width){
					into = 'labor';
				}else if(this_x > (container_width - right_block_width)){
					into = 'coalition';
				}else{
					into = 'crossbench';
				}

				drop(this_id,into)
			})
		}
	}
};

function drop(this_id,into){

	$(document).unbind();

	var this_number = Number(this_id.substring(this_id.lastIndexOf('_') + 1));
	var this_party = this_id.substring(0,this_id.indexOf('_'));
	var refresh_id = this_id;
	
	if(into != this_party){

		if(mode == 'swingo'){
			$('#tally').html('User Input');
		}

		if(this_party == 'labor' && into != this_party){
						
			if(into == 'coalition'){
				$('#' + this_id).addClass('gained_coalition coalition_pos_' + seats_coalition)
				.removeClass('seat_drag gained_labor labor_pos_' + this_number)
				.removeAttr('style')
				.attr('id','coalition_pos_' + seats_coalition)
				refresh_id = 'coalition_pos_' + seats_coalition
				seats_coalition ++;
			}
						
			if(into == 'crossbench'){
				$('#' + this_id).addClass('gained_crossbench crossbench_pos_' + seats_crossbench)
				.removeClass('seat_drag gained_labor labor_pos_' + this_number)
				.removeAttr('style')
				.attr('id','crossbench_pos_' + seats_crossbench)
				refresh_id = 'crossbench_pos_' + seats_crossbench
				seats_crossbench ++;
			}

			for(var i = this_number - 1; i < seats_labor; i++){
				$('#labor_pos_' + (i + 1))
				.addClass('labor_pos_' + i)
				.removeClass('labor_pos_' + (i + 1))
				.attr('id','labor_pos_' + i)
			}

			$('#' + refresh_id).removeClass('gained_labor');
						
			seats_labor --;
		}

		if(this_party == 'coalition' && into != this_party){

			if(into == 'labor'){
				$('#' + this_id).addClass('gained_labor labor_pos_' + seats_labor)
				.removeClass('seat_drag gained_coalition coalition_pos_' + this_number)
				.removeAttr('style')
				.attr('id','labor_pos_' + seats_labor)
				refresh_id = 'labor_pos_' + seats_labor
				seats_labor ++;
			}
						
			if(into == 'crossbench'){
				$('#' + this_id).addClass('gained_crossbench crossbench_pos_' + seats_crossbench)
				.removeClass('seat_drag gained_coalition coalition_pos_' + this_number)
				.removeAttr('style')
				.attr('id','crossbench_pos_' + seats_crossbench)
				refresh_id = 'crossbench_pos_' + seats_crossbench
				seats_crossbench ++;
			}

			for(var i = this_number - 1; i < seats_coalition; i++){
				$('#coalition_pos_' + (i + 1))
				.addClass('coalition_pos_' + i)
				.removeClass('coalition_pos_' + (i + 1))
				.attr('id','coalition_pos_' + i)
			}

			$('#' + refresh_id).removeClass('gained_coalition');
				
			seats_coalition --;
		}

		if(this_party == 'crossbench' && into != this_party){

			if(into == 'labor'){
				$('#' + this_id).addClass('gained_labor labor_pos_' + seats_labor)
				.removeClass('seat_drag gained_crossbench crossbench_pos_' + this_number)
				.removeAttr('style')
				.attr('id','labor_pos_' + seats_labor)
				refresh_id = 'labor_pos_' + seats_labor
				seats_labor ++;
			}

			if(into == 'coalition'){
				$('#' + this_id).addClass('gained_coalition coalition_pos_' + seats_coalition)
				.removeClass('seat_drag gained_crossbench crossbench_pos_' + this_number)
				.removeAttr('style')
				.attr('id','coalition_pos_' + seats_coalition)
				refresh_id = 'coalition_pos_' + seats_coalition
				seats_coalition ++;
			}

			for(var i = this_number - 1; i < seats_crossbench; i++){
				$('#crossbench_pos_' + (i + 1))
				.addClass('crossbench_pos_' + i)
				.removeClass('crossbench_pos_' + (i + 1))
				.attr('id','crossbench_pos_' + i)
			}

			$('#' + refresh_id).removeClass('gained_crossbench');

			seats_crossbench --;
		}
	}else{
		$('#' + this_id).removeClass('seat_drag').removeAttr('style')
	}

	if(!isIE){
		if($('#' + refresh_id).hasClass('seat_labor') && into == 'labor'){
			$('#' + refresh_id).css({'transform': 'rotateY(0deg)'})
		}
		if($('#' + refresh_id).hasClass('seat_coalition') && into == 'coalition'){
			$('#' + refresh_id).css({'transform': 'rotateY(0deg)'})
		}
		if($('#' + refresh_id).hasClass('seat_crossbench') && into == 'crossbench'){
			$('#' + refresh_id).css({'transform': 'rotateY(0deg)'})
		}
	}

	arrange();
};

function moved(){
	if(manual_move){
		reset_seats();
		manual_move = false;
	}
};

$('#slider').keyup(swing_value);

$('#slider').on('touchstart',moved)
$('#slider').on('touchmove',swing_value);

$('#slider').mousedown(function(){
	moved()
	document.onmousemove = swing_value;
});

$('#slider').click(swing_value);

$('.mode_btn').click(function(){
	mode = $('input[name="mode"]:checked').val();
	if(mode == 'live'){
		loading();
	}else{
		set_mode(mode);
	}
});

$('#selectorate').focus(function(){
	$($('#selectorate')[0][0]).html('Clear Selection')
});

$('#selectorate').blur(function(){
	$($('#selectorate')[0][0]).html('Find Electorate')
});

$('#selectorate').change(function(){
	$($('#selectorate')[0][0]).html('Find Electorate')
	var this_val = this.value.replace(/[ ,-,',.]/g,'_');
	if(isIE){
		$('.seat_box').removeClass('highlightIE');
		$('.' + this_val).addClass('highlightIE');
	}else{
		$('.seat_box').removeClass('highlight');
		$('.' + this_val).addClass('highlight');
	}

	localStorage.setItem('highlighted', this.value);

	$(this).blur();
});

document.onmouseup = function(){
	document.onmousemove = null;
};

$(window).resize(arrange);

$(document).ready(function(){
	var ua = window.navigator.userAgent;//console.log(ua)
	var msie = ua.indexOf('MSIE ');
	var trident = ua.indexOf('Trident/');
	var edge = ua.indexOf('Edge/');
	if (msie > 0 || trident > 0 || edge > 0){

		isIE = true;

		if(ua.indexOf('MSIE 9') > 0){
			$('#slider').remove();

			$('#swing_o_frame').append('<div id="range_trident"><div class="range_trident" id="plus_left">+</div><div class="range_trident" id="plus_right">+</div><div class="display_none" id="slider" value="50"></div><div id="horiz_bar"><div id="marker_trident"></div></div></div>');

			$('.range_trident').click(function(){
			
				if(this.id == 'plus_left'){
					slider.value = Number(slider.value) - 5;
				}
				if(this.id == 'plus_right'){
					slider.value = Number(slider.value) + 5;
				}
				if(slider.value <= 0){
					slider.value = 0;
				}
				if(slider.value >= 200){
					slider.value = 200;
				}

				$('#marker_trident').css({left:((slider.value / 2)) + '%'});

				swing_value();//11
			})
		}

		init();
	}else{
		init();
	}
});

/*2019*/
// $(window).on('contextmenu',(e)=>{//THIS CAUSES A SYNTAX ERROR IN IE11 - DO NOT USE
// 	e.preventDefault();
// },false);

// $(window).on('keydown',(e)=>{
// 	if((e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 85) && e.altKey && (e.metaKey || e.ctrlKey)){
// 		e.preventDefault();
// 	}
// });

function fetchHeader(url, wch) {
	try {
		var req=new XMLHttpRequest();
		req.open("HEAD", url, false);
		req.send(null);
		if(req.status== 200){
			return new Date(req.getResponseHeader(wch));
		}
		else return false;
	} catch(er) {
		return er.message;
	}
}

// console.log(fetchHeader('script/json/may_13_02.js?t=' + new Date().getTime(),'Last-Modified'));
// console.log(new Date(fetchHeader('script/json/may_13_02.js?t=' + new Date().getTime(),'Last-Modified')));
// console.log(fetchHeader('script/json/may_15_01.js?t=' + new Date().getTime(),'Last-Modified'));
function loading(str){
	// console.log('loading')

	$('.load').removeClass('display_none');
	setTimeout(function(){
		set_mode(mode);
	},125)
	
};

function loaded(){
	// console.warn('LOADED')
	// clearInterval(dotsInterval);
	$('.load').addClass('display_none');
};
/*2019*/