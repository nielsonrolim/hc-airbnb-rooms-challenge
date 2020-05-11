// Initialize and add the map
function initMap() {
  // The location of João Pessoa
  var joaoPessoa = { lat: -7.0971672, lng: -34.8513686 };
  // The map, centered at João Pessoa
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: joaoPessoa,
  });
  // The marker, positioned at João Pessoa
  var marker = new google.maps.Marker({ position: joaoPessoa, map: map });
}


function ready(callbackFunc) {
  if (document.readyState !== 'loading') {
    // Document is already ready, call the callback directly
    callbackFunc();
  } else if (document.addEventListener) {
    // All modern browsers to register DOMContentLoaded
    document.addEventListener('DOMContentLoaded', callbackFunc);
  } else {
    // Old IE browsers
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'complete') {
        callbackFunc();
      }
    });
  }
}

ready(function () {
  var roomsDiv = document.getElementById("rooms");

  data = fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      for (let apt of data) {

        let aptTypeDiv = document.createElement("div");
        aptTypeDiv.classList.add("apt-type");
        let aptTypeContent = document.createTextNode(apt.property_type); 
        aptTypeDiv.appendChild(aptTypeContent);

        let aptNameDiv = document.createElement("div");
        aptNameDiv.classList.add("apt-name");
        let aptNameContent = document.createTextNode(apt.name); 
        aptNameDiv.appendChild(aptNameContent);

        let aptPriceDiv = document.createElement("div");
        aptPriceDiv.classList.add("apt-price");
        let aptPriceContent = document.createTextNode(formatPriceToReal(apt.price)); 
        aptPriceDiv.appendChild(aptPriceContent);

        let aptImg = document.createElement("img");
        aptImg.setAttribute("src", apt.photo);
        aptImg.setAttribute("width", "275");

        let roomDiv = document.createElement("div");
        roomDiv.classList.add("room");
        roomDiv.appendChild(aptImg);
        roomDiv.appendChild(aptTypeDiv);
        roomDiv.appendChild(aptNameDiv);
        roomDiv.appendChild(aptPriceDiv);

        roomsDiv.appendChild(roomDiv);
      }
    });
});

function formatPriceToReal(price) {
  return `R$ ${price}`
}