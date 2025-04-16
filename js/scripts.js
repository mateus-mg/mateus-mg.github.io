const toggleButton = document.getElementById('toggle-button');
const sidebar = document.getElementById('sidebar');
const sidebarLinks = sidebar.querySelectorAll('a');

function toggleSidebar() {
    sidebar.classList.toggle('open');
}

// Fecha o menu ao clicar fora
document.addEventListener('click', (e) => {
    const isClickInsideSidebar = sidebar.contains(e.target);
    const isClickOnButton = toggleButton.contains(e.target);
    if (!isClickInsideSidebar && !isClickOnButton) {
        sidebar.classList.remove('open');
    }
});

// Fecha o menu ao clicar em qualquer link do menu
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});

const idiomaBarras = document.querySelectorAll('.idioma-barra');
const bolinhas = document.querySelectorAll('.bolinha');
let idiomaAtual = 0;

function mostrarIdioma(idx) {
    idiomaBarras.forEach((el, i) => {
        el.classList.toggle('ativo', i === idx);
    });
    bolinhas.forEach((b, i) => {
        b.classList.toggle('ativo', i === idx);
    });
}

bolinhas.forEach((bolinha, idx) => {
    bolinha.addEventListener('click', () => {
        idiomaAtual = idx;
        mostrarIdioma(idiomaAtual);
    });
});

// Inicializa mostrando o primeiro idioma
mostrarIdioma(idiomaAtual);

// Carrossel de skills
const skillsBarras = document.querySelectorAll('.skills-barra');
const bolinhasSkills = document.querySelectorAll('.bolinha-skills');
let skillsAtual = 0;

function mostrarSkills(idx) {
    skillsBarras.forEach((el, i) => {
        el.classList.toggle('ativo', i === idx);
    });
    bolinhasSkills.forEach((b, i) => {
        b.classList.toggle('ativo', i === idx);
    });
}

bolinhasSkills.forEach((bolinha, idx) => {
    bolinha.addEventListener('click', () => {
        skillsAtual = idx;
        mostrarSkills(skillsAtual);
    });
});

// Inicializa mostrando o primeiro grupo de skills
mostrarSkills(skillsAtual);