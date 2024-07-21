
  
  function openNavBasket() {    
    var sidebar = document.getElementById("mySidebarBasket");
   
    sidebar.style.width = "400px";
    document.body.style.backgroundColor = 'rgba(0,0,0,0.4) !important';

    if (window.matchMedia("(max-width: 700px)").matches) {
        sidebar.style.width = "100%";
    }
}

  function closeNavBasket() {
    document.getElementById("mySidebarBasket").style.width = "0";
    sidebar.classList.remove("open-animation"); 

  }

  window.onclick = function (event) {
    var sidebar = document.getElementById("mySidebarBasket");
    var openButton = document.getElementById("blog");
    

    if (sidebar && openButton) {
      if (event.target != sidebar && !sidebar.contains(event.target) && event.target != openButton) {
        sidebar.style.width = "0";
        sidebar.classList.remove("open-animation"); 
    }
    }

};


