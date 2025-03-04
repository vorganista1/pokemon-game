<template>
  <section
    v-if="isLoaded || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h1 class="animate-pulse">Cargando Pokemons</h1>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="mg-5">¿Quien es este Pokemon?</h1>
    <div class="h-20">
      <button
        v-if="gameStatus !== GameStatus.playing"
        @click="getNextRaund(4)"
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-all"
      >
        ¿Jugar de nevo?
      </button>
      <!--<h3 class="capitalize">{{ gameStatus }}</h3>-->
    </div>
    <!--Pokemon Picture-->
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.playing"
    />
    <!--pokemon option-->
    <PokemonOptions
      :options="options"
      :block-selection="gameStatus !== GameStatus.playing"
      :correct-answer="randomPokemon.id"
      @selected-option="checkAnswer"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';

import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const {
  randomPokemon,
  isLoaded,
  gameStatus,
  pokemonsOptions: options,
  checkAnswer,
  getNextRaund,
} = usePokemonGame();
</script>
