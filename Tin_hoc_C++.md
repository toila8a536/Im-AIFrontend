# Tài Liệu Học C++ & Hướng Dẫn Sử Dụng Code::Blocks

## Mục lục
1. [Hướng dẫn cài đặt và dùng Code::Blocks](#i-hướng-dẫn-cài-đặt-và-dùng-codeblocks)
2. [Tài liệu C++](#ii-tài-liệu-c)
   - [Chủ đề 1: Làm quen với C++](#chủ-đề-1-làm-quen-với-c)
   - [Chủ đề 2: Lệnh điều kiện, lệnh lặp](#chủ-đề-2-lệnh-điều-kiện-lệnh-lặp)
   - [Chủ đề 3: Mảng một chiều](#chủ-đề-3-mảng-một-chiều)
   - [Chủ đề 4: Xâu ký tự (String)](#chủ-đề-4-xâu-ký-tự-string)
   - [Chủ đề 5: Đọc tệp, ghi tệp](#chủ-đề-5-đọc-tệp-ghi-tệp)
   - [Bài tập thực hành File I/O](#bài-tập-thực-hành-file-io)

---

## I. Hướng dẫn cài đặt và dùng Code::Blocks

### 1. Tải và cài đặt Code::Blocks
- **Link tải:** [http://www.codeblocks.org/downloads/26](http://www.codeblocks.org/downloads/26)
- **Windows 64-bit:** Chọn `codeblocks-20.03mingw-setup.exe`
- **Windows 32-bit:** Chọn `codeblocks-20.03mingw-32bit-setup.exe`
*(Lưu ý: Nếu bản 32-bit báo "Không tìm thấy trình biên dịch GNU GCC", hãy tìm hiểu cách fix lỗi trên diễn đàn Code::Blocks).*

**Cài đặt phím tắt tự định dạng code (Format):**
1. Vào `Settings` -> `Editor` -> `Keyboard shortcuts`.
2. Tìm `Source code formatter (AStyle)` và gán phím tắt (ví dụ: `Alt-Shift-F`).

### 2. Tạo Project mới
1. Chọn `Create a new project` -> `Console application` -> `Go`.
2. Chọn ngôn ngữ `C++`.
3. Đặt `Project title` và chọn `Folder to create project in`.
4. Chọn `GNU GCC Compiler`, tích cả `Debug` và `Release` -> `Finish`.
5. Mở file `main.cpp` trong phần `Sources`, nhấn **F9** để dịch và chạy.

### 3. Khắc phục lỗi chạy thất bại (Win 7/8)
1. Nhấn `Windows + R`, gõ `services.msc`.
2. Tìm `Application Experiences`.
3. Chọn `Automatic (Delayed Start)` -> `Apply` -> `OK` và khởi động lại máy.

---

## II. Tài liệu C++

### Chủ đề 1: Làm quen với C++
**Mục tiêu:** Toán tử số học, xuất/nhập dữ liệu, hằng và biến.

#### 1. Các phép toán số học
| Phép toán | Ký hiệu | Ví dụ | Kết quả |
|-----------|---------|-------|---------|
| Cộng      | `+`     | `9+4` | `13`    |
| Trừ       | `-`     | `9-4` | `5`     |
| Nhân      | `*`     | `9*4` | `36`    |
| Chia      | `/`     | `9/4` | `2` (nguyên) |
| Chia      | `/`     | `9.0/4`| `2.25` (thực) |
| Chia lấy dư | `%`   | `9%4` | `1`     |
| Tăng 1    | `++`    | `a++` | `a = a+1`|
| Giảm 1    | `--`    | `a--` | `a = a-1`|

**Ví dụ xuất mặc định:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "9+4=" << 9+4 << endl;
    cout << "9/4=" << 9/4 << endl;   // Lấy phần nguyên
    cout << "9/4=" << 9.0/4 << endl; // Lấy phần thập phân
    cout << "9%4=" << 9%4 << endl;
    return 0;
}
```

**Xuất định dạng (`<iomanip>`):**
- `setw(n)`: Độ rộng.
- `left` / `right`: Căn lề.
- `setprecision(n)` và `fixed`: Số chữ số thập phân.

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    cout << setw(10) << left << "9+4=" << 9+4 << endl;
    cout << setw(10) << left << setprecision(5) << fixed << "9/4=" << 9.0/4 << endl;
    return 0;
}
```

#### 2. Hằng, Biến và Nhập/Xuất
- **Hằng (`const`):** Giá trị không đổi. `const double PI = 3.14159;`
- **Biến:** Giá trị có thể thay đổi. `int a = 0, b = 20;`

**Ví dụ tính diện tích & chu vi hình tròn:**
```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    const float pi = 3.14;
    float ban_kinh, dien_tich, chu_vi;
    
    cout << "Nhap ban kinh = ";
    cin >> ban_kinh;
    
    dien_tich = pi * ban_kinh * ban_kinh;
    chu_vi = 2 * pi * ban_kinh;
    
    cout << setprecision(5) << fixed << "Dien tich: " << dien_tich << endl;
    cout << setprecision(5) << fixed << "Chu vi: " << chu_vi << endl;
    return 0;
}
```

---

### Chủ đề 2: Lệnh điều kiện, lệnh lặp

#### 1. Toán tử quan hệ & Logic
- **Quan hệ:** `==`, `!=`, `>`, `<`, `>=`, `<=`
- **Logic:** AND (`&&`), OR (`||`), NOT (`!`)

#### 2. Lệnh `if ... else` và Toán tử 3 ngôi
```cpp
// Toán tử 3 ngôi: c = (a > b ? a - b : a + b);
int a, b, S;
cin >> a >> b;
S = (a > b ? a - b : a + b);
cout << S << endl;
```

#### 3. Lệnh `switch ... case`
```cpp
char dau;
int a, b, S;
cin >> a >> b >> dau;

switch (dau) {
    case '+': S = a + b; break;
    case '-': S = a - b; break;
    case '*': S = a * b; break;
    case '/': 
        if (b == 0) cout << "Phep chia cho 0!";
        else S = a / b; 
        break;
    default: cout << "Phep tinh khong hop le!";
}
```

#### 4. Vòng lặp (`for`, `while`, `do ... while`)
```cpp
// Vòng for
for (int a = 1; a <= 15; a++) {
    cout << "Gia tri cua a la: " << a << endl;
}

// Vòng do-while (thực hiện ít nhất 1 lần)
int a = 0;
do {
    a++;
    cout << a << endl;
} while (a < 15);
```

---

### Chủ đề 3: Mảng một chiều

**Khai báo & Khởi tạo:**
```cpp
int array1[4] = {5, 8, 2, 7}; // Chỉ định rõ
int array2[] = {5, 8, 2, 7};  // Tự suy ra kích thước
int array3[4] = {};           // Khởi tạo toàn 0
```

**Nhập/Xuất mảng bằng vòng lặp:**
```cpp
int a[200], n;
cout << "Nhap so phan tu n = "; cin >> n;
for (int i = 0; i < n; i++) {
    cout << "a[" << i << "]="; cin >> a[i];
}
for (int i = 0; i < n; i++) {
    cout << a[i] << " ";
}
```

**Sắp xếp mảng (Dùng hàm `sort` trong `<algorithm>`):**
```cpp
#include <algorithm>
#include <functional>
// ...
sort(a, a + n);                      // Tăng dần
sort(a, a + n, greater<int>());      // Giảm dần
```

**Xóa phần tử trùng lặp:**
```cpp
void RemoveDuplicates(int arr[], int &n) {
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; ) {
            if (arr[i] == arr[j]) {
                for (int k = j; k < n - 1; k++) arr[k] = arr[k + 1];
                n--;
            } else {
                j++;
            }
        }
    }
}
```

---

### Chủ đề 4: Xâu ký tự (String)

**Khai báo & Nhập xuất:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string S;
    cout << "Nhap xau S = ";
    getline(cin, S); // Đọc cả dòng
    cout << "Do dai xau: " << S.length() << endl;
    return 0;
}
```

**Các phương thức xử lý String:**
- `S.empty()`: Kiểm tra xâu rỗng.
- `S.clear()`: Xóa sạch xâu.
- `S.pop_back()`: Xóa ký tự cuối.
- `S.push_back('c')` / `S.append("text")` / `S1 + S2`: Nối xâu.
- `S.insert(vitri, "xau")`: Chèn xâu.
- `S.replace(vitri, soluong, "xau_moi")`: Thay thế.
- `S.find("xau_con")`: Tìm vị trí xuất hiện (trả về `-1` nếu không thấy).
- `S1.compare(S2)`: So sánh (`== 0` là bằng nhau).

**Chuyển đổi Số <-> Xâu:**
```cpp
int so = 45;
string s_so = to_string(so); // int sang string
int so_moi = stoi(s_so);     // string sang int
```

**Chuẩn hóa xâu (Xóa khoảng trắng thừa, viết hoa chữ cái đầu):**
```cpp
#include <sstream>
// ...
string S = "  xin   chao tat ca  ";
stringstream ss(S);
string token, kq;
while (ss >> token) {
    token[0] = toupper(token[0]);
    for (int i = 1; i < token.length(); i++) {
        token[i] = tolower(token[i]);
    }
    kq.append(token).append(" ");
}
kq.pop_back(); // Xóa dấu cách thừa cuối cùng
```

---

### Chủ đề 5: Đọc tệp, ghi tệp
Sử dụng thư viện `<fstream>`.
- `ofstream`: Ghi file.
- `ifstream`: Đọc file.
- `fstream`: Cả đọc và ghi.

#### 1. Ghi tệp
```cpp
ofstream outFile("Data.txt", ios::out);
if (outFile.is_open()) {
    outFile << "Trung tam tin hoc" << endl;
    outFile.close();
}
```

#### 2. Đọc tệp
```cpp
ifstream inFile("Data.txt", ios::in);
char chuoi[100];
if (inFile.is_open()) {
    inFile.getline(chuoi, 100);
    cout << chuoi << endl;
    inFile.close();
}
```

#### 3. Các hàm kiểm tra trạng thái File
- `eof()`: Trả về `true` nếu đã đọc đến cuối file.
- `fail()`: Trả về `true` nếu có lỗi không trầm trọng (sai kiểu dữ liệu).
- `bad()`: Trả về `true` nếu có lỗi trầm trọng.
- `good()`: Trả về `true` nếu mọi thứ hoàn hảo.

#### 4. Con trỏ trong File
- **Đọc (`ifstream`):** `tellg()` (xem vị trí), `seekg(offset, ios::beg/cur/end)` (nhảy vị trí).
- **Ghi (`ofstream`):** `tellp()`, `seekp()`.

---

## Bài tập thực hành File I/O

### Câu 1: Kiểm tra số chẵn/lẻ từ File
**INPUT (`BAI1.INP`):** `6`
**OUTPUT:** `6 la so chan`

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ifstream fin("BAI1.INP", ios::in);
    int N;
    if (fin.fail()) {
        cout << "Loi mo tep";
    } else {
        fin >> N;
        fin.close();
        if (N % 2 == 0) cout << N << " la so chan";
        else cout << N << " la so le";
    }
    return 0;
}
```

### Câu 2: Tính tích hai số từ File
**INPUT (`Cau2.INP`):** `6` và `9` (mỗi số 1 dòng)
**OUTPUT:** `54`

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    int a, b;
    ifstream docvao("Cau2.INP", ios::in);
    if (docvao.fail()) {
        cout << "Loi tep";
    } else {
        docvao >> a >> b;
        cout << a * b;
        docvao.close();
    }
    return 0;
}
```

### Câu 3: Ghi Tổng và Tích ra File
**INPUT (`Cau3.INP`):** `15` và `54`
**OUTPUT (`Cau3.OUT`):** `69` (dòng 1), `810` (dòng 2)

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ifstream fin("Cau3.INP", ios::in);
    ofstream fout("Cau3.OUT", ios::out);
    int a, b;
    
    if (fin.fail()) {
        fout << "Khong mo duoc tep";
    } else {
        fin >> a >> b;
        fout << a + b << endl;
        fout << a * b;
        fin.close();
        fout.close();
    }
    return 0;
}
```

### Câu 4: Đọc dãy số vào mảng và tính toán
**INPUT (`Cau4.INP`):** 
Dòng 1: `a b n` (VD: `6 9 5`)
Dòng 2: `n` số nguyên (VD: `5 6 8 9 7`)
**OUTPUT (`Cau4.OUT`):** 
Dòng 1: Tích `a*b` (`54`)
Dòng 2: Tổng dãy số (`35`)

```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    int a, b, n, day[100], tong = 0;
    ifstream fin("Cau4.INP", ios::in);
    ofstream fout("Cau4.OUT", ios::out);
    
    if (fin.fail()) {
        fout << "Loi doc tep";
    } else {
        fin >> a >> b >> n;
        for (int i = 0; i < n; i++) {
            fin >> day[i];
            tong += day[i];
        }
        fout << a * b << endl;
        fout << tong;
        fin.close();
        fout.close();
    }
    return 0;
}
```
