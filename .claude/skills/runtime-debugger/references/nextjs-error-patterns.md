# NextJS + next-intl Error Patterns & Fixes

Tài liệu tham khảo nhanh cho các runtime errors phổ biến.

---

## next-intl Errors

### MISSING_MESSAGE

```
Error: MISSING_MESSAGE: Could not resolve `homepage.title` in messages for locale `en`
```

**Nguyên nhân:** Key translation tồn tại trong một locale nhưng thiếu ở locale khác.
**Fix:** Thêm key vào file messages tương ứng (`messages/en.json`, `messages/vi.json`).

---

### useTranslations outside provider

```
Error: `useTranslations` is not supported in Server Components.
Use `getTranslations` instead.
```

**Nguyên nhân:** Dùng `useTranslations` (client hook) trong Server Component.
**Fix:** Thay bằng `await getTranslations()` trong async Server Component.

---

### Invalid locale in params

```
Error: Locale `undefined` is not supported.
```

**Nguyên nhân:** Route segment `[locale]` không được pass đúng vào component.
**Fix:** Kiểm tra `params` trong layout/page, đảm bảo middleware đang set locale đúng.

---

### notFound() không được gọi đúng

```
Error: Unhandled Runtime Error: notFound() called in a component that doesn't have a corresponding `not-found.js` file
```

**Fix:** Tạo `app/[locale]/not-found.tsx` hoặc catch lỗi trước khi gọi `notFound()`.

---

## NextJS App Router Errors

### Async component without await

```
Error: Objects are not valid as a React child (found: [object Promise])
```

**Nguyên nhân:** Component async nhưng không await đúng chỗ.
**Fix:** Thêm `async` vào component function và `await` vào data fetching calls.

---

### "use client" missing

```
Error: Event handlers cannot be passed to Client Component props
```

**Nguyên nhân:** Component dùng event handlers nhưng thiếu `"use client"` directive.
**Fix:** Thêm `"use client"` ở đầu file.

---

### Server/Client boundary violation

```
Error: You're importing a component that needs X. It only works in a Client Component...
```

**Nguyên nhân:** Import component/hook chỉ chạy được ở client vào Server Component.
**Fix:** Tạo wrapper Client Component để wrap phần cần client-only logic.

---

### Dynamic route params type error

```
TypeError: Cannot destructure property 'id' of 'params' as it is undefined
```

**Nguyên nhân:** Trong Next.js 15+, `params` là Promise và cần được await.
**Fix:**

```tsx
// ❌ Old way
export default function Page({ params }: { params: { id: string } }) {}

// ✅ New way (Next.js 15+)
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
}
```

---

## Hydration Errors

### Text content mismatch

```
Error: Hydration failed because the initial UI does not match what was rendered on the server.
Warning: Text content did not match. Server: "X" Client: "Y"
```

**Nguyên nhân phổ biến:**

- Dùng `Date.now()` hoặc `Math.random()` trong render
- Browser extensions modify DOM
- `typeof window !== 'undefined'` check không nhất quán

**Fix:** Dùng `useEffect` + `useState` cho client-only values, hoặc `suppressHydrationWarning` cho các element có thể khác nhau (như timestamps).

---

## HTTP Status Errors

### 500 Internal Server Error

Thường kèm theo stack trace trong server log. Check log để tìm root cause.

### 404 Not Found (unexpected)

- Route tồn tại trong code nhưng trả về 404 → kiểm tra dynamic params
- next-intl middleware có thể chặn routes → kiểm tra `matcher` config

### 308 Redirect loops

next-intl middleware đang redirect vô hạn. Kiểm tra `defaultLocale` và `matcher` trong middleware config.

---

## Cách đọc Next.js dev server logs

```
# Lỗi nghiêm trọng — cần fix ngay
⨯ Error: [message]
✖ Error: [message]

# Warning — không crash nhưng cần chú ý
⚠ Warning: [message]

# Info — bình thường
✓ Ready in Xs
○ Compiling [route]...
✓ Compiled [route]
```

Các dòng bắt đầu bằng `at` là stack trace — đọc dòng đầu tiên để biết file gốc gây lỗi.
