<template>
  <section v-if="false" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Espere por favor</h1>
    <h1 class="animate-pulse">Cargando Pokemons</h1>
  </section>

  <section class="flex flex-col justify-center items-ceter w-screen h-screen">
    <h1>¿Quien es este Pokemon?</h1>
    <!--Pokemon Picture-->
    <PokemonPicture />
    <!--pokemon option-->
    <!---->
  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '../components/PokemonPicture.vue';
</script>
