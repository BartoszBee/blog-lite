# BlogLite — Next.js CRUD Showcase

Porównanie **sześciu podejść** do budowania CRUD w Next.js App Router.

Projekt powstał jako osobista ściągawka i showcase różnych strategii data-fetchingu — od klasycznego `fetch` przez Server Actions, aż po RTK Query. Każda sekcja to kompletny CRUD z tą samą funkcjonalnością, zaimplementowany inaczej.

---

## Podejścia

### 1. Classic Fetch — `/`
- `useState` + `useEffect` + ręczne wywołania `fetch`
- Obsługa loading/error po stronie klienta
- Nawigacja przez `useRouter`
- Fundamenty — tak działał React zanim pojawiły się dedykowane biblioteki

### 2. Server Actions — `/actions`
- Mutacje wykonywane po stronie serwera (`"use server"`)
- Formularze HTML bez JavaScript (`form action={...}`)
- Automatyczne `redirect()` i `revalidatePath()` po mutacji
- Pełen SSR — działa bez JS w przeglądarce

### 3. React Query — `/rq`
- `@tanstack/react-query` — standard w branży
- `useQuery` do pobierania, `useMutation` do mutacji
- Automatyczny cache, refetching, invalidacja przez `queryKey`
- `QueryClientProvider` jako wrapper sekcji

### 4. SWR — `/swr`
- Lekka alternatywa od Vercel
- `useSWR` + `useSWRConfig` do rewalidacji
- Auto-rewalidacja przy powrocie do zakładki / odzyskaniu połączenia
- Mniej konfiguracji niż React Query

### 5. Zustand — `/zustand`
- Globalny store bez providera
- Stan i akcje w jednym miejscu (`create<State>((set) => {...})`)
- Najprostszy do użycia — `usePostsStore()` działa wszędzie bez owijania drzewa
- Popularny w nowych projektach jako lekka alternatywa dla Redux

### 6. RTK Query — `/rtk`
- `@reduxjs/toolkit` — standard w dużych / enterprise projektach
- Deklaratywne API: `createApi` + `builder.query` / `builder.mutation`
- Tag system (`providesTags` / `invalidatesTags`) — automatyczna invalidacja cache
- `.unwrap()` do obsługi błędów przez `try/catch`
- Redux Provider jako wrapper sekcji

---

## Kiedy co wybrać

| Podejście | Kiedy użyć |
|-----------|-----------|
| Classic Fetch | Proste projekty, nauka podstaw |
| Server Actions | Next.js — mutacje bez API route, SEO-first |
| React Query | Większość projektów CSR — najlepszy DX |
| SWR | Lekkie projekty, Vercel ecosystem |
| Zustand | Globalny stan bez Redux, małe/średnie projekty |
| RTK Query | Duże projekty, zespoły z Reduxem, enterprise |

---

## Tech stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **TanStack React Query 5**
- **SWR 2**
- **Zustand 5**
- **Redux Toolkit 2** (RTK Query)
- **JSONPlaceholder** — mock REST API

---

## Uruchomienie

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000)
