# 🌍 Geo Currency API

API для управления странами и их валютами (по ISO-4217) с возможностью изменения активности как стран, так и отдельных валют.

---

## 🚀 Установка и запуск

### 🔧 Установка зависимостей

```bash
npm install
```

### ▶️ Запуск в режиме разработки

```bash
npm run start:dev
```

### 🐳 Запуск в Docker

```bash
docker-compose up --build
```

---

### ⚙️ Переменные окружения (.env)

Создайте файл `.env` на основе `.env.example`:

```env
PORT=3000
MONGO_URI=mongodb://mongo:27017/geo_currency
```

---

## 📄 Swagger API Документация

Интерактивная документация:

🔗 [Открыть в Swagger Editor](https://editor.swagger.io/?url=https://raw.githubusercontent.com/Oleg4311/geo_currency_api/main/swagger/swagger.json)

[![Swagger UI](https://img.shields.io/badge/Swagger%20Editor-Открыть-green?logo=swagger)](https://editor.swagger.io/?url=https://raw.githubusercontent.com/Oleg4311/geo_currency_api/main/swagger/swagger.json)

---

## 📦 Возможности API

| Метод | Путь                                                           | Описание                              |
|-------|----------------------------------------------------------------|---------------------------------------|
| POST  | `/countries`                                                   | Создать страну с валютами             |
| GET   | `/countries`                                                   | Получить список стран и валют         |
| PATCH | `/countries/{id}/status`                                       | Изменить активность страны            |
| PATCH | `/countries/{countryId}/currency/{code}/status`                | Изменить активность валюты            |

---

## 📁 Структура проекта

- `src/country` – контроллеры, сервисы, схемы, DTO
- `src/common` – общие типы ответов и ошибок
- `swagger/` – описание OpenAPI 3.0
- `test/` – unit-тесты
- `Dockerfile`, `Dockerfile.test` – контейнеры для продакшена и тестирования

---

## 🧪 Локальный запуск тестов

```bash
npm run test
```

## ✅ Запуск тестов в Docker

```bash
docker run --rm -it geo-test sh -c "npm install ts-jest && npx jest"
```

---

## 🗂️ Примеры коллекции Postman

> Коллекция Postman с примерами запросов:  
> [📥 Скачать](https://raw.githubusercontent.com/Oleg4311/geo_currency_api/main/postman/geo_currency_api.postman_collection.json)

---

## 🧑‍💻 Автор

**Олег Белый**  
GitHub: [github.com/Oleg4311](https://github.com/Oleg4311)

---
