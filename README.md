# 📘 BlogLite — Next.js CRUD Showcase

**Porównanie czterech podejść do tworzenia CRUD w Next.js: klasyczny fetch, Server Actions, React Query oraz SWR**

BlogLite to edukacyjno-portfolio projekt, który prezentuje cztery kompletne sposoby budowania CRUD w Next.js:

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

## 🟣 3. React Query CRUD (/rq/*) — Zaawansowany CSR + Cache, Mutacje, Optimistic UI

- Najbardziej profesjonalna wersja — użycie @tanstack/react-query
- Automatyczny caching, refetching, invalidacje, mutacje

## 🟢 4. SWR CRUD (/swr/*)

- ultralekka alternatywa dla React Query


Projekt korzysta z **JSONPlaceholder**, który udaje zapis danych (`POST/PUT/DELETE` zwracają dane, ale ich nie zapisują).

---

# 🛠️ **Tech stack**

- **Next.js 15 (App Router)**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Server Actions**
- **SSR / fetch API**
- **JSONPlaceholder REST API**
