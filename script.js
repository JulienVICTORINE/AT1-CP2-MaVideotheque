// je récupère tous les films sur l'API
const url = "https://ghibliapi.vercel.app/films?limit=50";
const main = document.querySelector("main");

const fetchMovies = async () => {
  const request = await fetch(url);
  movies = await request.json();
  updateMain();
};

// Une fois récupéré, j'affiche les données
const updateMain = () => {
  movies.map((movie) => {
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
