$(document).ready(function () {
  // Add smooth scrolling to all links
  $("a").on("click", function (event) {
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        500,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });

  // Collapse Navbar
  $(window).scroll(function () {
    if ($(document).scrollTop() > 50) {
      $("nav").addClass("shrink");
    } else {
      $("nav").removeClass("shrink");
    }
  });

  // Add/remove background color when click/unclick menu button
  $("#navToggler").click(function () {
    $("#mainNav").toggleClass("navopen");
  });
});

// Swap theme
function swapStyleSheet(sheet) {
  document.getElementById("pagestyle").setAttribute("href", sheet);
}

// Disabling form submissions if there are invalid fields
(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      var forms = document.getElementsByClassName("validation");
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();
