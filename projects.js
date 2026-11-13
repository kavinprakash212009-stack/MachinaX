/**
 * MachinaX – Projects Portfolio Engine
 * Loads projects dataset, handles category filtering, and powers detail modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectsEngine();
});

async function fetchProjects() {
  let projects = window.MachinaXProjectsData || [];

  try {
    const response = await fetch('data/projects.json');
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        projects = data;
      }
    }
  } catch (err) {
    console.info('MachinaX: Using static local projects dataset.');
  }

  return projects;
}

async function initProjectsEngine() {
  const grid = document.getElementById('projects-container');
  if (!grid) return;

  const projects = await fetchProjects();
  const filterChips = document.querySelectorAll('.project-filter-chip');

  let activeCategory = 'All';

  function render() {
    const filtered = projects.filter(p => {
      if (activeCategory === 'All') return true;
      return p.category.toLowerCase() === activeCategory.toLowerCase();
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;" class="glass-card">
          <h3 style="font-family: var(--font-display); color: var(--white); margin-bottom: 8px;">NO PROJECTS IN THIS CATEGORY</h3>
          <p style="color: var(--text-muted);">Please select a different engineering classification.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(p => {
      const tagsHtml = p.techStack ? p.techStack.map(t => `<span class="project-tag">${t}</span>`).join('') : '';

      return `
        <div class="project-card tilt-card reveal">
          <div class="project-media-wrap">
            <img src="${p.image}" alt="${p.title}" loading="lazy" />
            <span class="project-category-tag">${p.category}</span>
          </div>
          <div class="project-content">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--electric-blue);">${p.id.toUpperCase()}</span>
              <span class="tech-cat-badge" style="border-color: rgba(0, 255, 163, 0.4); color: var(--success);">${p.status}</span>
            </div>
            <h3 class="project-title">${p.title}</h3>
            <p class="project-desc">${p.summary}</p>
            <div class="project-tags">
              ${tagsHtml}
            </div>
            <div class="project-actions">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">ARCH: V4.8</span>
              <button class="view-details-btn" onclick="openProjectModal('${p.id}')">
                SPECIFICATIONS <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.init3DCardTilts) {
      window.init3DCardTilts();
    }
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-category') || 'All';
      render();
    });
  });

  // Make openProjectModal globally available
  window.openProjectModal = function(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    let specsHtml = '';
    if (project.specs) {
      specsHtml = `
        <div class="tech-metrics" style="margin: 24px 0;">
          ${Object.entries(project.specs).map(([key, val]) => `
            <div class="metric-cell">
              <span class="metric-val">${val}</span>
              <span class="metric-key">${key}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    const techHtml = project.techStack 
      ? `<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;">
          ${project.techStack.map(t => `<span class="project-tag">#${t}</span>`).join('')}
        </div>`
      : '';

    const content = `
      <div style="margin-bottom: 20px;">
        <span class="tech-cat-badge" style="color: var(--success); border-color: rgba(0,255,163,0.3); margin-bottom: 12px; display: inline-block;">STATUS: ${project.status}</span>
        <h2 style="font-family: var(--font-display); font-size: 1.6rem; color: var(--white); margin-bottom: 16px;">${project.title}</h2>
        <div style="width: 100%; height: 200px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 24px; border: 1px solid var(--glass-border);">
          <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 20px; font-size: 1rem;">${project.description || project.summary}</p>
        ${specsHtml}
        <h4 style="font-family: var(--font-display); font-size: 0.85rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--electric-blue); margin-bottom: 10px;">CORE TECHNOLOGICAL SUB-SYSTEMS</h4>
        ${techHtml}
        <div style="padding: 16px; background: rgba(0, 217, 255, 0.05); border: 1px solid rgba(0, 217, 255, 0.2); border-radius: var(--radius-md); margin-top: 24px;">
          <p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--crystal-purple);">CLASSIFICATION: PUBLIC ENGINEERING DISCLOSURE // VERIFIED BY MACHINAX LABS</p>
        </div>
      </div>
    `;

    if (window.openMachinaModal) {
      window.openMachinaModal(`TECHNICAL SCHEMATIC`, content);
    }
  };

  render();
}

