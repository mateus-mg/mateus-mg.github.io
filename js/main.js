/**
 * Portfolio Repo Loader
 * Fetches data/repos.json and renders project cards.
 */

(async function () {
  const container = document.getElementById('projects-container');

  if (!container) {
    console.error('Projects container not found');
    return;
  }

  function createProjectCard(repo) {
    const card = document.createElement('a');
    card.className = 'project-card';
    card.href = repo.html_url || '#';
    card.target = '_blank';
    card.rel = 'noopener';

    const name = document.createElement('h3');
    name.textContent = repo.name || 'Unnamed Project';

    const desc = document.createElement('p');
    desc.textContent = repo.description || 'No description available.';

    const meta = document.createElement('div');
    meta.className = 'project-meta';

    if (repo.language) {
      const lang = document.createElement('span');
      lang.className = 'lang-tag';
      lang.textContent = repo.language;
      meta.appendChild(lang);
    }

    if (typeof repo.stargazers_count === 'number') {
      const stars = document.createElement('span');
      stars.className = 'stars';
      stars.textContent = `${repo.stargazers_count} star${repo.stargazers_count !== 1 ? 's' : ''}`;
      meta.appendChild(stars);
    }

    card.appendChild(name);
    card.appendChild(desc);
    card.appendChild(meta);

    return card;
  }

  function showError(message) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <p>${message}</p>
      </div>
    `;
  }

  try {
    const response = await fetch('data/repos.json');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      showError('No projects found yet. Check back soon!');
      return;
    }

    // Sort by stars descending
    repos.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));

    container.innerHTML = '';
    repos.forEach(repo => {
      container.appendChild(createProjectCard(repo));
    });
  } catch (err) {
    console.error('Failed to load projects:', err);
    showError('Unable to load projects. Please try again later.');
  }
})();
