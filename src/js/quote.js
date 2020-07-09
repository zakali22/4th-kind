import colors from "./colors";

const body = document.querySelector('body')
const section = document.querySelector('.slide-content')
const footerBtns = document.querySelectorAll('footer img')
const authorEl = document.querySelector('.slide-content__author')
const quoteEl = document.querySelector('.slide-content__quote')
const circle = document.querySelector('.circle')

// Quote variables
let quotes;
let currQuotePos = 0;
let currQuote;

// Fetch quotes
const fetchQuotes = () => {
    return fetch('https://type.fit/api/quotes')
        .then(response => {
            return response.json();
        })
        .then(data => {
            const dataArr = data.splice(0, 50)
            quotes = dataArr
        })
}

// Fetch background images 
const fetchBgImage = (author) => {
    const authorName = author ? author.split(" ").join("").toLowerCase() : ''
    return fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCMX_OafVHhnpPF0dYObazCGrXoCGk_ALU&cx=010553976025322614465:ltc8pxoomi8&q=${authorName}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        // data.items[0].pagemap.cse_image[0].src 
        if(data.items){
            if(data.items[0].pagemap.cse_thumbnail){
                return data.items[0].pagemap.cse_thumbnail[0].src
            } else {
                return null
            }
        } else {
            return null
        }
    })
}

// Adding click handler on the buttons
footerBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const direction = event.target.dataset.direction;
        toggleFadeIn(false)
        if(direction === 'prev'){
            prevSlide()
        } else if(direction === 'next'){
            nextSlide()
        } else {
            randomSlide()
        }
    })
})

// Add keyboard event handling
body.addEventListener('keyup', (event) => {
    console.log(event)
    switch(event.code){
        case 'ArrowUp':
            nextSlide();
            return;
        case 'ArrowDown':
            prevSlide();
            return;
        case 'ArrowLeft':
            prevSlide();
            return;
        case 'ArrowRight':
            nextSlide();
            return;
        case 'Space':
            randomSlide();
            return;
        default:
            return;
    }
})

// Helper functions for slide changes 
const prevSlide = () => {
    if(currQuotePos > 0){
        currQuotePos--;
        currQuote = quotes[currQuotePos]
        updateSlideContent()
    }
}
const nextSlide = () => {
    if(currQuotePos <= quotes.length-1){
        currQuotePos++;
        currQuote = quotes[currQuotePos]
        updateSlideContent()
    }
}
const randomSlide = () => {
    const randomPos = randomNum(0, 50)
    currQuote = quotes[randomPos]
    updateSlideContent()
}

// Randomise helper function
const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Update content helper function
const updateSlideContent = () => {
    toggleFadeIn(true)
    authorEl.innerHTML = currQuote.author ? currQuote.author : 'Someone wise';
    quoteEl.innerHTML = currQuote.text;
    updateColors()
}

// Toggle class 
const toggleFadeIn = (show) => {
    if(show){
        setTimeout(() => {
            section.classList.add('fadeIn')
            console.log("Added class")
        }, 1000);
    } else {
        section.classList.remove('fadeIn')
    }
}


// Update colors helper function
const updateColors = () => {
    updateCircleColor();
    updateBg();
}
const updateCircleColor = () => {
    circle.style.backgroundColor = colors[randomNum(0, colors.length-1)].dotColor
}
const updateBg = () => {
    const color = colors[randomNum(0, colors.length-1)].bgColor;
    const author = currQuote.author;
    fetchBgImage(author).then(data => {
        let bgImage = data
        body.style.backgroundImage = `linear-gradient(180deg, #ffffff, ${hex2rgba(color, 0.7)}), url(${bgImage})`
    })
}

// Convert HEX to RGBa helper function 
const hex2rgba = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is loaded')
    fetchQuotes().then(response => {
        currQuote = quotes[0]

        updateSlideContent()
    });
})