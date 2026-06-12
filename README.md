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

## Деплой

```bash
npm run build
npm start
```

Подходит для Vercel / любого Node.js хостинга.
