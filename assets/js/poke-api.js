import Pokemon from "./pokemon-model.js";

const PokeAPI = {
  async getPokemonDetail(pokemon) {
    const response = await fetch(pokemon.url);
    const data = await response.json();

    const detailedPokemon = new Pokemon();
    detailedPokemon.number = data.id;
    detailedPokemon.name = data.name;
    detailedPokemon.types = data.types.map((typeSlot) => typeSlot.type.name);
    detailedPokemon.image = data.sprites.other["dream_world"].front_default;

    return detailedPokemon;
  },

  async getPokemons(offset = 0, limit = 10) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    const response = await fetch(url);
    const data = await response.json();

    const promises = data.results.map(this.getPokemonDetail);
    return Promise.all(promises);
  },
};

export default PokeAPI;
