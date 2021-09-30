var options = {
  easing: "linear",
  rotation: "none",
}
var currentIcon = 0;
var arrayOfIcons = ["close", "square", "hamburger", "triangle", "circle", "sun"];
var myIcons = new SVGMorpheus("#myIconSet", options);


function startIconChange() {

  setInterval(changeIcon, 1000);
}

function changeIcon() {

  currentIcon = (currentIcon + 1 >= arrayOfIcons.length) ? 0 : currentIcon + 1;
  myIcons.to(arrayOfIcons[currentIcon]);
  if (arrayOfIcons[currentIcon] === "sun") {
    document.getElementById("myIconSet").classList.add('sun');
  } else {
    document.getElementById("myIconSet").classList.remove("sun");
  }
}