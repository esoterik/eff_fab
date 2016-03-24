// var ticking = false,

//     speedDivider = 2,
//     bgElm = document.getElementById('hero-bg'),
//     frontElm = document.getElementById('front'),
//     scrollTop = window.pageYOffset,

//     nav = document.getElementsByTagName('nav')[0],
//     navStyle = window.getComputedStyle(nav),
//     navPosition = navStyle.getPropertyValue('position'),
//     navOffset = nav.getBoundingClientRect().top + scrollTop,
//     navDistance = navOffset - scrollTop,
//     navHeight = nav.offsetHeight,
//     afterNav = nav.nextElementSibling,
//     navMargin = parseInt(window.getComputedStyle(afterNav,null).getPropertyValue('margin-top')),
//     screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

// var hamburger = document.getElementById('hamburger');

// hamburger.addEventListener('click',openMenu,false);

// function openMenu() {
//   document.body.classList.toggle('active');
// }


// document.addEventListener("DOMContentLoaded", function(event) {
//   window.onscroll = doScroll;
// });


// window.addEventListener("resize", function(event) {
//   window.onresize = doResize;
// });


// var translateY = function(elm, value) {
//   elm.style.transform = 'translate3d(0px,' + value + 'px, 0px)';
// };

// var dim = function(elm, value) {
//   elm.style.opacity = 1 - (value / 210);
// }

// var doScroll = function() {
//   lastScrollY = window.pageYOffset;
//   currentPosition = navStyle.getPropertyValue('position');
//   requestTick();
// };

// var doResize = function() {
//   screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
//   scrollTop = window.pageYOffset,
//   navStyle = window.getComputedStyle(nav),
//   navPosition = navStyle.getPropertyValue('position'),
//   navDistance = navOffset - scrollTop,
//   currentPosition = navStyle.getPropertyValue('position');


//   console.log('resize');
//   console.log('currentPosition, navOffset, navDistance, scrollTop' + currentPosition + ' ' + navOffset
//   + ' ' + navDistance + ' ' + scrollTop);

//   if(screenWidth < 768) {
//     console.log("fixed 1");
//     nav.style.position = 'fixed';
//   } else {
//     if(navDistance < 0) {
//       if(navPosition != 'fixed' && navDistance <= 0) {
//         console.log("fixed 2");
//         nav.style.position = 'fixed';
//       }
//     } else if (navDistance > 0 && navPosition == 'fixed') {
//       nav.style.position = 'relative';
//     }
//   }

//   requestTick();
// };


// var requestTick = function() {
//   if (!ticking) {
//     window.requestAnimationFrame(updatePosition);
//     window.requestAnimationFrame(menuCheck);
//     ticking = true;
//   }
// };

// var menuCheck = function() {
//   screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
//   scrollTop = window.pageYOffset,
//   navStyle = window.getComputedStyle(nav),
//   navPosition = navStyle.getPropertyValue('position'),
//   navDistance = navOffset - scrollTop;



//     console.log('currentPosition, navOffset, navDistance, scrollTop' + currentPosition + ' ' + navOffset
//     + ' ' + navDistance + ' ' + scrollTop);

//   if(screenWidth >= 768) {
//     if(navDistance < 0) {
//       if(navPosition != 'fixed' && navDistance <= 0) {
//         nav.style.position = 'fixed';
//       }
//     } else if (navDistance > 0 && navPosition == 'fixed') {
//       nav.style.position = 'relative';
//     }
//   } else {
//     nav.style.position = 'fixed';
//   }
//   // } else {
//   //   console.log("fixed x");
//   //   nav.style.position = 'fixed';
//   // }


//   // } else {
//   //   nav.style.position = 'fixed';
//   // }

//   ticking = false;
// };

// var updatePosition = function() {
//   translateValue = lastScrollY / speedDivider;
//   translateY(frontElm, (translateValue * 0.8));
//   translateY(bgElm, translateValue);
//   dim(frontElm, translateValue);
//   ticking = false;
// };
