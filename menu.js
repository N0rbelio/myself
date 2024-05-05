  // Function to check scroll position and apply appropriate class to nav
  function checkScrollPosition() {
    var nav = document.getElementById('navbar');
    if (window.pageYOffset > 20) {
      nav.classList.add('hidden');
      nav.classList.remove('full');
    } else {
      nav.classList.remove('hidden');
      nav.classList.add('full');
    }
  }

  // Check scroll position when page loads
  window.addEventListener('load', checkScrollPosition);

  // Check scroll position on scroll event
  window.addEventListener("scroll", checkScrollPosition);