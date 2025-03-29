import PokeAPI from "./poke-api.js";

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon">
            <span class="number">#${String(pokemon.number).padStart(
              3,
              "0"
            )}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type">${type}</li>`)
                      .join("")}
                </ol>
                <img src="${pokemon.image}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

const pokemonList = document.querySelector(".pokemons");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");

let offset = 0;
const limit = 10;

function loadPokemons(offset, limit) {
  PokeAPI.getPokemons(offset, limit)
    .then((pokemons) => {
      pokemonList.innerHTML = pokemons.map(convertPokemonToLi).join("");
      prevPageButton.disabled = offset === 0;
    })
    .catch((error) => console.error("Error fetching Pokémon data:", error));
}

prevPageButton.addEventListener("click", () => {
  if (offset > 0) {
    offset -= limit;
    loadPokemons(offset, limit);
  }
});

nextPageButton.addEventListener("click", () => {
  offset += limit;
  loadPokemons(offset, limit);
});

// Initial load
loadPokemons(offset, limit);
