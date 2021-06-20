import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});
app.get('/result', (req, res) => {
  res.render('result');
});

app.listen(5000, (error) => {
  if (!error) {
    console.log('Server is running');
  } else {
    console.log(error.message);
  }
});
