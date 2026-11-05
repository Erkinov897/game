var PH = [
  { id: 1,  n: "iPhone 16 Pro",       b: "Apple",   p: 15900000, o: 0,        d: "6.3″ · 48 MP · 3582 mAh", c: "#8b8d93", tag: "Yangi" },
  { id: 2,  n: "iPhone 16",           b: "Apple",   p: 12900000, o: 0,        d: "6.1″ · 48 MP · 3561 mAh", c: "#f0a6c8", tag: "" },
  { id: 3,  n: "iPhone 15",           b: "Apple",   p: 10500000, o: 11900000, d: "6.1″ · 48 MP · 3349 mAh", c: "#9fc5e8", tag: "Chegirma" },
  { id: 4,  n: "Galaxy S25 Ultra",    b: "Samsung", p: 16500000, o: 0,        d: "6.9″ · 200 MP · 5000 mAh", c: "#4a5568", tag: "Yangi" },
  { id: 5,  n: "Galaxy S25",          b: "Samsung", p: 11900000, o: 0,        d: "6.2″ · 50 MP · 4000 mAh", c: "#5eead4", tag: "" },
  { id: 6,  n: "Galaxy A56",          b: "Samsung", p: 5200000,  o: 5700000,  d: "6.7″ · 50 MP · 5000 mAh", c: "#a78bfa", tag: "Chegirma" },
  { id: 7,  n: "Xiaomi 15",           b: "Xiaomi",  p: 8900000,  o: 0,        d: "6.36″ · 50 MP · 5240 mAh", c: "#e5e7eb", tag: "" },
  { id: 8,  n: "Redmi Note 14 Pro",   b: "Xiaomi",  p: 3600000,  o: 0,        d: "6.67″ · 200 MP · 5500 mAh", c: "#1f2937", tag: "Hit" },
  { id: 9,  n: "Poco X7 Pro",         b: "Xiaomi",  p: 4200000,  o: 4500000,  d: "6.67″ · 50 MP · 6000 mAh", c: "#facc15", tag: "Chegirma" },
  { id: 10, n: "Honor Magic 7 Pro",   b: "Honor",   p: 10500000, o: 0,        d: "6.8″ · 50 MP · 5850 mAh", c: "#0f766e", tag: "" },
  { id: 11, n: "Pixel 9 Pro",         b: "Google",  p: 12500000, o: 0,        d: "6.3″ · 50 MP · 4700 mAh", c: "#d6cfc4", tag: "" },
  { id: 12, n: "Realme GT 7",         b: "Realme",  p: 6900000,  o: 0,        d: "6.78″ · 50 MP · 7000 mAh", c: "#fb7185", tag: "Hit" }
];
var STG = [128, 256, 512], MUL = [1, 1.12, 1.3];
var COL = [["#6d4cff", "Binafsha"], ["#35d6b9", "Zumrad"], ["#f472b6", "Pushti"], ["#1f2937", "Qora"]];
var brand = "Barchasi", sel = {}, cart = {};
var $ = function (i) { return document.getElementById(i); };
var fm = function (n) { return n.toLocaleString("ru-RU") + " soʻm"; };
var price = function (x, s) { return Math.round(x.p * MUL[s] / 10000) * 10000; };

function phone(c, w) {
  return '<svg viewBox="0 0 100 130" ' + (w ? 'style="width:' + w + '"' : '') + ' role="img" aria-label="Telefon">' +
    '<rect x="20" y="4" width="60" height="122" rx="12" fill="' + c + '" stroke="rgba(0,0,0,.35)" stroke-width="1.5"/>' +
    '<rect x="27" y="11" width="28" height="30" rx="8" fill="rgba(0,0,0,.28)"/>' +
    '<circle cx="36" cy="20" r="5" fill="#0d0d12" stroke="#9aa0aa" stroke-width="1.2"/>' +
    '<circle cx="36" cy="32" r="5" fill="#0d0d12" stroke="#9aa0aa" stroke-width="1.2"/>' +
    '<circle cx="47" cy="26" r="5" fill="#0d0d12" stroke="#9aa0aa" stroke-width="1.2"/>' +
    '<circle cx="62" cy="15" r="2.2" fill="#fff3c4"/>' +
    '<rect x="78" y="34" width="2" height="12" rx="1" fill="rgba(0,0,0,.35)"/>' +
    '</svg>';
}

function heroPhone(i) {
  $("hero").innerHTML = phone(COL[i][0]);
  $("cname").textContent = "Rang: " + COL[i][1];
  var bs = $("sw").children;
  for (var k = 0; k < bs.length; k++) bs[k].setAttribute("aria-pressed", k === i);
}
$("sw").innerHTML = COL.map(function (c, i) {
  return '<button style="background:' + c[0] + '" data-h="' + i + '" aria-label="' + c[1] + '" aria-pressed="false"></button>';
}).join("");
heroPhone(0);

function chips() {
  var bs = ["Barchasi"].concat(PH.map(function (x) { return x.b; }).filter(function (v, i, a) { return a.indexOf(v) === i; }));
  $("chips").innerHTML = bs.map(function (b) {
    return '<button class="chip" data-b="' + b + '" aria-pressed="' + (b === brand) + '">' + b + '</button>';
  }).join("");
}

function grid() {
  var q = $("q").value.toLowerCase(), s = $("s").value;
  var r = PH.filter(function (x) {
    return (brand === "Barchasi" || x.b === brand) && (!q || x.n.toLowerCase().indexOf(q) > -1);
  });
  r.sort(function (a, b) { return s === "a" ? a.p - b.p : b.p - a.p; });
  $("grid").innerHTML = r.length ? r.map(function (x) {
    var si = sel[x.id] || 0;
    var st = STG.map(function (g, i) {
      return '<button data-s="' + x.id + ':' + i + '" aria-pressed="' + (i === si) + '">' + g + ' GB</button>';
    }).join("");
    var old = x.o && si === 0 ? '<span class="old">' + fm(x.o) + '</span>' : '';
    return '<article class="card"><div class="pic">' + (x.tag ? '<span class="badge">' + x.tag + '</span>' : '') + phone(x.c) + '</div>' +
      '<div class="info"><h3>' + x.n + '</h3><small>' + x.d + '</small><div class="st">' + st + '</div>' +
      '<div class="row"><div>' + old + '<span class="price">' + fm(price(x, si)) + '</span></div>' +
      '<button class="add" data-a="' + x.id + '">Savatga</button></div></div></article>';
  }).join("") : '<div class="empty">Hech narsa topilmadi. Boshqa nom yoki markani tanlang.</div>';
}

function render() {
  var t = 0, k = 0, h = "";
  Object.keys(cart).forEach(function (key) {
    var p = key.split(":"), x = PH.filter(function (z) { return z.id == p[0]; })[0], q = cart[key];
    var pr = price(x, +p[1]) * q; t += pr; k += q;
    h += '<div class="it"><div><strong>' + x.n + '</strong><br><small>' + STG[p[1]] + ' GB · ' + fm(pr) + '</small></div>' +
      '<div class="qty"><button data-m="' + key + '" aria-label="Kamaytirish">−</button> ' + q +
      ' <button data-p="' + key + '" aria-label="Koʻpaytirish">+</button></div></div>';
  });
  $("items").innerHTML = h || '<p>Savat boʻsh. Telefon qoʻshing.</p>';
  $("sum").textContent = fm(t);
  $("cnt").textContent = k;
}

function toast(t) {
  var e = $("toast"); e.textContent = t; e.classList.add("on");
  clearTimeout(toast.id); toast.id = setTimeout(function () { e.classList.remove("on"); }, 1800);
}
function panel(on) { $("cart").classList.toggle("on", on); $("ov").classList.toggle("on", on); }

document.addEventListener("click", function (e) {
  var d = e.target.dataset;
  if (d.h) heroPhone(+d.h);
  if (d.b) { brand = d.b; chips(); grid(); }
  if (d.s) { var p = d.s.split(":"); sel[p[0]] = +p[1]; grid(); }
  if (d.a) {
    var k = d.a + ":" + (sel[d.a] || 0);
    cart[k] = (cart[k] || 0) + 1; $("msg").textContent = ""; render(); toast("Savatga qoʻshildi");
  }
  if (d.p) { cart[d.p]++; render(); }
  if (d.m) { cart[d.m]--; if (!cart[d.m]) delete cart[d.m]; render(); }
});
$("q").addEventListener("input", grid);
$("s").addEventListener("change", grid);
$("open").onclick = function () { panel(true); };
$("close").onclick = $("ov").onclick = function () { panel(false); };
document.addEventListener("keydown", function (e) { if (e.key === "Escape") panel(false); });
$("buy").onclick = function () {
  if (!Object.keys(cart).length) { $("msg").textContent = "Avval telefon qoʻshing."; return; }
  cart = {}; render(); $("msg").textContent = "Buyurtma qabul qilindi. Tez orada qoʻngʻiroq qilamiz.";
};
chips(); grid(); render();
