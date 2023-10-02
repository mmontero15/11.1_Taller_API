let pagina = 1;

document.getElementById('btnSiguiente').addEventListener('click', async () => {
  if (pagina < 1000) {
    pagina++;
    await cargarPeliculas();
  }
});

document.getElementById('btnAnterior').addEventListener('click', async () => {
  if (pagina > 1) {
    pagina--;
    await cargarPeliculas();
  }
});

async function cargarPeliculas() {
  try {
    const apiKey = '192e0b9821564f26f52949758ea3c473';
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX&page=${pagina}`);
    
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      const peliculasHTML = datos.results.map(pelicula => `
        <div class="pelicula">
          <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
          <h3 class="titulo">${pelicula.title}</h3>
        </div>
      `).join('');

      document.getElementById('contenedor').innerHTML = peliculasHTML;
    } else {
      console.log('Hubo un error al cargar las películas.');
    }
  } catch (error) {
    console.error('Ocurrió un error inesperado: ', error);
  }
}

cargarPeliculas();