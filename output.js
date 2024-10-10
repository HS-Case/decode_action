//Thu Oct 10 2024 01:14:19 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
let C = G();
const D = {
  "url": "https://soonlink.xn--wqr30o34q.xn--io0a7i/api/v1/custom/unauthorized?uuid=" + C,
  "headers": {
    "user-agent": "Dart/3.5 (dart:io)",
    "content-type": "application/json",
    "accept": "*/*",
    "accept-encoding": "gzip",
    "host": "soonlink.xn--wqr30o34q.xn--io0a7i"
  }
};
E(D, (a, b) => {
  if (a) console.log("初次请求失败: ", a), $done();else try {
    let g = JSON.parse(b),
      h = g.data.auth_data;
    const i = {
      "url": "https://soonlink.xn--wqr30o34q.xn--io0a7i/api/v1/user/getSubscribe",
      "headers": {
        "user-agent": "Dart/3.5 (dart:io)",
        "accept": "*/*",
        "accept-encoding": "gzip",
        "host": "soonlink.xn--wqr30o34q.xn--io0a7i",
        "authorization": h,
        "content-type": "application/json"
      }
    };
    E(i, (j, k) => {
      if (j) console.log("二次请求失败: ", j);else try {
        let m = JSON.parse(k);
        if (m && m.data) {
          let n = m.data.uuid,
            o = m.data.subscribe_url;
          console.log("获取到的 uuid: " + n);
          console.log("获取到的 subscribe_url: " + o);
          F(n, o);
        } else console.log("响应数据格式不正确");
      } catch (r) {
        console.log("解析二次响应数据时出错: ", r);
      }
      $done();
    });
  } catch (j) {
    console.log("解析响应数据时出错: ", j);
    $done();
  }
});
function E(a, b) {
  if (typeof $task !== "undefined" && $task.fetch) $task.fetch(a).then(f => {
    b(null, f.body);
  }).catch(f => {
    b(f);
  });else typeof $httpClient !== "undefined" && $httpClient.get ? $httpClient.get(a, (g, h, i) => {
    g ? b(g) : b(null, i);
  }) : b("不支持的请求方式");
}
function F(a, b) {
  const f = "UUID: " + a + "\n订阅链接: " + b;
  if (typeof $notify !== "undefined") $notify("订阅信息", "", f);else {
    if (typeof $notification !== "undefined") $notification.post("订阅信息", "", f);else {
      console.log("通知功能未启用");
    }
  }
}
function G() {
  let h = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    j = "";
  for (let k = 0; k < 36; k++) {
    if (k === 8 || k === 13 || k === 18 || k === 23) {
      j += "-";
    } else j += h[Math.floor(Math.random() * h.length)];
  }
  return j;
}