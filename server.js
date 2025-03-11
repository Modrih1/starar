const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
};

const server = http.createServer((req, res) => {
  console.log(`Запит: ${req.method} ${req.url}`);

  // Обробка основного шляху
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // Визначення шляху до файлу
  filePath = path.join(__dirname, filePath);
  
  // Отримання розширення файлу
  const ext = path.extname(filePath);
  
  // Перевірка наявності файлу
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Якщо файл не знайдено
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    
    // Читання файлу
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }
      
      // Визначення MIME типу
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      
      // Відправка відповіді
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущено за адресою http://localhost:${PORT}`);
  console.log(`Щоб відкрити адмін-панель, перейдіть на http://localhost:${PORT}/admin/dashboard.html`);
}); 