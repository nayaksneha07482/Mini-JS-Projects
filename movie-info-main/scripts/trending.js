async function getData() {
    try {
        let url = `https://api.themoviedb.org/3/trending/movie/day?api_key=0032f4cb51fb2b8c3a827e722775dc6c`;
        let fetchedData = await fetch(url);
        let finalData = await fetchedData.json();
        let data = finalData.results;
        trendingCard(data);
    }
    catch (err) {
        console.log('Error:', err);
    }
}

getData();

function trendingCard(data) {
    console.log(data);
    document.querySelector("#trendContainer").innerHTML = "";

    data.map(item => {
        let card = document.createElement("div");
        card.setAttribute("id", "tcard");

        let imageDiv = document.createElement("div");
        imageDiv.setAttribute("id", "timgDiv");

        let image = document.createElement("img");
        image.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        image.setAttribute("id","timg")

        let infoDiv = document.createElement("div");
        infoDiv.setAttribute("id", "infoDiv");

        let title = document.createElement("p");
        title.textContent = item.original_title;

        let recDiv = document.createElement("div");
        recDiv.setAttribute("id", "recDiv");

        let release = document.createElement("p");
        release.textContent = `Release date: ${item.release_date}`;

        let recom = document.createElement("p");
        recom.setAttribute("id", "recom");

        let rating = document.createElement("p");
        rating.textContent = item.vote_average;

        let ratingMath = Number(item.vote_average);
        console.log(ratingMath);

        if (ratingMath > 8.5) {
            recom.textContent = "Recommended";
        }
        else {
            recom.textContent = "";
        }

        imageDiv.append(image);
        recDiv.append(rating, recom);
        infoDiv.append(title, recDiv, release);
        card.append(imageDiv, infoDiv)
        document.querySelector("#trendContainer").append(card);
    });
}


// Navbar Search


document.querySelector("#query").addEventListener("input", () => {
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
            card.setAttribute("id", "searchCard")

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
});

document.querySelector("#searchBtn").addEventListener("click",()=>{
    window.location.href = "index.html";
});