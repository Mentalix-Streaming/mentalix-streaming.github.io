const slider = document.querySelector(".slider");
const btnLeft = document.getElementById("moveLeft");
const btnRight = document.getElementById("moveRight");
const indicators = document.querySelectorAll(".indicator");

let baseSliderWidth = slider.offsetWidth;
let activeIndex = 0; // the current page on the slider

let movies = [{
        src: "Assets/Miniaturas/saude mental 1.jpg",
        href: "https://youtu.be/C1dA7bc_88s"
    },
    {
        src: "Assets/Miniaturas/saude mental 2.png",
        href: "https://www.youtube.com/watch?v=CrwRwgNJIMU"
    },
    {
        src: "Assets/Miniaturas/saude mental 3.jpg",
        href: "https://youtu.be/MCh-XI7hvNE"
    },
    {
        src: "Assets/Miniaturas/saude mental 4.jpg",
        href: "https://www.youtube.com/watch?v=85ECNP9JXoA"
    },
    {
        src: "Assets/Miniaturas/saude mental 5.jpg",
        href: "https://www.youtube.com/watch?v=chlYYrisVVg"
    },
    {
        src: "Assets/Miniaturas/saude mental 6.jpg",
        href: "https://youtu.be/pVzdldhSPcI"
    },
    {
        src: "Assets/Miniaturas/saude mental 7.jpg",
        href: "https://youtu.be/Q5MLenIfMPM"
    },
    {
        src: "Assets/Miniaturas/saude mental 8.jpg",
        href: "https://youtu.be/J8ef8-m246Q"
    },
];

function populateSlider() {
    movies.forEach((image) => {
        const newMovie = document.getElementById("movie0");
        let clone = newMovie.cloneNode(true);
        let img = clone.querySelector("img");
        img.src = image.src;
        img.href = image.href;

        slider.insertBefore(clone, slider.childNodes[slider.childNodes.length - 1]);
    });
}

populateSlider();
populateSlider();

const initialMovie = document.getElementById("movie0");
initialMovie.remove();

slider.addEventListener("click", (event) => {
    if (event.target.tagName === "IMG") {
        window.open(event.target.href, "_blank");
    }
})

function updateIndicators(index) {
    indicators.forEach((indicator) => {
        indicator.classList.remove("active");
    });
    let newActiveIndicator = indicators[index];
    newActiveIndicator.classList.add("active");
}

// Scroll Left button
btnLeft.addEventListener("click", (e) => {
    let movieWidth = document.querySelector(".movie").getBoundingClientRect()
        .width;
    let scrollDistance = movieWidth * 4;

    slider.scrollBy({
        top: 0,
        left: -scrollDistance,
        behavior: "smooth",
    });
    activeIndex = (activeIndex - 1) % 2;
    console.log(activeIndex);
    updateIndicators(activeIndex);
});

// Scroll Right button
btnRight.addEventListener("click", (e) => {
    let movieWidth = document.querySelector(".movie").getBoundingClientRect()
        .width;
    let scrollDistance = movieWidth * 4; // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)

    console.log(`movieWidth = ${movieWidth}`);
    console.log(`scrolling right ${scrollDistance}`);

    // if we're on the last page
    if (activeIndex == 2) {
        // duplicate all the items in the slider (this is how we make 'looping' slider)
        populateSlider();
        slider.scrollBy({
            top: 0,
            left: +scrollDistance,
            behavior: "smooth",
        });
        activeIndex = 0;
        updateIndicators(activeIndex);
    } else {
        slider.scrollBy({
            top: 0,
            left: +scrollDistance,
            behavior: "smooth",
        });
        activeIndex = (activeIndex + 1) % 3;
        console.log(activeIndex);
        updateIndicators(activeIndex);
    }
});