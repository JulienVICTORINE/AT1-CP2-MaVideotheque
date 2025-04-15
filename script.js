// je récupère tous les films sur l'API
const url = "https://ghibliapi.vercel.app/films?limit=50";
const main = document.querySelector("main");

// les boutons
const btnAz = document.querySelector("#btnSortAz");
const btnZa = document.querySelector("#btnSortZa");
// const btnNoteAsc = document.querySelector("#btnNoteAsc");
// const btnNoteDesc = document.querySelector("#btnNoteDesc");

var movies = [];
var sortMethod = "";

const fetchMovies = async () => {
  const request = await fetch(url);
  movies = await request.json();
  updateMain();
};

// J'affiche tous les données
const updateMain = () => {
  main.innerHTML = ""; // je vide le main

  movies
    .sort((a, b) => {
      if (sortMethod == "az") return a.title.localeCompare(b.title);
      else if (sortMethod == "za") return b.title.localeCompare(a.title);
    })

    .map((movie) => {
      main.innerHTML += `
        <div class="card">
            <img src="${movie.image}" alt="image du film ${movie.title}" />
            <h3>${movie.title}</h3>
            <p>Note : ${movie.rt_score / 20} / 5</p>
            <p>${movie.description}</p>
        </div>
        `;
    });
};

fetchMovies();

// je créé un événeemnt pour mes boutons
btnAz.addEventListener("click", () => {
  sortMethod = "az";
  updateMain();
});

btnZa.addEventListener("click", () => {
  sortMethod = "za";
  updateMain();
});
