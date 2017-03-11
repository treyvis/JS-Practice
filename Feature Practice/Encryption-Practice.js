var cryptoGenKey;

window.crypto.subtle.generateKey(
    {
        name: "RSA-OAEP",
        modulusLength: 2048, //can be 1024, 2048, or 4096
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
    },
    false, //whether the key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"] //must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
)
.then(function(key){
    //returns a keypair object
    console.log(key);
    console.log(key.publicKey);
    console.log(key.privateKey);
    cryptoGenKey = key;
})
.catch(function(err){
    console.error(err);
});

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2);
  var bufView = new Uint8Array(buf);
  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

var stringBuf = str2ab("Encrypt baby!");

var encryptedBuf;

window.crypto.subtle.encrypt(
    {
        name: "RSA-OAEP"
    },
    cryptoGenKey.publicKey,
    stringBuf
)
.then(function(encrypted){
	encryptedBuf = encrypted;
    console.log(ab2str(new Uint8Array(encrypted)));
})
.catch(function(err){
    console.error(err);
});

window.crypto.subtle.decrypt(
    {
        name: "RSA-OAEP",
    },
    cryptoGenKey.publicKey, //from generateKey or importKey above
    encryptedBuf //ArrayBuffer of the data
)
.then(function(decrypted){
	console.log(ab2str(encryptedBuf));
    //returns an ArrayBuffer containing the decrypted data
    console.log(new Uint8Array(decrypted));
})
.catch(function(err){
    console.error(err);
});
