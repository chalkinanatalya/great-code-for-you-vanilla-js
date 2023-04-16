// импорт стандартных библиотек Node.js
const { log } = require('console');
const { readFileSync } = require('fs');
const { createServer } = require('http');
const path = require('path');
const fs = require('fs');
const Buffer = require('buffer').Buffer;
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Replace the uri string with your connection string.
const mongoUrl = `mongodb+srv://${process.env.DB_PROJECT}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/test`;
const client = new MongoClient(mongoUrl);
const database = client.db(`${process.env.DB_NAME}`);

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

// port number to load the server
const PORT = process.env.PORT || 3024;
// prefix URI for all the methods in app
const URI_PREFIX = '/';

class ApiError extends Error {
  constructor(statusCode, data) {
    super();
    this.statusCode = statusCode;
    this.data = data;
  }
}

// creates HHP server, the function you've passed will react to all requests
module.exports = server = createServer(async (req, res) => {
  // this header shows that the request body is going to have json format
  res.setHeader('Content-Type', 'application/json');

  // CORS headers for answers for cross-domain browser requests support
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // request that contains method OPTION can be sent by browser automatically for CORS headers check
  // in this case it's enouth to answer with empty body and headers
  if (req.method === 'OPTIONS') {
    // end = to end forming answer and send it to client
    res.end();
    return;
  }

  // if URL doesn't start with demanded prefix - we're giving back a 404 err
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
  // As server has started to work, show the instruction
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
