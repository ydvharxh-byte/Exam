# Central Administrative & Leadership Examination Portal

Premier preparation suite, interactive CBT simulator, and 10 topic quizzes for administrative and leadership examinations.

## Run Locally

1. Install dependencies:
   `npm install`
2. Start dev server:
   `npm run dev`
3. Build production bundle:
   `npm run build`

## Current Implementation Mode

This repository currently runs in **demo mode** with browser persistence:

- Participant session, resources, quizzes, discussions, announcements, and admin data are stored in localStorage.
- Live updates across tabs are handled via BroadcastChannel.
- Admin login is demo-only and not server-protected.

## Production Deployment Upgrade Path (Required for Real Multi-User)

To meet strict production requirements for real authentication, shared storage, and authorization, connect the frontend to a backend service.

### Suggested Backend Stack

- API: Node.js + Express (or NestJS)
- Database: PostgreSQL
- Auth: JWT/HttpOnly session with bcrypt-hashed passwords
- RBAC: super_admin/editor/moderator roles validated server-side
- Realtime: WebSocket/SSE for discussions and announcements
- File Sync: Google Drive API v3 using service account or OAuth app credentials

### Required Environment Variables (Backend)

- `DATABASE_URL`
- `JWT_SECRET`
- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_PROJECT_ID`
- `GOOGLE_DRIVE_STUDY_FOLDER_ID`
- `GOOGLE_DRIVE_QUIZ_FOLDER_ID`

### Optional Frontend Environment Variable

- `VITE_API_BASE_URL` for switching from local demo store to backend API endpoints.

## Google Drive Integration Notes

- Public folder links do not guarantee complete metadata access for all files.
- Use Drive API credentials for reliable file listing and content extraction.
- For inaccessible files, use the Admin import fallback in the app to paste a JSON array of resource metadata.

## Security Notes

- Do not place API keys or service account secrets in frontend code.
- Demo admin credentials are for local testing only.
- Enforce authorization checks in backend handlers for all admin actions.