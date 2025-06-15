# Деплой Sphere Frontend

## ✅ Проблема решена!

Переменные окружения теперь правильно читаются из файла `stack.env`.

## 🚀 Быстрый старт

```bash
# Сборка и запуск
docker-compose build
docker-compose up -d

# Проверка
curl http://localhost:3014/
```

## 📋 Файлы для деплоя

- ✅ `Dockerfile` - оптимизированная сборка Next.js
- ✅ `docker-compose.yml` - конфигурация контейнера  
- ✅ `stack.env` - переменные окружения
- ✅ `.dockerignore` - исключения для сборки

## 🔧 Особенности

- **Standalone режим**: минимальный размер образа
- **Безопасность**: запуск от непривилегированного пользователя
- **Health check**: автоматический мониторинг
- **Логирование**: ротация логов

## 🌐 Порты

- **3014** - внешний порт фронтенда
- **3013** - порт бэкенда (для API запросов)

## 🔗 Интеграция с бэкендом

Фронтенд подключается к бэкенду через переменные `NEXT_PUBLIC_API_URL`.

Для локального тестирования используйте:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3013  # порт бэкенда
```

## 📝 Управление

```bash
# Остановка
docker-compose down

# Перезапуск
docker-compose restart

# Логи
docker-compose logs -f sphere-frontend

# Обновление
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🔧 Исправления

- ✅ Добавлен `env_file: - stack.env` в docker-compose.yml
- ✅ Переменные окружения теперь правильно загружаются
- ✅ API URL корректно читается: `http://localhost:3013/`

## 📝 Переменные окружения

Отредактируйте `stack.env` для продакшена:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
NEXTAUTH_URL=https://your-frontend-domain.com/
NEXTAUTH_SECRET=your-secure-secret-key
```

## 🔍 Проверка переменных

```bash
# Проверить переменные в контейнере
docker-compose exec sphere-frontend env | grep NEXT_PUBLIC

# Проверить логи
docker-compose logs sphere-frontend
``` 