/*jshint esversion: 6 */
$(function () {
	let windowWidth = $(window).width();

	/*-------- 画面幅が変わったときに、更新 --------*/
	const autoResizer = () => {
		let timer = 0;
		let currentWidth = window.innerWidth;
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

	$('a[href^="#"]').click(function(){
		var speed = 800,
			href = $(this).attr("href"),
			target = $(href === "#" || href === "" ? 'html' : href),
			position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
	/*-------- 画面幅が変わったときに、更新 --------*/
});

