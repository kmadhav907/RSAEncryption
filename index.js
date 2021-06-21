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
var result = {};
app.use(express.static('public'));
connectDB();
app.get('/', (req, res) => {
  res.render('home');
});
app.get('/result', (req, res) => {
  res.render('result', { result: result });
});

app.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const encryptionMessage = req.body.message;
    console.log(encryptionMessage);
    const resultOfEncrypt = rsaAlgorithm(encryptionMessage);
    const { data, encryptedmessage, decryptionMessage } = resultOfEncrypt;
    const encrpytObject = new Encrypt({
      data,
      encryptedmessage,
      decryptionMessage
    });

    const createObject = await encrpytObject.save();
    if (createObject) {
      res.redirect('/result');
      result = createObject;
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
