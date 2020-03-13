"use strict";
var webapp = {}
  , $window = $(window)
  , $body = $("body");

(function() {
  if ($("#home-news").length) {
    var a = $("#home-news").find(".home-news__inner"),
      i = a.width() / 50;
    a.css("animation", "marquee " + (i < 15 ? 15 : i) + "s linear infinite");
  }

  var t = {
    el: $("#offset-menu"),
    isVisible: !1,
    trigger: $("#offset-menu-toggle"),
    toggle: function() {
      this.isVisible
        ? $body.removeClass("is-showing-offset-menu")
        : ($body.hasClass("is-showing-mini-cashier") &&
            $body.removeClass("is-showing-mini-cashier"),
          $body.addClass("is-showing-offset-menu")),
        (this.isVisible = !this.isVisible);
    }
  };
  t.trigger.on("click", function() {
    t.toggle();
  }),
  t.el.on("click", function(e) {
    "offset-menu" === $(e.target).attr("id") && t.toggle();
  });
  $body.on("click", ".btn-toggle-password", function() {
    var e = $(this).parent().find("input")
      , t = "password" === e.attr("type") ? "text" : "password";
    e.attr("type", t)
  });
  

  $body.on("click", '#modal-login-signup [data-open-modal]', function() {
    var e = $(this).parents().find(".multipage-container");
    e.css("transform", "translateX(-100%)");
  });

  
  $body.on("click", "[data-modal]", function () {
    var targetSwitch = $(this).attr('data-switch');
    var target = $(this).attr('data-target');
    switch (targetSwitch) {
      case 'login': {
        $(target).find('.multipage-container').css("transform", "translateX(0)");
        
        break;
      }
      case 'signup': {
        $(target).find('.multipage-container').css("transform", "translateX(-100%)"); 
        break;
      }
    }
  });


  // data-drawer
  $body.on("click", "[data-drawer]", function () {
    var target = $(this).attr('data-drawer');
    $(target).addClass('is-visible');
  });
  $body.on("click", '[data-dismiss="drawer"]', function () {
    var target = $(this).parents('.drawer');
    target.removeClass('is-visible');
  });

  // dialog
  $body.on("click", "[data-dialog]", function () {
    var target = $(this).attr('data-dialog');
    $(target).addClass('is-visible');
  });
  $body.on("click", '[data-dismiss="dialog"]', function () {
    var target = $(this).parents('.dialog-wrapper');
    target.removeClass('is-visible');
  });


  var timer;
  // dialog
  $body.on("click", '[data-dismiss="dialog"]', function () {
    var target = $(this).parents('.dialog-wrapper');
    var targetDialog = $(this).attr('data-dialog');

    switch(targetDialog) {
      case "verify": {
        // fetch api to verify

        clearTimeout(timer);
        $('#modal-slack-loader').addClass('is-visible');
        timer = setTimeout(function() {
          target.removeClass('is-visible');
          $('#modal-slack-loader').removeClass('is-visible');
        }, 2000);
        break;
      }
      default: {
        target.removeClass('is-visible');
        break;
      }
    }
  });


  // promotion: load ajax to get detail
  $body.on("click", '#promotions .item > [role="button"]', function () {
    clearTimeout(timer);
    $('#modal-slack-loader').addClass('is-visible');
    timer = setTimeout(function() {
      $('#drawer-promotion-details').addClass('is-visible');
      $('#modal-slack-loader').removeClass('is-visible');
    }, 2000);
  });
})();


// Use ajax for register
function gotoNextStepRegister(el) {
  $(el)
    .parents('.multipage-container')
    .css("transform", "translateX(-200%)");
}

// Use for cat type
function handleCatTypeClick(el) {
  $('.home-category-list').removeClass('is-visible');
  if (el.checked) {
    var target = el.value;
    $(target).addClass('is-visible');
  }
}