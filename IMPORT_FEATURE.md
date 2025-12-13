# WeaveIt Studio - Import Repo / Docs Feature

## Overview

The Import Repo / Docs feature allows users to import content from GitHub repositories and known documentation sites directly into WeaveIt Studio, all **frontend-only** with no backend required.

## Features

### 1. GitHub Repository Import
- Input any GitHub repository URL in the format: `https://github.com/owner/repo`
- Automatically fetches and extracts text content from the repository
- Supports: `.md`, `.mdx`, `.txt`, `.json`, `.js`, `.ts`, `.tsx`, `.jsx` files
- Skips: hidden files, node_modules, dist, build, .git, coverage folders
- File size limit: 500KB per file
- Total import limit: 100 files max

### 2. Docs Site Auto-Mapping
The feature recognizes popular documentation sites and automatically imports from their GitHub sources:

- `docs.solana.com` → `solana-labs/solana-docs`
- `nextjs.org/docs` → `vercel/next.js`
- `tailwindcss.com/docs` → `tailwindlabs/tailwindcss.com`
- `docs.astro.build` → `withastro/astro`
- `react.dev` → `facebook/react`
- `typescript.org` → `microsoft/TypeScript-Website`

When a docs URL is detected, it shows:
> "Imported from GitHub source for best results."

### 3. Smart File Grouping
Imported files are automatically grouped by folder:
- `Repository Root` — Root-level files
- `Folder: {folder_name}` — Files organized by directory

Small files from the same folder are combined for efficiency.

### 4. Content Handling
- Extracts raw text from all supported file types
- Limits total content to 100KB per source
- Shows appropriate messages if no content is extracted
- Graceful error handling for:
  - Repository not found (404)
  - GitHub API rate limits (429)
  - Network errors
  - Unsupported file types

## UI Components

### Input Bar
Located in the left sidebar below "Add Sources":
- Text input field for URL
- Import button (shows loading spinner during import)
- Real-time validation

### Feedback Messages
- **Success**: "Repository imported successfully! (X files)"
- **Docs Mapping**: "Imported from GitHub source for best results. Imported X files."
- **Error - Rate Limit**: "GitHub API rate limit exceeded. Please try again in a few minutes."
- **Error - Not Found**: "Repository not found"
- **Error - Unsupported**: "Direct docs extraction not supported yet. Paste a GitHub repo instead."

## How It Works

### Architecture (Frontend-Only)

```
User Input URL
        ↓
detectURLType()
        ↓
    Is GitHub? → parseGitHubURL() → fetchGitHubTree()
        ↓
    Is Docs Site? → Map to GitHub → fetchGitHubTree()
        ↓
    Unknown → Show error
        ↓
extractGitHubContent()  (Recursive tree traversal)
        ↓
fetchGitHubFileContent() (Fetch raw file content)
        ↓
combineImportedFiles()  (Group by folder)
        ↓
Add to uploadedFiles state
        ↓
Show in Sources panel
```

### Key Functions

**`detectURLType(url)`**
- Checks if URL is a GitHub repo
- Checks if URL is a known docs site (with mapping)
- Returns type and normalized URL

**`parseGitHubURL(url)`**
- Extracts owner and repo from GitHub URL
- Returns { owner, repo } or null

**`fetchGitHubTree(owner, repo, path)`**
- Uses GitHub REST API (no auth required)
- Fetches directory contents
- Handles rate limits and errors

**`extractGitHubContent(owner, repo, basePath, depth)`**
- Recursively traverses repo tree
- Filters out unwanted directories and files
- Uses `Promise.allSettled` for parallel fetching
- Respects file size and count limits

**`combineImportedFiles(files, repoUrl)`**
- Groups files by directory
- Creates Studio sources with metadata
- Limits content to 100KB per source

## Usage Examples

### Import GitHub Repository
```
1. Click "Import Repo / Docs" input field
2. Paste: https://github.com/tailwindlabs/tailwindcss
3. Click Import button
4. Wait for extraction (typically 2-5 seconds)
5. Files appear in Sources panel
```

### Import from Known Docs Site
```
1. Click "Import Repo / Docs" input field
2. Paste: https://nextjs.org/docs
3. Click Import button
4. Feature automatically maps to GitHub source
5. Shows: "Imported from GitHub source for best results"
6. Files appear in Sources panel
```

## Performance Considerations

- **Recursive Depth**: Limited to 5 levels to avoid deep folder structures
- **File Extraction**: Parallel fetching with `Promise.allSettled` for reliability
- **Rate Limiting**: GitHub API allows 60 requests/hour (unauthenticated)
- **Content Limits**: 100KB max per source prevents UI freeze
- **File Count**: Max 100 files to prevent performance issues

## Error Handling

**GitHub API Errors:**
- 404 Repository Not Found → "Repository not found"
- 403 Rate Limited → "GitHub API rate limit exceeded. Please try again in a few minutes."
- Other errors → "Unable to extract content from this source"

**Invalid Input:**
- No URL → "Please enter a repository or documentation URL"
- Invalid format → "Invalid GitHub repository URL. Use format: https://github.com/owner/repo"
- Unsupported docs site → "Direct docs extraction not supported yet. Paste a GitHub repo instead."

**Empty Results:**
- No supported files → "No supported files found in this repository"

## No Backend Required ✓

- ✅ All file extraction happens in the browser
- ✅ GitHub REST API is public (no authentication needed)
- ✅ No server-side processing
- ✅ No proxy or intermediary required
- ✅ Works completely offline after initial import

## Browser Compatibility

Requires:
- Modern browser with Fetch API
- ES2020+ support
- Promise.allSettled support

Tested with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

- [ ] GitLab support
- [ ] Bitbucket support
- [ ] Authenticated GitHub API (higher rate limits)
- [ ] Selective folder import
- [ ] Direct documentation site parsing (with headless browser)
- [ ] Cache imported repos for offline use
