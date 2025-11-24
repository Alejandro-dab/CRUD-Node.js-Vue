<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // 1. Importamos router

const router = useRouter(); // 2. Lo activamos
const insumos = ref([]);

const obtenerInsumos = async () => {
  try {
    // Usamos import.meta.env.VITE_API_URL y le pegamos el resto de la ruta
  const respuesta = await axios.get(import.meta.env.VITE_API_URL + '/api/insumos');
    insumos.value = respuesta.data;
  } catch (error) {
    console.error("Error al obtener insumos:", error);
  }
};

// 3. Función Nueva para Borrar
const eliminarInsumo = async (id, nombre) => {
  if (confirm(`¿Estás seguro de borrar: ${nombre}?`)) {
    try {
      //Usar la variable de entorno para que jale en Railway también
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/insumos/${id}`);
    
      //Invocar obtenerInsumos
      obtenerInsumos(); 
      
      alert('Eliminado correctamente');
    } catch (error) {
      console.error("Error al borrar:", error);
      alert('No se pudo borrar');
    }
  }
};

onMounted(() => {
  obtenerInsumos();
});
</script>

<template>
  <div class="contenedor-tabla">
    <h1>📦 Inventario de Obra</h1>
    
    <RouterLink to="/crear" class="btn-crear">Nuevo Insumo</RouterLink>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in insumos" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.descripcion }}</td>
          <td>${{ item.precio }}</td>
          <td>{{ item.stock || 0 }} u.</td>
          <td>
            <button class="btn-editar" @click="router.push('/editar/' + item.id)">Editar</button>
            
            <button class="btn-eliminar" @click="eliminarInsumo(item.id, item.descripcion)">Borrar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Estilos Dark Mode para la tabla */
.contenedor-tabla {
  margin-top: 20px;
}

h1 {
  margin-bottom: 20px;
  color: #42b883;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #2c2c2c; /* Fondo gris oscuro */
  border-radius: 8px;
  overflow: hidden;
  margin-top: 10px;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #444;
}

th {
  background-color: #42b883; /* Cabecera verde */
  color: #1a1a1a; /* Texto negro en la cabecera para contraste */
  font-weight: bold;
}

tr:hover {
  background-color: #3a3a3a; /* Efecto hover */
}

/* Botones */
.btn-crear {
  background-color: #42b883;
  color: #1a1a1a;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  text-decoration: none; 


}

.btn-editar {
  background-color: #f0c724ff; /* Amarillo */
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  margin-right: 5px;
  color: black;
  cursor: pointer; 
  transition: all 0.2s;
}

.btn-eliminar {
  background-color: #e74c3c; /* Rojo */
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  color: white;
  cursor: pointer; 
  transition: all 0.2s;
}
</style>