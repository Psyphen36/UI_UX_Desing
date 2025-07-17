# UI_UX_Design

---

## 🚀 Getting Started (Frontend Only)

> This project supports **frontend-only development without needing a backend**. You can preview all pages using dummy placeholder data.

---
### ✅ Prerequisites

* Node.js `>=18`
* pnpm `>=8` (recommended) or npm/yarn

If you don’t have `pnpm` installed:

```bash
npm install -g pnpm
```

---

### 📦 Install Dependencies

```bash
pnpm install
```

Or use `npm install` or `yarn install` if preferred.

---

### 🧪 Dummy Auth Mode

Enable dummy login to bypass the backend and preview all pages:

Create a `.env` file in the root:

```bash
cp .env.example .env
```

Then edit `.env` and set:

```env
VITE_FAKE_AUTH=true
```

> ✅ Use these test credentials to simulate login:
>
> * `admin@admin.com` / `administrator` → redirects to **Admin Panel**
> * `user@user.com` / `testing` → redirects to **User Dashboard**

No backend or database needed!

---

### 💻 Run the Dev Server

```bash
pnpm dev
```

Or use:

```bash
npm run dev
# or
yarn dev
```

This will start the app at [http://localhost:5173](http://localhost:5173) (default Vite port).

---
There's one issue when you use the dummy creds for login won't be redirected to the dashbaord page for some reason but you get a logged in navbar so you can go to profile setting through navbar and then you'll get all the tabs:
<img width="1584" height="65" alt="image" src="https://github.com/user-attachments/assets/0640d8aa-1dcc-4cb8-bbb2-c7c59b9f1854" />
