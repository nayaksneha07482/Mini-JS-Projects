// alert("Click anywhere on page to create circles")
// let num = 1;
// const btn = document.createElement("button");
// btn.classList.add("btn");
// btn.innerText = "Clear Screen";
// // console.log(btn)
// // console.log("clicked",circle)
// document.body.addEventListener("click", (e) => {
//     if (num === 1) {
//         document.body.appendChild(btn)
//     }
//     const circle = document.createElement("div");
//     circle.style.left = `${e.clientX}px`;
//     circle.style.top = `${e.clientY}px`;
//     circle.innerText = num;
//     circle.classList.add("circle")
//     document.body.appendChild(circle)
//     console.log(e.clientX, e.clientY, num)
//     num++;
// })

// btn.addEventListener("mouseenter", () => {
//     location.reload();
// })
const alertMsg = document.createElement("div");
alertMsg.innerText = "Click anywhere on White Board to see the Magic!🔥✌️"
alertMsg.classList.add("pop_up");
document.body.appendChild(alertMsg);

const btn = document.createElement("button");
btn.classList.add("btn")
btn.innerText = "Clear Screen";
const box = document.createElement("div");
const circleBackground = ["tomato","green","navy","cyan","blue","magenta","orange","purple"]
box.classList.add("box");
// console.log(box);
document.body.appendChild(box);


box.addEventListener("click",(event)=>{
// Remeoving pop up msg
// document.body.removeChild(alertMsg); This line is giving a bug and circles are not getting created in the white board. Need to findout.
alertMsg.style.display = "none";

const randomColor =circleBackground[Math.floor(Math.random()*circleBackground.length)]
 const circle = document.createElement("div");
 circle.classList.add("circle");
 setTimeout(()=>{
circle.style.transform = "scale(1)";
 },100)
 setTimeout(()=>{
    circle.style.transform = "scale(0)"
     },5000)
 circle.style.background = randomColor;
 circle.style.left = `${event.clientX-box.getBoundingClientRect().left}px`;
 circle.style.top = `${event.clientY-box.getBoundingClientRect().top}px`;
 console.log(event.clientX,event.clientY)
 box.appendChild(circle);
//  console.log("CLICK")
//Adding a button

document.body.appendChild(btn);



})

btn.addEventListener("click",()=>{
    box.innerHTML = "";
})



