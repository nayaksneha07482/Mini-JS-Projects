function movieCard(finalData) {
    document.querySelector("#movieInfo").innerHTML = "";

    let card = document.createElement("div");
    card.setAttribute("id", "card");

    let imageDiv = document.createElement("div");
    imageDiv.setAttribute("id", "imgDiv");

    let image = document.createElement("img");

    let infoDiv = document.createElement("div");
    infoDiv.setAttribute("id", "infoDiv");

    let title = document.createElement("p");

    let recDiv = document.createElement("div");
    recDiv.setAttribute("id", "recDiv");

    let rating = document.createElement("p");
    let recom = document.createElement("p");
    recom.setAttribute("id", "recom");

    let release = document.createElement("p");
    let genre = document.createElement("p");
    let director = document.createElement("p");
    let boxOffice = document.createElement("p");

    let ratingMath = Number(finalData.Ratings[0].Value[0] + finalData.Ratings[0].Value[1] + finalData.Ratings[0].Value[2]);
    console.log(ratingMath);

    image.src = finalData.Poster;
    title.textContent = finalData.Title;
    rating.textContent = finalData.Ratings[0].Value;

    if (ratingMath > 8.5) {
        recom.textContent = "Recommended";
    }
    else {
        recom.textContent = "";
    }

    release.textContent = finalData.Released;
    genre.textContent = finalData.Genre;
    director.textContent = finalData.Director;
    boxOffice.textContent = finalData.BoxOffice;

    imageDiv.append(image);
    recDiv.append(rating, recom);
    infoDiv.append(title, recDiv, release, genre, director, boxOffice);
    card.append(imageDiv, infoDiv)
    document.querySelector("#movieInfo").append(card);
}

function errorFunc() {
    let image = document.createElement("img");
    image.setAttribute("src", "https://cdn.dribbble.com/users/1676373/screenshots/4177728/media/c03e140cbc9e5959946bb95600772ab3.gif");
    image.setAttribute("id", "gif");

    document.querySelector("#movieInfo").append(image);
}

// Main search functionality

document.querySelector("#srchBtn").addEventListener("click", () => {

    async function getData() {
        try {
            let movieName = document.querySelector("#search").value;
            let url = `https://www.omdbapi.com/?apikey=df31b09f&t=${movieName}`;
            let fetchedData = await fetch(url);
            let finalData = await fetchedData.json();
            movieCard(finalData);
            console.log(finalData);
        }
        catch (err) {
            console.log('Error:', err);
            errorFunc();
        }
    }
    getData();
});



// Navbar Search


let deb;

document.querySelector("#query").addEventListener("input", () => {
    if(deb){
        clearTimeout(deb);
    }
    
    deb = setTimeout(() => {
        main();
    }, 1000);
});


function main() {
    async function getData() {
        try {
            let movieName = document.querySelector("#query").value;
            if (movieName == "") {
                document.querySelector("#dropdown").style.visibility = "hidden";
            }
            else {
                document.querySelector("#dropdown").style.visibility = "visible";
            }

            let fetched = await fetch(`https://www.omdbapi.com/?apikey=df31b09f&s=${movieName}`);
            let data = await fetched.json();
            let finalData = data.Search;
            if (finalData === undefined) {
                return false;
            }
            console.log(finalData);
            searchCards(finalData);
        }
        catch (error) {
            console.log('error:', error)
        }
    }
    getData();

    function searchCards(finalData) {
        document.querySelector("#dropdown").innerHTML = "";

        finalData.map(item => {
            let card = document.createElement("div");
            card.setAttribute("id", "searchCard");
            card.addEventListener("click", () => {
                var movieName = item.Title;
                console.log(movieName);
                async function getData() {
                    try {
                        let url = `https://www.omdbapi.com/?apikey=df31b09f&t=${movieName}`;
                        let fetchedData = await fetch(url);
                        let finalData = await fetchedData.json();
                        movieCard(finalData);
                        console.log(finalData);
                    }
                    catch (err) {
                        console.log('Error:', err);
                        errorFunc();
                    }
                }
                getData();
            });

            let imageDiv = document.createElement("div");
            imageDiv.setAttribute("id", "searchImgDiv")

            let img = document.createElement("img");
            img.src = item.Poster;
            img.setAttribute("id", "searchImg")

            let infoDiv = document.createElement("div");
            infoDiv.setAttribute("id", "searchInfoDiv")

            let title = document.createElement("p");
            title.textContent = item.Title;

            let genre = document.createElement("p");
            genre.textContent = item.Year;

            imageDiv.append(img);
            infoDiv.append(title, genre);
            card.append(imageDiv, infoDiv);
            document.querySelector("#dropdown").append(card);
        });
    }
}


document.querySelector("#searchBtn").addEventListener("click", () => {
    window.location.href = "trending.html";
});