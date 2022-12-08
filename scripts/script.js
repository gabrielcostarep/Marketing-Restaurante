let html = document.querySelector("html")
let checkbox = document.querySelector("input[name=theme]")
let menu = document.getElementById("menu-bars")
let navbar = document.getElementsByClassName("navbar")[0]
let menuOpen = false

let section = document.querySelectorAll("section")
let navLinks = document.querySelectorAll("header .navbar a")

window.onscroll = () => {
    section.forEach(sec => {
        let top = window.scrollY
        let height = sec.offsetHeight
        let offset = sec.offsetTop - 150
        let id = sec.getAttribute('id')

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active')
                document.querySelector("header .navbar a[href*=" + id + "]").classList.add('active')
            })
        }
    })
}

function menuInitial() {
    menu.src = "./assets/bars.svg"
    navbar.style.display = "none"
    menuOpen = false
}

function WidthNow() {
    let windowWidth = window.innerWidth;

    if (windowWidth >= "901") {
        navbar.style.display = "flex"
        navbar.removeEventListener('click', menuInitial)
    }

    if (windowWidth <= "900") {
        menuInitial()
    }
}

window.addEventListener('resize', WidthNow)

menu.addEventListener("click", () => {
    if (!menuOpen) {
        navbar.addEventListener("click", menuInitial)

        menu.src = "./assets/bars-open.svg"
        navbar.style.display = "grid"

        menuOpen = true
    } else {
        menuInitial()
    }
})

let swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
})

function loader() {
    document.getElementsByClassName("loader-container")[0].classList.add('fade-out')
}

function fadeOut() {
    setInterval(loader, 2000)
}

window.onload = fadeOut

let getStyle = (element, style) =>
    window
        .getComputedStyle(element)
        .getPropertyValue(style)


let initialColors = {
    lightColor: getStyle(html, "--lightColor"),
    white: getStyle(html, "--white"),
    backgroundMenu: getStyle(html, "--backgroundMenu"),
}

let darkMode = {
    white: "#eee",
    backgroundMenu: "#DBDBDB",
    lightColor: "#616161",
}

let transformKey = (key) =>
    "--" + key


let changeColors = (colors) => {
    Object.keys(colors).map(key => {
        html.style.setProperty(transformKey(key), colors[key])
    })
}

checkbox.addEventListener("change", ({ target }) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
})