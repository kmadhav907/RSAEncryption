import bigInt from 'big-integer';

function unpack(str) {
  var data = [];
  for (var i = 0; i < str.length; i++) {
    data.push(str.charCodeAt(i));
  }
  return data;
}
function pack(byteArray) {
  var result = '';
  for (var i = 0; i < byteArray.length; i++) {
    result += String.fromCharCode(byteArray[i]);
  } /*from   w  ww . ja v a 2 s .  co  m*/
  return result;
}

// console.log(unpack('Madhav is Bhat'));
// const bitLength = 1024;
// var p = generatePrime(bitLength);
// var q = generatePrime(bitLength);
// var r = generatePrime(bitLength);
// var s = generatePrime(bitLength);
// console.log('P' + p);
// console.log('Q' + q);
// console.log('R' + r);
// console.log('S' + s);

var p = bigInt(2);
var q = bigInt(3);
var r = bigInt(5);
var s = bigInt(17);

var n = p.multiply(q).multiply(r).multiply(s);

var phi = p
  .subtract(bigInt.one)
  .multiply(q.subtract(bigInt.one))
  .multiply(r.subtract(bigInt.one))
  .multiply(s.subtract(bigInt.one));
var e = bigInt(3);

while (
  bigInt.gcd(e, phi).compareTo(bigInt.one) > bigInt(0) &&
  e.compareTo(phi) < bigInt(0)
) {
  e.add(bigInt.one);
}

var d = e.modInv(phi);

var encrypt = (message) => {
  return message.map((m) => {
    return bigInt(m).modPow(e, n);
  });
};
var decrypt = (message) => {
  return message.map((m) => {
    return bigInt(m).modPow(d, n);
  });
};

// var message = 'This is world';
// var bytes = unpack(message);
// console.log(bytes);
// var en = encrypt(bytes);
// var dec = decrypt(en);
// var msg = pack(dec);
// console.log('Encrypt ' + en);
// console.log('Decrypt ' + dec);

// console.log('Message ' + msg);

const rsaAlgorithm = (data) => {
  const startTime = new Date();

  const bytes = unpack(data);
  const encoding = encrypt(bytes);
  const encryptedmessage = pack(encoding);

  const decoding = decrypt(encoding);
  const decryptionMessage = pack(decoding);
  const endTime = new Date();
  const milliseconds = endTime.getTime() - startTime.getTime();
  return { data, encryptedmessage, decryptionMessage, milliseconds };
};
// var result = rsaAlgorithm('HI This is Madhav');
// console.log(result);
rsaAlgorithm('Hi');
export default rsaAlgorithm;
