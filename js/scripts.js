const toggleButton = document.getElementById('toggle-button');
const sidebar = document.getElementById('sidebar');
const sidebarLinks = sidebar.querySelectorAll('a');

function toggleSidebar() {
    sidebar.classList.toggle('open');
    const iconeAtual = toggleButton.querySelector('.icone-menu');
    if (iconeAtual) {
        toggleButton.classList.add('trocando');
        iconeAtual.classList.remove('entrando');
        // Fade out + scale down
        setTimeout(() => {
            const icone = sidebar.classList.contains('open') ? '✖' : '☰';
            toggleButton.innerHTML = `<span class="icone-menu entrando">${icone}</span>`;
            // Fade in + scale up
            setTimeout(() => {
                const novoIcone = toggleButton.querySelector('.icone-menu');
                if (novoIcone) novoIcone.classList.add('entrando');
                toggleButton.classList.remove('trocando');
            }, 10);
        }, 140);
    }
}

// Garante o ícone correto ao carregar a página
const iconeInicial = sidebar.classList.contains('open') ? '✖' : '☰';
toggleButton.innerHTML = `<span class="icone-menu entrando">${iconeInicial}</span>`;

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

// Botão Voltar ao Topo
const btnTopo = document.getElementById('btn-topo');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        btnTopo.classList.add('mostrar');
    } else {
        btnTopo.classList.remove('mostrar');
    }
});
btnTopo.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});