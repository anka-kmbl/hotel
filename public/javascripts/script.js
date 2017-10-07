'use strict';
// window.addEventListener('scroll', (e) => {
//   document.getElementsByClassName('nav')[0].style.backgroundColor = '#937B71';
// })
window.onscroll = function() {
	document.getElementsByClassName('nav')[0].style.backgroundColor = '#888485';
};
window.onload = function() {
	document.getElementsByClassName('step')[0].style.border = 'solid 3px #FD6290';
};

document.getElementById('goBackStart').onclick = goBack;

document.getElementById('dataForm').addEventListener('submit', (e) => {
	e.preventDefault();
	getNewData()
		.then((result) => {
			let rooms = result;
			// displayRoomsCont();
			display(1, 'hotelsPage');
			displayRooms(rooms);
			// document.getElementsByClassName('container')[0].innerHTML = result;
			// document.getElementById('formData').classList.add('displayNone');
			// document.getElementsByClassName('step')[1].style.borderColor = '#FD6290';
			// document.getElementsByClassName('step')[1].style.border = 'solid 3px #FD6290';
		})
		.catch((err) => {
			console.log(err);
		});
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
					formData.price = 201;
					break;
				}
			} if(inputs[i].name == 'meal') {
				formData.meal = inputs[i].value;
				
			}	else {
				formData[inputs[i].id] = inputs[i].value;
			}
		} 

		// if(inputs[i].type == 'text') {
		// 	formData[inputs[i].id] = inputs[i].value;
		// }
	}
	console.log(formData);
	filter(formData)
		.then((res) => {
			// let rooms = JSON.parse(res);
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
});

// function displayStart() {
	
// }
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
	// document.getElementsByClassName('payment')[0].classList.add('displayNone');
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
	if(roomsObj === 0){
		let errorText = document.createElement('p');
		errorText.innerHTML = 'К сожалению, в номерах может разместиться не более 4 человек.<br/>' +
		'Предлагаем забронировать два подходящих номера отдельно.<br/> '+
		'Вы можете вернуться и ввести другое количество людей, нажав на кнопку ниже.<br/>';
		let backButton = document.createElement('button');
		backButton.onclick = goBack;
		backButton.innerHTML = 'Указать другое количество';
		hotelsCont.appendChild(errorText);
		hotelsCont.appendChild(backButton);
		

	}
	
	for(let key in roomsObj) {
		let div = document.createElement('div');
		let divPhoto = document.createElement('div');
		let name = document.createElement('p');
		name.innerHTML = roomsObj[key].name;
		let img = document.createElement('img');
		img.src = roomsObj[key].photo;
		let info = document.createElement('ul');

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
			meal.innerHTML = 'Завтрак включен';
			info.appendChild(meal);
			break;
		case 'breakfastNdinner':
			meal.innerHTML = 'Завтрак и ужин';
			info.appendChild(meal);
			break;
		case 'all':
			meal.innerHTML = 'Полный пансион';
			info.appendChild(meal);
			break;
		case '':
			meal.innerHTML = 'Питание не входит в стоимость';
			info.appendChild(meal);
			break;
		}

		// div.appendChild(name);
		// div.appendChild(img);
		divPhoto.appendChild(name);
		divPhoto.appendChild(img);
		div.appendChild(divPhoto);
		div.appendChild(info);
		divPhoto.classList.add('roomsPhotoDiv');
		div.classList.add('roomsInfoDiv');
		info.classList.add('roomsInfoList');
		hotelsCont.appendChild(div);

	}
}
function getNewData() {
	let firstName = document.getElementsByName('firstName')[0].value;
	let lastName = document.getElementsByName('lastName')[0].value;
	let patr = document.getElementsByName('patr')[0].value;
	let checkIn = document.getElementsByName('checkIn')[0].value;
	let checkOut = document.getElementsByName('checkOut')[0].value;
	let numAdultsSelect = document.getElementsByName('numAdults')[0];
	let numAdults = +numAdultsSelect.options[numAdultsSelect.selectedIndex].value;
	let numChildrenSelect = document.getElementsByName('numChildren')[0];
	let numChildren = +numChildrenSelect.options[numChildrenSelect.selectedIndex].value;
	let peopleNum = numAdults + numChildren;
	
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
// function setNewData()