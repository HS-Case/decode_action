//Thu Oct 15 2026 16:27:41 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
"use strict";

const KEY = "lqiQnStb3CMmDJXk";
const SBOX = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
const INV_SBOX = new Array(256);
for (let i = 0; i < 256; i++) {
  INV_SBOX[SBOX[i]] = i;
}
const RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
function xtime(_0x1b4112) {
  return (_0x1b4112 << 1 ^ (_0x1b4112 & 128 ? 27 : 0)) & 255;
}
function gmul(_0x32a0ff, _0x4f6dd3) {
  let _0x553827 = 0;
  for (let _0x5f03eb = 0; _0x5f03eb < 8; _0x5f03eb++) {
    if (_0x4f6dd3 & 1) {
      _0x553827 ^= _0x32a0ff;
    }
    _0x32a0ff = xtime(_0x32a0ff);
    _0x4f6dd3 >>>= 1;
  }
  return _0x553827;
}
function utf8ToBytes(_0x32b2af) {
  const _0x38dd2f = [];
  for (let _0x3b5447 = 0; _0x3b5447 < _0x32b2af.length; _0x3b5447++) {
    let _0x2a1cf2 = _0x32b2af.charCodeAt(_0x3b5447);
    if (_0x2a1cf2 < 128) {
      _0x38dd2f.push(_0x2a1cf2);
    } else {
      if (_0x2a1cf2 < 2048) {
        _0x38dd2f.push(192 | _0x2a1cf2 >> 6, 128 | _0x2a1cf2 & 63);
      } else {
        if (_0x2a1cf2 >= 55296 && _0x2a1cf2 <= 56319 && _0x3b5447 + 1 < _0x32b2af.length) {
          const _0x16d77d = _0x32b2af.charCodeAt(++_0x3b5447);
          const _0x41f63a = 65536 + (_0x2a1cf2 - 55296 << 10) + (_0x16d77d - 56320);
          _0x38dd2f.push(240 | _0x41f63a >> 18, 128 | _0x41f63a >> 12 & 63, 128 | _0x41f63a >> 6 & 63, 128 | _0x41f63a & 63);
        } else {
          _0x38dd2f.push(224 | _0x2a1cf2 >> 12, 128 | _0x2a1cf2 >> 6 & 63, 128 | _0x2a1cf2 & 63);
        }
      }
    }
  }
  return _0x38dd2f;
}
function bytesToUtf8(_0x364ed8) {
  let _0x7dae91 = "";
  for (let _0x554421 = 0; _0x554421 < _0x364ed8.length;) {
    const _0x2ffba2 = _0x364ed8[_0x554421++];
    if (_0x2ffba2 < 128) {
      _0x7dae91 += String.fromCharCode(_0x2ffba2);
    } else {
      if ((_0x2ffba2 & 224) === 192) {
        const _0x1a1347 = _0x364ed8[_0x554421++];
        _0x7dae91 += String.fromCharCode((_0x2ffba2 & 31) << 6 | _0x1a1347 & 63);
      } else {
        if ((_0x2ffba2 & 240) === 224) {
          const _0x345b16 = _0x364ed8[_0x554421++];
          const _0x1d916b = _0x364ed8[_0x554421++];
          _0x7dae91 += String.fromCharCode((_0x2ffba2 & 15) << 12 | (_0x345b16 & 63) << 6 | _0x1d916b & 63);
        } else {
          const _0x18799d = _0x364ed8[_0x554421++];
          const _0x36d544 = _0x364ed8[_0x554421++];
          const _0x42571c = _0x364ed8[_0x554421++];
          let _0x2214eb = (_0x2ffba2 & 7) << 18 | (_0x18799d & 63) << 12 | (_0x36d544 & 63) << 6 | _0x42571c & 63;
          _0x2214eb -= 65536;
          _0x7dae91 += String.fromCharCode(55296 + (_0x2214eb >> 10), 56320 + (_0x2214eb & 1023));
        }
      }
    }
  }
  return _0x7dae91;
}
function keyExpansion(_0x23ce06) {
  const _0x558f2 = _0x23ce06.slice();
  let _0x13fa7f = 16;
  let _0x4ce046 = 1;
  let _0x1049e1 = [0, 0, 0, 0];
  while (_0x13fa7f < 176) {
    for (let _0x39607b = 0; _0x39607b < 4; _0x39607b++) {
      _0x1049e1[_0x39607b] = _0x558f2[_0x13fa7f - 4 + _0x39607b];
    }
    _0x13fa7f % 16 === 0 && (_0x1049e1 = [_0x1049e1[1], _0x1049e1[2], _0x1049e1[3], _0x1049e1[0]].map(_0x3efa59 => SBOX[_0x3efa59]), _0x1049e1[0] ^= RCON[_0x4ce046++]);
    for (let _0x391fd4 = 0; _0x391fd4 < 4; _0x391fd4++) {
      _0x558f2[_0x13fa7f] = _0x558f2[_0x13fa7f - 16] ^ _0x1049e1[_0x391fd4];
      _0x13fa7f++;
    }
  }
  return _0x558f2;
}
const ROUND_KEY = keyExpansion(utf8ToBytes(KEY));
function addRoundKey(_0x256bbc, _0x1b8e3f) {
  const _0x2fd98a = _0x1b8e3f * 16;
  for (let _0x3e3479 = 0; _0x3e3479 < 16; _0x3e3479++) {
    _0x256bbc[_0x3e3479] ^= ROUND_KEY[_0x2fd98a + _0x3e3479];
  }
}
function subBytes(_0xe1e8c9) {
  for (let _0x79e415 = 0; _0x79e415 < 16; _0x79e415++) {
    _0xe1e8c9[_0x79e415] = SBOX[_0xe1e8c9[_0x79e415]];
  }
}
function invSubBytes(_0x544035) {
  for (let _0x4fc1ee = 0; _0x4fc1ee < 16; _0x4fc1ee++) {
    _0x544035[_0x4fc1ee] = INV_SBOX[_0x544035[_0x4fc1ee]];
  }
}
function shiftRows(_0x4124b2) {
  const _0x3c5b1a = _0x4124b2.slice();
  _0x4124b2[0] = _0x3c5b1a[0];
  _0x4124b2[4] = _0x3c5b1a[4];
  _0x4124b2[8] = _0x3c5b1a[8];
  _0x4124b2[12] = _0x3c5b1a[12];
  _0x4124b2[1] = _0x3c5b1a[5];
  _0x4124b2[5] = _0x3c5b1a[9];
  _0x4124b2[9] = _0x3c5b1a[13];
  _0x4124b2[13] = _0x3c5b1a[1];
  _0x4124b2[2] = _0x3c5b1a[10];
  _0x4124b2[6] = _0x3c5b1a[14];
  _0x4124b2[10] = _0x3c5b1a[2];
  _0x4124b2[14] = _0x3c5b1a[6];
  _0x4124b2[3] = _0x3c5b1a[15];
  _0x4124b2[7] = _0x3c5b1a[3];
  _0x4124b2[11] = _0x3c5b1a[7];
  _0x4124b2[15] = _0x3c5b1a[11];
}
function invShiftRows(_0x34e0f3) {
  const _0x283f58 = _0x34e0f3.slice();
  _0x34e0f3[0] = _0x283f58[0];
  _0x34e0f3[4] = _0x283f58[4];
  _0x34e0f3[8] = _0x283f58[8];
  _0x34e0f3[12] = _0x283f58[12];
  _0x34e0f3[1] = _0x283f58[13];
  _0x34e0f3[5] = _0x283f58[1];
  _0x34e0f3[9] = _0x283f58[5];
  _0x34e0f3[13] = _0x283f58[9];
  _0x34e0f3[2] = _0x283f58[10];
  _0x34e0f3[6] = _0x283f58[14];
  _0x34e0f3[10] = _0x283f58[2];
  _0x34e0f3[14] = _0x283f58[6];
  _0x34e0f3[3] = _0x283f58[7];
  _0x34e0f3[7] = _0x283f58[11];
  _0x34e0f3[11] = _0x283f58[15];
  _0x34e0f3[15] = _0x283f58[3];
}
function mixColumns(_0x1307ad) {
  for (let _0x5ef19c = 0; _0x5ef19c < 4; _0x5ef19c++) {
    const _0x4ed883 = _0x5ef19c * 4;
    const _0x36c8a9 = _0x1307ad[_0x4ed883];
    const _0x5c9fd8 = _0x1307ad[_0x4ed883 + 1];
    const _0x3625f3 = _0x1307ad[_0x4ed883 + 2];
    const _0x547b22 = _0x1307ad[_0x4ed883 + 3];
    _0x1307ad[_0x4ed883] = gmul(_0x36c8a9, 2) ^ gmul(_0x5c9fd8, 3) ^ _0x3625f3 ^ _0x547b22;
    _0x1307ad[_0x4ed883 + 1] = _0x36c8a9 ^ gmul(_0x5c9fd8, 2) ^ gmul(_0x3625f3, 3) ^ _0x547b22;
    _0x1307ad[_0x4ed883 + 2] = _0x36c8a9 ^ _0x5c9fd8 ^ gmul(_0x3625f3, 2) ^ gmul(_0x547b22, 3);
    _0x1307ad[_0x4ed883 + 3] = gmul(_0x36c8a9, 3) ^ _0x5c9fd8 ^ _0x3625f3 ^ gmul(_0x547b22, 2);
  }
}
function invMixColumns(_0x5d810d) {
  for (let _0x5b94d4 = 0; _0x5b94d4 < 4; _0x5b94d4++) {
    const _0x1c7514 = _0x5b94d4 * 4;
    const _0x25a4cc = _0x5d810d[_0x1c7514];
    const _0xa1164 = _0x5d810d[_0x1c7514 + 1];
    const _0x141560 = _0x5d810d[_0x1c7514 + 2];
    const _0x1f2868 = _0x5d810d[_0x1c7514 + 3];
    _0x5d810d[_0x1c7514] = gmul(_0x25a4cc, 14) ^ gmul(_0xa1164, 11) ^ gmul(_0x141560, 13) ^ gmul(_0x1f2868, 9);
    _0x5d810d[_0x1c7514 + 1] = gmul(_0x25a4cc, 9) ^ gmul(_0xa1164, 14) ^ gmul(_0x141560, 11) ^ gmul(_0x1f2868, 13);
    _0x5d810d[_0x1c7514 + 2] = gmul(_0x25a4cc, 13) ^ gmul(_0xa1164, 9) ^ gmul(_0x141560, 14) ^ gmul(_0x1f2868, 11);
    _0x5d810d[_0x1c7514 + 3] = gmul(_0x25a4cc, 11) ^ gmul(_0xa1164, 13) ^ gmul(_0x141560, 9) ^ gmul(_0x1f2868, 14);
  }
}
function encryptBlock(_0x439d6d) {
  const _0x34a97d = _0x439d6d.slice();
  addRoundKey(_0x34a97d, 0);
  for (let _0x4b2f89 = 1; _0x4b2f89 < 10; _0x4b2f89++) {
    subBytes(_0x34a97d);
    shiftRows(_0x34a97d);
    mixColumns(_0x34a97d);
    addRoundKey(_0x34a97d, _0x4b2f89);
  }
  subBytes(_0x34a97d);
  shiftRows(_0x34a97d);
  addRoundKey(_0x34a97d, 10);
  return _0x34a97d;
}
function decryptBlock(_0x1f1555) {
  const _0x3f8cda = _0x1f1555.slice();
  addRoundKey(_0x3f8cda, 10);
  for (let _0x1671a9 = 9; _0x1671a9 > 0; _0x1671a9--) {
    invShiftRows(_0x3f8cda);
    invSubBytes(_0x3f8cda);
    addRoundKey(_0x3f8cda, _0x1671a9);
    invMixColumns(_0x3f8cda);
  }
  invShiftRows(_0x3f8cda);
  invSubBytes(_0x3f8cda);
  addRoundKey(_0x3f8cda, 0);
  return _0x3f8cda;
}
function pkcs7Pad(_0xa59bd2) {
  const _0x3a886a = 16 - _0xa59bd2.length % 16;
  const _0x51f8d9 = _0xa59bd2.slice();
  for (let _0x5ea29f = 0; _0x5ea29f < _0x3a886a; _0x5ea29f++) {
    _0x51f8d9.push(_0x3a886a);
  }
  return _0x51f8d9;
}
function pkcs7Unpad(_0x4ed555) {
  if (!_0x4ed555.length) {
    throw new Error("empty");
  }
  const _0x386cc4 = _0x4ed555[_0x4ed555.length - 1];
  if (_0x386cc4 < 1 || _0x386cc4 > 16 || _0x386cc4 > _0x4ed555.length) {
    throw new Error("bad padding");
  }
  for (let _0x4bdddf = _0x4ed555.length - _0x386cc4; _0x4bdddf < _0x4ed555.length; _0x4bdddf++) {
    if (_0x4ed555[_0x4bdddf] !== _0x386cc4) {
      throw new Error("bad padding");
    }
  }
  return _0x4ed555.slice(0, _0x4ed555.length - _0x386cc4);
}
const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function b64Encode(_0x16c29c) {
  let _0x2a15b6 = "";
  for (let _0x14f6d6 = 0; _0x14f6d6 < _0x16c29c.length; _0x14f6d6 += 3) {
    const _0x4f8801 = _0x16c29c[_0x14f6d6];
    const _0x330029 = _0x14f6d6 + 1 < _0x16c29c.length ? _0x16c29c[_0x14f6d6 + 1] : 0;
    const _0x4f8fbd = _0x14f6d6 + 2 < _0x16c29c.length ? _0x16c29c[_0x14f6d6 + 2] : 0;
    const _0xe25d61 = _0x4f8801 << 16 | _0x330029 << 8 | _0x4f8fbd;
    _0x2a15b6 += B64[_0xe25d61 >> 18 & 63] + B64[_0xe25d61 >> 12 & 63] + (_0x14f6d6 + 1 < _0x16c29c.length ? B64[_0xe25d61 >> 6 & 63] : "=") + (_0x14f6d6 + 2 < _0x16c29c.length ? B64[_0xe25d61 & 63] : "=");
  }
  return _0x2a15b6;
}
function b64Decode(_0x4b6ae0) {
  _0x4b6ae0 = _0x4b6ae0.replace(/\s/g, "");
  const _0xd7ba6 = {};
  for (let _0x402aca = 0; _0x402aca < 64; _0x402aca++) {
    _0xd7ba6[B64[_0x402aca]] = _0x402aca;
  }
  const _0x3cd348 = [];
  for (let _0x2da5d6 = 0; _0x2da5d6 < _0x4b6ae0.length; _0x2da5d6 += 4) {
    const _0x3118c9 = _0xd7ba6[_0x4b6ae0[_0x2da5d6]];
    const _0x3563d5 = _0xd7ba6[_0x4b6ae0[_0x2da5d6 + 1]];
    const _0x1e0c89 = _0x4b6ae0[_0x2da5d6 + 2] === "=" ? 0 : _0xd7ba6[_0x4b6ae0[_0x2da5d6 + 2]];
    const _0x51ba48 = _0x4b6ae0[_0x2da5d6 + 3] === "=" ? 0 : _0xd7ba6[_0x4b6ae0[_0x2da5d6 + 3]];
    const _0x59b6f = _0x3118c9 << 18 | _0x3563d5 << 12 | _0x1e0c89 << 6 | _0x51ba48;
    _0x3cd348.push(_0x59b6f >> 16 & 255);
    if (_0x4b6ae0[_0x2da5d6 + 2] !== "=") {
      _0x3cd348.push(_0x59b6f >> 8 & 255);
    }
    if (_0x4b6ae0[_0x2da5d6 + 3] !== "=") {
      _0x3cd348.push(_0x59b6f & 255);
    }
  }
  return _0x3cd348;
}
function decryptBody(_0x1dda36) {
  let _0x4272b4 = _0x1dda36.trim().replace(/-/g, "+").replace(/_/g, "/");
  while (_0x4272b4.length % 4) {
    _0x4272b4 += "=";
  }
  const _0x30c759 = b64Decode(_0x4272b4);
  if (_0x30c759.length % 16) {
    throw new Error("cipher length");
  }
  let _0xc9f722 = [];
  for (let _0x3a1a50 = 0; _0x3a1a50 < _0x30c759.length; _0x3a1a50 += 16) {
    _0xc9f722 = _0xc9f722.concat(decryptBlock(_0x30c759.slice(_0x3a1a50, _0x3a1a50 + 16)));
  }
  return bytesToUtf8(pkcs7Unpad(_0xc9f722));
}
function encryptBody(_0x586c9a) {
  const _0x23e176 = pkcs7Pad(utf8ToBytes(_0x586c9a));
  let _0x225859 = [];
  for (let _0x3ae686 = 0; _0x3ae686 < _0x23e176.length; _0x3ae686 += 16) {
    _0x225859 = _0x225859.concat(encryptBlock(_0x23e176.slice(_0x3ae686, _0x3ae686 + 16)));
  }
  return b64Encode(_0x225859).replace(/\+/g, "-").replace(/\//g, "_");
}
function parseJSONText(_0x3351bb) {
  try {
    return typeof _0x3351bb === "string" ? JSON.parse(_0x3351bb) : null;
  } catch (_0x14c65c) {
    return null;
  }
}
function compactJSON(_0x3ddcb7) {
  return JSON.stringify(_0x3ddcb7);
}
function filterMyPage(_0x2d83d0) {
  const _0x4038e0 = {
    "招商加盟": 1,
    "租赁合作": 1,
    "加入我们": 1,
    "优惠联盟": 1,
    "活动周边": 1,
    "企业充赠": 1
  };
  return _0x2d83d0.filter(_0x47c2e1 => !_0x4038e0[_0x47c2e1 && _0x47c2e1.title]);
}
function clean(_0x31e8f4, _0x559679) {
  const _0x2ec8e1 = _0x31e8f4 && _0x31e8f4.content;
  if (/\/resource\/m\/sys\/config\/value/.test(_0x559679) && _0x2ec8e1 && typeof _0x2ec8e1 === "object" && !Array.isArray(_0x2ec8e1)) {
    let _0x55b0c3 = parseJSONText(_0x2ec8e1["luckyfe.luckincoffee.banner.config"]);
    _0x55b0c3 && (_0x55b0c3.home_middlebanner_scrollbroadcast_switch = 0, _0x55b0c3.personal_middlebanner_scrollbroadcast_switch = 0, _0x2ec8e1["luckyfe.luckincoffee.banner.config"] = compactJSON(_0x55b0c3));
    _0x55b0c3 = parseJSONText(_0x2ec8e1["luckyfe.luckincoffee.ios.flash.config"]);
    _0x55b0c3 && (_0x55b0c3.flashSwitch = false, _0x2ec8e1["luckyfe.luckincoffee.ios.flash.config"] = compactJSON(_0x55b0c3));
  } else {
    if (/\/resource\/m\/sys\/homePage\/common\/modules/.test(_0x559679) && _0x2ec8e1 && Array.isArray(_0x2ec8e1.tacticList)) {
      _0x2ec8e1.tacticList = [];
    } else {
      if (/\/resource\/m\/sys\/common\/modules/.test(_0x559679) && _0x2ec8e1 && Array.isArray(_0x2ec8e1.tacticList)) {
        if (_0x2ec8e1.positionCode === "F104") {
          _0x2ec8e1.tacticList = [];
        } else {
          _0x2ec8e1.positionCode === "F101" && (_0x2ec8e1.tacticList = _0x2ec8e1.tacticList.filter(_0x3b55e0 => _0x3b55e0 && _0x3b55e0.positionCode !== "F101001" && _0x3b55e0.positionCode !== "F101005"), _0x2ec8e1.tacticList.forEach(_0x16a8b9 => {
            if (_0x16a8b9.positionCode === "F101003" && Array.isArray(_0x16a8b9.moduleInfos)) {
              _0x16a8b9.moduleInfos = _0x16a8b9.moduleInfos.filter(_0x445996 => _0x445996 && _0x445996.moduleTitle !== "福利中心");
            }
          }));
        }
      } else {
        if (/\/resource\/m\/sys\/base\/myPageSectionShow\/newUI/.test(_0x559679) && Array.isArray(_0x2ec8e1)) {
          _0x31e8f4.content = filterMyPage(_0x2ec8e1);
        } else {
          if (/\/resource\/m\/sys\/app\/adposNew/.test(_0x559679) && Array.isArray(_0x2ec8e1)) {
            _0x31e8f4.content = [];
          } else {
            if (/\/resource\/m\/sys\/homePage\/contactor\/modules/.test(_0x559679) && _0x2ec8e1 && typeof _0x2ec8e1 === "object") {
              _0x2ec8e1.isPop = 0;
              _0x2ec8e1.popupLinkUrl = "";
              _0x2ec8e1.tactic && typeof _0x2ec8e1.tactic === "object" && (_0x2ec8e1.tactic.moduleInfos = [], _0x2ec8e1.tactic.headPic = "", _0x2ec8e1.tactic.showPicUrl = "", _0x2ec8e1.tactic.showPicUrl2 = "", _0x2ec8e1.tactic.popupStyleTemplateJson = "");
            } else {
              if (/\/resource\/m\/sys\/app\/carousel/.test(_0x559679) && _0x2ec8e1 && typeof _0x2ec8e1 === "object") {
                _0x2ec8e1.imgUrl = "";
                _0x2ec8e1.notifyInfos = [];
              } else {
                if (/\/resource\/m\/sys\/visual\/effect\/modules/.test(_0x559679) && Array.isArray(_0x2ec8e1)) {
                  _0x31e8f4.content = [];
                } else {
                  if (/\/resource\/m\/aigc\/showAIButton/.test(_0x559679) && _0x2ec8e1 && typeof _0x2ec8e1 === "object") {
                    _0x2ec8e1.bubbleData = null;
                    _0x2ec8e1.bubbleScheme = null;
                    _0x2ec8e1.bubbleType = 0;
                    _0x2ec8e1.enlargeIconUrl = "";
                    _0x2ec8e1.iconUrl = "";
                    _0x2ec8e1.link = "";
                    _0x2ec8e1.showAISearch = false;
                    _0x2ec8e1.showButton = false;
                  } else {
                    /\/resource\/seckill\/ar\/campaignBaseInfo/.test(_0x559679) && _0x2ec8e1 && typeof _0x2ec8e1 === "object" && (_0x2ec8e1.status = 0, ["arBtnPic", "arIcon", "mainVisualPic", "popupPic", "rulePic", "wxSharePic", "wxShareTitle"].forEach(_0x43b9e0 => {
                      if (typeof _0x2ec8e1[_0x43b9e0] === "string") {
                        _0x2ec8e1[_0x43b9e0] = "";
                      }
                    }));
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return _0x31e8f4;
}
function main(_0x12339c, _0x551118) {
  const _0x3a0eea = decryptBody(_0x551118);
  const _0x33e550 = JSON.parse(_0x3a0eea);
  clean(_0x33e550, _0x12339c);
  return encryptBody(JSON.stringify(_0x33e550));
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    decryptBody: decryptBody,
    encryptBody: encryptBody,
    clean: clean,
    main: main
  };
} else {
  try {
    $done({
      body: main($request.url, $response.body)
    });
  } catch (_0x14ad91) {
    console.log("[Luckin Clean] " + _0x14ad91);
    $done({
      body: $response.body
    });
  }
}