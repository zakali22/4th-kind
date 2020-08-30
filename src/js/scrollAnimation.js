import ScrollScene from "scrollscene"
import {gsap, TimelineMax} from "gsap"

const spiral = document.querySelector('.spiral')
const spiralRect = spiral.querySelectorAll('rect')

document.addEventListener('mousewheel', (event) => {
    console.log("Scrolling")
    let wheelDistance = event.wheelDeltaY
    wheelDistance = (wheelDistance * -1) / 2;
    let delay = 0
    spiralRect.forEach((rect, index) => {
        console.log(rect.style)
        rect.style.transform = `rotate(${((wheelDistance * event.deltaY / 50) * (5 * Math.random()))}deg)`
    })
})