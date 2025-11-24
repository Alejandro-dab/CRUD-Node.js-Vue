<script setup>
import { ref, onMounted } from 'vue'; // Necesitamos onMounted
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router'; // Necesitamos useRoute

const router = useRouter(); 
const route = useRoute(); // <-- Para leer los parámetros de la URL

// Variables para el formulario
const id = ref(null); // Para guardar el ID del insumo que estamos editando
const descripcion = ref('');
const precio = ref('');
const stock = ref('');
const esEdicion = ref(false); // Para saber si estamos creando o editando

// --- LOGICA DE CARGA DE DATOS ---
const cargarDatos = async () => {
    // 1. ¿Hay un ID en la URL? (ej: /editar/1001)
    if (route.params.id) {
        id.value = route.params.id;
        esEdicion.value = true;
        
        try {
            // 2. Pedimos los datos al Backend
            const respuesta = await axios.get(`http://localhost:7000/api/insumos/${id.value}`);
            const data = respuesta.data;
            
            // 3. Llenamos las variables reactivas con los datos que llegaron
            descripcion.value = data.descripcion;
            precio.value = data.precio;
            stock.value = data.stock;
        } catch (error) {
            console.error("Error al cargar datos:", error);
            alert("No se pudieron cargar los datos del insumo.");
        }
    }
};

// --- LOGICA DE GUARDADO/ACTUALIZACION ---
const guardar = async () => {
    const datos = {
        descripcion: descripcion.value,
        precio: precio.value,
        stock: stock.value
    };

    try {
        if (esEdicion.value) {
            // Si es edición, usamos PUT
            await axios.put(`http://localhost:7000/api/insumos/${id.value}`, datos);
            alert('¡Actualizado con éxito!');
        } else {
            // Si no es edición, usamos POST
            await axios.post('http://localhost:7000/api/insumos', datos);
            alert('¡Guardado con éxito!');
        }
        
        router.push('/'); 
    } catch (error) {
        console.error(error);
        alert('Error al guardar/actualizar');
    }
};

// 4. Ejecutamos la carga de datos al entrar a la vista
onMounted(() => {
    cargarDatos();
});
</script>

<template>
  <div class="contenedor-form">
    <h1>{{ esEdicion ? 'Editar Insumo' : 'Nuevo Insumo' }}</h1> 
    
    <form @submit.prevent="guardar">
        <div class="grupo">
            <label>Descripción:</label>
            <input v-model="descripcion" type="text" placeholder="Ej. Cemento" required>
        </div>

        <div class="grupo">
            <label>Precio:</label>
            <input v-model="precio" type="number" step="0.01" placeholder="0.00" required>
        </div>

        <div class="grupo">
            <label>Stock:</label>
            <input v-model="stock" type="number" placeholder="0" required>
        </div>

        <button type="submit" class="btn-guardar">{{ esEdicion ? 'Actualizar' : 'Guardar' }}</button> 
        <button type="button" class="btn-cancelar" @click="router.push('/')">Cancelar</button>
    </form>
  </div>
</template>

<style scoped>
.contenedor-form {
  max-width: 500px;
  margin: 0 auto;
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.grupo {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  color: #42b883;
  font-weight: bold;
}

input {
  padding: 10px;
  background-color: #1a1a1a;
  border: 1px solid #555;
  color: white;
  border-radius: 4px;
}

.btn-guardar {
  background-color: #42b883;
  color: #1a1a1a;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
}

.btn-cancelar {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}
</style>