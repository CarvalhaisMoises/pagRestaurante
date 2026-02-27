const track = document.querySelector('.carrossel-track');
let imagens = Array.from(track.children);
const visiveis = 4;
let indice = 0;

// Clonando imagens para loop infinito
for (let i = 0; i < visiveis; i++) {
    track.appendChild(imagens[i].cloneNode(true));
    track.insertBefore(imagens[imagens.length - 1 - i].cloneNode(true), track.firstChild);
}
imagens = Array.from(track.children);

function atualizar() {
    const largura = imagens[0].getBoundingClientRect().width + 10;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${(indice + visiveis) * largura}px)`;
}

// Próximo
function proximo() {
    indice++;
    atualizar();
    const largura = imagens[0].getBoundingClientRect().width + 10;
    if (indice >= imagens.length - visiveis * 2) {
        setTimeout(() => {
            track.style.transition = 'none';
            indice = 0;
            track.style.transform = `translateX(-${visiveis * largura}px)`;
        }, 500);
    }
}

// Anterior
function anterior() {
    indice--;
    atualizar();
    const largura = imagens[0].getBoundingClientRect().width + 10;
    if (indice < 0) {
        setTimeout(() => {
            track.style.transition = 'none';
            indice = imagens.length - visiveis * 2 - 1;
            track.style.transform = `translateX(-${(indice + visiveis) * largura}px)`;
        }, 500);
    }
}

// Inicialização
const largura = imagens[0].getBoundingClientRect().width + 10;
track.style.transform = `translateX(-${visiveis * largura}px)`;

// Troca automática
let intervalo = setInterval(proximo, 3000);
track.parentElement.addEventListener('mouseenter', () => clearInterval(intervalo));
track.parentElement.addEventListener('mouseleave', () => intervalo = setInterval(proximo, 3000));

// Modal
function abrirModal(titulo, descricao, imagem) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modalTitulo").innerText = titulo;
    document.getElementById("modalDescricao").innerText = descricao;
    document.getElementById("modalImg").src = imagem;
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) fecharModal();
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") fecharModal();
});