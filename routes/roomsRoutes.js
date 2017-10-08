'use strict';
const express = require('express');
let router = express.Router();
// let roomsStorage = require('../rooms');
let roomsObj = {
	singleStandart:{
		name: 'Одноместный стандарт',
		price: 80,
		peopleNum: 1,
		facilities: {
			wifi: true
		},
		photo: '/images/single-room-1.jpg',
		meal: 'noMeal'
     

	},
	singleStandartBetter:{
		name: 'Одноместный стандарт улучшенный',
		price: 85,
		peopleNum: 1,
		facilities: {
			wifi: true,
			balcony: true,
		},
		meal: 'breakfast',
		photo: '/images/single-room-2.jpg'

	},
	singleLux:{
		name: 'Одноместный люкс',
		price: 95,
		peopleNum: 1,
		facilities: {
			wifi: true,
			balcony: true,
			kitchen: true,
			bathroom: true
		}, 
		meal: 'breakfastNdinner',
		photo: '/images/single-room-4.jpg'
    

	},
	doubleEconom:{
		name: 'Стандарт двуместный',
		price: 100,
		peopleNum: 2,
		facilities: {
			wifi: true
		},
		meal: 'noMeal',
		photo: '/images/double-1.jpg'
    
    

	},
	doubleStandart :{
		name: 'Стандарт двуместный',
		price: 125,
		peopleNum: 2,
		facilities: {
			wifi: true,
			bathroom: true
		}, 
		meal: 'breakfast',
		photo: '/images/double-2.jpg'
    

	},
	doubleStandartBetter :{
		name: 'Стандарт двуместный улучшенный',
		price: 145,
		peopleNum: 2,
		facilities: {
			wifi: true,
			bathroom: true,
			kitchen: true
		}, 
		meal: 'breakfastNDinner',
		photo: '/images/double-3.jpg'
    

	},
	doubleLux :{
		name: 'Двуместный люкс',
		price: 170,
		peopleNum: 2,
		facilities: {
			wifi: true,
			bathroom: true,
			kitchen: true,
			balcony: true,
		}, 
		meal: 'all',
		photo: '/images/double-4.jpg'
    

	},
	tripleEconom :{
		name: 'Трехместный эконом',
		price: 120,
		peopleNum: 3,
		facilities: {
			wifi: true
		}, 
		meal: 'noMeal',
		photo: '/images/triple-1.jpg'
    

	},
	tripleStandart :{
		name: 'Трехместный стандарт',
		price: 170,
		peopleNum: 3,
		facilities: {
			wifi: true,
			bathroom: true
		}, 
		meal: 'breakfast',
		photo: '/images/triple-2.jpg'
    

	},
	tripleLux:{
		name: 'Трехместный люкс',
		price: 220,
		peopleNum: 3,
		facilities: {
			wifi: true,
			bathroom: true,
			kitchen: true,
			balcony: true
		}, 
		meal: 'all',
		photo: '/images/triple-3.jpg'
    

	},
	fourStandart:{
		name: 'Четырехместный стандарт',
		price: 230,
		peopleNum: 4,
		facilities: {
			wifi: true,
			bathroom: true
		}, 
		meal: 'breakfast',
		photo: '/images/four-1.jpg'
    

	},
	fourLux:{
		name: 'Четырехместный люкс',
		price: 300,
		peopleNum: 4,
		facilities: {
			wifi: true,
			bathroom: true,
			kitchen: true,
			balcony: true
		}, 
		meal: 'all',
		photo: '/images/four-2.jpg'
    

	}
};
let apprRooms;
let budget = {
	110: 0,
	150: 110,
	200: 150,
	201: 10000
};
router.post('/', (req, res) => {
	console.log(req.body);
	
	apprRooms = findApprRooms(req.body);
	console.log(apprRooms);
	res.send(JSON.stringify(apprRooms));
	// res.send(JSON.stringify({resp: true}));
	// res.send('ok');
  
});

router.post('/filter', (req, res) => {
	console.log(req.body);
	let filters = req.body;
	let filteredRooms = findFilterRooms(filters);
	console.log(filteredRooms);
	res.json(filteredRooms);
});

function findFilterRooms(filters) {
	let max = filters.price;
	let min = budget[filters.price];
	let filteredRooms = {};
	let count = 0;
	let countFilters = 0;
	for(let j in apprRooms) {
		if(apprRooms[j].price >= min && apprRooms[j].price <= max) {
			if(apprRooms[j].meal == filters.meal) {
				for(let key in apprRooms.facilities) {
					for(let i in filters) {
						countFilters++;
						if(i == key) {
							count++;
						}
					}
						
				}
				console.log(count);
				console.log(countFilters);
				if(countFilters - 1 <= count) {
					filteredRooms[j] = apprRooms[j];
				}
			}
		}
	}
	return filteredRooms;
	
}
function findApprRooms(options) {
	let rooms = {};
	let check = false;
	for(let key in roomsObj) {
		if(roomsObj[key].peopleNum === options.peopleNum) {
			rooms[key] = roomsObj[key];
			check = true;
		}
	}
	if(!check) {
		return 0;
	}
	return rooms;
}

module.exports = router;