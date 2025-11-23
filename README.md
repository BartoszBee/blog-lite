# 📘 BlogLite — Next.js CRUD Showcase

**Porównanie dwóch podejść do tworzenia CRUD w Next.js: klasyczny fetch oraz Server Actions.**

BlogLite to edukacyjno-portfolio projekt, który prezentuje dwa kompletne sposoby budowania CRUD w Next.js:

## 🔵 1. Klasyczny CRUD (`/posts/*`)

- fetch w `lib/api.ts`
- komponenty klientowe
- `useState`, `useEffect`
- obsługa błędów po stronie klienta
- routing oparty na `useRouter`
- pełen flow: list → view → create → edit → delete

## 🟡 2. Server Actions CRUD (`/actions/*`)

- mutacje wykonywane po stronie serwera
- brak `useState` i `useEffect`
- formularze HTML (`form action={...}`)
- automatyczne `redirect()` po mutacji
- `revalidatePath` po operacjach
- pełen SSR — działanie bez JavaScript w przeglądarce

Projekt korzysta z **JSONPlaceholder**, który udaje zapis danych (`POST/PUT/DELETE` zwracają dane, ale ich nie zapisują).

---

# 🎯 **Cele projektu**

- pokazanie znajomości dwóch stylów pracy z Next.js
- zrozumienie różnic między SSR, CSR i Server Actions

---

# 🛠️ **Tech stack**

- **Next.js 15 (App Router)**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Server Actions**
- **SSR / fetch API**
- **JSONPlaceholder REST API**
