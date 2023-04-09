// импорт стандартных библиотек Node.js
const { log } = require('console');
const { readFileSync } = require('fs');
const { createServer } = require('http');
const path = require('path');
const fs = require('fs');
const Buffer = require('buffer').Buffer;
const { MongoClient } = require('mongodb');

// Replace the uri string with your connection string.
const mongoUrl = 'mongodb+srv://devnchalk:pXwKLltG2JYc8i7J@cluster0.gyek8dt.mongodb.net/test';
const client = new MongoClient(mongoUrl);
const database = client.db('greatcode');

async function getData(url) {
  let data = [];
  try {
    const collection = database.collection(url);
    const documents = collection.find({});
    data = await documents.toArray();
  } finally {
    //await client.close();
  }
  return data;
}

// номер порта, на котором будет запущен сервер
const PORT = process.env.PORT || 3024;
// префикс URI для всех методов приложения
const URI_PREFIX = '/';

class ApiError extends Error {
  constructor(statusCode, data) {
    super();
    this.statusCode = statusCode;
    this.data = data;
  }
}

// создаём HTTP сервер, переданная функция будет реагировать на все запросы к нему
module.exports = server = createServer(async (req, res) => {
  // этот заголовок ответа указывает, что тело ответа будет в JSON формате
  res.setHeader('Content-Type', 'application/json');

  // CORS заголовки ответа для поддержки кросс-доменных запросов из браузера
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // запрос с методом OPTIONS может отправлять браузер автоматически для проверки CORS заголовков
  // в этом случае достаточно ответить с пустым телом и этими заголовками
  if (req.method === 'OPTIONS') {
    // end = закончить формировать ответ и отправить его клиенту
    res.end();
    return;
  }

  // если URI не начинается с нужного префикса - можем сразу отдать 404
  if (!req.url || !req.url.startsWith(URI_PREFIX)) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
    return;
  }

  const [uri] = req.url.substr(URI_PREFIX.length).split('?');

  try {
    if (req.method === 'GET') {
      if (uri === 'questions' || uri === 'developers') {
        try {
          const data = await getData(uri);

          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end(JSON.stringify(data));
        } catch (err) {
          console.error(err);
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Error reading data from MongoDB');
        }
      }
    } else if (req.method === 'POST') {
      if (uri === 'feedback' || uri === 'questionnaire') {
        let document = '';
        req.on('data', (chunk) => {
          document += chunk.toString();
        });
        req.on('end', async () => {
          const data = JSON.parse(document)[0];
          try {
            const collection = database.collection(uri);
            await collection.insertOne(data);

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Data received and saved to MongoDB');
          } catch (err) {
            console.error(err);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Error saving data to MongoDB');
          }
        });
      }
    }
  } catch (err) {
    console.log('err: ', err);
    if (err instanceof ApiError) {
      res.writeHead(err.statusCode);
      res.end(JSON.stringify(err.data));
    } else {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: 'Server Error' }));
    }
  }
})
  // выводим инструкцию, как только сервер запустился...
  .on('listening', () => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(
        `Сервер GREAT_CODE_FOR_YOU запущен. Вы можете использовать его по адресу http://localhost:${PORT}`
      );
      console.log('Нажмите CTRL+C, чтобы остановить сервер');
      console.log('Доступные методы:');
      console.log(`GET ${URI_PREFIX}questions - получить из БД список вопросов для опросника`);
      console.log(`GET ${URI_PREFIX}developers - получить из БД список разработчиков`);
      console.log(`POST ${URI_PREFIX}feedback - записать в БД запрос на обратную связь`);
      console.log(`POST ${URI_PREFIX}questionnaire - записать в БД запрос на обратную связь с опросником`);
    }
  })
  .listen(PORT);
