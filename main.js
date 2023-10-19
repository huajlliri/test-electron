const { app, BrowserWindow } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

let mainWindow;
let db;

app.whenReady().then(() => {
  createWindow();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  // Establece la ruta al archivo de la base de datos en la carpeta 'data'
  const dbPath = path.join(app.getAppPath(), 'data', 'test.db');

  mainWindow.loadFile('src/index.html');

  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error al abrir la base de datos:', err.message);
    } else {
      console.log('Conexión exitosa a la base de datos SQLite');

      db.all('SELECT * FROM clientes', [], (err, rows) => {
        if (err) {
          console.error('Error en la consulta de clientes:', err.message);
        } else {
          const tableHtml = generateTableHtml(rows);

          mainWindow.webContents.executeJavaScript(`
            document.getElementById('dataContainer').innerHTML = '${tableHtml}';
          `);
        }
      });
    }
  });

  mainWindow.on('closed', () => {
    db.close((err) => {
      if (err) {
        console.error('Error al cerrar la base de datos:', err.message);
      } else {
        console.log('Conexión a la base de datos cerrada');
      }
    });
  });
}

function generateTableHtml(data) {
  let html = '<table>';
  html += '<thead><tr><th>ID</th><th>Código</th><th>Nombre</th><th>Descripción</th><th>Teléfono</th></tr></thead>';
  html += '<tbody>';

  data.forEach((row) => {
    html += `<tr><td>${row.id_cliente}</td><td>${row.codigo}</td><td>${row.nombre}</td><td>${row.descripcion}</td><td>${row.telefono}</td></tr>`;
  });

  html += '</tbody></table>';
  return html;
}
