//Thu Mar 12 2026 07:06:44 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("奈雪点单签到"),
  ckName = "naixue_data",
  userCookie = $.toObj($.isNode() ? process.env[ckName] : $.getdata(ckName)) || [];
$.userIdx = 0;
$.userList = [];
$.notifyMsg = [];
const notify = $.isNode() ? require("./sendNotify") : "";
$.is_debug = ($.isNode() ? process.env.IS_DEDUG : $.getdata("is_debug")) || "false";
$.userDone = 0;
async function main() {
  for (let _0x218ed6 of $.userList) {
    try {
      let _0x50767d = (await _0x218ed6.getUserInfo()) ?? "";
      if (_0x218ed6.ckStatus) {
        _0x218ed6.userName = phone_num(_0x50767d);
        $.log("[" + (_0x218ed6.userName || _0x218ed6.index) + "][INFO] 登录成功!开始执行任务...\n");
        await _0x218ed6.signin();
        let _0x466aa2 = await _0x218ed6.signinCount(),
          _0x30d9b0 = await _0x218ed6.getCoin();
        $.notifyMsg.push("「" + _0x218ed6.userName + "」" + _0x466aa2 + ", 当前共" + _0x30d9b0 + "奈雪币");
        $.userDone++;
      } else {
        DoubleLog("⛔️ 「" + (_0x218ed6.userName ?? "账号" + index) + "」签到失败, 用户需要去登录");
      }
      $.name = "奈雪点单签到";
    } catch (_0x456c8b) {
      throw _0x456c8b;
    }
  }
  $.title = "当前共" + userCookie.length + "个账号, 成功" + $.userDone + "个, 失败" + (userCookie.length - $.userDone) + "个";
  await sendMsg($.notifyMsg.join("\n"), {
    $media: $.avatar
  });
}
class UserInfo {
  constructor(_0x340cb9) {
    this.index = ++$.userIdx;
    this.token = "" || _0x340cb9.token || _0x340cb9;
    this.userId = "" || _0x340cb9.userId;
    this.userName = _0x340cb9.userName;
    this.avatar = _0x340cb9.avatar;
    this.ckStatus = true;
    this.baseUrl = "https://tm-web.pin-dao.cn";
    this.headers = {
      Host: "tm-web.pin-dao.cn",
      Connection: "keep-alive",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.48(0x18003030) NetType/WIFI Language/zh_CN miniProgram/wxab7430e6e8b9a4ab",
      Authorization: this.token,
      Referer: "https://tm-web.pin-dao.cn/",
      Origin: "https://tm-web.pin-dao.cn"
    };
    this.fetch = async _0xca0d73 => {
      try {
        if (typeof _0xca0d73 === "string") {
          _0xca0d73 = {
            url: _0xca0d73
          };
        }
        if (_0xca0d73?.["url"]?.["startsWith"]("/") || _0xca0d73?.["url"]?.["startsWith"](":")) {
          _0xca0d73.url = this.baseUrl + _0xca0d73.url;
        }
        const _0x1033e5 = {
          ..._0xca0d73,
          headers: _0xca0d73.headers || this.headers,
          url: _0xca0d73.url
        };
        const _0x462979 = await Request(_0x1033e5);
        debug(_0x462979, _0xca0d73?.["url"]?.["replace"](/\/+$/, "")["substring"](_0xca0d73?.["url"]?.["lastIndexOf"]("/") + 1));
        if (_0x462979?.["code"] != 0) {
          throw new Error(_0x462979?.["message"] || "用户需要去登录");
        }
        return _0x462979;
      } catch (_0x16c8f9) {
        this.ckStatus = false;
        $.log("[" + (this.userName || this.index) + "][ERROR] 请求发起失败!" + _0x16c8f9 + "\n");
      }
    };
  }
  getBody(_0x201f84) {
    try {
      const _0x159e5b = getNonce(),
        _0x3e3dbb = ts10(),
        _0x6ab691 = "nonce=" + _0x159e5b + "&openId=" + this.userId + "&timestamp=" + _0x3e3dbb,
        _0x374b37 = _0xc0e22d(_0x6ab691);
      debug(_0x159e5b, "nonce");
      debug(_0x374b37, "signature");
      const _0x362942 = {
          platform: "wxapp",
          version: "5.1.8",
          imei: "",
          osn: "microsoft",
          sv: "Windows 10 x64",
          lang: "zh_CN",
          currency: "CNY",
          timeZone: "",
          nonce: Number(_0x159e5b),
          openId: this.userId,
          timestamp: Number(_0x3e3dbb),
          signature: _0x374b37
        },
        _0x2a3b41 = {
          businessType: 1,
          brand: 26000252,
          tenantId: 1,
          channel: 2,
          stallType: "",
          storeId: "",
          ..._0x201f84
        },
        _0xc0b5e6 = _0x2a3b41,
        _0x23c8a6 = {
          common: _0x362942,
          params: _0xc0b5e6
        };
      return _0x23c8a6;
      function _0xc0e22d(_0x52480a) {
        const _0x2511b1 = "sArMTldQ9tqU19XIRDMWz7BO5WaeBnrezA",
          _0x28dc77 = $.CryptoJS.enc.Utf8.parse(_0x2511b1),
          _0x54e4ab = $.CryptoJS.enc.Utf8.parse(_0x52480a),
          _0x2a45f4 = $.CryptoJS.HmacSHA1(_0x54e4ab, _0x28dc77),
          _0x3cc673 = $.CryptoJS.enc.Base64.stringify(_0x2a45f4);
        return _0x3cc673;
      }
    } catch (_0x4800ab) {
      $.logErr(_0x4800ab);
    }
  }
  async getUserInfo() {
    try {
      const _0x4ce835 = {
        url: "/user/base-userinfo",
        type: "post",
        dataType: "json",
        body: this.getBody()
      };
      let _0x24d411 = await this.fetch(_0x4ce835);
      return _0x24d411?.["data"]?.["phone"];
    } catch (_0x562ede) {
      this.ckStatus = false;
      $.log("[" + (this.userName || this.index) + "][ERROR] 查询用户信息失败: " + _0x562ede + "\n");
    }
  }
  async signin() {
    try {} catch (_0x3a31e6) {
      this.ckStatus = false;
      $.log("[" + (this.userName || this.index) + "][ERROR] 签到失败: " + _0x3a31e6 + "\n");
    }
  }
  async signinCount() {
    try {
      const _0x311709 = {
        url: "/user/sign/records",
        type: "post",
        dataType: "json",
        body: this.getBody({
          signDate: getSignDate(),
          startDate: getStartDate()
        })
      };
      let _0xf14a64 = await this.fetch(_0x311709),
        _0x682147 = !_0xf14a64?.["data"]?.["status"] ? "签到成功" : "已签到",
        _0x1c9abe = _0x682147 + ",已签到" + _0xf14a64?.["data"]?.["signCount"] + "天";
      $.log("[" + (this.userName || this.index) + "][INFO] " + _0x1c9abe + "\n");
      return _0x682147;
    } catch (_0x425b74) {
      this.ckStatus = false;
      $.log("[" + (this.userName || this.index) + "][ERROR] 签到失败: " + _0x425b74 + "\n");
    }
  }
  async getCoin() {
    try {
      const _0x3aec40 = {
        url: "/user/account/user-account",
        type: "post",
        dataType: "json",
        body: this.getBody()
      };
      let _0x2a4c39 = await this.fetch(_0x3aec40),
        _0x42ac54 = _0x2a4c39?.["data"]?.["availableSumCoin"];
      $.log("[" + (this.userName || this.index) + "][INFO] 当前共" + _0x42ac54 + "奈雪币\n");
      return _0x42ac54;
    } catch (_0x4399ce) {
      this.ckStatus = false;
      $.log("[" + (this.userName || this.index) + "][ERROR] 签到失败: " + _0x4399ce + "\n");
    }
  }
}
async function getCookie() {
  try {
    if ($request && $request.method === "OPTIONS") {
      return;
    }
    if (!$request.headers) {
      throw new Error("错误的运行方式，请切换到cron环境");
    }
    const _0xbe79bc = ObjectKeys2LowerCase($request.headers) ?? {},
      _0x3c47ae = $.toObj($request.body),
      _0x1d2cce = _0xbe79bc.authorization;
    if (!(_0x1d2cce && _0x3c47ae)) {
      throw new Error("获取token失败, 参数缺失");
    }
    const _0x3f2d88 = {
      userId: _0x3c47ae?.["common"]?.["openId"],
      token: _0x1d2cce,
      userName: _0x3c47ae?.["common"]?.["openId"]
    };
    const _0x4a51c0 = userCookie.findIndex(_0x36dab6 => _0x36dab6.userId == _0x3f2d88.userId);
    userCookie[_0x4a51c0] ? userCookie[_0x4a51c0] = _0x3f2d88 : userCookie.push(_0x3f2d88);
    $.setjson(userCookie, ckName);
    $.msg($.name, "🎉账号[" + (_0x4a51c0 != -1 ? _0x4a51c0 + 1 : userCookie.length) + "]更新token成功!", "");
  } catch (_0x48b574) {
    throw _0x48b574;
  }
}
function getStartDate() {
  const _0x2f25df = new Date();
  const _0x19b72a = _0x2f25df.getFullYear();
  const _0xb799ac = _0x2f25df.getMonth() + 1,
    _0x37d018 = _0x2f25df.getDate();
  const _0x8e8fcb = _0x19b72a + "-" + _0xb799ac + "-" + _0x37d018;
  return _0x8e8fcb;
}
function getSignDate() {
  const _0x314604 = new Date(),
    _0xc9eb80 = _0x314604.getFullYear(),
    _0x21e79f = _0x314604.getMonth() + 1,
    _0x426970 = _0x314604.getDate(),
    _0x353a2b = _0x426970.toString().padStart(2, "0");
  const _0x7e3ba4 = _0xc9eb80 + "-" + _0x21e79f + "-" + _0x353a2b;
  return _0x7e3ba4;
}
function getNonce(_0x354352 = 6, _0x14d287 = "123456789") {
  let _0x4bc40e = "";
  for (let _0x549fdd = 0; _0x549fdd < _0x354352; _0x549fdd++) {
    _0x4bc40e += _0x14d287.charAt(Math.floor(Math.random() * _0x14d287.length));
  }
  return _0x4bc40e;
}
function ts10() {
  return Math.round(new Date().getTime() / 1000).toString();
}
function phone_num(_0x109453) {
  if (_0x109453.length == 11) {
    let _0x3ecbd8 = _0x109453.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    return _0x3ecbd8;
  } else {
    return _0x109453;
  }
}
async function loadCryptoJS() {
  let _0x30ca5e = ($.isNode() ? require("crypto-js") : $.getdata("CryptoJS_code")) || "";
  if ($.isNode()) {
    return _0x30ca5e;
  }
  if (_0x30ca5e && Object.keys(_0x30ca5e).length) {
    console.log("[INFO] 缓存中存在CryptoJS代码, 跳过下载\n");
    eval(_0x30ca5e);
    return createCryptoJS();
  }
  console.log("[INFO] 开始下载CryptoJS代码\n");
  return new Promise(async _0xe38d12 => {
    $.getScript("https://cdn.jsdelivr.net/gh/Sliverkiss/QuantumultX@main/Utils/CryptoJS.min.js").then(_0x4bcdbf => {
      $.setdata(_0x4bcdbf, "CryptoJS_code");
      eval(_0x4bcdbf);
      const _0x165354 = createCryptoJS();
      console.log("[INFO] CryptoJS加载成功, 请继续\n");
      _0xe38d12(_0x165354);
    });
  });
}
!(async () => {
  try {
    if (typeof $request != "undefined") {
      await getCookie();
    } else {
      await checkEnv();
      $.CryptoJS = await loadCryptoJS();
      await main();
    }
  } catch (_0x2a045c) {
    throw _0x2a045c;
  }
})().catch(_0x496003 => {
  $.logErr(_0x496003);
  $.msg($.name, "⛔️ script run error!", _0x496003.message || _0x496003);
}).finally(async () => {
  const _0x17fc3 = {
    ok: 1
  };
  $.done(_0x17fc3);
});
async function sendMsg(a, e) {
  a && ($.isNode() ? await notify.sendNotify($.name, a) : $.msg($.name, $.title || "", a, e));
}
function DoubleLog(o) {
  o && ($.log(`${o}`), $.notifyMsg.push(`${o}`));
}
async function checkEnv() {
  try {
    if (!userCookie?.length) {
      throw new Error("no available accounts found");
    }
    $.log(`\n[INFO] 检测到 ${userCookie?.length ?? 0} 个账号\n`);
    $.userList.push(...userCookie.map(o => new UserInfo(o)).filter(Boolean));
  } catch (o) {
    throw o;
  }
}
function debug(g, e = "debug") {
  "true" === $.is_debug && ($.log(`\n-----------${e}------------\n`), $.log("string" == typeof g ? g : $.toStr(g) || `debug error => t=${g}`), $.log(`\n-----------${e}------------\n`));
}
function ObjectKeys2LowerCase(obj) {
  return !obj ? {} : Object.fromEntries(Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v]));
}
async function Request(t) {
  "string" == typeof t && (t = {
    url: t
  });
  try {
    if (!t?.url) {
      throw new Error("[URL][ERROR] 缺少 url 参数");
    }
    let {
      url: o,
      type: e,
      headers: r = {},
      body: s,
      params: a,
      dataType: n = "form",
      resultType: u = "data"
    } = t;
    const p = e ? e?.toLowerCase() : "body" in t ? "post" : "get",
      c = o.concat("post" === p ? "?" + $.queryStr(a) : ""),
      i = t.timeout ? $.isSurge() ? t.timeout / 1000 : t.timeout : 10000;
    "json" === n && (r["Content-Type"] = "application/json;charset=UTF-8");
    const y = "string" == typeof s ? s : s && "form" == n ? $.queryStr(s) : $.toStr(s),
      l = {
        ...t,
        ...(t?.opts ? t.opts : {}),
        url: c,
        headers: r,
        ...("post" === p && {
          body: y
        }),
        ...("get" === p && a && {
          params: a
        }),
        timeout: i
      },
      m = $.http[p.toLowerCase()](l).then(t => "data" == u ? $.toObj(t.body) || t.body : $.toObj(t) || t).catch(t => $.log(`[${p.toUpperCase()}][ERROR] ${t}\n`));
    return Promise.race([new Promise((t, o) => setTimeout(() => o("当前请求已超时"), i)), m]);
  } catch (t) {
    console.log(`[${p.toUpperCase()}][ERROR] ${t}\n`);
  }
}
function Env(t, e) {
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      "POST" === e && (s = this.post);
      return new Promise((e, i) => {
        s.call(this, t, (t, s, o) => {
          t ? i(t) : e(s);
        });
      });
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this.logLevels = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
      };
      this.logLevelPrefixs = {
        debug: "[DEBUG] ",
        info: "[INFO] ",
        warn: "[WARN] ",
        error: "[ERROR] "
      };
      this.logLevel = "info";
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.encoding = "utf-8";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    getEnv() {
      return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0;
    }
    isNode() {
      return "Node.js" === this.getEnv();
    }
    isQuanX() {
      return "Quantumult X" === this.getEnv();
    }
    isSurge() {
      return "Surge" === this.getEnv();
    }
    isLoon() {
      return "Loon" === this.getEnv();
    }
    isShadowrocket() {
      return "Shadowrocket" === this.getEnv();
    }
    isStash() {
      return "Stash" === this.getEnv();
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null, ...s) {
      try {
        return JSON.stringify(t, ...s);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      if (this.getdata(t)) {
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      }
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let o = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        o = o ? 1 * o : 20;
        o = e && e.timeout ? e.timeout : o;
        const [r, a] = i.split("@"),
          n = {
            url: `http://${a}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: o
            },
            headers: {
              "X-Key": r,
              Accept: "*/*"
            },
            timeout: o
          };
        this.post(n, (t, e, i) => s(i));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) {
          return {};
        }
        {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          o = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, o) : i ? this.fs.writeFileSync(e, o) : this.fs.writeFileSync(t, o);
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let o = t;
      for (const t of i) if (o = Object(o)[t], void 0 === o) {
        return s;
      }
      return o;
    }
    lodash_set(t, e, s) {
      Object(t) !== t || (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s);
      return t;
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
          o = s ? this.getval(s) : "";
        if (o) {
          try {
            const t = JSON.parse(o);
            e = t ? this.lodash_get(t, i, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, o] = /^@(.*?)\.(.*?)$/.exec(e),
          r = this.getval(i),
          a = i ? "null" === r ? null : r || "{}" : "{}";
        try {
          const e = JSON.parse(a);
          this.lodash_set(e, o, t);
          s = this.setval(JSON.stringify(e), i);
        } catch (e) {
          const r = {};
          this.lodash_set(r, o, t);
          s = this.setval(JSON.stringify(r), i);
        }
      } else {
        s = this.setval(t, e);
      }
      return s;
    }
    getval(t) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.read(t);
        case "Quantumult X":
          return $prefs.valueForKey(t);
        case "Node.js":
          this.data = this.loaddata();
          return this.data[t];
        default:
          return this.data && this.data[t] || null;
      }
    }
    setval(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.write(t, e);
        case "Quantumult X":
          return $prefs.setValueForKey(t, e);
        case "Node.js":
          this.data = this.loaddata();
          this.data[e] = t;
          this.writedata();
          return !0;
        default:
          return this.data && this.data[e] || null;
      }
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.cookie && void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)));
    }
    get(t, e = () => {}) {
      switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {
        redirection: !1
      })), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          }));
          $httpClient.get(t, (t, s, i) => {
            !t && s && (s.body = i, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode);
            e(t, s, i);
          });
          break;
        case "Quantumult X":
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: i,
              headers: o,
              body: r,
              bodyBytes: a
            } = t;
            e(null, {
              status: s,
              statusCode: i,
              headers: o,
              body: r,
              bodyBytes: a
            }, r, a);
          }, t => e(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          let s = require("iconv-lite");
          this.initGotEnv(t);
          this.got(t).on("redirect", (t, e) => {
            try {
              if (t.headers["set-cookie"]) {
                const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                s && this.ckjar.setCookieSync(s, null);
                e.cookieJar = this.ckjar;
              }
            } catch (t) {
              this.logErr(t);
            }
          }).then(t => {
            const {
                statusCode: i,
                statusCode: o,
                headers: r,
                rawBody: a
              } = t,
              n = s.decode(a, this.encoding);
            e(null, {
              status: i,
              statusCode: o,
              headers: r,
              rawBody: a,
              body: n
            }, n);
          }, t => {
            const {
              message: i,
              response: o
            } = t;
            e(i, o, o && s.decode(o.rawBody, this.encoding));
          });
          break;
      }
    }
    post(t, e = () => {}) {
      const s = t.method ? t.method.toLocaleLowerCase() : "post";
      switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {
        redirection: !1
      })), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          }));
          $httpClient[s](t, (t, s, i) => {
            !t && s && (s.body = i, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode);
            e(t, s, i);
          });
          break;
        case "Quantumult X":
          t.method = s;
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: i,
              headers: o,
              body: r,
              bodyBytes: a
            } = t;
            e(null, {
              status: s,
              statusCode: i,
              headers: o,
              body: r,
              bodyBytes: a
            }, r, a);
          }, t => e(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          let i = require("iconv-lite");
          this.initGotEnv(t);
          const {
            url: o,
            ...r
          } = t;
          this.got[s](o, r).then(t => {
            const {
                statusCode: s,
                statusCode: o,
                headers: r,
                rawBody: a
              } = t,
              n = i.decode(a, this.encoding);
            e(null, {
              status: s,
              statusCode: o,
              headers: r,
              rawBody: a,
              body: n
            }, n);
          }, t => {
            const {
              message: s,
              response: o
            } = t;
            e(s, o, o && i.decode(o.rawBody, this.encoding));
          });
          break;
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
      return t;
    }
    queryStr(t) {
      let e = "";
      for (const s in t) {
        let i = t[s];
        null != i && "" !== i && ("object" == typeof i && (i = JSON.stringify(i)), e += `${s}=${i}&`);
      }
      e = e.substring(0, e.length - 1);
      return e;
    }
    msg(e = t, s = "", i = "", o = {}) {
      const r = t => {
        const {
          $open: e,
          $copy: s,
          $media: i,
          $mediaMime: o
        } = t;
        switch (typeof t) {
          case void 0:
            return t;
          case "string":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              default:
                return {
                  url: t
                };
              case "Loon":
              case "Shadowrocket":
                return t;
              case "Quantumult X":
                return {
                  "open-url": t
                };
              case "Node.js":
                return;
            }
          case "object":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              case "Shadowrocket":
              default:
                {
                  const r = {};
                  let a = t.openUrl || t.url || t["open-url"] || e;
                  a && Object.assign(r, {
                    action: "open-url",
                    url: a
                  });
                  let n = t["update-pasteboard"] || t.updatePasteboard || s;
                  if (n && Object.assign(r, {
                    action: "clipboard",
                    text: n
                  }), i) {
                    let t, e, s;
                    if (i.startsWith("http")) {
                      t = i;
                    } else {
                      if (i.startsWith("data:")) {
                        const [t] = i.split(";"),
                          [, o] = i.split(",");
                        e = o;
                        s = t.replace("data:", "");
                      } else {
                        e = i;
                        s = (t => {
                          const e = {
                            JVBERi0: "application/pdf",
                            R0lGODdh: "image/gif",
                            R0lGODlh: "image/gif",
                            iVBORw0KGgo: "image/png",
                            "/9j/": "image/jpg"
                          };
                          for (var s in e) if (0 === t.indexOf(s)) {
                            return e[s];
                          }
                          return null;
                        })(i);
                      }
                    }
                    Object.assign(r, {
                      "media-url": t,
                      "media-base64": e,
                      "media-base64-mime": o ?? s
                    });
                  }
                  Object.assign(r, {
                    "auto-dismiss": t["auto-dismiss"],
                    sound: t.sound
                  });
                  return r;
                }
              case "Loon":
                {
                  const s = {};
                  let o = t.openUrl || t.url || t["open-url"] || e;
                  o && Object.assign(s, {
                    openUrl: o
                  });
                  let r = t.mediaUrl || t["media-url"];
                  i?.startsWith("http") && (r = i);
                  r && Object.assign(s, {
                    mediaUrl: r
                  });
                  console.log(JSON.stringify(s));
                  return s;
                }
              case "Quantumult X":
                {
                  const o = {};
                  let r = t["open-url"] || t.url || t.openUrl || e;
                  r && Object.assign(o, {
                    "open-url": r
                  });
                  let a = t["media-url"] || t.mediaUrl;
                  i?.startsWith("http") && (a = i);
                  a && Object.assign(o, {
                    "media-url": a
                  });
                  let n = t["update-pasteboard"] || t.updatePasteboard || s;
                  n && Object.assign(o, {
                    "update-pasteboard": n
                  });
                  console.log(JSON.stringify(o));
                  return o;
                }
              case "Node.js":
                return;
            }
          default:
            return;
        }
      };
      if (!this.isMute) {
        switch (this.getEnv()) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Shadowrocket":
          default:
            $notification.post(e, s, i, r(o));
            break;
          case "Quantumult X":
            $notify(e, s, i, r(o));
            break;
          case "Node.js":
            break;
        }
      }
      if (!this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e);
        s && t.push(s);
        i && t.push(i);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    debug(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.debug && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.debug}${t.map(t => t ?? String(t)).join(this.logSeparator)}`));
    }
    info(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.info && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.info}${t.map(t => t ?? String(t)).join(this.logSeparator)}`));
    }
    warn(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.warn && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.warn}${t.map(t => t ?? String(t)).join(this.logSeparator)}`));
    }
    error(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.error && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.error}${t.map(t => t ?? String(t)).join(this.logSeparator)}`));
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.map(t => t ?? String(t)).join(this.logSeparator));
    }
    logErr(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          this.log("", `❗️${this.name}, 错误!`, e, t);
          break;
        case "Node.js":
          this.log("", `❗️${this.name}, 错误!`, e, void 0 !== t.message ? t.message : t, t.stack);
          break;
      }
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = (new Date().getTime() - this.startTime) / 1000;
      switch (this.log("", `🔔${this.name}, 结束! 🕛 ${e} 秒`), this.log(), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          $done(t);
          break;
        case "Node.js":
          process.exit(1);
      }
    }
  }(t, e);
}