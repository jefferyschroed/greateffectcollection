window.onload = function() {
    document.body.classList.add("loaded");
    var mainTextElements = document.querySelectorAll('.mainText');
    for (var i = 0; i < mainTextElements.length; i++) {
        mainTextElements[i].classList.add('loaded');
    }
}
