//                                //
// SLIDING PARALLAX PHOTO COLLAGE //
//                                //
const track = document.getElementById("image-track");
// creates variable 'track' to be used in javascript, representing image-track from html
const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

// dataset.mouseDownAt can simply be seen as a translation of data-mouse-down-at

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";  
    track.dataset.prevPercentage = track.dataset.percentage;
}
  
const handleOnMove = e => {
    if(track.dataset.mouseDownAt === "0") return;
    
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;
    
    const percentage = (mouseDelta / maxDelta) * -100,
          nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
          nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    
    track.dataset.percentage = nextPercentage;
    
    track.animate({
      transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });
    
    for(const image of track.getElementsByClassName("image")) {
      image.animate({
        objectPosition: `${100 + nextPercentage}% center`
      }, { duration: 1200, fill: "forwards" });
    }
}

window.onmousedown = e => handleOnDown(e);

// The above code simply states that whenever the mouse is pressed down,
// the function, 'handleOnDown' will be called and do whatever it is to do.

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

//                                 //
// FADE ALL SQUARES EXCEPT HOVERED //
//                                 //
const squares = document.querySelectorAll('.square');

squares.forEach(square => {
  square.addEventListener('mouseover', () => {
    // Set opacity of all other squares to 0.5
    squares.forEach(otherSquare => {
      if (otherSquare !== square) {
        otherSquare.style.opacity = 0.5;
      }
    });
  });

  square.addEventListener('mouseout', () => {
    // Reset opacity of all other squares to 1
    squares.forEach(otherSquare => {
      if (otherSquare !== square) {
        otherSquare.style.opacity = 1;
      }
    });
  });
});