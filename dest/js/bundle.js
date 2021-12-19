"use strict";

/*jshint esversion: 6 */
$(function () {
  var windowWidth = $(window).width();
  /*-------- 画面幅が変わったときに、更新 --------*/

  var autoResizer = function autoResizer() {
    var timer = 0;
    var currentWidth = window.innerWidth;
    $(window).resize(function () {
      if (currentWidth == window.innerWidth) {
        return;
      }

      if (timer > 0) {
        clearTimeout(timer);
      }

      timer = setTimeout(function () {
        location.reload();
      }, 200);
    });
  };

  $('a[href^="#"]').click(function () {
    var speed = 800,
        href = $(this).attr("href"),
        target = $(href === "#" || href === "" ? 'html' : href),
        position = target.offset().top;
    $("html, body").animate({
      scrollTop: position
    }, speed, "swing");
    return false;
  });
  /*-------- 画面幅が変わったときに、更新 --------*/
});