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

const siguienteFoto = () => {
  indice = (indice + 1) % fotos.length;
  mostrarFoto();
};

const anteriorFoto = () => {
  indice = (indice - 1 + fotos.length) % fotos.length;
  mostrarFoto();
};

fetch('/api/images')
  .then((res) => res.json())
  .then((data) => {
    fotos = data.images;
    mostrarFoto();
  });
