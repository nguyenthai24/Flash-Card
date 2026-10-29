# FlashCard – Checklist tính năng tiếp theo

> Tài liệu để tự làm theo từng bước. Phong cách bám theo [aioenglish.com](https://aioenglish.com/) (học theo **Unit**, câu ví dụ Anh – Việt, giao diện vui, nền giấy kẻ ô, màu sage) nhưng **không sao chép** logo, nội dung hay tài sản thương hiệu.
>
> Ký hiệu: `[x]` đã xong · `[ ]` chưa làm · 🅵 Frontend · 🅱 Backend (NestJS) · 🧪 Kiểm thử

## 0. Hiện trạng (đã có)

- [x] 🅵 Giao diện Auth (UI): đăng nhập, đăng ký, quên mật khẩu, đặt mật khẩu mới, xác minh email, kết quả xác minh, OAuth callback
- [x] 🅵 Nút Google / Facebook / GitHub (chưa nối thật)
- [x] 🅵 Font Baloo 2 + Be Vietnam Pro, tông sage, Mantine + styled-components
- [x] 🅵 Trang `study-set/[id]` (header, flashcard viewer, danh sách từ, thanh chế độ học) – dữ liệu mẫu
- [x] 🅱 Module `orders`, `payment` (Stripe, PayPal)
- [ ] 🅱 Chưa có module auth, user, study-set, unit… (backend chỉ có orders/payment)
- [ ] Còn lỗi sẵn có ngoài phạm vi Auth cần dọn trước khi build sạch: `~/services/services.server` thiếu, `Layouts/Auth/UserInfo` thiếu, `prefer-const` ở `configs/axiosClient.ts`, middleware `PLAY_GAME`

---

## 1. Nền tảng dự án (làm trước)

- [ ] Sửa các lỗi `tsc` / `build` sẵn có để `npm run build` chạy sạch
- [ ] Tạo `frontend/.env.example` (`NEXT_PUBLIC_API_URL`, …) và `backend/.env.example`
- [ ] Thống nhất quy ước: thư mục `features/<tên>/{components,hooks,services,types}`
- [ ] Tách design tokens dùng chung (màu sage, bóng cứng, bo góc, font) thành `theme` dùng cho toàn app, không chỉ auth
- [ ] Layout chính `(main)`: header, sidebar/bottom-nav mobile, footer
- [ ] Trang lỗi (`error.tsx`, `not-found.tsx`) theo phong cách giấy/vở, tiếng Việt
- [ ] Skeleton / loading / empty state dùng chung
- [ ] Hệ thống toast (Mantine notifications) cho thành công / lỗi
- [ ] Bật `eslint` + `prettier` + hook pre-commit (nếu chưa)
- [ ] CI: lint + tsc + build + test cho frontend và backend

---

## 2. Authentication thật (Backend + nối Frontend)

### 2.1 🅱 Backend
- [ ] Module `users`: entity (id, email, passwordHash, name, avatar, emailVerifiedAt, role, createdAt…)
- [ ] Chọn DB + ORM (TypeORM / Prisma) và migration
- [ ] `POST /auth/register` – validate DTO, băm mật khẩu (argon2/bcrypt), tạo user, gửi email xác minh
- [ ] `POST /auth/login` – kiểm tra mật khẩu, chặn tài khoản chưa xác minh (tuỳ chọn), trả phiên
- [ ] `POST /auth/refresh`, `POST /auth/logout` (thu hồi refresh token)
- [ ] `GET /auth/me`
- [ ] `POST /auth/verify-email` (token một lần, có hạn) và `POST /auth/resend-verification` (cooldown 30–60s)
- [ ] `POST /auth/forgot-password` (luôn trả thông báo trung tính, không lộ email có tồn tại)
- [ ] `POST /auth/reset-password` (token một lần, hết hạn 15–60 phút, huỷ mọi phiên cũ)
- [ ] OAuth Google / Facebook / GitHub: `GET /oauth/:provider`, `GET /oauth/:provider/callback`, liên kết tài khoản trùng email
- [ ] Gửi email (SMTP/Resend/SendGrid) + template tiếng Việt
- [ ] Rate limit (`@nestjs/throttler`) cho login / forgot / resend
- [ ] Khoá tạm sau N lần sai mật khẩu
- [ ] Guard `JwtAuthGuard`, decorator `@CurrentUser()`, phân quyền role
- [ ] Mã lỗi thống nhất (`code`, `message`) để Frontend map sang tiếng Việt

### 2.2 🅵 Frontend
- [ ] Service `features/auth/services` (login, register, forgot, reset, verify, me, logout) dùng axios/fetch chung
- [ ] Thay `useMockSubmit` trong `screens.tsx` bằng gọi API thật (react-query mutation)
- [ ] Lưu phiên bằng **httpOnly cookie** (không để token ở localStorage)
- [ ] Interceptor tự refresh token khi 401
- [ ] Map mã lỗi backend → thông báo tiếng Việt dưới form (sai mật khẩu, email đã tồn tại, token hết hạn…)
- [ ] `middleware.ts`: chặn route cần đăng nhập, chuyển về `/login?redirect=…`
- [ ] Đã đăng nhập thì `/login`, `/register` tự chuyển về trang học
- [ ] Sau login quay lại trang trước đó (`redirect`)
- [ ] Trang `/auth/callback` đọc `code/state`, xử lý lỗi, chuyển hướng
- [ ] Bật nút social khi backend sẵn sàng (bỏ thông báo "chưa cấu hình")
- [ ] Nút Đăng xuất + hiển thị user ở header
- [ ] "Ghi nhớ tôi" điều khiển thời hạn phiên
- [ ] 🧪 E2E: đăng ký → xác minh → đăng nhập → đăng xuất; quên → đặt lại mật khẩu

---

## 3. Trang chủ & Onboarding (bám aioenglish)

- [ ] Landing page công khai: hero ("Tiếng Anh dễ nhớ, vui hơn"), lợi ích, cách học, CTA đăng ký
- [ ] Mục demo 1 thẻ lật ngay trên landing (không cần đăng nhập)
- [ ] Onboarding sau đăng ký (3 bước):
  - [ ] Chọn trình độ (mới bắt đầu / cơ bản / trung cấp)
  - [ ] Chọn mục tiêu (giao tiếp, công việc, thi cử…)
  - [ ] Chọn mục tiêu mỗi ngày (5 / 10 / 20 phút hoặc số thẻ)
- [ ] Bài kiểm tra xếp trình độ ngắn (tuỳ chọn)
- [ ] Trang chủ sau đăng nhập (dashboard): lời chào, tiếp tục học, mục tiêu hôm nay, streak

---

## 4. Lộ trình học theo Unit (đặc trưng aioenglish)

> aioenglish chia bài theo **Unit** với câu ví dụ có bản dịch (vd. "Unit 1 – Hello, I am Anna."). Làm tương tự bằng nội dung do bạn tự biên soạn.

### 4.1 🅱 Dữ liệu
- [ ] Bảng `courses` (khoá/cấp độ), `units`, `lessons`, `words`, `sentences`
- [ ] Trường `units`: thứ tự, tiêu đề EN, nghĩa VI, ảnh bìa, trạng thái khoá/mở
- [ ] Trường `words`: từ, phiên âm IPA, loại từ, nghĩa VI, ví dụ EN/VI, ảnh, audio
- [ ] Bảng `user_progress` (user, unit, % hoàn thành, điểm, lần học cuối)
- [ ] API: `GET /courses`, `GET /units`, `GET /units/:id`, `GET /units/:id/words`
- [ ] Seed ít nhất 1 khoá, 5–10 unit, 15–20 từ/unit (nội dung tự biên soạn)

### 4.2 🅵 Giao diện
- [ ] Trang danh sách Unit: lưới thẻ có số Unit, câu EN đậm, nghĩa VI nhạt, thanh tiến độ
- [ ] Trạng thái Unit: khoá / đang học / hoàn thành (huy hiệu)
- [ ] Trang chi tiết Unit: mô tả, danh sách từ, nút "Bắt đầu học"
- [ ] Điều hướng Unit trước/sau, breadcrumb
- [ ] Lọc/tìm kiếm Unit, bộ lọc theo cấp độ
- [ ] Skeleton khi tải, empty state khi chưa có dữ liệu

---

## 5. Flashcard & các chế độ học

> Đã có sẵn `FlashCardViewer`, `StudyModeNavigation`; cần nối dữ liệu thật và hoàn thiện.

### 5.1 Thẻ lật (Flashcards)
- [ ] Lật thẻ bằng click / phím Space; chuyển thẻ bằng phím ← →
- [ ] Mặt trước: từ + IPA + nút nghe; mặt sau: nghĩa + ví dụ EN/VI
- [ ] Nút phát âm (audio file hoặc Web Speech API)
- [ ] Đánh dấu "Đã nhớ / Chưa nhớ", gắn sao thẻ khó
- [ ] Xáo trộn, lặp lại thẻ chưa nhớ, thanh tiến độ phiên học
- [ ] Vuốt trái/phải trên mobile
- [ ] Hoàn thành phiên: màn tổng kết (số thẻ nhớ, thời gian, nút học lại)

### 5.2 Các chế độ khác
- [ ] **Học (Learn)**: trắc nghiệm 4 đáp án
- [ ] **Điền từ / gõ lại** (kiểm tra chính tả, bỏ qua hoa thường/dấu cách thừa)
- [ ] **Ghép cặp** (matching) có đồng hồ
- [ ] **Nghe – chọn** (nghe audio, chọn từ đúng)
- [ ] **Sắp xếp câu** (kéo thả từ để ghép câu ví dụ, giống kiểu bài Unit)
- [ ] **Kiểm tra (Test)** cuối Unit: trộn dạng câu hỏi, chấm điểm, xem lại câu sai
- [ ] Chọn chế độ ở `StudyModeNavigation`, nhớ chế độ gần nhất

### 5.3 🅱 Hỗ trợ
- [ ] `POST /study/sessions` (bắt đầu), `POST /study/sessions/:id/answers`, `POST /study/sessions/:id/complete`
- [ ] Sinh đáp án nhiễu (distractors) từ cùng Unit
- [ ] Lưu kết quả từng thẻ để phục vụ ôn tập

---

## 6. Ôn tập ngắt quãng (Spaced Repetition)

- [ ] 🅱 Bảng `card_reviews` (user, word, level/box, easeFactor, interval, dueAt, lapses)
- [ ] 🅱 Thuật toán (SM-2 hoặc Leitner 5 hộp) + unit test
- [ ] 🅱 `GET /review/due` (thẻ đến hạn hôm nay), `POST /review/answer`
- [ ] 🅵 Trang "Ôn tập hôm nay" với số thẻ đến hạn
- [ ] 🅵 4 mức tự đánh giá: Lại / Khó / Tốt / Dễ (hiển thị khoảng nghỉ dự kiến)
- [ ] 🅵 Badge số thẻ cần ôn trên menu
- [ ] 🅵 Thông báo nhắc ôn tập (email hoặc web push – tuỳ chọn)

---

## 7. Bộ thẻ cá nhân (Study sets của người dùng)

- [ ] 🅱 CRUD `study_sets`, `study_set_cards` (chỉ chủ sở hữu được sửa/xoá)
- [ ] 🅵 Trang "Bộ thẻ của tôi": danh sách, tạo, sửa, xoá (xác nhận)
- [ ] 🅵 Trình soạn thẻ: thêm/xoá/sắp xếp, nhập hàng loạt (dán `từ - nghĩa`), nhập CSV
- [ ] 🅵 Tự gợi ý IPA/nghĩa/ví dụ (tuỳ chọn, cần API từ điển)
- [ ] 🅵 Chia sẻ công khai/riêng tư, link chia sẻ
- [ ] 🅵 Sao chép bộ thẻ của người khác về tài khoản mình
- [ ] 🅵 Tìm kiếm bộ thẻ công khai

---

## 8. Gamification & động lực

- [ ] 🅱 Bảng `streaks`, `xp_events`, `achievements`
- [ ] 🅵 Chuỗi ngày học (streak) hiển thị ở header, lửa/huy hiệu đơn giản
- [ ] 🅵 Điểm kinh nghiệm (XP) + cấp độ
- [ ] 🅵 Mục tiêu ngày (vòng tiến độ)
- [ ] 🅵 Huy hiệu thành tựu (học 7 ngày liên tiếp, hoàn thành Unit 1…)
- [ ] 🅵 Bảng xếp hạng tuần (tuỳ chọn)
- [ ] 🅵 Hiệu ứng nhẹ khi hoàn thành (không lạm dụng animation)

---

## 9. Tiến độ & thống kê

- [ ] 🅱 API tổng hợp: số từ đã học, độ chính xác, thời gian học theo ngày
- [ ] 🅵 Trang "Tiến độ": biểu đồ 7/30 ngày, lịch học (heatmap)
- [ ] 🅵 Danh sách từ yếu / hay sai
- [ ] 🅵 Tiến độ theo Unit và theo khoá
- [ ] 🅵 Xuất/ xem lịch sử phiên học

---

## 10. Hồ sơ & Cài đặt

- [ ] 🅵 Trang hồ sơ: tên, ảnh đại diện (upload), email
- [ ] 🅵 Đổi mật khẩu (nhập mật khẩu cũ)
- [ ] 🅵 Liên kết / huỷ liên kết tài khoản Google, Facebook, GitHub
- [ ] 🅵 Cài đặt học: mục tiêu ngày, giờ nhắc, tự phát âm, giọng (US/UK)
- [ ] 🅵 Giao diện: sáng / tối (tuỳ chọn), cỡ chữ
- [ ] 🅵 Ngôn ngữ giao diện (vi/en) – tuỳ chọn
- [ ] 🅵 Xoá tài khoản (xác nhận mật khẩu)
- [ ] 🅱 API tương ứng + upload ảnh (S3/Cloudinary)

---

## 11. Thanh toán & gói Premium (tận dụng module sẵn có)

- [ ] 🅱 Định nghĩa gói (Free / Premium), bảng `subscriptions`
- [ ] 🅱 Nối `orders` + `payment` (Stripe/PayPal) với gói đăng ký
- [ ] 🅱 Webhook Stripe/PayPal: xác nhận thanh toán, gia hạn, huỷ
- [ ] 🅱 Guard kiểm tra quyền Premium cho Unit/tính năng khoá
- [ ] 🅵 Trang bảng giá, trang thanh toán, trang kết quả (thành công / thất bại / huỷ)
- [ ] 🅵 Trang quản lý gói, lịch sử hoá đơn
- [ ] 🅵 Nhãn "Premium" và màn nâng cấp khi chạm Unit bị khoá

---

## 12. Trang tĩnh & pháp lý

- [ ] Điều khoản sử dụng, Chính sách bảo mật (link ở form đăng ký)
- [ ] Trang Giới thiệu, Liên hệ / Hỗ trợ, FAQ
- [ ] Footer đầy đủ liên kết, mạng xã hội
- [ ] SEO: metadata từng trang, `sitemap.xml`, `robots.txt`, ảnh Open Graph

---

## 13. Chất lượng, hiệu năng, bảo mật

- [ ] Accessibility: kiểm tra bàn phím, tương phản màu sage (nút/chữ), trình đọc màn hình
- [ ] Responsive 375 / 768 / 1280 cho mọi trang mới
- [ ] Tối ưu ảnh (`next/image`), lazy-load audio, cache dữ liệu bằng react-query
- [ ] Lighthouse ≥ 90 (Performance, Accessibility, SEO)
- [ ] Bảo mật: CORS, helmet, CSRF (nếu dùng cookie), validate DTO, giới hạn upload
- [ ] Không log dữ liệu nhạy cảm; quản lý secret bằng biến môi trường
- [ ] 🧪 Unit test (Jest) cho service/thuật toán; component test cho form
- [ ] 🧪 E2E (Playwright) cho luồng chính: auth, học, ôn tập, thanh toán
- [ ] Giám sát lỗi (Sentry) và analytics cho funnel đăng ký → học bài đầu

---

## 14. Gợi ý thứ tự làm (Sprint)

| Sprint | Nội dung | Kết quả |
|---|---|---|
| 1 | Mục 1 + 2 (nền tảng, auth thật) | Đăng ký/đăng nhập hoạt động thật |
| 2 | Mục 3 + 4 (landing, onboarding, Unit) | Xem được danh sách Unit và từ vựng |
| 3 | Mục 5 (flashcard + 2–3 chế độ học) | Học được một Unit hoàn chỉnh |
| 4 | Mục 6 + 8 + 9 (ôn tập, streak, thống kê) | Có vòng lặp học hằng ngày |
| 5 | Mục 7 + 10 (bộ thẻ cá nhân, hồ sơ) | Người dùng tự tạo nội dung |
| 6 | Mục 11 + 12 + 13 (Premium, pháp lý, chất lượng) | Sẵn sàng ra mắt |

## 15. Lưu ý bản quyền khi bám aioenglish

- Chỉ tham khảo **cấu trúc** (học theo Unit, câu ví dụ có dịch, nút nghe, tiến độ).
- Tự viết nội dung bài học, câu ví dụ, âm thanh và hình minh hoạ; không sao chép nội dung, logo, mascot hay ảnh của họ.
- Tên thương hiệu, màu chủ đạo (sage), font và bố cục đã khác biệt; giữ nguyên hướng này.
