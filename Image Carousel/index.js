const slides = [...document.getElementsByClassName("slide")]
const btnNext = document.getElementsByClassName("next")[0];
const btnPrev = document.getElementsByClassName("prev")[0];
btnPrev.classList.add("btn_inactive")
let n = 1;
// console.log(slides, btnNext, btnPrev)

//changing position of images (index*100%) from left
slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`
})

btnNext.addEventListener("click", () => {
    if (n >= slides.length - 1) {
        btnNext.classList.add("btn_inactive")
    }
    if (n >= slides.length) {
        n = slides.length;
        // console.log(n)

    } else {
        btnPrev.classList.remove("btn_inactive")
        slides.forEach((slide, index) => {
            slide.style.left = `${(index - n) * 100}%`;
        })
        n++;
        // console.log(n);
        // console.log("Next Clicked")
    }
})

btnPrev.addEventListener("click", () => {

    if (n <= 1) {
        n = 1;
    } else {
        if (n === 2) {
            btnPrev.classList.add("btn_inactive")
        }
        btnNext.classList.remove("btn_inactive")
        n--;
        slides.forEach((slide, index) => {
            slide.style.left = `${((index - n) + 1) * 100}%`;
        })
        // console.log(n);
        // console.log("Prev Clicked")
    }
})
