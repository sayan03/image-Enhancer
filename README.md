# 🚀 Image Enhancer  
**Enhance and upscale your images with AI in just seconds!**

🌐 **Live Demo:** [image-enhancer-virid.vercel.app](https://image-enhancer-virid.vercel.app/)

AI Image Enhancer UI <!-- Replace with hosted version of your screenshot -->
![Screenshot 2025-04-05 212550](https://github.com/user-attachments/assets/08ecfb89-dcdf-43b8-a04d-8d13406d911f)

---

## ✨ Features

- 🔍 **One-Click Image Enhancement**  
  Upload and enhance any image instantly using AI

- 🖼️ **Side-by-Side Comparison**  
  View original and enhanced images together

- 💻 **Responsive & Modern UI**  
  Built with TailwindCSS, supports desktop & mobile

- ⚡ **Real-Time Processing**  
  Watch your images get enhanced in seconds

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TailwindCSS
- **Build Tool**: Vite
- **HTTP**: Axios
- **AI Service**: PicWish API
- **Linting**: ESLint

---

## 🔧 Installation

```bash
git clone https://github.com/your-username/AI-Powered-Image-Enhancer.git
cd AI-Powered-Image-Enhancer
npm install
```

Create a `.env` file in the root:

```env
VITE_PICWISH_API_KEY=your_api_key_here
```

Run the app:

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## 📂 Project Structure

```
image-enhancer/
├── public/
├── src/
│   ├── components/
│   │   ├── Home.jsx
│   │   ├── ImagePreview.jsx
│   │   ├── ImageUpload.jsx
│   │   └── Loading.jsx
│   ├── utils/
│   │   └── enhanceImageApi.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 📤 API Integration

Using the **PicWish API**:

- `POST /api/tasks/visual/scale`: Upload for enhancement
- `GET /api/tasks/visual/scale/{task_id}`: Fetch enhanced result

All logic is in `src/utils/enhanceImageApi.js`

---

## 🚧 Future Improvements

- 📥 Download button for enhanced images
- 🎨 More enhancement options (colorize, sharpen, etc.)
- 🔄 Format conversion (JPG, PNG, WebP)
- 👤 User login & enhancement history
- 📦 Batch image processing

---

## 🤝 Contribution

Pull Requests are welcome!

```bash
git checkout -b feature/my-feature
git commit -m "Add my feature"
git push origin feature/my-feature
```

---

## 📄 License

MIT License

---

## 🙌 Credits

- [PicWish API](https://picwish.com/)
- [React](https://react.dev)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

