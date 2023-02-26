
"use strict";
let notesValue;
const popup = document.getElementsByClassName("overlay")[0];
const close = document.getElementsByClassName('close')[0]
showNotes();
// Storing in localStorage
const addBtn = document.getElementsByClassName("btn")[0];
addBtn.addEventListener("click", () => {
    let titleText = document.getElementById("noteTitle");
    let notesDescription = document.getElementById("noteDescription");

    if (titleText.value && notesDescription.value) {
        let notes = localStorage.getItem("notesKey");
        if (notes === null) {
            notesValue = {
                title: [],
                description: [],
            };
        } else {
            notesValue = JSON.parse(notes);
        }
        notesValue.title.push(titleText.value);
        notesValue.description.push(notesDescription.value);
        localStorage.setItem("notesKey", JSON.stringify(notesValue));
        titleText.value = "";
        notesDescription.value = "";
    }else{
       popup.style.display = 'block'
       close.addEventListener('click',()=>{
        popup.style.display = 'none'
       })
    }
    showNotes();
});

// Creating a Function to show notes on web page
function showNotes() {
    const date = new Date();
    let day = date.getDay();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (day < 10) {
        day = "0" + day
    }
    if (month < 10) {
        month = "0" + month
    }
    const container = document.getElementsByClassName("container")[0];
    console.log(Boolean(container.innerText))
    if (!container.innerText) {
        container.innerHTML = `<h2 class = "notesEmpty"> Nothing to show ! Please add a note 📝</h2>`
    }
    const notes = localStorage.getItem("notesKey");
    if (notes) {
        let notes = localStorage.getItem("notesKey");
        if (notes === null) {
            notesValue = {
                title: [],
                description: [],
            };
        } else{
            notesValue = JSON.parse(notes)
        }
       
        const title = notesValue.title;
        const detail = notesValue.description;
        let html = "";
        for (let i = 0; i < title.length; i++) {
            html += ` <div class="card">
            <div class = "top">
            <li class = "date" >Created on : <span>${day}</span>:<span>${month}</span>:<span>${year}</span> &nbsp <span>${date.getHours()}</span>:<span>${date.getMinutes()}</span> </li>
             <i class="fa-solid fa-trash delete" ></i>
             </div>
           <div id = "textContainer">
           <h3 class = "title">${title[i]}</h3>
       <p class = "description" >${detail[i]}</p>
           </div> 
   </div>`;
        }
        container.innerHTML = html;
        if (!container.innerText) {
           
            container.innerHTML = `<h2 class = "notesEmpty"> Nothing to show ! Please add a note 📝</h2>`
        }

    }
    const deleteBtns = Array.from(document.getElementsByClassName('delete'))
    deleteBtns.forEach((elem, index) => {
        elem.addEventListener('click', () => {
            notesValue['title'].splice(index, 1);
            notesValue['description'].splice(index, 1)
            localStorage.setItem('notesKey', JSON.stringify(notesValue))
            showNotes();
        })
    })
}


// Searching a note based on title and description
const searchInput = document.getElementById('search')
searchInput.addEventListener('input', (e) => {
    const text = e.target.value.toLowerCase();
    console.log(text)
    const cardTitle = Array.from(document.getElementsByClassName('title'));

    console.log(cardTitle)
    const cardDetail = Array.from(document.getElementsByClassName('description'));
    const title = cardTitle.map(x => x.innerText.toLowerCase());
    const description = cardDetail.map(x => x.innerText.toLowerCase());
    console.log(title)
    const container = document.getElementsByClassName("container")[0];
    for (let i = 0; i < cardTitle.length; i++) {
        if (!text) {
            cardTitle[i].parentElement.parentElement.style.display = 'block';
        }
        if (title[i].includes(text) || description[i].includes(text)) {
            cardTitle[i].parentElement.parentElement.style.display = 'block';
        } else {
            cardTitle[i].parentElement.parentElement.style.display = 'none';
        }
    }


})


