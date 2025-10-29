const form = document.querySelector('#pr-form');
const status = document.querySelector('#status');

const API_BASE = 'https://api.github.com';

const templates = {
  loading: (message) => `<p>${message}</p>`,
  success: (url) =>
    `<p>All checks passed. Redirecting to <a href="${url}" rel="noopener noreferrer">${url}</a>…</p>`,
  error: (message) => `<p>${message}</p>`,
};

function show(message, type = 'loading') {
  status.className = type === 'success' ? 'status-success' : type === 'error' ? 'status-error' : '';
  status.innerHTML = templates[type](message);
}

async function fetchJson(url, token) {
  const headers = {
    Accept: 'application/vnd.github+json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    headers,
  });

  if (response.status === 404) {
    throw new Error('Resource not found. Double-check the owner, repository, and branch names.');
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const detail = body.message ? `: ${body.message}` : '';
    throw new Error(`GitHub API error${detail}`);
  }

  return response.json();
}

async function validateRepository(owner, repo, token) {
  const url = `${API_BASE}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  return fetchJson(url, token);
}

async function validateBranch(owner, repo, branch, token) {
  const url = `${API_BASE}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/branches/${encodeURIComponent(branch)}`;
  return fetchJson(url, token);
}

function buildPrUrl(owner, repo, base, head) {
  const encodedOwner = encodeURIComponent(owner);
  const encodedRepo = encodeURIComponent(repo);
  const encodedBase = encodeURIComponent(base);
  const encodedHead = encodeURIComponent(head);
  return `https://github.com/${encodedOwner}/${encodedRepo}/compare/${encodedBase}...${encodedHead}?expand=1`;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const owner = (formData.get('owner') || '').trim();
  const repo = (formData.get('repo') || '').trim();
  const base = (formData.get('base') || '').trim();
  const head = (formData.get('head') || '').trim();
  const token = (formData.get('token') || '').trim();

  if (!owner || !repo || !base || !head) {
    show('Please fill in all required fields.', 'error');
    return;
  }

  try {
    show('Checking repository…');
    await validateRepository(owner, repo, token);

    show(`Checking base branch “${base}”…`);
    await validateBranch(owner, repo, base, token);

    show(`Checking head branch “${head}”…`);
    await validateBranch(owner, repo, head, token);

    const url = buildPrUrl(owner, repo, base, head);
    show(url, 'success');

    setTimeout(() => {
      window.location.href = url;
    }, 800);
  } catch (error) {
    show(error.message, 'error');
  }
});
