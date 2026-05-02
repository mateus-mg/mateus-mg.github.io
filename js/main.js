/**
 * Portfolio Repo Loader
 * Fetches data/repos.json and renders project cards.
 */

document.addEventListener('DOMContentLoaded', function() {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        once: true,
        offset: 100,
        duration: 600
      });
    }
  }
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      }
    });
  }
});

(async function () {
  const container = document.getElementById('projects-container');

  if (!container) {
    console.error('Projects container not found');
    return;
  }

  const techIcons = {
    'Python': 'fa-brands fa-python',
    'JavaScript': 'fa-brands fa-js',
    'TypeScript': 'fa-brands fa-js',
    'HTML': 'fa-brands fa-html5',
    'CSS': 'fa-brands fa-css3-alt',
    'Java': 'fa-brands fa-java',
    'Go': 'fa-brands fa-golang',
    'Rust': 'fa-brands fa-rust',
    'PHP': 'fa-brands fa-php',
    'Ruby': 'fa-brands fa-ruby',
    'Swift': 'fa-brands fa-swift',
    'React': 'fa-brands fa-react',
    'Vue': 'fa-brands fa-vuejs',
    'Angular': 'fa-brands fa-angular',
    'Docker': 'fa-brands fa-docker',
    'Linux': 'fa-brands fa-linux'
  };

  function createProjectCard(repo) {
    const card = document.createElement('a');
    card.className = 'project-card';
    card.href = repo.html_url || '#';
    card.target = '_blank';
    card.rel = 'noopener';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'project-image-wrapper';

    // Tentar usar imagem local automaticamente
    const localImagePath = `assets/projects/${repo.name}.png`;

    const img = document.createElement('img');
    img.src = localImagePath;
    img.loading = 'lazy';
    img.alt = `Preview of ${repo.name || 'Unnamed Project'}`;

    // Se imagem não existir, mostrar placeholder
    img.onerror = function() {
      this.remove();
      const placeholder = document.createElement('div');
      placeholder.className = 'project-image-placeholder';
      const iconClass = repo.language && techIcons[repo.language]
        ? techIcons[repo.language]
        : 'fa-solid fa-code';
      placeholder.innerHTML = `<i class="${iconClass}"></i>`;
      imageWrapper.appendChild(placeholder);
    };

    imageWrapper.appendChild(img);

    const name = document.createElement('h3');
    name.textContent = repo.name || 'Unnamed Project';

    const desc = document.createElement('p');
    desc.textContent = repo.description || 'No description available.';

    const badges = document.createElement('div');
    badges.className = 'project-badges';

    if (repo.language) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      const iconClass = techIcons[repo.language] || 'fa-solid fa-code';
      badge.innerHTML = `<i class="${iconClass}"></i> ${repo.language}`;
      badges.appendChild(badge);
    }

    if (repo.topics && repo.topics.length > 0) {
      repo.topics.slice(0, 2).forEach(topic => {
        const badge = document.createElement('span');
        badge.className = 'badge badge-topic';
        badge.textContent = topic;
        badges.appendChild(badge);
      });
    }

    const meta = document.createElement('div');
    meta.className = 'project-meta';

    if (typeof repo.stargazers_count === 'number') {
      const stars = document.createElement('span');
      stars.className = 'stars';
      stars.innerHTML = `<i class="fa-solid fa-star"></i> ${repo.stargazers_count} star${repo.stargazers_count !== 1 ? 's' : ''}`;
      meta.appendChild(stars);
    }

    card.appendChild(imageWrapper);
    card.appendChild(name);
    card.appendChild(desc);
    card.appendChild(badges);
    card.appendChild(meta);

    return card;
  }

  function showError(type = 'default') {
    const messages = {
      notfound: 'Projects are being updated. Check back soon!',
      invalid: 'Projects temporarily unavailable.',
      empty: 'No projects to display yet.',
      default: 'Unable to load projects. Please try again later.'
    };
    const message = messages[type] || messages.default;

    const projectsHeader = document.querySelector('#projects h2, .projects-title');
    if (projectsHeader) {
      projectsHeader.style.display = 'none';
    }

    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1; text-align:center; padding:3rem 1rem;">
        <p style="font-size:1.1rem; color:var(--text-secondary, #6b7280);">${message}</p>
      </div>
    `;
  }

  try {
    const response = await fetch('data/repos.json');

    if (!response.ok) {
      if (response.status === 404) {
        showError('notfound');
      } else {
        showError('default');
      }
      return;
    }

    let repos;
    try {
      repos = await response.json();
    } catch (parseErr) {
      showError('invalid');
      return;
    }

    if (!Array.isArray(repos) || repos.length === 0) {
      showError('empty');
      return;
    }

    container.innerHTML = '';
    repos.forEach(repo => {
      container.appendChild(createProjectCard(repo));
    });
  } catch (err) {
    console.error('Failed to load projects:', err);
    showError('default');
  }
})();
