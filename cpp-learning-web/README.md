# 📚 Trang Web Học C++ -_cpp-learning-web_

Trang web học lập trình C++ từ cơ bản đến nâng cao, tích hợp trình biên dịch online.

## ✨ Tính năng

- **Giao diện Dark Mode** - Dễ nhìn, bảo vệ mắt
- **Sidebar Menu** - Điều hướng dễ dàng giữa các chương
- **Syntax Highlighting** - PrismJS làm nổi bật cú pháp C++
- **Trình biên dịch Online** - Tích hợp OnlineCompiler API qua Cloudflare Workers
- **Bài tập thực hành** - Code template + compile & run trực tiếp
- **Responsive Design** - Hỗ trợ mobile và desktop

## 🛠️ Công nghệ sử dụng

- **Frontend:** ReactJS 19 + Vite
- **Styling:** CSS thuần (Dark theme)
- **Syntax Highlighting:** PrismJS
- **Markdown Rendering:** react-markdown + remark-gfm
- **Backend Proxy:** Cloudflare Workers
- **Compiler API:** OnlineCompiler.io (G++ 15)

## 📁 Cấu trúc dự án

```
cpp-learning-web/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx         # Menu điều hướng bên trái
│   │   ├── ContentViewer.jsx   # Hiển thị nội dung bài học
│   │   └── CodeEditor.jsx      # Editor code + compile button
│   ├── data/
│   │   └── content.json        # Nội dung bài học (JSON)
│   ├── styles/
│   │   └── dark-theme.css      # CSS dark mode
│   ├── workers/
│   │   └── worker.js           # Cloudflare Worker code
│   ├── App.jsx                 # Main component
│   └── main.jsx                # Entry point
├── index.html
├── package.json
├── vite.config.js              # Base path cho GitHub Pages
└── README.md
```

## 🚀 Hướng dẫn cài đặt & Deploy

### 1. Cài đặt local (Development)

```bash
cd cpp-learning-web
npm install
npm run dev
```

Truy cập `http://localhost:5173` để xem.

---

### 2. Deploy Cloudflare Worker (Bắt buộc)

Worker đóng vai trò proxy để:
- Giấu API key
- Tránh lỗi CORS
- Gọi đúng endpoint của OnlineCompiler

**Cách 1: Upload qua Dashboard**

1. Truy cập [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Vào **Workers & Pages** → **Create Application** → **Create Worker**
3. Đặt tên: `cpp-compiler`
4. Copy toàn bộ nội dung file `src/workers/worker.js`
5. Paste vào editor và **Save and Deploy**
6. Ghi lại URL Worker (ví dụ: `https://cpp-compiler.your-subdomain.workers.dev`)

**Cách 2: Dùng Wrangler CLI**

```bash
npm install -g wrangler
wrangler login
wrangler deploy src/workers/worker.js --name cpp-compiler
```

---

### 3. Cập nhật Worker URL trong Code

Mở file `src/components/CodeEditor.jsx`, dòng 4:

```javascript
const WORKER_URL = 'https://cpp-compiler.YOUR-SUBDOMAIN.workers.dev/compile';
```

Thay `YOUR-SUBDOMAIN` bằng subdomain thật của bạn.

---

### 4. Build & Deploy lên GitHub Pages

```bash
# Build production
npm run build

# Tạo repo trên GitHub rồi push code
git init
git add .
git commit -m "C++ Learning Web"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cpp-learning-web.git
git push -u origin main
```

**Kích hoạt GitHub Pages:**

1. Vào repo GitHub → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **gh-pages** (tùy chọn)
4. Folder: **/dist** (nếu dùng gh-pages) hoặc **/root** (nếu deploy tự động)
5. Save và đợi 1-2 phút

URL trang web sẽ là: `https://YOUR_USERNAME.github.io/cpp-learning-web/`

---

### 5. (Optional) Deploy lên Cloudflare Pages

```bash
npm install -g wrangler
wrangler pages deploy dist --project-name cpp-learning-web
```

---

## 📖 Nội dung bài học

| Section | Nội dung |
|---------|----------|
| Intro | Hướng dẫn cài đặt Code::Blocks |
| Topic 1 | Làm quen với C++ (toán tử, xuất/nhập, hằng/biến) |
| Topic 2 | Lệnh điều kiện (if/else, switch) và vòng lặp (for, while) |
| Topic 3 | Mảng một chiều (khai báo, sắp xếp, xóa phần tử trùng) |
| Topic 4 | Xâu ký tự (string methods, chuẩn hóa xâu) |
| Topic 5 | Đọc/Ghi file (fstream, con trỏ file) |

Mỗi topic có **bài tập thực hành** với template code sẵn, chỉ cần điền logic và bấm **Compile & Run**.

---

## 🔌 API OnlineCompiler

Project sử dụng [OnlineCompiler.io](https://api.onlinecompiler.io) với:

- **Endpoint:** `POST /api/run-code-sync/`
- **Compiler:** `g++-15` (C++ G++ 15)
- **Response:** JSON chứa `output`, `error`, `exit_code`, `time`, `memory`

Xem chi tiết tại [OnlineCompiler Documentation](https://api.onlinecompiler.io/docs).

---

## 📝 Chỉnh sửa nội dung

Để thêm/sửa bài học, mở file `src/data/content.json`:

```json
{
  "sections": [
    {
      "id": "topic1",
      "title": "Tên chủ đề",
      "content": "Nội dung Markdown...",
      "exercises": [
        {
          "id": "ex1-1",
          "title": "Tên bài tập",
          "description": "Mô tả",
          "template": "#include...\nint main() {...}",
          "input": "5",
          "expectedOutput": "Kết quả mong đợi"
        }
      ]
    }
  ]
}
```

---

## ⚠️ Lưu ý

1. **API Key** đã được giấu trong Cloudflare Worker, không expose ra frontend.
2. **File input/output** (Topic 5): Khi compile online, sửa thành nhập từ `cin` thay vì đọc file.
3. **Giới hạn compiler:** 30s timeout, 512MB RAM, output tối đa 999 ký tự.

---

## 🎯 Todo (Nâng cấp sau)

- [ ] Thêm test cases tự động check kết quả
- [ ] Support multiple templates cho cùng 1 bài
- [ ] Dark/Light mode toggle
- [ ] Export kết quả compile ra PDF
- [ ] Thêm video hướng dẫn

---

## 📄 License

MIT License - Tự do sử dụng và chỉnh sửa.

---

**Chúc bạn học C++ vui vẻ!** 🚀
