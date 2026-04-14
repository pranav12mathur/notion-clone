# ✦ Notevo — Full Stack SaaS Note-taking App

A Notion-inspired note-taking web app built with React, Node.js, Express, and MongoDB.

## 🔗 Live Demo
- **Frontend:** [notevo.vercel.app](https://notevo.vercel.app)
- **Backend:** [notevo-server.onrender.com](https://notevo-server.onrender.com)

## ✨ Features
- User authentication (signup, login, logout)
- Create, read, update, delete notes
- Auto-save while typing
- Emoji picker for notes
- Mark notes as favorites
- Search notes instantly
- Clean, minimal UI inspired by Notion

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React, Vite, TailwindCSS, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcrypt |
| Deployment | Vercel (frontend) + Render (backend) |

## 📁 Project Structure
\`\`\`
notion-clone/
├── client/          # React frontend
│   ├── src/
│   │   ├── api/         # Axios instance
│   │   ├── components/  # Sidebar, NoteCard
│   │   ├── context/     # Auth context
│   │   └── pages/       # Landing, Dashboard, NotePage
└── server/          # Node.js backend
    ├── config/      # MongoDB connection
    ├── controllers/ # Auth + Note logic
    ├── middleware/  # JWT auth, error handler
    ├── models/      # User, Note schemas
    └── routes/      # Auth + Note routes
\`\`\`

## 🚀 Run Locally

### Prerequisites
- Node.js v22+
- MongoDB Atlas account

### Backend
\`\`\`bash
cd server
npm install
# Create .env file with your values
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`

### Environment Variables

**server/.env**
\`\`\`
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
\`\`\`

**client/.env**
\`\`\`
VITE_API_URL=http://localhost:5000/api
\`\`\`

## 📸 Screenshots
> Dashboard with notes, sidebar, and editor

## 👨‍💻 Author
**Pranav Mathur**
- GitHub: [@yourusername](https://github.com/yourusername)

## 📄 License
MIT