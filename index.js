import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './database/config.js';
import rsaAlgorithm from './Encryption.js';
import expressAsyncHandler from 'express-async-handler';
import Encrypt from './models/encryptionModel.js';

const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
var result = '';
var error = '';
var time = '';
app.use(express.static('public'));
connectDB();
app.get('/', (req, res) => {
  res.render('home', { error: error });
});
app.get('/result', (req, res) => {
  res.render('result', { result: result, time: time });
});

app.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const encryptionMessage = req.body.message;
    console.log(encryptionMessage);
    const resultOfEncrypt = rsaAlgorithm(encryptionMessage);
    const { data, encryptedmessage, decryptionMessage, milliseconds } =
      resultOfEncrypt;
    const encrpytObject = new Encrypt({
      data,
      encryptedmessage,
      decryptionMessage
    });

    const createObject = await encrpytObject.save();
    if (createObject) {
      res.redirect('/result');
      result = createObject;
      time = milliseconds;
    } else {
      error = 'Cant Connect to database';
      res.redirect('/');
    }
  })
);
app.listen(port, (error) => {
  if (!error) {
    console.log('Server is running');
  } else {
    console.log(error.message);
  }
});
