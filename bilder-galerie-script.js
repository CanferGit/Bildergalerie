

var imageUrls = [
  "./img/statue-pharao.jpg",
  "./img/pharaomaske.jpg",
  "./img/sonnenuntergang-pyramiden.jpg",
  "./img/hyroglüfen.jpg",
  "./img/statue.jpg",
  "./img/historisches-baudenkmal.jpg",
  "./img/obalisk.jpg",
  "./img/thal-der-könige.jpg",
  "./img/bazar.jpg",
  "./img/wüste.jpg",
  "./img/wüste-mit-kamele.jpg",
  "./img/frau-mit-wüstenoptik.jpg",
  "./img/grosse-saelen.jpg",
  "./img/stadtteil.jpg",
  "./img/stadtteile.jpg",
  "./img/museum-statue.jpg",
  "./img/miguel.jpg",
  "./img/back-statue.jpg",
  "./img/tauchen.jpg",
  "./img/schiffe.jpg",
  "./img/steine.jpg",
  "./img/urlaub.jpg",
  "./img/ägypter-auf-kamel.jpg",
  "./img/burg.jpg",
  "./img/kleine-statue.jpg",
  "./img/schilder.jpg"
];

var currentIndex = 0;

function zoomimg(event, index) {
  var clickedImage = event.target;
  currentIndex = index; 
  
  var overlay = createOverlay(clickedImage.src );
  showBackButton(overlay)
  addOverlayListeners(overlay);
  showArrows(overlay);

  
  document.body.appendChild(overlay);
}


function showBackButton(overlay) {
  var backButton = createBackButton();

  overlay.appendChild(backButton);
}

function createBackButton() {
  var backButton = document.createElement("div");
  backButton.classList.add("back");
  backButton.innerHTML = '<img src="./img/zurück.png">';
  backButton.addEventListener("click", removeCurrentOverlay);
  
  return backButton;
}


function createOverlay(imageSrc) {

  createBackButton();
  
  var overlay = document.createElement("div");
  overlay.classList.add("overlay");

  var enlargedImage = document.createElement("img");
  enlargedImage.src = imageSrc;

  overlay.appendChild(enlargedImage);

  return overlay;
}

function addOverlayListeners(overlay) {
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      removeOverlay(overlay);
    }
  });
}

function showArrows(overlay) {
  var leftArrow = createArrow("left");
  var rightArrow = createArrow("right");

  overlay.appendChild(leftArrow);
  overlay.appendChild(rightArrow);
}

function createArrow(direction) {
  var arrow = document.createElement("div");
  arrow.classList.add("arrow", direction);

  var imageDirection = direction === 'left' ? 'links' : 'rechts';
  arrow.innerHTML = '<img src="./img/pfeil-' + imageDirection + '.png">';

  if (direction === 'left') {
    arrow.addEventListener("click", showPreviousImage);
  } else if (direction === 'right') {
    arrow.addEventListener("click", showNextImage);
  }

  return arrow;

}
function removeOverlay(overlay) {
  document.body.removeChild(overlay);
}

function showPreviousImage() {
  currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
  var currentOverlay = document.querySelector(".overlay");
  currentOverlay.firstChild.src = imageUrls[currentIndex];
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % imageUrls.length;
  var currentOverlay = document.querySelector(".overlay");
  currentOverlay.firstChild.src = imageUrls[currentIndex];
}

function lightOnOff() {
  let secondContainer = document.getElementById('secondContainer');
  let light = document.getElementById('light');

  if (secondContainer.style.backgroundColor === 'rgb(0, 0, 0)') {
    secondContainer.style.backgroundColor = 'rgb(180, 180, 180)';
    light.style.backgroundImage = 'url(./img/light-off.png)';
  } else {
    secondContainer.style.backgroundColor = 'rgb(0, 0, 0)';
    light.style.backgroundImage = 'url(./img/light-on.png)';
  }
}


function createGallery() {
  let gallery = document.getElementById('secondContainer');

  for (var i = 0; i < imageUrls.length; i++) {
    gallery.innerHTML += `
      <div class="gallery" id="gallery" onclick="zoomimg(event, ${i})">
        <img src="${imageUrls[i]}">
      </div>`;
  }
}


function removeCurrentOverlay() {
  var currentOverlay = document.querySelector(".overlay");
  removeOverlay(currentOverlay);
}

window.onload = createGallery;