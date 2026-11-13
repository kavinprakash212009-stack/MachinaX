/**
 * MachinaX – Blogs Engine
 * Loads JSON/static dataset, handles filtering, search, and dynamic article rendering
 */

document.addEventListener('DOMContentLoaded', () => {
  initBlogEngine();
});

async function fetchBlogs() {
  // If window fallback data exists, we already have offline data
  let blogs = window.MachinaXBlogsData || [];

  try {
    // Attempt fetch from static JSON (works on HTTP/HTTPS/Vercel)
    const jsonPath = window.location.pathname.includes('/blog/') ? '../data/blogs.json' : 'data/blogs.json';
    const response = await fetch(jsonPath);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        blogs = data;
      }
    }
  } catch (err) {
    // Graceful fallback to window.MachinaXBlogsData on file:// or network error
    console.info('MachinaX: Using static local blog dataset.');
  }

  return blogs;
}

async function initBlogEngine() {
  const blogs = await fetchBlogs();

  // Check if we are on the single article reader page
  if (document.getElementById('article-viewport')) {
    renderSingleArticle(blogs);
    return;
  }

  // Otherwise, we are on the blogs listing page
  const grid = document.getElementById('blogs-container');
  if (!grid) return;

  const searchInput = document.getElementById('blog-search-input');
  const filterChips = document.querySelectorAll('.filter-chip');

  let activeCategory = 'All';
  let searchQuery = '';

  function render() {
    const filtered = blogs.filter(article => {
      const matchesCategory = activeCategory === 'All' || article.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = !searchQuery || 
        article.title.toLowerCase().includes(searchQuery) ||
        article.excerpt.toLowerCase().includes(searchQuery) ||
        article.tags.some(t => t.toLowerCase().includes(searchQuery));
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;" class="glass-card">
          <div style="font-size: 2rem; margin-bottom: 12px; color: var(--electric-blue);">⚡</div>
          <h3 style="font-family: var(--font-display); color: var(--white); margin-bottom: 8px;">NO ARTICLES LOCATED</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">No technical publications match your current search query or filter parameter.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(article => {
      // Determine correct relative link to article
      const articleUrl = `blog/article-template.html?id=${encodeURIComponent(article.id)}`;
      const imgPath = article.image;

      return `
        <article class="blog-card tilt-card reveal">
          <div class="blog-thumb-wrap">
            <img src="${imgPath}" alt="${article.title}" loading="lazy" />
            <span class="project-category-tag">${article.category}</span>
          </div>
          <div class="blog-card-body">
            <div class="blog-meta-row">
              <span class="blog-badge">${article.category}</span>
              <span class="blog-read-time">${article.readTime}</span>
            </div>
            <h3 class="blog-card-title">
              <a href="${articleUrl}">${article.title}</a>
            </h3>
            <p class="blog-card-excerpt">${article.excerpt}</p>
            <div class="blog-footer-row">
              <span>${article.date}</span>
              <a href="${articleUrl}" class="view-details-btn">
                READ LOG <span>&rarr;</span>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Re-initialize tilt effect on newly added cards
    if (window.init3DCardTilts) {
      window.init3DCardTilts();
    }
  }

  // Filter chips
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-category') || 'All';
      render();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      render();
    });
  }

  // Initial render
  render();
}

/* ---------------- Single Article Reader View ---------------- */
function renderSingleArticle(blogs) {
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get('id') || params.get('slug') || (blogs[0] && blogs[0].id);

  const article = blogs.find(b => b.id === articleId || b.slug === articleId) || blogs[0];
  if (!article) return;

  // Set document title
  document.title = `${article.title} | MachinaX Publications`;

  // Update elements
  const titleEl = document.getElementById('article-title');
  const catEl = document.getElementById('article-category');
  const dateEl = document.getElementById('article-date');
  const readEl = document.getElementById('article-read-time');
  const authorEl = document.getElementById('article-author');
  const authorRoleEl = document.getElementById('article-author-role');
  const contentEl = document.getElementById('article-content');
  const tagsEl = document.getElementById('article-tags');
  const heroImgEl = document.getElementById('article-hero-image');

  if (titleEl) titleEl.textContent = article.title;
  if (catEl) catEl.textContent = article.category;
  if (dateEl) dateEl.textContent = article.date;
  if (readEl) readEl.textContent = article.readTime;
  if (authorEl) authorEl.textContent = article.author || 'MachinaX Research Core';
  if (authorRoleEl) authorRoleEl.textContent = article.authorRole || 'Lead Systems Architect';

  if (heroImgEl && article.image) {
    heroImgEl.src = `../${article.image}`;
    heroImgEl.alt = article.title;
  }

  if (tagsEl && article.tags) {
    tagsEl.innerHTML = article.tags.map(t => `<span class="project-tag">#${t}</span>`).join('');
  }

  if (contentEl && article.content) {
    // Parse simple markdown headers, code blocks and quotes
    let formatted = article.content
      .replace(/### (.*?)\n/g, '<h3>$1</h3>')
      .replace(/## (.*?)\n/g, '<h2>$1</h2>')
      .replace(/> (.*?)\n/g, '<blockquote><p>$1</p></blockquote>')
      .replace(/```([a-z]*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      .split('\n\n')
      .map(p => {
        if (p.startsWith('<h') || p.startsWith('<block') || p.startsWith('<pre')) return p;
        return `<p>${p}</p>`;
      })
      .join('');

    contentEl.innerHTML = formatted;
  }

  // Reading progress bar calculation
  window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('reading-progress');
    if (!progressBar) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }, { passive: true });

  // Related articles
  const relatedContainer = document.getElementById('related-articles');
  if (relatedContainer) {
    const related = blogs.filter(b => b.id !== article.id).slice(0, 3);
    relatedContainer.innerHTML = related.map(rel => `
      <div class="glass-card tilt-card" style="padding: 20px;">
        <span class="blog-badge" style="margin-bottom: 8px; display: inline-block;">${rel.category}</span>
        <h4 style="font-family: var(--font-display); font-size: 1rem; margin-bottom: 8px;">
          <a href="article-template.html?id=${rel.id}" style="color: var(--white);">${rel.title}</a>
        </h4>
        <p style="font-size: 0.8rem; color: var(--text-muted);">${rel.readTime} • ${rel.date}</p>
      </div>
    `).join('');
  }
}

