// je récupère tous les films sur l'API
const url = "https://ghibliapi.vercel.app/films?limit=50";
const main = document.querySelector("main");

// je récupère l'id des boutons : affiche dans l'ordre croissant ou décroissant
const btnAz = document.querySelector("#btnSortAz");
const btnZa = document.querySelector("#btnSortZa");

// je récupère l'id des boutons : affiche les films les plus ou moins notés
const btnNoteAsc = document.querySelector("#btnNoteAsc");
const btnNoteDesc = document.querySelector("#btnNoteDesc");

// je récupère l'id du bouton range pour extraire une portion des films
const inputMovieRange = document.querySelector("#inputMovieRange");
const displayMovieRange = document.querySelector("#displayMovieRange");

// je récupère l'id pour pouvoir filtrer et afficher le nom d'un film
const inputMovieName = document.querySelector("#inputMovieName");

var movies = [];
var sortMethod = "";
var numberOfMovies = 12;
var filter = "";

const fetchMovies = async () => {
  const request = await fetch(url);
  movies = await request.json();
  updateMain();
};

// J'affiche tous les données
const updateMain = () => {
  main.innerHTML = ""; // je vide le main
  let filteredMovies = [...movies]; // je fais une copie pour permettre de filtrer, extraire et trier les films

  // Appliquer un filtre selon le bouton cliqué
  if (sortMethod === "noteAsc") {
    // On garde que les films les moins bien notés
    filteredMovies = filteredMovies.filter((m) => m.rt_score <= 79);
  } else if (sortMethod === "noteDesc") {
    // On garde que les films les mieux notés
    filteredMovies = filteredMovies.filter((m) => m.rt_score >= 80);
  }

  // On trie les films filtrés
  filteredMovies.sort((a, b) => {
    if (sortMethod == "az") {
      return a.title.localeCompare(b.title);
    } else if (sortMethod == "za") {
      return b.title.localeCompare(a.title);
    } else if (sortMethod == "noteAsc") {
      return a.rt_score - b.rt_score;
    } else if (sortMethod == "noteDesc") {
      return b.rt_score - a.rt_score;
    }
  });

  // On extrait une portion des films que l'on veut affiche avec le range
  filteredMovies = filteredMovies.slice(0, numberOfMovies);

  // On filtre les films pour pouvoir effectuer une recherche par son titre
  filteredMovies = filteredMovies.filter((movie) => {
    if (filter != "") {
      return movie.title.toLowerCase().includes(filter.toLocaleLowerCase());
    }
    return movie;
  });

  // On affiche les films
  filteredMovies.map((movie) => {
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
////////////////////
// Pour afficher les films dans l'ordre croissant ou décroissant
///////////////////
btnAz.addEventListener("click", () => {
  sortMethod = "az";
  updateMain();
});

btnZa.addEventListener("click", () => {
  sortMethod = "za";
  updateMain();
});

///////////////////
// Pour affiche les films les biens ou moins notés
//////////////////
btnNoteAsc.addEventListener("click", () => {
  sortMethod = "noteAsc";
  updateMain();
});

btnNoteDesc.addEventListener("click", () => {
  sortMethod = "noteDesc";
  updateMain();
});

///////////////////
// pour extraire une portion des films
//////////////////
inputMovieRange.addEventListener("input", (e) => {
  displayMovieRange.innerHTML = e.target.value;
  numberOfMovies = e.target.value;
  updateMain();
});

/////////////////
// pour filter les noms des films
////////////////
inputMovieName.addEventListener("input", (e) => {
  filter = e.target.value;
  updateMain();
});
