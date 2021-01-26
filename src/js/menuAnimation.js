import {gsap, TimelineMax} from "gsap";
const menuNav = document.querySelector('.menu__nav')
const menuNavLayers = menuNav.querySelectorAll('.menu__nav-layer1, .menu__nav-layer2, .menu__nav-layer3')
const menuNavLinks = menuNav.querySelectorAll('.menu__nav-listing li')
const menuButton = document.querySelector('.menu__button')

menuButton.classList.add('hideNav')
menuButton.addEventListener('click', () => {
    const menuButtonText = menuButton.querySelector('.menu__button-text')
    /*******************************************
            CSS based animation 
    ********************************************/

    // if(menuNav.className.includes('hideNav')){
    //     menuButtonText.innerHTML = 'Close'
    //     menuNav.classList.remove('hideNav')
    //     menuButton.classList.remove('hideNav')
    //     menuNav.classList.add('showNav')
    //     menuButton.classList.add('showNav')
    // } else {
    //     menuButtonText.innerHTML = 'Menu'
    //     menuNav.classList.remove('showNav')
    //     menuButton.classList.remove('showNav')
    //     menuNav.classList.add('hideNav')
    //     menuButton.classList.add('hideNav')
    // }

    /*******************************************
            GSAP based animation 
    ********************************************/
   const navTl = new TimelineMax();
   if(menuButton.className.includes('hideNav')){
        menuButtonText.innerHTML = 'Close'
        menuButton.classList.remove('hideNav')
        menuButton.classList.add('showNav')
        navTl
            .to(menuNavLayers, {x: 0, duration: .5, stagger: 0.1, ease: 'linear.easeNone'}) // Stagger from bottom to top
            .fromTo(menuNavLinks, {x: "20%", opacity: 0}, {x: 0, opacity: 1, duration: .3, stagger: 0.1})
        
   } else {
        menuButtonText.innerHTML = 'Menu'
        menuButton.classList.remove('showNav')
        menuButton.classList.add('hideNav')
        navTl
        .to(menuNavLinks, {x: "20%", opacity: 0, duration: .3, stagger: -0.1})
        .to(menuNavLayers, {x: "100%", duration: .5, stagger: -0.1, ease: 'linear.easeNone'}, "-=.4")  // Stagger in the opposite direction top to bottom
   }
})