# ⚡ Cyber-Themed Developer Portfolio

A modern, futuristic, and fully dynamic **full-stack portfolio website** with an integrated **Admin Dashboard CMS** to manage projects, skills, and messages in real-time.

Designed with a **cyberpunk aesthetic**, smooth animations, dynamic content management, project detail pages, contact form storage, Telegram notifications, and direct image uploads from the admin dashboard.

---

## 🚀 Highlights

- Futuristic cyber-themed portfolio UI
- Dynamic project management with admin dashboard
- Project detail pages with screenshots and feature lists
- Skills management from admin panel
- Contact form with MongoDB storage
- Telegram notifications for new messages
- Local image upload using Multer
- Secure admin authentication
- Fully responsive layout

---

## ✨ Features

### 🌐 Portfolio Website
- Cyberpunk-styled homepage
- Featured projects section
- Dynamic projects listing page
- Dynamic project details page
- Static about page
- Dynamic contact form
- Smooth animations with Framer Motion
- Responsive design for desktop and mobile

### ⚙️ Admin Dashboard
- Secure admin login
- Add / edit / delete projects
- Upload project cover image from laptop
- Upload multiple project screenshots from laptop
- Add GitHub link and live demo link
- Add project features and full descriptions
- Manage skills dynamically
- View incoming contact messages
- Delete messages from dashboard
- Dynamic dashboard stats for projects, skills, and messages

### 📬 Contact System
- Stores messages in MongoDB
- Sends instant Telegram notification
- Messages appear in admin dashboard
- Clean success / error handling

---

## 🧠 Tech Stack

Frontend:
- Next.js 16
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- JWT Authentication
- Cookie Parser
- CORS

Database:
- MongoDB Atlas or Local MongoDB

---

## 📁 Project Structure

portfolio
│
├── frontend
│   ├── app
│   │   ├── about
│   │   ├── admin
│   │   │   └── dashboard
│   │   ├── contact
│   │   ├── projects
│   │   │   └── [slug]
│   │   └── work
│   │
│   ├── components
│   ├── lib
│   ├── public
│   └── next.config.ts
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── utils
│   │
│   ├── uploads
│   │   └── projects
│   ├── .env
│   └── server.js
│
└── README.md

---

## ⚙️ COMPLETE SETUP GUIDE

STEP 1 — CLONE REPOSITORY

git clone https://github.com/yourusername/portfolio.git
cd portfolio

---

STEP 2 — FRONTEND SETUP

cd frontend

npm install

Create file:

.env.local

Add:

NEXT_PUBLIC_API_URL=http://localhost:5000/api

Start frontend:

npm run dev

Frontend runs on:

http://localhost:3001

---

STEP 3 — BACKEND SETUP

cd backend

npm install

Install dependencies:

npm install express mongoose cors dotenv bcryptjs jsonwebtoken cookie-parser multer axios
npm install -D nodemon

Create file:

.env

Add:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

Add scripts in package.json:

"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}

Create uploads folder:

mkdir uploads
mkdir uploads/projects

Start backend:

npm run dev

Backend runs on:

http://localhost:5000

---

STEP 4 — MONGODB SETUP

Option A: MongoDB Atlas

Create cluster
Create database user
Allow network access
Copy connection string

Example:

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolioDB

---

Option B: Local MongoDB

Install MongoDB locally

Use:

MONGODB_URI=mongodb://127.0.0.1:27017/portfolioDB

---

STEP 5 — TELEGRAM NOTIFICATIONS SETUP

Open Telegram

Search:

BotFather

Send:

/start

Then:

/newbot

Follow instructions

Copy bot token.

Example:

TELEGRAM_BOT_TOKEN=123456:ABCXYZ

Open browser:

https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates

Send message to bot first:

/start

You will see:

"chat": {
"id": 123456789
}

Use that number:

TELEGRAM_CHAT_ID=123456789

---

STEP 6 — IMAGE UPLOAD SYSTEM

Images upload directly from admin dashboard.

Stored in:

backend/uploads/projects

Accessed via:

http://localhost:5000/uploads/projects/image.jpg

Supported formats:

jpg
jpeg
png
webp

Max size:

5MB per image

Supports:

main project image
multiple screenshots

---

STEP 7 — ADMIN LOGIN

Admin panel:

http://localhost:3001/admin

Login using:

ADMIN_EMAIL
ADMIN_PASSWORD

After login:

/admin/dashboard

---

STEP 8 — AVAILABLE ROUTES

PUBLIC ROUTES

/
homepage

/about
about page

/projects
projects listing

/projects/[slug]
project details page

/contact
contact form

/work
work page

---

ADMIN ROUTES

/admin
login

/admin/dashboard
dashboard overview

/admin/dashboard/projects
manage projects

/admin/dashboard/skills
manage skills

/admin/dashboard/messages
view messages

---

STEP 9 — PROJECT DATA STRUCTURE

Each project stores:

title
slug
description
fullDescription
tech stack array
main image
screenshots array
features array
github link
live link
featured flag
status

---

STEP 10 — CONTACT FLOW

User submits form
↓
saved to MongoDB
↓
telegram notification sent
↓
visible in admin dashboard

---

STEP 11 — ADMIN CAPABILITIES

PROJECT MANAGEMENT

add project
edit project
delete project
upload images
upload screenshots
add tech stack
add features
add github link
add live link
mark featured
set project status

SKILLS MANAGEMENT

add skill
edit skill
delete skill

MESSAGE MANAGEMENT

view messages
delete messages

---

STEP 12 — RUN PROJECT LOCALLY

Terminal 1:

cd backend
npm run dev

Terminal 2:

cd frontend
npm run dev

Open:

http://localhost:3001

---

STEP 13 — DEPLOYMENT NOTES

Frontend environment variable:

NEXT_PUBLIC_API_URL=https://your-backend-url/api

Backend environment variables:

MONGODB_URI=production_database
JWT_SECRET=production_secret
TELEGRAM_BOT_TOKEN=token
TELEGRAM_CHAT_ID=chatid

Deploy:

Frontend → Vercel
Backend → Render / Railway
Database → MongoDB Atlas

---

STEP 14 — FUTURE IMPROVEMENTS

blog system
certificate manager
internship manager
markdown editor
drag and drop uploads
analytics dashboard
dark/light theme toggle
project filtering
search functionality

---

STEP 15 — AUTHOR

N. Bhageeratha

Computer Science Student
Full Stack Developer
AI Enthusiast

Portfolio:
https://bhagee.com

GitHub:
https://github.com/N-Bhageeratha

LinkedIn:
https://www.linkedin.com/in/n-bhageeratha

---

STEP 16 — LICENSE

Free to use for learning and inspiration.

---

⭐ If you like this project, give it a star on GitHub.