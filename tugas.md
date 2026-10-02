# 🌌 The Dark Aesthetic Fullstack Portfolio

> High-End Minimalist Interactive Portfolio powered by modern fullstack architecture.

---

## 📌 Overview

**The Dark Aesthetic Fullstack Portfolio** adalah platform portofolio interaktif berbasis fullstack yang menggabungkan desain visual premium dengan arsitektur backend modern. Proyek ini dirancang untuk:

* Menampilkan karya secara imersif
* Mengintegrasikan data real-time dari GitHub API
* Mengelola metadata kustom menggunakan PostgreSQL
* Mengoptimalkan performa melalui hybrid rendering
* Mendukung multi-bahasa dengan SEO-friendly routing

Portfolio ini bukan sekadar halaman statis, tetapi sistem terstruktur yang menunjukkan kemampuan arsitektur, optimasi performa, dan integrasi API eksternal.

---

# 🎨 Visual Identity & User Experience

## 🎨 Color System

| Element    | Value       | Purpose                       |
| ---------- | ----------- | ----------------------------- |
| Background | `#000000`   | Depth & full contrast         |
| Typography | `#FDFCF0`   | Elegant, readable, low strain |
| Overlay    | Noise/Grain | Avoid flat aesthetic          |

Pendekatan ini menciptakan nuansa:

* Minimalis
* Premium
* Immersive
* Focus-driven

---

## 🖱 Interaction Design

### 1. Smooth Scrolling (Lenis)

* Custom smooth scroll engine
* Weighted scroll effect
* Improves immersion for long pages
* Replaces default browser scroll behavior

---

### 2. Custom Cursor (GSAP quickTo)

* Circular cream cursor
* Subtle delayed motion
* Magnetic hover behavior
* Smooth interpolation for performance efficiency

---

### 3. Magnetic Navigation

Menu items memiliki efek magnetik saat pointer mendekat.

Tujuan:

* Enhance engagement
* Micro-interaction refinement
* Maintain minimal visual noise

---

### 4. Command Palette (CMD + K)

Fitur navigasi cepat yang memungkinkan:

* Pindah halaman
* Mengganti bahasa
* Akses cepat ke project

Dibangun menggunakan komponen berbasis `shadcn/ui`.

---

### 5. Accessibility

Jika pengguna mengaktifkan:

```
prefers-reduced-motion: reduce
```

Maka:

* Animasi dinonaktifkan
* Scroll kembali ke behavior default
* Transisi dibuat minimal

---

# 🛠 Technology Stack

## 🧱 Framework Layer

### Next.js 14+

Menggunakan:

* App Router
* Server Components
* Server Actions
* Dynamic Metadata API
* Hybrid Rendering

Keuntungan:

* SEO optimal
* Fleksibilitas SSR & SSG
* Data fetching di server
* Performant by default

---

## 🗄 Database Layer

### PostgreSQL

Digunakan untuk menyimpan:

* Metadata project kustom
* Thumbnail
* Multi-language description
* Guestbook entries
* Project pin status

---

## 🧬 ORM Layer

### Prisma ORM

Fitur:

* Type-safe database access
* Auto-generated client
* Schema-first approach
* Migration management
* Singleton Prisma instance (development safe)

---

## 🎨 Styling Layer

### Tailwind CSS

* Utility-first styling
* Custom theme configuration
* Black & Cream color variables

---

### shadcn/ui

Digunakan untuk:

* Button
* Card
* Dialog
* Command Palette

Komponen modular dan composable.

---

## 🎞 Animation Layer

### GSAP

Digunakan untuk:

* Timeline animation
* ScrollTrigger
* Typing animation
* Magnetic interaction

---

### Anime.js

Digunakan untuk:

* Hover animation
* Micro-interaction
* Lightweight transitions

---

## 🌍 Internationalization

### next-intl

Fitur:

* EN / ID support
* SEO-friendly locale routing
* Structured translation files
* Metadata translation support

---

# 🗄 Database Architecture

## 📂 schema.prisma

```prisma
model Project {
  id           String   @id @default(cuid())
  githubRepoId Int      @unique
  slug         String   @unique
  imageUrl     String?

  desc_id      String   @db.Text
  desc_en      String   @db.Text

  isPinned     Boolean  @default(false)
  createdAt    DateTime @default(now())
}

model Guestbook {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String   @db.VarChar(500)
  createdAt DateTime @default(now())
}
```

---

## 🔗 Hybrid Data Strategy

Data project berasal dari dua sumber:

### GitHub API

* Repository name
* Stars count
* Programming languages
* Repository URL

### PostgreSQL

* Custom description
* Thumbnail
* Pin priority
* Slug routing

Keduanya digabungkan secara server-side menggunakan:

```ts
await Promise.all([fetchGithub(), fetchDatabase()])
```

---

# 🏗 Page Architecture

---

## 🏠 Homepage – Immersive Entrance

### Characteristics

* Full 100vh layout
* No initial scroll
* Minimal content focus
* Branding-first experience

### Features

* GSAP typing animation
* Magnetic navigation
* Command palette
* Social links
* Language switch

---

## 📦 Projects Page – Hybrid GitHub Sync

### Layout

* Dynamic Bento Grid
* Responsive masonry behavior
* Variable card sizes

---

### Data Strategy

* Parallel fetch
* Server-side merging
* Incremental Static Regeneration (ISR)

```ts
export const revalidate = 3600
```

GitHub data di-cache dan direfresh setiap 1 jam.

---

### Interaction

* Hover preview animation
* Language toggle
* Star & language indicator
* Pinned project highlight

---

## 👤 About Page

### Interactive Timeline

* Scroll-triggered animation
* Education & work history reveal
* Smooth stagger effect

---

## 🎵 Spotify Integration

* Real-time currently playing
* Fetch from Spotify API
* Auto-update
* Fallback state when idle

---

# ⚙ Backend Optimization Strategy

---

## 1. Hybrid Fetching

Menggunakan parallel request:

```ts
Promise.all()
```

Mengurangi blocking time.

---

## 2. Incremental Static Regeneration (ISR)

* Reduce API rate limit risk
* Maintain SEO
* Improve performance
* Controlled data freshness

---

## 3. Prisma Singleton

```ts
if (!global.prisma) {
  global.prisma = new PrismaClient()
}
```

Mencegah multiple connection di development.

---

## 4. Performance Practices

* Server components for heavy logic
* Client components only when needed
* Optimized image loading
* Lazy animation initialization
* Reduced motion support

---

# 🔐 Scalability Considerations

* Ready for authentication extension
* Ready for admin dashboard
* Ready for analytics integration
* Modular folder structure
* Clean separation of concerns

---

# 🎯 Engineering Highlights

Project ini menunjukkan:

* Fullstack architecture planning
* Hybrid rendering strategy
* Database modeling
* External API integration
* Performance optimization
* Accessibility awareness
* UI micro-interaction refinement
* Internationalization handling

---

# 🧠 Conclusion

The Dark Aesthetic Fullstack Portfolio adalah demonstrasi kemampuan teknis yang mencakup:

* Backend design
* Frontend animation engineering
* API orchestration
* Database integration
* Performance strategy
* UX precision