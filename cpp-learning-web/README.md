# 📚 Trang Web Học C++ - cpp-learning-web

Trang web học lập trình C++ từ cơ bản đến nâng cao, tích hợp trình biên dịch online trực tiếp trong trình duyệt.

![C++ Learning](https://img.shields.io/badge/C%2B%2B-Learning-blue)
![React](https://img.shields.io/badge/React-19-black?logo=react)
![Vite](https://img.shields.io/badge/Vite-Build-purple?logo=vite)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange?logo=cloudflare)

## ✨ Tính năng nổi bật

- 🌙 **Giao diện Dark Mode** - Dễ nhìn, bảo vệ mắt khi học tập lâu
- 📑 **Sidebar Menu** - Điều hướng dễ dàng giữa các chương/bài học
- 🎨 **Syntax Highlighting** - PrismJS làm nổi bật cú pháp C++ đẹp mắt
- ⚡ **Trình biên dịch Online** - Tích hợp OnlineCompiler API qua Cloudflare Workers
- 💻 **Bài tập thực hành** - Code template sẵn + compile & run trực tiếp
- 📱 **Responsive Design** - Hỗ trợ hoàn hảo trên mobile và desktop
- 🔒 **Bảo mật API Key** - Giấu key trong Cloudflare Worker, không expose ra frontend

## 🛠️ Công nghệ sử dụng

| Thành phần | Công nghệ |
|------------|-----------|
| **Frontend Framework** | ReactJS 19 |
| **Build Tool** | Vite |
| **Styling** | CSS thuần (Custom Dark Theme) |
| **Syntax Highlighting** | PrismJS (Tomorrow Night theme) |
| **Markdown Rendering** | react-markdown + remark-gfm |
| **Backend Proxy** | Cloudflare Workers |
| **Compiler API** | OnlineCompiler.io (G++ 15) |

## 📁 Cấu trúc dự án

```
cpp-learning-web/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx         # Menu điều hướng bên trái
│   │   ├── ContentViewer.jsx   # Hiển thị nội dung bài học (Markdown)
│   │   └── CodeEditor.jsx      # Editor code + nút Compile & Run
│   ├── data/
│   │   └── content.json        # Toàn bộ nội dung bài học (JSON)
│   ├── styles/
│   │   └── dark-theme.css      # CSS variables cho dark mode
│   ├── workers/
│   │   └── worker.js           # Cloudflare Worker proxy code
│   ├── App.jsx                 # Main component
│   └── main.jsx                # Entry point
├── public/                     # Static assets
├── index.html
├── package.json
├── vite.config.js              # Base path config cho GitHub Pages
└── README.md                   # File hướng dẫn này
```

## 🚀 Hướng dẫn cài đặt & Deploy

### Bước 1: Cài đặt Local (Development)

```bash
# Clone repo hoặc vào thư mục dự án
cd cpp-learning-web

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Truy cập `http://localhost:5173` để xem trang web trong quá trình phát triển.

---

### Bước 2: Deploy Cloudflare Worker (Bắt buộc)

Worker đóng vai trò trung gian để:
- 🔐 Giấu API key của OnlineCompiler
- 🌐 Tránh lỗi CORS khi gọi API từ browser
- 🎯 Gọi đúng endpoint `/api/run-code-sync/`

#### Cách 1: Upload qua Cloudflare Dashboard (Khuyến nghị)

1. Truy cập [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Vào **Workers & Pages** → **Create Application** → **Create Worker**
3. Đặt tên Worker: `cpp-compiler` (hoặc tên khác bạn thích)
4. Mở file `src/workers/worker.js` trong dự án
5. Copy toàn bộ nội dung file
6. Paste vào editor của Cloudflare Worker và nhấn **Save and Deploy**
7. Ghi lại URL Worker (ví dụ: `https://cpp-compiler.your-subdomain.workers.dev`)

#### Cách 2: Dùng Wrangler CLI

```bash
# Cài đặt Wrangler toàn cục
npm install -g wrangler

# Đăng nhập vào Cloudflare
wrangler login

# Deploy Worker
wrangler deploy src/workers/worker.js --name cpp-compiler
```

Sau khi deploy, Wrangler sẽ hiển thị URL của Worker. Hãy ghi lại URL này!

---

### Bước 3: Cập nhật Worker URL trong Code

Mở file `src/components/CodeEditor.jsx`, tìm dòng khai báo `WORKER_URL` (khoảng dòng 4):

```javascript
const WORKER_URL = 'https://cpp-compiler.YOUR-SUBDOMAIN.workers.dev/compile';
```

Thay thế `YOUR-SUBDOMAIN` bằng subdomain thật mà bạn đã nhận được ở Bước 2.

Ví dụ:
```javascript
const WORKER_URL = 'https://cpp-compiler.nguyen-van-a.workers.dev/compile';
```

**Lưu ý:** Phải thêm `/compile` vào cuối URL.

---

### Bước 4: Build & Deploy lên GitHub Pages

#### 4.1. Build production

```bash
npm run build
```

Lệnh này sẽ tạo thư mục `dist/` chứa toàn bộ file tĩnh đã được optimize.

#### 4.2. Push code lên GitHub

```bash
# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả file
git add .

# Commit
git commit -m "C++ Learning Web - Initial commit"

# Đổi branch thành main
git branch -M main

# Thêm remote repository (thay YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/cpp-learning-web.git

# Push lên GitHub
git push -u origin main
```

#### 4.3. Kích hoạt GitHub Pages

1. Vào repository GitHub của bạn
2. Chọn tab **Settings** → **Pages** (cột bên trái)
3. Tại mục **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** Chọn `main` 
   - **Folder:** Chọn `/ (root)`
4. Nhấn **Save**

Đợi khoảng 1-3 phút, GitHub sẽ deploy xong. URL trang web sẽ là:

```
https://YOUR_USERNAME.github.io/cpp-learning-web/
```

**Lưu ý quan trọng:** Nếu bạn đổi tên repository, hãy cập nhật `base` trong file `vite.config.js` trước khi build:

```javascript
export default defineConfig({
  base: '/ten-repo-moi/',
  // ...
})
```

---

### Bước 5: (Optional) Deploy lên Cloudflare Pages

Nếu bạn muốn dùng Cloudflare Pages thay vì GitHub Pages:

```bash
# Build trước
npm run build

# Deploy lên Cloudflare Pages
wrangler pages deploy dist --project-name cpp-learning-web
```

Cloudflare Pages sẽ tự động cung cấp HTTPS và CDN toàn cầu.

---

## 📖 Nội dung bài học

Trang web bao gồm 6 phần chính:

| Section | Nội dung chi tiết |
|---------|-------------------|
| **Intro** | Hướng dẫn cài đặt Code::Blocks IDE |
| **Topic 1** | Làm quen với C++: Toán tử, Xuất/Nhập dữ liệu, Hằng & Biến |
| **Topic 2** | Lệnh điều kiện (if/else, switch) và Vòng lặp (for, while, do-while) |
| **Topic 3** | Mảng một chiều: Khai báo, Sắp xếp, Xóa phần tử trùng |
| **Topic 4** | Xâu ký tự (string): Các methods, Chuẩn hóa xâu |
| **Topic 5** | Đọc/Ghi file: fstream, Con trỏ file, Xử lý file văn bản |

Mỗi topic đều có **bài tập thực hành** đi kèm với:
- ✅ Template code C++ sẵn (chỉ cần điền logic)
- ✅ Ô nhập input (stdin) tùy chọn
- ✅ Nút **Compile & Run** để chạy code ngay trên web
- ✅ Hiển thị kết quả: Output, Error log, Thời gian chạy, Bộ nhớ sử dụng

---

## 🔌 API OnlineCompiler

Project sử dụng [OnlineCompiler.io](https://api.onlinecompiler.io) để biên dịch và chạy code C++.

### Thông số kỹ thuật

| Tham số | Giá trị |
|---------|---------|
| **Endpoint** | `POST /api/run-code-sync/` |
| **Base URL** | `https://api.onlinecompiler.io` |
| **Compiler** | `g++-15` (C++ G++ 15) |
| **Authentication** | API Key trong header `Authorization` |
| **Response** | JSON: `output`, `error`, `status`, `exit_code`, `time`, `memory` |

### Ví dụ Request/Response

**Request Body:**
```json
{
  "compiler": "g++-15",
  "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello World\";\n    return 0;\n}",
  "input": ""
}
```

**Response:**
```json
{
  "output": "Hello World",
  "error": "",
  "status": "success",
  "exit_code": 0,
  "signal": null,
  "time": "0.0248",
  "total": "0.0330",
  "memory": "8192"
}
```

📄 Xem chi tiết tại [OnlineCompiler Documentation](https://api.onlinecompiler.io/docs).

---

## 📝 Chỉnh sửa nội dung bài học

Để thêm, sửa, hoặc xóa bài học, mở file `src/data/content.json`.

### Cấu trúc JSON

```json
{
  "sections": [
    {
      "id": "topic1",
      "title": "Tên chủ đề",
      "content": "Nội dung bài học dưới dạng Markdown...",
      "exercises": [
        {
          "id": "ex1-1",
          "title": "Tên bài tập",
          "description": "Mô tả yêu cầu bài tập",
          "template": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Viết code của em vào đây\n    \n    return 0;\n}",
          "input": "",
          "expectedOutput": "Kết quả mong đợi (để tham khảo)"
        }
      ]
    }
  ]
}
```

### Trường dữ liệu

| Field | Kiểu | Bắt buộc | Mô tả |
|-------|------|----------|-------|
| `id` | string | ✅ | Định danh duy nhất cho section/exercise |
| `title` | string | ✅ | Tiêu đề hiển thị |
| `content` | string | ✅ | Nội dung bài học (Markdown syntax) |
| `exercises` | array | ❌ | Danh sách bài tập (có thể bỏ qua nếu không có) |
| `template` | string | ✅ (trong exercise) | Code C++ mẫu, người học sẽ chỉnh sửa |
| `input` | string | ❌ | Dữ liệu đầu vào (stdin) cho bài tập |
| `expectedOutput` | string | ❌ | Kết quả mong đợi (chỉ để tham khảo) |

---

## ⚠️ Lưu ý quan trọng

1. **🔐 API Key Security**
   - API key đã được giấu trong Cloudflare Worker
   - Không bao giờ expose API key ra frontend code
   - Nếu cần đổi key, chỉ cần sửa trong `worker.js` và redeploy Worker

2. **📁 File I/O (Topic 5)**
   - Khi compile trên OnlineCompiler, code không thể đọc/ghi file thực tế
   - Hướng dẫn người học sửa thành nhập từ `cin` thay vì `ifstream`
   - Hoặc comment phần file I/O và test với input thủ công

3. **⏱️ Giới hạn Compiler**
   - Timeout: 30 giây
   - RAM: 512 MB
   - CPU: 2 cores
   - Output tối đa: 999 ký tự (bị truncate nếu dài hơn)
   - Code size: 100 KB max

4. **🌐 CORS**
   - Không được gọi trực tiếp API OnlineCompiler từ browser
   - Bắt buộc phải qua Cloudflare Worker proxy

---

## 🎯 Todo - Nâng cấp trong tương lai

- [ ] Thêm hệ thống test cases tự động check kết quả bài tập
- [ ] Support multiple templates cho cùng 1 bài tập
- [ ] Toggle Dark/Light mode
- [ ] Export kết quả compile ra PDF
- [ ] Thêm video hướng dẫn nhúng vào bài học
- [ ] Progress tracking (lưu tiến độ học local storage)
- [ ] Chế độ thi/trắc nghiệm online
- [ ] Forum/Discussion cho mỗi bài học

---

## 🤝 Đóng góp

Mọi đóng góp về tính năng, bug fix, hoặc cải thiện nội dung đều được chào đón!

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

## 📄 License

MIT License - Tự do sử dụng, chỉnh sửa và phân phối.

Xem file [LICENSE](LICENSE) để biết chi tiết.

---

## 📞 Liên hệ & Hỗ trợ

Nếu gặp vấn đề khi cài đặt hoặc sử dụng:

1. Kiểm tra kỹ các bước trong README này
2. Đảm bảo Worker URL đã được cập nhật đúng
3. Mở Issue trên GitHub repository
4. Hoặc liên hệ trực tiếp qua email/discord (nếu có)

---

**Chúc bạn học C++ vui vẻ và hiệu quả!** 🚀💻

> *"Học lập trình không khó, chỉ cần kiên trì và thực hành thường xuyên!"*
