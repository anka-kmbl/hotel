'use strict';

const personObj = {}; 

window.onscroll = function() {
	document.getElementsByClassName('nav')[0].style.backgroundColor = '#888485';
};
window.onload = function() {
	document.getElementsByClassName('step')[0].style.border = 'solid 3px #FD6290';
	document.getElementsByName('card-number')[0].required = true;
	document.getElementsByClassName('expiry')[0].required = true;
	document.getElementsByClassName('cvc')[0].required = true;
	document.getElementsByClassName('success')[0].classList.add('displayNone');
};

document.getElementById('goBackStart').onclick = goBack;

document.getElementById('dataForm').addEventListener('submit', (e) => {
	e.preventDefault();
	getNewData()
		.then((result) => {
			let rooms = result;
			display(1, 'hotelsPage');
			displayRooms(rooms);
		})
		.catch((err) => {
			// alert('К сожалению,в одном номере может проживать не более 4х человек. Введите, пожалуйста, другое количество.');
			document.getElementById('popup').style.visibility = 'visible';
			
			console.log(err);
		});
});
document.getElementById('goBackToForm').addEventListener('click', (e) => {
	e.preventDefault();
	display(0, 'formDiv');
});
document.getElementById('goBackPickRooms').addEventListener('click', (e) => {
	e.preventDefault();
	getNewData()
		.then((result) => {
			let rooms = result;
			display(1, 'hotelsPage');
			displayRooms(rooms);
		})
		.catch((err) => {
			if(err == 'date') {
				console.log('date');
			}
			if(err == 'peopleNum') {
				console.log('peopleNum');
			}
		});

});
document.getElementById('sendMessageButton').addEventListener('click', (e) => {
	e.preventDefault();
	alert('Спасибо за сообщение! Оператор скоро свяжется с вами.');
});
document.getElementById('filterForm').addEventListener('submit', (e) => {
	e.preventDefault();
	let form = document.getElementById('filterForm');
	let inputs = form.getElementsByTagName('input');
	let formData = {};
	for(let i = 0; i < inputs.length - 1; i++) {
		if(inputs[i].checked) {
			if(inputs[i].name == 'budget') {
				switch(inputs[i].id) {
				case 'budget1':
					formData.price = 110;
					break;
				case 'budget2':
					formData.price = 150;
					break;
				case 'budget3':
					formData.price = 200;
					break;
				case 'budget4':
					formData.price = 10000;
					break;
				}
			} if(inputs[i].name == 'meal') {
				formData.meal = inputs[i].value;
				
			}	else {
				formData[inputs[i].id] = inputs[i].value;
			}
		} 
	}
	console.log(formData);
	filter(formData)
		.then((res) => {
			displayRooms(res);
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
});


document.getElementById('payForm').addEventListener('submit', (e) => {
	e.preventDefault();
	display(3, 'success');
});
function filter(data) {
	return new Promise((res,rej) => {
		let xhr = new XMLHttpRequest();
		xhr.open('POST', 'api/pickRoom/filter');
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(data));
		xhr.addEventListener('load', (e) => {
			let xhttp = e.target;
			if(xhttp.status !== 200) {
				rej(xhttp.response);
			}
			res(JSON.parse(xhttp.response));
		});

	});
}
function goBack() {
	display(0, 'formDiv');
	
}
function display(step, pageToSee) {
	document.getElementsByClassName('formDiv')[0].classList.add('displayNone');
	document.getElementsByClassName('hotelsPage')[0].classList.add('displayNone');
	document.getElementsByClassName('paymentPage')[0].classList.add('displayNone');
	document.getElementsByClassName('success')[0].classList.add('displayNone');
	for(let i = 0; i < document.getElementsByClassName('step').length; i++) {
		document.getElementsByClassName('step')[i].style.border = ' 1px solid #937B71';
	}
	
	document.getElementsByClassName(pageToSee)[0].classList.remove('displayNone');
	document.getElementsByClassName('step')[step].style.border = 'solid 3px #FD6290';
	// document.getElementsByClassName('hotelsPage')[0].classList.toggle('displayNone');
	
}
function displayRooms(roomsObj) {
	
	let hotelsCont = document.getElementsByClassName('hotelsContainer')[0];
	
	hotelsCont.innerHTML = '';
	if(Object.keys(roomsObj).length === 0 ){
		let errorText = document.createElement('p');
		errorText.innerHTML = 'К сожалению, по вашему запросу не найдено свободных номеров.<br/>' + 
		'Выберите другие фильтры или даты.'; 
		hotelsCont.appendChild(errorText);
	}
	
	for(let key in roomsObj) {
		let div = document.createElement('div');
		let divPhoto = document.createElement('div');
		let name = document.createElement('p');
		name.innerHTML = roomsObj[key].name;
		let img = document.createElement('img');
		img.src = roomsObj[key].photo;
		let info = document.createElement('ul');
		let chooseButton = document.createElement('button');
		chooseButton.innerHTML = 'Забронировать';
		chooseButton.classList.add('chooseButton');
		chooseButton.classList.add('generalButtonStyle');
		let price = document.createElement('li');
		price.innerHTML = roomsObj[key].price + '$';
		// info.appendChild(name);
		info.appendChild(price);
		let wifi = document.createElement('li');
		let meal = document.createElement('li');
		let bathroom = document.createElement('li');
		let balcony =document.createElement('li');
		let kitchen =document.createElement('li');
		console.log(roomsObj[key].facilities);
		if(roomsObj[key].facilities.wifi) {
			wifi.innerHTML = 'бесплатный Wi-Fi';
			info.appendChild(wifi);
		}
		if(roomsObj[key].facilities.bathroom) {
			bathroom.innerHTML = 'ванная комната и туалет';
			info.appendChild(bathroom);
		}
		if(roomsObj[key].facilities.kitchen) {
			kitchen.innerHTML = 'мини-кухня';
			info.appendChild(kitchen);
		}
		if(roomsObj[key].facilities.balcony) {
			balcony.innerHTML = 'балкон';
			info.appendChild(balcony);
		}

		switch(roomsObj[key].meal) {
		case 'breakfast':
			meal.innerHTML = 'завтрак включен';
			info.appendChild(meal);
			break;
		case 'breakfastNdinner':
			meal.innerHTML = 'завтрак и ужин';
			info.appendChild(meal);
			break;
		case 'all':
			meal.innerHTML = 'полный пансион';
			info.appendChild(meal);
			break;
		case '':
			meal.innerHTML = 'питание не входит в стоимость';
			info.appendChild(meal);
			break;
		}
		divPhoto.appendChild(name);
		divPhoto.appendChild(img);
		div.appendChild(divPhoto);
		div.appendChild(info);
		div.appendChild(chooseButton);
		chooseButton.addEventListener('click',(button) => {
			button.preventDefault();
			let thisDiv = div;
			display(2, 'paymentPage');
			let personInfo = createPersonInfoDiv(personObj);
			let paymentPage = document.getElementsByClassName('paymentPage')[0];
			let oldInfo = paymentPage.children[0];
			let oldRoom = paymentPage.children[1];
			if(paymentPage.children.length >= 4) {
				paymentPage.removeChild(oldInfo);
				paymentPage.removeChild(oldRoom);
			}
			
			paymentPage.insertBefore(thisDiv,document.getElementsByClassName('paymentForm')[0]);
			paymentPage.insertBefore(personInfo,thisDiv);
			paymentPage.getElementsByClassName('chooseButton')[0].classList.add('displayNone');
			// chooseRoom(thisDiv);
		});
		divPhoto.classList.add('roomsPhotoDiv');
		div.classList.add('roomsInfoDiv');
		info.classList.add('roomsInfoList');
		hotelsCont.appendChild(div);

	}
}

function createPersonInfoDiv(personObj) {
	let div = document.createElement('div');
	div.classList.add('buyerInfo');
	let p = document.createElement('p');
	let hp = document.createElement('p');
	if(personObj.numChildren > 0) {
		hp.innerHTML = 'Проверьте, пожалуйста, ваши данные:';
		p.innerHTML = 
		'Фамилия: ' + personObj.firstName + '<br/>'+
		'Имя: ' + personObj.lastName + '<br/>' + 
		'Отчество: ' + personObj.patr + '<br/>' + 
		'Дата въезда: ' + personObj.checkIn + '<br/>' + 
		'Дата отъезда: ' + personObj.checkOut + '<br/>' + 
		'Количество взрослых: ' + personObj.numAdults + '<br/>' + 
		'Количество детей: ' + personObj.numChildren + '<br/>';
	} else {
		hp.innerHTML = 'Проверьте, пожалуйста, ваши данные:<br/> ';
		p.innerHTML = 
		'Фамилия: ' + personObj.firstName + '<br/>'+
		'Имя: ' + personObj.lastName + '<br/>' + 
		'Отчество: ' + personObj.patr + '<br/>' + 
		'Дата въезда: ' + personObj.checkIn + '<br/>' + 
		'Дата отъезда: ' + personObj.checkOut + '<br/>' + 
		'Количество взрослых: ' + personObj.numAdults + '<br/>';
	}
	hp.classList.add('headRes');
	div.appendChild(hp);
	div.appendChild(p);
	
	return div;
}

function getNewData() {
	let firstName = document.getElementsByName('firstName')[0].value;
	personObj.firstName = firstName;
	let lastName = document.getElementsByName('lastName')[0].value;
	personObj.lastName = lastName;
	let patr = document.getElementsByName('patr')[0].value;
	personObj.patr = patr;
	let checkIn = document.getElementsByName('checkIn')[0].value;
	personObj.checkIn= checkIn;
	let checkOut = document.getElementsByName('checkOut')[0].value;
	personObj.checkOut= checkOut;
	let numAdultsSelect = document.getElementsByName('numAdults')[0];
	let numAdults = +numAdultsSelect.options[numAdultsSelect.selectedIndex].value;
	personObj.numAdults = numAdults;
	let numChildrenSelect = document.getElementsByName('numChildren')[0];
	let numChildren = +numChildrenSelect.options[numChildrenSelect.selectedIndex].value;
	personObj.numChildren = numChildren;
	let peopleNum = numAdults + numChildren;

	if(peopleNum > 4) {
		return new Promise((res, rej) => {
			rej('peopleNum');
		});
	}
	
	return new Promise((res, rej) => {
		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/pickRoom');
		xhr.setRequestHeader('Content-Type', 'application/json');
		
		xhr.send(JSON.stringify({
			peopleNum: +peopleNum,
			firstName: firstName,
			lastName: lastName,
			patr: patr,
			checkIn: checkIn,
			checkOut: checkOut
		}));
		xhr.addEventListener('load', (e) => {
			let xhttp = e.target;
			if(xhttp.status !== 200) {
				rej(xhttp.response);
			}
			
			let result = JSON.parse(xhttp.response);
			console.log(result);
			res(result);
		});
	});
}


$(document).ready(function() {

	$('#Closet').click(function(){
		$('#advice').fadeOut(400);
	});	

	$('#fader').click(function(){
		$('#popup').css('visibility', 'hidden');
	});
	
	$(window).on('scroll', function(e){
		if($(window).scrollTop() >= $('.nav').height()) {
				 $('.nav').css('background-color', 'black');
		} 
		else {
			$('.nav').css('background-color', 'rgba(0,0,0,0)');	
				
		}
	});
});
	
function advice(){
	document.getElementById('advice').style.opacity = '1';
}
		

var no_active_delay = 3;
var now_no_active = 0;
setInterval('now_no_active++',1000);
setInterval('adviceSend()',1000);
			
document.onscroll = activeUser;
setInterval(function(){if($(window).scrollTop() > 1000){activeUser();}},1000);
			


function activeUser() {
	now_no_active = 0; 
}
function adviceSend(){
	if(now_no_active >= no_active_delay){
		advice();
					
	}
				
}
$('a[href*="#"]')
// Remove links that don't actually link to anything
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
		// On-page links
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
					&& 
					location.hostname == this.hostname
		) {
			// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000, function() {
					// Callback after animation
					// Must change focus!
					var $target = $(target);
					$target.focus();
					if ($target.is(':focus')) { // Checking if the target was focused
						return false;
					} else {
						$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
						$target.focus(); // Set focus again
					}
				});
			}
		}
	});


			