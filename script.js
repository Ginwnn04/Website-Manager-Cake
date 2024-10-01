window.addEventListener('scroll', function() {
    var navbar = document.getElementsByClassName("nav-bar")[0];
    var firstItem = document.querySelector('.nav-bar ul li:first-child a');
    if (window.pageYOffset >= 75) {
      navbar.classList.add("top");  
      firstItem.classList.add("test");
      firstItem.classList.add("test1");
    }
    else {
      navbar.classList.remove("top"); 
      firstItem.classList.remove("test");
      firstItem.classList.remove("test1");
    }
});
  
