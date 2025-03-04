import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonlistResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  const pokemons = ref<Pokemon[]>([]);
  const pokemonsOptions = ref<Pokemon[]>([]);
  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonsOptions.value.length);
    return pokemonsOptions.value[randomIndex];
  });

  const isLoaded = computed(() => pokemons.value.length === 0);

  const gameStatus = ref<GameStatus>(GameStatus.playing);

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = pokemonApi.get<PokemonlistResponse>('/?limit=151');

    const pokemonsArray = (await response).data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts[urlParts.length - 2] ?? 0;
      return {
        name: pokemon.name,
        id: +id,
      };
    });

    return pokemonsArray.sort(() => Math.random() - 0.5);
  };

  const getNextRaund = (howMany: number = 4) => {
    gameStatus.value = GameStatus.playing;
    pokemonsOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (id: number) => {
    if (randomPokemon.value.id === id) {
      gameStatus.value = GameStatus.won;
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });
    } else {
      gameStatus.value = GameStatus.lost;
    }
  };

  onMounted(async () => {
    // await new Promise((r) => setTimeout(r, 1000));
    pokemons.value = await getPokemons();
    console.log(pokemons.value);
    getNextRaund();
    console.log(pokemonsOptions.value);
  });
  return {
    gameStatus,
    isLoaded,
    pokemonsOptions,
    randomPokemon,
    // metodos
    getNextRaund,
    checkAnswer,
  };
};
