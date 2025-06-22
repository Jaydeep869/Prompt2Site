# 🚀 Prompt2Site – AI-Powered Website Generator

Prompt2Site is an AI-powered tool that generates complete front-end websites (HTML, CSS, JS) based on simple text prompts. Users can view live previews, download code, or save projects with Firebase-authenticated accounts.

---

## 🌟 Features

* 🧠 **AI-Powered Website Generation** – Uses LLM APIs (via OpenRouter) to convert prompts into fully functional HTML, CSS, and JS websites.
* 🔒 **Secure Authentication** – Google and anonymous login via Firebase.
* 🧑‍💻 **Code Preview** – View generated code side-by-side with live output.
* 💾 **Project Save & History** – Save past generations, view project history, and delete them securely.
* 📦 **Download Projects** – Instantly download a ZIP file with all project files.
* 🎨 **Modern UI** – Glassmorphic design with responsive layout, animations, and an intuitive interface.


---

## 🔧 Tech Stack

| Frontend          | Backend           | Auth/DB                 | Deployment                 |
| ----------------- | ----------------- | ----------------------- | -------------------------- |
| Vite + Vanilla JS | Node.js + Express | Firebase Auth + MongoDB | Render (API) + Vercel (UI) |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/jaydeep869/prompt2site.git
cd prompt2site
```

### 2. Environment Variables

#### Backend `.env`

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...} 
```

#### Frontend `.env`

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> Place the above `.env` file inside the `/frontend` folder.

---

### 3. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 4. Run Locally

#### Backend

```bash
npm start
# Server runs at http://localhost:3000
```

#### Frontend

```bash
npm run dev
# Vite runs at http://localhost:5173
```

---

## 🔐 Authentication

* Firebase handles  **Google Sign-In.**
* The client obtains a Firebase ID token and sends it with requests to protected routes like `/api/save` and `/api/history`.
* The backend verifies this token before granting access.

---

## 🌍 Deployment

* **Backend**: Deployed on [Render](https://render.com)
* **Frontend**: Deployed on [Vercel](https://vercel.com)&#x20;

Live Deployments:

* Frontend: [https://prompt2site.vercel.app](https://prompt2site.vercel.app)
* Backend API: [https://prompt2site-1.onrender.com](https://prompt2site-1.onrender.com)

---
## Preview
![Screenshot from 2025-06-22 17-41-54](https://github.com/user-attachments/assets/2929dbe6-d355-4aa2-8bc8-32463d0a68ae)
![Screenshot from 2025-06-22 17-42-12](https://github.com/user-attachments/assets/6a6f0a7c-63be-4d9e-935b-2604ba3900e0)


https://github.com/user-attachments/assets/207eb358-b6e3-43c7-8ee0-81cb6c3f4259



---

## 🧠 Credits & Acknowledgments

* 🔍 **OpenRouter / OpenAI API** – For converting text prompts into working front-end code.
* 🧑‍🎓 **Firebase** – For secure authentication and user identity management.
* 💡 **AI Assistant ( )** – Helped refine CSS styling, error handling logic.

---

## 📄 License

MIT License – Open-source and free to use. Contributions and forks are welcome!

> Made with 💙 by jaydeep 
