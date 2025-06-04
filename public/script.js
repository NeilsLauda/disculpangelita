let fotos = [];
let indice = 0;
const imagen = document.getElementById('foto');

const mostrarFoto = () => {
  if (!fotos.length) return;
  imagen.style.opacity = 0;
  setTimeout(() => {
    imagen.src = `images/${fotos[indice]}`;
    imagen.style.opacity = 1;
  }, 200);
};

const cargarFotos = () => {
  fetch('/api/images')
    .then((res) => res.json())
    .then((data) => {
      fotos = data.images;
      indice = 0;
      mostrarFoto();
    });
};

const siguienteFoto = () => {
  indice = (indice + 1) % fotos.length;
  mostrarFoto();
};

const anteriorFoto = () => {
  indice = (indice - 1 + fotos.length) % fotos.length;
  mostrarFoto();
};


const eliminarFotoActual = () => {
  if (!fotos.length) return;
  const foto = fotos[indice];
  fetch(`/api/images/${foto}`, { method: 'DELETE' })
    .then((res) => {
      if (res.ok) {
        cargarFotos();
      }
    });
};

document.getElementById('uploadForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const fileInput = document.getElementById('nuevaFoto');
  if (!fileInput.files.length) return;
  const formData = new FormData();
  formData.append('image', fileInput.files[0]);
  fetch('/api/images', { method: 'POST', body: formData })
    .then((res) => res.ok && cargarFotos());
});

cargarFotos();
