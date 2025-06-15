
const express = require('express');
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  console.log('🌐 Request:', req.method, req.url);
  next(); 
});

app.use(express.json());


app.get('/', (req, res) => {
  res.send('🏠 Welcome to the Home Page!');
});


app.get('/about', (req, res) => {
  res.send('ℹ️ About Page');
});


app.post('/data', (req, res) => {
  console.log('📦 Received:', req.body);
  res.send('✅ Data received!');
});


app.use((req, res) => {
  res.status(404).send('❌ Page Not Found');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
