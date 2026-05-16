---
name: runtime-debugger
description: >
  Tự động phát hiện và fix runtime errors trong dự án NextJS + next-intl bằng cách tạo git worktree
  riêng biệt, chạy dev server, crawl tất cả routes để capture server-side errors, sau đó lặp fix
  cho đến khi sạch errors. Dùng skill này ngay khi người dùng đề cập đến: runtime errors, lỗi khi
  chạy next dev, next-intl errors, muốn debug NextJS mà không ảnh hưởng branch chính, hoặc bất kỳ
  yêu cầu nào liên quan đến "fix lỗi NextJS", "check routes có lỗi không", "tạo worktree để debug".
  LUÔN dùng skill này thay vì fix trực tiếp vào project khi người dùng đang làm việc với NextJS.
---

# NextJS Runtime Debugger

Workflow tự động để phát hiện và fix toàn bộ runtime errors trong dự án NextJS + next-intl,
hoạt động trong git worktree riêng biệt để bảo vệ branch chính.

## Tổng quan workflow

```
[Tạo Worktree] → [Detect Routes] → [Chạy Dev Server] → [Capture Errors] → [Tạo Fix Plan] → [Fix] → [Verify] → [Lặp lại nếu còn lỗi] → [Báo cáo]
```

---

## Bước 1 — Tạo Git Worktree

Tạo worktree từ branch hiện tại đang làm việc:

```bash
# Lấy tên branch hiện tại
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
WORKTREE_NAME="debug/${CURRENT_BRANCH}-runtime-fix"
WORKTREE_PATH="../$(basename $(pwd))-debug"

# Tạo worktree
git worktree add "$WORKTREE_PATH" -b "$WORKTREE_NAME"

echo "Worktree tạo tại: $WORKTREE_PATH"
echo "Branch: $WORKTREE_NAME"
```

Sau khi tạo worktree, **toàn bộ các bước tiếp theo thực hiện trong worktree path**, không phải project gốc.

```bash
cd "$WORKTREE_PATH"
npm install  # hoặc yarn/pnpm tùy project
```

---

## Bước 2 — Detect Tất Cả Routes

Đọc cấu trúc thư mục `app/` (App Router) hoặc `pages/` (Pages Router) để lấy danh sách routes:

```bash
# Chạy script detect routes — xem scripts/detect-routes.js
node .claude/skills/nextjs-runtime-debugger/scripts/detect-routes.js
```

Script sẽ output file `routes.json` tại worktree root. Đọc file này để có danh sách đầy đủ.

**Lưu ý quan trọng với next-intl:**

- Routes sẽ có prefix locale: `/en/...`, `/vi/...`, etc.
- Đọc file `i18n.ts` hoặc `middleware.ts` để xác định các locales được support
- Test ít nhất 1 locale đầy đủ, ưu tiên locale default

---

## Bước 3 — Capture Runtime Errors

### 3a. Chạy dev server và capture server-side output

```bash
# Chạy trong worktree directory
npm run dev > /tmp/nextjs-dev-output.log 2>&1 &
DEV_PID=$!

# Đợi server ready (tối đa 60 giây)
timeout 60 bash -c 'until curl -sf http://localhost:3000 > /dev/null; do sleep 2; done'
echo "Server ready, PID: $DEV_PID"
```

### 3b. Crawl từng route và capture lỗi

Với mỗi route trong `routes.json`:

```bash
# Crawl route và capture HTTP status + server log
curl -sf "http://localhost:3000${ROUTE}" -o /dev/null -w "%{http_code}" 2>&1
```

Đồng thời tail log để capture server-side errors ngay khi route được hit:

```bash
tail -f /tmp/nextjs-dev-output.log &
LOG_PID=$!
# ... crawl routes ...
kill $LOG_PID
```

### 3c. Parse và phân loại errors

Đọc toàn bộ log, phân loại theo:

| Loại          | Pattern                                           | Mức độ   |
| ------------- | ------------------------------------------------- | -------- |
| **Crash**     | `Error:`, `TypeError:`, `ReferenceError:`         | Critical |
| **next-intl** | `MISSING_MESSAGE`, `useTranslations`, `IntlError` | High     |
| **Hydration** | `Hydration failed`, `did not match`               | High     |
| **404/500**   | HTTP status codes                                 | Medium   |
| **Warning**   | `Warning:`, `warn`                                | Low      |

---

## Bước 4 — Tạo Fix Plan

Sau khi có danh sách errors, tạo fix plan theo format:

```
## Runtime Error Fix Plan
**Worktree:** [path]
**Branch:** [tên branch]
**Total errors found:** [số]

### Critical (fix trước)
1. [Error message] — [File:Line] — [Mô tả ngắn cách fix]

### High
2. [...]

### Medium / Low
3. [...]

**Estimated**: [số] files cần sửa
```

**Hỏi người dùng confirm** trước khi bắt đầu fix. Không tự động fix mà không có xác nhận.

---

## Bước 5 — Fix Loop

Sau khi người dùng confirm plan:

### Mỗi vòng lặp:

1. Fix errors theo thứ tự: Critical → High → Medium
2. Sau mỗi nhóm fix, chạy lại dev server và re-crawl routes
3. So sánh errors mới vs errors cũ
4. Nếu còn errors → tiếp tục loop
5. Nếu 0 errors → kết thúc

### Giới hạn loop:

- Tối đa **5 vòng lặp**
- Nếu sau 5 vòng vẫn còn errors → dừng lại, báo cáo những gì đã fix được và những gì còn tồn tại, để người dùng quyết định

### Tracking progress:

```
Vòng 1: 12 errors → 7 errors (fix 5)
Vòng 2: 7 errors → 2 errors (fix 5)
Vòng 3: 2 errors → 0 errors ✅
```

---

## Bước 6 — Báo Cáo Kết Quả

Khi hoàn thành (0 errors hoặc đạt limit), tạo báo cáo:

```
## Debug Session Report

**Worktree:** [path]
**Branch để review:** [branch name]

### Kết quả
- Errors ban đầu: [N]
- Errors còn lại: [N]
- Files đã sửa: [danh sách]
- Vòng lặp đã dùng: [N]/5

### Các thay đổi chính
- [Tóm tắt từng nhóm fix]

### Bước tiếp theo
Để review và merge:
  git diff [current-branch]..[debug-branch]
  git checkout [current-branch]
  git merge [debug-branch]

Để xóa worktree sau khi merge:
  git worktree remove [worktree-path]
  git branch -d [debug-branch]
```

**Không tự động merge.** Người dùng tự review và merge tay.

---

## Xử lý edge cases

### Port 3000 đang bận

```bash
# Tìm port trống thay thế
PORT=3001 npm run dev
# Cập nhật tất cả curl calls dùng port mới
```

### next-intl locale detection

Trước khi crawl, đọc config để xác định locales:

```bash
# Tìm locales config trong middleware.ts hoặc i18n.ts
grep -r "locales" middleware.ts src/i18n.ts 2>/dev/null | head -20
```

### Dev server crash (không start được)

Nếu server không start sau 60 giây:

1. Chạy `npm run build` để lấy build errors thay thế
2. Báo cáo build errors như là runtime errors
3. Fix build errors trước, sau đó thử lại dev server

### Monorepo / custom ports

Đọc `package.json` scripts để xác định lệnh start chính xác và port mặc định trước khi chạy.

---

## Tham khảo thêm

- `scripts/detect-routes.js` — Script tự động detect routes từ app/ hoặc pages/
- `references/nextjs-error-patterns.md` — Patterns phổ biến và cách fix tương ứng
