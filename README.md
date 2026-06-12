# BioPole AgroPulse

Пульт агронома — дашборд полей, погоды и операций с конструктором виджетов.

**Репозиторий:** [github.com/ptrvalina/Bio-Ple](https://github.com/ptrvalina/Bio-Ple)

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Возможности

- **Дашборд** — карта полей, NDVI-анализ, погода, алерты, журнал операций
- **Конструктор** — drag-and-drop виджетов, сохранение в localStorage
- **Мобильная версия** — нижняя навигация, выбор полей, bottom sheet для виджетов
- **Экспорт** — JSON-отчёт для аудита

## Стек

Next.js 14 · TypeScript · Tailwind CSS · Zustand · Framer Motion · react-grid-layout

## Публичная ссылка (деплой за 2 минуты)

1. Откройте [vercel.com/new](https://vercel.com/new)
2. Импортируйте репозиторий **ptrvalina/Bio-Ple**
3. Нажмите **Deploy** — Vercel выдаст ссылку вида `https://bio-ple-xxx.vercel.app`

Или из терминала:

```bash
npx vercel login
npx vercel deploy --prod
```

## Локальная сборка

```bash
npm run build
npm start
```
