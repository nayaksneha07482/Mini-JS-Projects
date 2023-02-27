let num = 1;
const btn = document.createElement("button");
btn.classList.add("btn");
btn.innerText = "Clear Screen";
// console.log(btn)
// console.log("clicked",circle)
document.body.addEventListener("click", (e) => {
    if (num === 1) {
        document.body.appendChild(btn)
    }
    const circle = document.createElement("div");
    circle.style.left = `${e.clientX}px`;
    circle.style.top = `${e.clientY}px`;
    circle.innerText = num;
    circle.classList.add("circle")
    document.body.appendChild(circle)
    console.log(e.clientX, e.clientY, num)
    num++;
})

btn.addEventListener("mouseenter", () => {
    location.reload();
})