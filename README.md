<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/2

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Create a Git repository and push to GitHub

1. Initialize a local git repository and commit the project:

```powershell
cd 'c:\Users\lucca\OneDrive\Desktop\aplicação meio foda'
git init
git add .
git commit -m "chore: initial commit"
git branch -M main
```

2. Create a repository on GitHub (via web or `gh` CLI) and add it as remote, then push:

```powershell
# replace <YOUR_REMOTE_URL> with the HTTPS or SSH URL from GitHub
git remote add origin <YOUR_REMOTE_URL>
git push -u origin main
```

3. Optional: deploy to Vercel or Netlify — they can build a Vite app directly. Use `npm run build` to create a production build locally.

If you want, I can create the Git commit for you now and prepare a ready-to-push local repo (I won't add a remote without the URL).

