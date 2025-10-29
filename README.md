# Best Life Blog Utilities

This repository contains a small static helper page that can generate the
correct GitHub "Create Pull Request" link for any repository. It verifies that
the repository and both branches exist before redirecting to GitHub. This helps
avoid the generic "GitHub resource not found" error message that appears when a
branch or repository name is incorrect.

## Development

The site is a static bundle served from `index.html`. You can open the file
directly in a browser or use any static HTTP server.

```bash
python -m http.server 8000
```

Then navigate to <http://localhost:8000/>.

## Deployment

The page is completely static, so you can deploy the repository with any static
hosting solution (GitHub Pages, Netlify Drop, Vercel static hosting, etc.).

## Project Structure

- `index.html` – the main markup for the helper page.
- `styles.css` – styling for the layout.
- `script.js` – validation and redirect logic for generating pull request links.

## Usage

1. Enter the GitHub repository owner and name (for example: `bestlifeofficial/blog`).
2. Provide the base branch (usually `main`) and the head branch (the branch you
   want to merge).
3. Click **Create Pull Request**.
4. If the repository and branches exist, the page redirects you to GitHub's PR
   creation screen. If not, it displays a helpful error message explaining what
   went wrong so you can fix the information before retrying.
