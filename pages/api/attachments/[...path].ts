import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';
import { getToken } from 'next-auth/jwt';
import fs from 'fs';
import path from 'path';

/**
 * API прокси для получения вложений через API бэкенда
 * Позволяет передать аутентификацию и обойти CORS при получении аудио/видео/изображений
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Получаем токен из сессии или из параметра запроса
  let token = await getToken({ req });

  // Если нет токена в сессии, проверяем параметр token в URL
  if (!token?.accessToken && req.query.token) {
    console.log(`[API Прокси] Найден токен в URL параметре`);
    token = { accessToken: req.query.token as string };
  }

  // Если нет токена для голосовых сообщений все равно пробуем проксировать
  // чтобы избежать проблем с авторизацией при загрузке аудио в браузере
  const paths = req.query.path as string[];
  const isVoiceRequest = paths?.length > 0 && paths[0] === 'voice';
  const isImageRequest = paths?.length > 0 && paths[0] === 'image';
  const isFilesVoiceRequest = paths?.length > 1 && paths[0] === 'files' && paths[1] === 'voice';
  const isTestMode = req.query.test === '1' || req.headers['x-test-mode'] === 'true';
  const requestId = Math.random().toString(36).substring(2, 10);

  if (!token && !isVoiceRequest && !isImageRequest && !isFilesVoiceRequest && !isTestMode) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Подробная диагностика запроса
  console.log(
    `[API Прокси ${requestId}] Запрос: ${req.url}, метод: ${req.method}, voice: ${isVoiceRequest || isFilesVoiceRequest}`,
  );
  console.log(`[API Прокси ${requestId}] Заголовки запроса:`, req.headers);

  // Обработка тестового режима для отладки проблем с аудио
  if (isTestMode && (isVoiceRequest || isFilesVoiceRequest)) {
    console.log(`[API Прокси ${requestId}] Тестовый режим активирован`);

    // Возвращаем тестовый аудиофайл для проверки воспроизведения
    try {
      const testFilePath = path.join(process.cwd(), 'public', 'test-audio.mp3');

      // Проверяем есть ли тестовый файл
      if (fs.existsSync(testFilePath)) {
        console.log(`[API Прокси ${requestId}] Возвращаем тестовый аудиофайл: ${testFilePath}`);
        const fileContent = fs.readFileSync(testFilePath);

        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', fileContent.length);
        res.setHeader('Cache-Control', 'public, max-age=300');
        res.setHeader('X-Test-Mode', 'true');
        res.setHeader('X-Request-ID', requestId);

        return res.status(200).send(fileContent);
      } else {
        console.log(`[API Прокси ${requestId}] Тестовый аудиофайл не найден: ${testFilePath}`);

        // Генерируем заглушку для ответа в формате JSON
        return res.status(200).json({
          message: 'Тестовый файл не найден, возвращена заглушка',
          test: true,
          requestId,
          path: paths.join('/'),
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error(`[API Прокси ${requestId}] Ошибка в тестовом режиме:`, error);
      return res.status(500).json({ error: 'Ошибка в тестовом режиме', requestId });
    }
  }

  // Добавляем детальную информацию о запросе голосового файла
  if (isVoiceRequest || isFilesVoiceRequest) {
    const fileName =
      paths.length > (isFilesVoiceRequest ? 2 : 1)
        ? paths[isFilesVoiceRequest ? 2 : 1]
        : 'неизвестно';
    console.log(
      `[API Прокси ${requestId}] Голосовой запрос: ${paths.join('/')}, файл: ${fileName}`,
    );

    // Проверяем наличие ID файла
    const fileMatch = fileName.match(/([a-f0-9-]+)\.mp3/i);
    if (fileMatch && fileMatch[1]) {
      const fileId = fileMatch[1];
      console.log(`[API Прокси ${requestId}] ID аудио файла: ${fileId}`);

      // Проверяем, содержит ли ID допустимые символы
      if (!/^[a-f0-9-]+$/i.test(fileId)) {
        console.warn(`[API Прокси ${requestId}] ID содержит недопустимые символы: ${fileId}`);
      }
    }

    // Проверяем наличие дополнительного ID в запросе
    if (req.query.id) {
      console.log(`[API Прокси ${requestId}] ID из параметра запроса: ${req.query.id}`);
    }
  }

  try {
    // Подготавливаем заголовки для запроса
    const headers: Record<string, string> = {};

    // Предотвращаем кэширование для получения свежих данных
    headers['Cache-Control'] = 'no-cache, no-store';
    headers['Pragma'] = 'no-cache';

    // Если есть токен, добавляем заголовок авторизации
    if (token?.accessToken) {
      headers['Authorization'] = `Bearer ${token.accessToken}`;
      console.log(`[API Прокси ${requestId}] Добавлен токен авторизации`);
    } else if (isVoiceRequest || isFilesVoiceRequest) {
      // Если токена нет, но это голосовой запрос, добавляем заголовок с API ключом
      // для обеспечения авторизации при запросе аудио
      const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';
      if (apiKey) {
        headers['X-API-Key'] = apiKey;
        console.log(`[API Прокси ${requestId}] Голосовой запрос без токена, используем API ключ`);
      } else {
        console.log(`[API Прокси ${requestId}] Внимание: нет токена и API ключа для запроса`);
      }
    }

    // Для аудио файлов указываем, что хотим получить "сырые" данные
    if (isVoiceRequest || isFilesVoiceRequest) {
      headers['Accept'] = 'audio/*, */*';
      headers['X-Request-ID'] = requestId;
      // Добавляем расширенные заголовки для отладки
      headers['X-Debug-Client'] = 'Sphere-Frontend';
      headers['X-Debug-Timestamp'] = Date.now().toString();

      // Настраиваем заголовки ответа для аудио
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Content-Disposition', 'inline');
    }

    // Для изображений тоже настраиваем заголовки
    if (isImageRequest) {
      headers['Accept'] = 'image/*, */*';
      headers['X-Request-ID'] = requestId;
      headers['X-Debug-Client'] = 'Sphere-Frontend';
      headers['X-Debug-Timestamp'] = Date.now().toString();

      // Настраиваем заголовки ответа для изображений
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Кэшируем изображения на 24 часа
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Content-Disposition', 'inline');
    }

    // Определяем API URL с учётом окружения
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    console.log(`[API Прокси ${requestId}] Целевой URL: ${apiUrl}`);

    // Устанавливаем таймаут для запроса - увеличиваем для голосовых сообщений
    const timeout = isVoiceRequest || isFilesVoiceRequest ? 20000 : 10000; // 20 секунд для аудио

    // Проверяем альтернативные пути для голосовых сообщений
    let pathToRewrite = '/attachments';

    if (isVoiceRequest || isFilesVoiceRequest) {
      if (isFilesVoiceRequest) {
        // Путь вида /api/attachments/files/voice/...
        pathToRewrite = '/attachments/files';
        console.log(`[API Прокси ${requestId}] Используем путь для файлов: ${pathToRewrite}`);
      } else if (isVoiceRequest) {
        // Путь вида /api/attachments/voice/...
        // Пробуем получить ID файла
        if (paths.length > 1) {
          const fileNameParts = paths[1].split('.');
          if (fileNameParts.length > 0) {
            const fileId = fileNameParts[0];
            // Проверяем, является ли ID файла валидным UUID
            if (/^[a-f0-9-]{36}$/i.test(fileId)) {
              // Используем новый публичный эндпоинт
              pathToRewrite = '/attachments/public/voice';
              console.log(
                `[API Прокси ${requestId}] Используем публичный путь для голосовых сообщений: ${pathToRewrite}`,
              );
            } else {
              // Если ID не похож на UUID, пробуем другой путь
              pathToRewrite = '/attachments/files/voice';
              console.log(
                `[API Прокси ${requestId}] ID не валидный UUID, используем альтернативный путь: ${pathToRewrite}`,
              );
            }
          }
        }
      }
    } else if (isImageRequest) {
      // Обрабатываем запросы изображений
      if (paths.length > 1) {
        const imageId = paths[1];
        // Проверяем, является ли ID изображения валидным UUID
        if (/^[a-f0-9-]{36}$/i.test(imageId)) {
          pathToRewrite = '/attachments/public/image';
          console.log(
            `[API Прокси ${requestId}] Используем публичный путь для изображений: ${pathToRewrite}`,
          );
        } else {
          pathToRewrite = '/attachments/files';
          console.log(
            `[API Прокси ${requestId}] ID изображения не валидный UUID, используем путь для файлов: ${pathToRewrite}`,
          );
        }
      }
    }

    // Добавляем диагностику структуры URL
    console.log(`[API Прокси ${requestId}] Структура запроса:`, {
      originalPath: `/api/${paths.join('/')}`,
      rewritePath: pathToRewrite,
      newPath: `${pathToRewrite}/${paths.slice(isFilesVoiceRequest ? 2 : 1).join('/')}`,
    });

    // Проксируем запрос
    return httpProxyMiddleware(req, res, {
      // API URL из переменных окружения или по умолчанию
      target: apiUrl,
      // Перезаписываем заголовки запроса
      headers,
      // Включаем прокси заголовков
      changeOrigin: true,
      // Проверка SSL для локальной разработки отключена
      // @ts-ignore - игнорируем ошибку типа
      secure: process.env.NODE_ENV === 'production',
      // @ts-ignore - устанавливаем таймаут запроса
      proxyTimeout: timeout,
      // @ts-ignore - устанавливаем таймаут запроса
      timeout: timeout,
      // Переписываем путь запроса
      pathRewrite: [
        {
          patternStr: '^/api/attachments',
          replaceStr: pathToRewrite,
        },
      ],
      // @ts-ignore - дополнительные опции для прокси
      onProxyReq: (proxyReq: any, req: any) => {
        // Добавляем отметку времени для обхода кэша
        const originalPath = proxyReq.path;
        if (isVoiceRequest && !originalPath.includes('?')) {
          proxyReq.path = `${originalPath}?_t=${Date.now()}`;
          console.log(
            `[API Прокси ${requestId}] Изменен путь запроса: ${originalPath} -> ${proxyReq.path}`,
          );
        }

        // Дополнительно логируем полный URL запроса к бэкенду
        console.log(`[API Прокси ${requestId}] Итоговый запрос: ${apiUrl}${proxyReq.path}`);
      },
      // @ts-ignore - дополнительные опции для прокси
      onProxyRes: (proxyRes: any, req: any) => {
        // Добавляем CORS заголовки
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, HEAD, OPTIONS';
        proxyRes.headers['Access-Control-Max-Age'] = '86400';

        // Логируем статус и заголовки ответа
        console.log(
          `[API Прокси ${requestId}] Ответ: ${proxyRes.statusCode}, ` +
            `content-type: ${proxyRes.headers['content-type'] || 'не указан'}, ` +
            `content-length: ${proxyRes.headers['content-length'] || 'не указан'}`,
        );

        // Диагностика для ошибочных ответов
        if (proxyRes.statusCode >= 400) {
          console.error(`[API Прокси ${requestId}] Получена ошибка HTTP ${proxyRes.statusCode}`);
          console.error(`[API Прокси ${requestId}] Заголовки ответа:`, proxyRes.headers);
        }

        // Для аудио файлов устанавливаем правильные заголовки
        if (isVoiceRequest || isFilesVoiceRequest) {
          // Если контент-тип не определен, принудительно устанавливаем
          if (
            !proxyRes.headers['content-type'] ||
            proxyRes.headers['content-type'] === 'application/octet-stream'
          ) {
            proxyRes.headers['content-type'] = 'audio/mpeg';
            console.log(`[API Прокси ${requestId}] Установлен content-type: audio/mpeg`);
          }

          // Проверяем если ответ не аудио, но должен быть аудио файлом
          if (
            !proxyRes.headers['content-type'].includes('audio/') &&
            proxyRes.statusCode === 200 &&
            proxyRes.headers['content-length'] &&
            parseInt(proxyRes.headers['content-length']) > 0
          ) {
            // Это может быть бинарный аудиофайл без правильного Content-Type
            proxyRes.headers['content-type'] = 'audio/mpeg';
            console.log(
              `[API Прокси ${requestId}] Установлен content-type для бинарного ответа: audio/mpeg`,
            );
          }

          // Настраиваем заголовки для кэширования и встраивания
          proxyRes.headers['cache-control'] = 'public, max-age=3600';
          proxyRes.headers['content-disposition'] = 'inline';
        }

        // Для изображений устанавливаем правильные заголовки
        if (isImageRequest) {
          // Для изображений без Content-Type
          if (
            !proxyRes.headers['content-type'] ||
            proxyRes.headers['content-type'] === 'application/octet-stream'
          ) {
            // Пытаемся определить тип по имени файла
            const fileName = paths[1] || '';
            if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
              proxyRes.headers['content-type'] = 'image/jpeg';
            } else if (fileName.endsWith('.png')) {
              proxyRes.headers['content-type'] = 'image/png';
            } else if (fileName.endsWith('.gif')) {
              proxyRes.headers['content-type'] = 'image/gif';
            } else if (fileName.endsWith('.webp')) {
              proxyRes.headers['content-type'] = 'image/webp';
            } else {
              // По умолчанию используем JPEG
              proxyRes.headers['content-type'] = 'image/jpeg';
            }
            console.log(
              `[API Прокси ${requestId}] Установлен content-type для изображения: ${proxyRes.headers['content-type']}`,
            );
          }

          // Настраиваем заголовки для кэширования и встраивания
          proxyRes.headers['cache-control'] = 'public, max-age=86400';
          proxyRes.headers['content-disposition'] = 'inline';
        }

        // Сохраняем ID запроса в заголовке для отладки
        proxyRes.headers['X-Request-ID'] = requestId;
      },
      // Обработка ошибок при проксировании
      onError: (err: Error, req: NextApiRequest, res: NextApiResponse) => {
        const errMsg = err instanceof Error ? err.message : String(err);
        console.error(
          `[API Прокси ${requestId}] Ошибка при проксировании запроса: ${req.url}`,
          errMsg,
        );

        // Для голосовых сообщений отправляем ошибку в специальном формате
        if (isVoiceRequest || isFilesVoiceRequest) {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 500;
          res.end(
            JSON.stringify({
              error: 'Ошибка при загрузке аудио файла',
              message: errMsg,
              path: paths.join('/'),
              requestId,
              timestamp: new Date().toISOString(),
            }),
          );
        } else {
          res.statusCode = 500;
          res.end(
            JSON.stringify({
              error: 'Ошибка при проксировании запроса',
              message: errMsg,
              requestId,
            }),
          );
        }
      },
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Неизвестная ошибка';
    console.error(`[API Прокси ${requestId}] Критическая ошибка:`, errMsg);

    return res.status(500).json({
      message: 'Internal Server Error',
      error: errMsg,
      path: paths.join('/'),
      requestId,
      timestamp: new Date().toISOString(),
    });
  }
}
