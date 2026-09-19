# 📚 Học C++ Cơ Bản đến Nâng Cao

Trang web học lập trình C++ với giao diện dark mode, tích hợp compiler online.

## 🚀 Tính năng

- **Giao diện Dark Mode**: Dễ nhìn, bảo vệ mắt khi học tập
- **Sidebar Navigation**: Điều hướng dễ dàng giữa các chương
- **Syntax Highlighting**: PrismJS làm nổi bật cú pháp C++
- **Online Compiler**: Tích hợp OnlineCompiler API qua Cloudflare Workers
- **Bài tập thực hành**: Code template + nút Compile & Run
- **Responsive Design**: Hiển thị tốt trên mọi thiết bị

## 🛠️ Công nghệ sử dụng

- **Frontend**: ReactJS + Vite
- **Styling**: CSS thuần (Dark theme)
- **Markdown**: react-markdown + remark-gfm
- **Syntax Highlight**: PrismJS
- **Backend Proxy**: Cloudflare Workers
- **Compiler API**: OnlineCompiler.io

## 📦 Cài đặt và Chạy

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy development server

```bash
npm run dev
```

### 3. Build cho production

```bash
npm run build
```

### 4. Preview bản build

```bash
npm run preview
```

## 🔧 Cấu hình Cloudflare Workers

### Bước 1: Deploy Worker

1. Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Vào **Workers & Pages** → **Create Application**
3. Chọn **Upload** và upload file `src/workers/worker.js`
4. Đặt tên Worker (ví dụ: `cpp-compiler`)
5. Copy URL của Worker (ví dụ: `https://cpp-compiler.your-subdomain.workers.dev`)

### Bước 2: Cập nhật URL trong CodeEditor

Mở file `src/components/CodeEditor.jsx` và thay đổi:

```javascript
const WORKER_URL = 'https://your-worker-name.your-subdomain.workers.dev/compile';
```

thành URL Worker bạn vừa tạo.

## 🌐 Deploy lên GitHub Pages

### Bước 1: Build project

```bash
npm run build
```

### Bước 2: Đẩy lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cpp-learning-web.git
git push -u origin main
```

### Bước 3: Cấu hình GitHub Pages

1. Vào repository trên GitHub
2. **Settings** → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** / folder: **/root**
5. Save và chờ deploy

### Bước 4: Truy cập site

Sau khi deploy xong, truy cập:
```
https://YOUR_USERNAME.github.io/cpp-learning-web/
```

## 📁 Cấu trúc thư mục

```
cpp-learning-web/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Menu điều hướng
│   │   ├── ContentViewer.jsx    # Hiển thị nội dung Markdown
│   │   └── CodeEditor.jsx       # Editor + Compile button
│   ├── data/
│   │   └── content.json         # Nội dung bài học (JSON)
│   ├── styles/
│   │   └── dark-theme.css       # CSS dark mode
│   ├── workers/
│   │   └── worker.js            # Cloudflare Worker code
│   └── App.jsx                  # Main component
├── vite.config.js               # Vite config (base path)
├── package.json
└── README.md
```

## 📝 Nội dung bài học

1. **Hướng dẫn Code::Blocks** - Cài đặt và sử dụng IDE
2. **Chủ đề 1**: Làm quen với C++ (toán tử, biến, xuất/nhập)
3. **Chủ đề 2**: Lệnh điều kiện, vòng lặp
4. **Chủ đề 3**: Mảng một chiều
5. **Chủ đề 4**: Xâu ký tự (String)
6. **Chủ đề 5**: Đọc/Ghi file

Mỗi chủ đề đều có bài tập thực hành với code template và nút Compile.

## 🔑 API Key

API key OnlineCompiler được cấu hình trong Cloudflare Worker để bảo mật.

## 📄 License

MIT License

---

**Chúc bạn học C++ hiệu quả! 🎉**
