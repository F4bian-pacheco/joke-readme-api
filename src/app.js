const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/joke', async (req, res) => {
  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Programming?lang=es');
    const joke = response.data;
    const theme = req.query.theme || 'light';

    let jokeLines = [];
    const maxCharsPerLine = 50;

    if (joke.type === 'twopart') {
      const setupLines = splitTextIntoLines(joke.setup, maxCharsPerLine);
      const deliveryLines = splitTextIntoLines(joke.delivery, maxCharsPerLine);
      jokeLines = [...setupLines, '', ...deliveryLines];
    } else {
      jokeLines = splitTextIntoLines(joke.joke, maxCharsPerLine);
    }

    function splitTextIntoLines(text, maxChars) {
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';

      words.forEach(word => {
        if ((currentLine + ' ' + word).length <= maxChars) {
          currentLine = currentLine ? `${currentLine} ${word}` : word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      });
      if (currentLine) {
        lines.push(currentLine);
      }
      return lines;
    }

    const lineHeight = 25;
    const padding = 20;
    const width = 400;
    const height = (jokeLines.length * lineHeight) + (padding * 2);

    const colors = theme === 'dark' ? {
      bg: '#0D1117',
      text: '#FFFFFF',
      border: '#30363D'
    } : {
      bg: '#FFFFFF',
      text: '#000000',
      border: '#E4E2E2'
    };

    const svg = `
    <svg width="${width}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="${height}">
      <rect x="5" y="5" width="390" height="${height - 10}" fill="${colors.bg}" rx="10" stroke="${colors.border}" stroke-width="1"/>
      <text x="30" y="30" fill="${colors.text}" font-family="Arial" font-size="14">
        ${jokeLines.map((line, index) =>
      `<tspan x="30" dy="${index === 0 ? 0 : lineHeight}">${line}</tspan>`
    ).join('')}
      </text>
    </svg>
    `;

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=600');
    res.setHeader('x-powered-by', 'Joke API');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    res.send(svg);

  } catch (error) {
    res.status(500)
      .setHeader('Content-Type', 'application/json')
      .json({
        error: 'No se pudo cargar un chiste en este momento.' + error.message,
        markdown: '# Error\n\nNo se pudo cargar un chiste en este momento.'
      });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
}); 