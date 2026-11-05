var COURSES = [
  { n: "Ingliz tili", c: "Tillar", l: "A1–B2", d: "6 oy · haftada 3 kun", p: 350000, t: "Gaplashish va grammatikani nol darajadan oʻrganing." },
  { n: "IELTS tayyorlov", c: "Tillar", l: "B2–C1", d: "3 oy · haftada 4 kun", p: 450000, t: "Barcha 4 boʻlim, har hafta mock test." },
  { n: "Rus tili", c: "Tillar", l: "A1–B1", d: "5 oy · haftada 3 kun", p: 300000, t: "Kundalik muloqot va ish uchun rus tili." },
  { n: "Koreys tili", c: "Tillar", l: "TOPIK 1–2", d: "6 oy · haftada 3 kun", p: 400000, t: "Alifbodan TOPIK imtihoniga tayyorlov." },
  { n: "Matematika", c: "Fanlar", l: "Abituriyent", d: "9 oy · haftada 3 kun", p: 400000, t: "Test va yozma ishlarga puxta tayyorlov." },
  { n: "Python dasturlash", c: "IT", l: "Boshlangʻich", d: "4 oy · haftada 3 kun", p: 600000, t: "Dastur yozishni 0 dan boshlab, amaliy loyihalar bilan." },
  { n: "Web dasturlash", c: "IT", l: "Boshlangʻich", d: "5 oy · haftada 3 kun", p: 700000, t: "HTML, CSS, JavaScript: oʻz saytingizni yarating." },
  { n: "Grafik dizayn", c: "IT", l: "Boshlangʻich", d: "4 oy · haftada 2 kun", p: 550000, t: "Figma va Photoshop bilan professional dizayn." }
];
var TEACHERS = [
  { n: "Dilnoza Karimova", s: "Ingliz tili, IELTS", e: "9 yil tajriba · IELTS 8.0", c: "#ffc93c" },
  { n: "Jasur Rahimov", s: "Python, Web dasturlash", e: "7 yil tajriba · senior dasturchi", c: "#7ee0b8" },
  { n: "Malika Tursunova", s: "Matematika", e: "12 yil tajriba · olimpiada ustozi", c: "#9ec5ff" },
  { n: "Sardor Aliyev", s: "Grafik dizayn", e: "6 yil tajriba · UI/UX dizayner", c: "#ffb4a6" }
];
var cat = "Barchasi";
var $ = function (i) { return document.getElementById(i); };
var fm = function (n) { return n.toLocaleString("ru-RU") + " soʻm"; };

function chips() {
  var cs = ["Barchasi"].concat(COURSES.map(function (x) { return x.c; }).filter(function (v, i, a) { return a.indexOf(v) === i; }));
  $("chips").innerHTML = cs.map(function (c) {
    return '<button class="chip" data-c="' + c + '" aria-pressed="' + (c === cat) + '">' + c + '</button>';
  }).join("");
}

function courses() {
  $("grid").innerHTML = COURSES.filter(function (x) { return cat === "Barchasi" || x.c === cat; }).map(function (x) {
    return '<article class="card"><h3>' + x.n + '</h3><p>' + x.t + '</p>' +
      '<div class="meta"><span>' + x.l + '</span><span>' + x.d + '</span></div>' +
      '<div class="row"><span class="price">' + fm(x.p) + ' <small>/ oy</small></span>' +
      '<button class="go" data-go="' + x.n + '">Yozilish</button></div></article>';
  }).join("");
}

function teachers() {
  $("tgrid").innerHTML = TEACHERS.map(function (t) {
    var ini = t.n.split(" ").map(function (w) { return w[0]; }).join("");
    return '<article class="card"><div class="av" style="background:' + t.c + '">' + ini + '</div>' +
      '<h3>' + t.n + '</h3><p>' + t.s + '</p><div class="meta"><span>' + t.e + '</span></div></article>';
  }).join("");
}

function select() {
  $("cs").innerHTML = COURSES.map(function (x) { return "<option>" + x.n + "</option>"; }).join("");
}

document.addEventListener("click", function (e) {
  var d = e.target.dataset;
  if (d.c) { cat = d.c; chips(); courses(); }
  if (d.go) {
    $("cs").value = d.go;
    $("join").scrollIntoView();
    $("nm").focus({ preventScroll: true });
  }
});

$("f").addEventListener("submit", function (e) {
  e.preventDefault();
  var nm = $("nm"), ph = $("ph"), m = $("fm");
  var num = ph.value.replace(/[\s\-()]/g, "");
  var okN = nm.value.trim().length >= 2;
  var okP = /^\+?998\d{9}$/.test(num);
  nm.classList.toggle("bad", !okN);
  ph.classList.toggle("bad", !okP);
  if (!okN) { m.textContent = "Ismingizni yozing."; nm.focus(); return; }
  if (!okP) { m.textContent = "Telefonni +998 XX XXX XX XX koʻrinishida yozing."; ph.focus(); return; }
  m.textContent = "Rahmat, " + nm.value.trim() + "! Tez orada qoʻngʻiroq qilamiz.";
  $("f").reset();
});

function counters() {
  var els = document.querySelectorAll("[data-n]");
  var run = function (el) {
    var to = +el.dataset.n, t0 = null;
    var step = function (t) {
      if (!t0) t0 = t;
      var k = Math.min((t - t0) / 1200, 1);
      el.textContent = Math.round(to * k).toLocaleString("ru-RU");
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach(function (el) { el.textContent = (+el.dataset.n).toLocaleString("ru-RU"); });
    return;
  }
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (x) { if (x.isIntersecting) { run(x.target); io.unobserve(x.target); } });
  });
  els.forEach(function (el) { io.observe(el); });
}

chips(); courses(); teachers(); select(); counters();
