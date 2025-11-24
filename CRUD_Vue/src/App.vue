<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Suministros</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* Estilos simples para el menú */
nav {
  padding: 1rem;
  background-color: #2c2c2c; /* <--- CAMBIO: Gris oscuro */
  margin-bottom: 20px;
  text-align: center;
  border-radius: 8px; /* Un toque moderno */
}

nav a {
  font-weight: bold;
  color: #e0e0e0; 
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983; /* Verde Vue */
}
</style>