import {gsap, TimelineMax} from "gsap"
import { Timeline } from "gsap/gsap-core"

const darkModeWrapper = document.querySelector('.dark-mode')
const darkModeControl = darkModeWrapper.querySelector('.dark-mode__control')
const darkModeText = darkModeWrapper.querySelector('.dark-mode__text')

let colors = {
    textColor: '#ffffff',
    backgroundColor: '#000000',
    highlightColor: '#ff4141'
}

darkModeWrapper.addEventListener('click', () => {
    const rect = darkModeControl.querySelector('rect');
    const colorMode = getComputedStyle(document.documentElement).getPropertyValue("--color-mode").toLowerCase().trim();
    const slideTransitionEl = document.querySelector('.slide-transition')
    const slideTransitionTl = new TimelineMax()
    slideTransitionTl
        .set(slideTransitionEl, {y: 0, height: 0})

    if(colorMode === '"light"'){
        colors = {
            textColor: '#ffffff',
            backgroundColor: '#000000',
            highlightColor: '#ff4141'
        }

        slideTransitionTl
            .to(slideTransitionEl, {height: "100vh", duration: 1.5, ease: 'linear.easeNone'})
            .set(slideTransitionEl, {backgroundColor: colors['highlightColor']})
            .call(changeVariables, ["light"])
            .to(slideTransitionEl, {y: "100%", duration: 1, ease: 'linear.easeNone'})

        darkModeText.innerHTML = 'Light mode'
        darkModeControl.classList.add('slideControl')

    } else {
        colors = {
            textColor: '#000000',
            backgroundColor: '#ffffff',
            highlightColor: '#2727e6'
        }

        
        slideTransitionTl
            .to(slideTransitionEl, {height: "100vh", duration: 1.5, ease: 'linear.easeNone'})
            .set(slideTransitionEl, {backgroundColor: colors['highlightColor']})
            .call(changeVariables, ["dark"])
            .to(slideTransitionEl, {y: "100%", duration: 1, ease: 'linear.easeNone'})

        darkModeText.innerHTML = 'Dark mode'
        darkModeControl.classList.remove('slideControl')
    }
})


const changeVariables = function(mode){
    if(mode === 'light'){
        document.documentElement.style.setProperty('--text-color', colors['textColor'])
        document.documentElement.style.setProperty('--background-color', colors['backgroundColor'])
        document.documentElement.style.setProperty('--highlight-color', colors['highlightColor'])
        document.documentElement.style.setProperty('--color-mode', '"dark"')
    } else {
        document.documentElement.style.setProperty('--text-color', colors['textColor'])
        document.documentElement.style.setProperty('--background-color', colors['backgroundColor'])
        document.documentElement.style.setProperty('--highlight-color', colors['highlightColor'])
        document.documentElement.style.setProperty('--color-mode', '"light"')
    }
}
