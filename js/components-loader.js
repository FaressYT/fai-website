(function () {
  function loadComponent(id, url, callback) {
    var element = document.getElementById(id);
    if (!element) return;
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = xhr.responseText;
        var newElement = tempDiv.firstElementChild;
        
        if (callback) {
          callback(newElement);
        }
        
        if (element.parentNode) {
          element.parentNode.replaceChild(newElement, element);
        }
      }
    };
    xhr.send();
  }

  // Load Topbar
  loadComponent("topbar-placeholder", "/components/topbar.html");
  
  // Load Navbar
  loadComponent("navbar-placeholder", "/components/navbar.html", function (newNavbar) {
    var path = window.location.pathname.split("/").pop();
    if (path === "" || path === "/" || !path) {
      path = "index.html";
    }
    
    var navLinks = newNavbar.querySelectorAll(".navbar-nav .nav-link");
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === path) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });

  // Load Footer
  loadComponent("footer-placeholder", "/components/footer.html", function (newFooter) {
    if (typeof WOW !== 'undefined') {
      new WOW().init();
    }
  });
})();
