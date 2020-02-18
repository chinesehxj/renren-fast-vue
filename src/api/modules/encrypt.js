const CryptoJS = require('crypto-js') // 引用AES源码js

// const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF') // 十六位十六进制数作为密钥
// const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412') // 十六位十六进制数作为密钥偏移量

// 解密方法
// function Decrypt (word) {
//   // let ckey = CryptoJS.enc.Utf8.parse(key) // 十六位十六进制数作为密钥
//   // let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
//   // let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
//   let keyStr = 'chinesehxj'
//   let key = CryptoJS.enc.Utf8.parse(keyStr)
//   let decrypt = CryptoJS.AES.decrypt(word, key, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7
//   })
//   let decryptedStr = CryptoJS.enc.Utf8.stringify(decrypt).toString()
//   console.log('decryptedStr', decryptedStr)

//   return decryptedStr
// }

// // 加密方法
// function Encrypt (word) {
//   let keyStr = 'chinesehxj'
//   let key = CryptoJS.enc.Utf8.parse(keyStr)
//   let srcs = CryptoJS.enc.Utf8.parse(word)
//   let encrypted = CryptoJS.AES.encrypt(srcs, key, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7
//   })
//   // console.log('encrypted', encrypted.toString())
//   return encrypted.toString()
// }

function Encrypt (word, keyStr) { // 加密
  console.log(' Encrypt word', word)
  keyStr = keyStr || 'ABGHNJHGSHUYG12'
  let key = CryptoJS.enc.Utf8.parse(keyStr)
  let srcs = CryptoJS.enc.Utf8.parse(word)
  console.log(' Encrypt srcs', srcs)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

function Decrypt (word, keyStr) { // 解密
  console.log('Decrypt word', word)
  keyStr = keyStr || 'ABGHNJHGSHUYG12'
  let key = CryptoJS.enc.Utf8.parse(keyStr)
  let decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  console.log('Decrypt decrypt', decrypt)
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

export default {
  Encrypt,
  Decrypt
}
