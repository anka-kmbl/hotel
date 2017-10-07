'use strict';
// window.addEventListener('scroll', (e) => {
//   document.getElementsByClassName('nav')[0].style.backgroundColor = '#937B71';
// })
window.onscroll = function() {
  document.getElementsByClassName('nav')[0].style.backgroundColor = '#888485';
}

document.getElementById('dataForm').addEventListener('submit', (e) => {
  e.preventDefault();
  getNewData()
    .then((result) => {
      document.getElementsByClassName('container')[0].innerHTML = result;
      document.getElementsByClassName('step')[1].style.borderColor = '#FD6290';
    })
    .catch((err) => {
      console.log(err);
    })
})

function getNewData() {
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/pickRoom');
    xhr.send();
    xhr.addEventListener('load', (e) => {
      let xhttp = e.target;
      if(xhttp.status !== 200) {
        rej(xhttp.response);
      }
      let result = JSON.parse(xhttp.response);
      res(result.resp);
    })
  })
}
// function setNewData()