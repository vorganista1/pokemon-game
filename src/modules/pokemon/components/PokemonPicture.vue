<template>
  <section>
    <div>
      <img v-if="!showPokemon" id="img" :src="pokemonItem" class="brightness-0 h-[200px]" />
      <img v-else :src="pokemonItem" class="fade-in h-[200px]" alt="pokemon image" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  pokemonId: number;
  showPokemon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showPokemon: true,
});

const pokemonItem = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`,
);
</script>
<style scoped>
img {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
</style>
