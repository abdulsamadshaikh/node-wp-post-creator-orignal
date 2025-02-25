
# 🚀 Node WP Post Creator

A **Node.js** tool to automate **WordPress post creation** using the **WordPress REST API**. Effortlessly upload images, create posts with featured media, add custom content, and manage posts—fully automated using Node.js!

---

## 📦 Features

- 📤 **Upload Images** to WordPress Media Library
- 📝 **Create Blog Posts** with featured images
- 🔗 **Add GitHub Profile Link** to each post
- 🔐 **Use `.env` for secure credentials** (excluded from GitHub)
- 🚫 **Disable comments** by default (optional)
- ⚡ **Works with WordPress REST API**

---

## 🛠️ Prerequisites

- **Node.js** (v14 or above)
- A **WordPress** site with **Application Passwords** enabled
- **WordPress REST API** active (`/wp-json/wp/v2` should be accessible)

---

## ⚡ Getting Started

### 1️⃣ **Clone the Repository**

```bash
git clone https://github.com/abdulsamadshaikh/node-wp-post-creator.git
cd node-wp-post-creator
```

---

### 2️⃣ **Install Dependencies**

```bash
npm install
```

---

### 3️⃣ **Configure `.env` File**

Create a `.env` file in the root directory and add your credentials:

```env
# WordPress API Credentials
WORDPRESS_USERNAME=yourusername
WORDPRESS_PASSWORD=yourapplicationpassword

# WordPress REST API Endpoints
MEDIA_ENDPOINT=https://yourdomain.com/wp-json/wp/v2/media
POSTS_ENDPOINT=https://yourdomain.com/wp-json/wp/v2/posts
```

> ⚠️ **Note:** `.env` is ignored by `.gitignore` and will not be pushed to GitHub.

---

### 4️⃣ **Run the Script**

```bash
node index.js
```

✅ A post will be created on your WordPress site with:

- 📤 Uploaded Image as Featured Media  
- 📝 Custom Post Content  
- 🔗 GitHub Link Added  
- 🚫 Comments Disabled (by default)

---

## 💡 Example Post Content

```
✨ This post was auto-generated using Node.js and the WordPress API.

🔗 **Check out the creator's GitHub:** https://github.com/abdulsamadshaikh
```
---

## 📖 Customization

- **Change Post Title or Content:**  
  Edit the `title` and `content` fields in `index.js`.

- **Enable Comments:**  
  In `index.js`, set:

  ```javascript
  comment_status: "open"
  ```

- **Use Different Images:**  
  Replace the image in `/assets/img/` with your own.

---

## 🧑‍💻 Contributing

Contributions, issues, and feature requests are welcome!

1. 🍴 Fork the repo  
2. 📥 Create a new branch (`git checkout -b feature/your-feature`)  
3. 🛠️ Make your changes  
4. ✅ Submit a Pull Request

---

## 📧 Author

**👤 Abdul Samad**  
🔗 [GitHub Profile](https://github.com/abdulsamadshaikh)  
🌐 [Portfolio Website](https://getabdulsamad.com)

---

🚀 **Happy Coding!** 🎉
