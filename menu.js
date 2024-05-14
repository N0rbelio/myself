  // Function to check scroll position and apply appropriate class to nav
/*   function checkScrollPosition() {
    var nav = document.getElementById('navbar');
    if (window.pageYOffset > 20) {
      nav.classList.add('hidden');
      nav.classList.remove('full');
    } else {
      nav.classList.remove('hidden');
      nav.classList.add('full');
    }
  } */

  // Check scroll position when page loads
/*   window.addEventListener('load', checkScrollPosition); */

  // Check scroll position on scroll event
/*   window.addEventListener("scroll", checkScrollPosition); */



  /* nav bar scripting */
  let sidebar = document.querySelector(".sidebar");
  let closeBtn = document.querySelector("#btn");
  let scrollTopBtn = document.querySelector("#scroll_top"); 
  closeBtn.addEventListener("click", ()=> { /* close event  */ 
      sidebar.classList.toggle("open");   
      menuBtnChange();/* alterar btn */
      });

  function menuBtnChange() {
      if(sidebar.classList.contains("open")) {         /* validar se esta aberto ou n  */
          closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      }
      else {  
          closeBtn.classList.replace("bx-menu-alt-right","bx-menu"); 
      }
  }