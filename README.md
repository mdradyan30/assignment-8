# ☀️ SunCart – Summer Essentials Store

A modern summer eCommerce platform where users can explore and purchase seasonal products like sunglasses, summer outfits, skincare, beach accessories, and more.

## 🚀 Features

- 🛍️ Browse summer products with beautiful cards
- 🔐 Authentication with Email/Password & Google OAuth (BetterAuth)
- 👤 User profile with update functionality
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Animated UI with Animate.css
- 🌅 Hero banner with summer deals
- 🔒 Protected product detail routes

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + DaisyUI
- **Auth**: BetterAuth
- **Animation**: Animate.css
- **Notifications**: React Hot Toast

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd suncart
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in your values in `.env.local`:

```env
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
suncart/
├── app/
│   ├── api/auth/[...all]/   # BetterAuth API routes
│   ├── products/[id]/       # Product detail (protected)
│   ├── login/               # Login page
│   ├── register/            # Register page
│   ├── my-profile/          # Profile page
│   │   └── update/          # Update profile page
│   ├── layout.jsx           # Root layout
│   └── page.jsx             # Home page
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── HeroSlider.jsx
│   └── AuthProvider.jsx
├── lib/
│   ├── auth.js              # BetterAuth server config
│   └── auth-client.js       # BetterAuth client config
├── data/
│   └── products.json        # Product data
└── .env.local               # Environment variables
```

## 🔐 Authentication

- Email & Password login/register
- Google OAuth
- Protected routes (product details require login)
- Profile update feature

## 🎯 Pages

| Route | Description | Protected |
|-------|-------------|-----------|
| `/` | Home page | ❌ |
| `/products/[id]` | Product detail | ✅ |
| `/login` | Login | ❌ |
| `/register` | Register | ❌ |
| `/my-profile` | User profile | ✅ |
| `/my-profile/update` | Update profile | ✅ |
