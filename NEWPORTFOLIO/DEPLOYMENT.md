# 🚀 Deployment Guide (Vercel)

Your portfolio is now architected for a seamless monorepo deployment on Vercel.

## 1. Prerequisites

- A Vercel account.
- Your code pushed to a GitHub/GitLab/Bitbucket repository.
- (Optional) A MongoDB Atlas URI if you want to use the database features.

## 2. Deployment Steps

1. **Import Project**: In Vercel, click "Add New" -> "Project" and import your repository.
2. **Configure Settings**:
   - **Framework Preset**: **Other** (Do NOT select Vite, as it will try to run from the client subfolder).
   - **Root Directory**: `.` (Keep as root).
   - **Build Command**: `npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install` (The default is fine).
3. **Environment Variables**:
   - Add `MONGODB_URI` with your connection string.
   - (The project will use fallback data if this is missing).

## 3. Architecture Details

- **Frontend**: React/Vite app located in `/client`.
- **Backend API**: Express server in `/server`, proxied through `/api/index.js` for Vercel Serverless Functions.
- **Routing**: `vercel.json` handles mapping `/api` to the server and all other routes to the React SPA.

## 4. Troubleshooting

- **Missing Tailwind**: Fixed by adding `tailwindcss` and `postcss` directly to `client/package.json`.
- **Build Errors**: Ensure you use `npm run build` at the root, which is now configured to build the correct workspace.

## 5. Local Development

To run everything locally:

```bash
npm install
npm run dev:server  # Starts Express on :5000
npm run dev:client  # Starts Vite on :5173
```
