<template>
  <div class="w-full h-auto p-4 bg-white grid grid-cols-2 gap-2 justify-center items-center">
    <div @click="$router.push({name:item.to})" class="card p-2 hover:bg-blue-200 h-32 flex flex-col justify-between cursor-pointer bg-blue-100 rounded shadow-lg" v-for="item in jogos" :key="item.id">
      <span class="material-icons-sharp text-blue-700" style="font-size:70px !important">{{item.icon}}</span>
      <p class="text-xs uppercase font-bold text-blue-600">{{item.name}}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const jogos = ref([
  {
    id:1,
    name:'Jogo da memória',
    icon:'window',
    to:'memory'
  },
  {
    id:2,
    name:'Jogo da cobrinha', 
    icon:'show_chart',
    to:'snake'
  },
  {
    id:3,
    name:'Jogo do aviao',
    icon:'flight',
    to:'fly'
  },
  {
    id:4,
    name:'Jogo do menininho', 
    icon:'directions_run',
    to: 'run'
  }
])
</script>

<style lang="scss" scoped>

</style>