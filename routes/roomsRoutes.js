'use strict'
const express = require('express');
let router = express.Router();
let roomsStorage = require('../rooms');
let roomsObj = {
  singleStandart:{
    name: 'Одноместный стандарт',
    price: 80,
    peopleNum: 1,
    roomFacilities: {
      wifi: true
    },
     

  },
  singleStandartBetter:{
    name: 'Одноместный стандарт улучшенный',
    price: 85,
    peopleNum: 1,
    facilities: {
      wifi: true,
      balcony: true,
    },
    meal: 'breakfast'

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
    meal: 'beakfastNdinner'
    

  },
  doubleEconom:{
    name: 'Стандарт двуместный',
    price: 100,
    peopleNum: 2,
    facilities: {
      wifi: true
    }
    
    

  },
  doubleStandart :{
    name: 'Стандарт двуместный',
    price: 125,
    peopleNum: 2,
    facilities: {
      wifi: true,
      bathroom: true
    }, 
    meal: 'beakfast'
    

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
    meal: 'breakfastNDinner'
    

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
    meal: 'all'
    

  },
  tripleEconom :{
    name: 'Трехместный эконом',
    price: 120,
    peopleNum: 3,
    facilities: {
      wifi: true
    }, 
    meal: 'no'
    

  },
  tripleStandart :{
    name: 'Трехместный стандарт',
    price: 170,
    peopleNum: 3,
    facilities: {
      wifi: true,
      bathroom: true
    }, 
    meal: 'breakfast'
    

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
    meal: 'all'
    

  },
  fourStandart:{
    name: 'Четырехместный стандарт',
    price: 230,
    peopleNum: 4,
    facilities: {
      wifi: true,
      bathroom: true
    }, 
    meal: 'breakfast'
    

  },
  fourLux:{
    name: 'Четырехместный стандарт',
    price: 300,
    peopleNum: 4,
    facilities: {
      wifi: true,
      bathroom: true,
      kitchen: true,
      balcony: true
    }, 
    meal: 'all'
    

  }
}
router.get('/', (req, res) => {

  // res.send(JSON.stringify({resp: true}));
  // res.send('ok');
  
})


module.exports = router;