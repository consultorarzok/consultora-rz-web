(function () {
  'use strict';
  window.__rz = 1;
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NS = 'http://www.w3.org/2000/svg';
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function ease(t) { return 1 - Math.pow(1 - t, 4); }

  /* ------------------------------------------------------------------
     Ventana de entrada: el mundo de la consultora
     ------------------------------------------------------------------ */
  var ICONS = [
    ['Agentes de IA para WhatsApp', '<path d="M9 11a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H22l-8 8v-8h-1a4 4 0 0 1-4-4z"/><circle cx="17" cy="18" r="1.6" class="ac"/><circle cx="24" cy="18" r="1.6" class="ac"/><circle cx="31" cy="18" r="1.6" class="ac"/>'],
    ['Diseño de flujos digitales', '<circle cx="10" cy="36" r="4.5"/><circle cx="24" cy="11" r="4.5"/><circle cx="38" cy="36" r="4.5"/><path d="M12.5 32 21.5 15M26.5 15l9 17M15 36h18"/>'],
    ['Automatización de tareas', '<circle cx="24" cy="24" r="7"/><circle cx="24" cy="24" r="12.5"/><path d="M24 5v6.5M24 36.5V43M5 24h6.5M36.5 24H43M10.6 10.6l4.6 4.6M32.8 32.8l4.6 4.6M37.4 10.6l-4.6 4.6M15.2 32.8l-4.6 4.6"/>'],
    ['Integración de plataformas', '<rect x="5" y="16" width="20" height="16" rx="8"/><rect x="23" y="16" width="20" height="16" rx="8"/><path d="M19 24h10" class="ac"/>'],
    ['IA para clasificación y análisis', '<path d="M7 9h34L28 26v12l-8 4V26z"/><path d="M36 5v6M33 8h6" class="ac"/>'],
    ['Optimización de procesos', '<path d="M6 38V10M6 38h36"/><path d="M12 31l9-9 6 5 13-15"/><path d="M33 12h7v7" class="ac"/>'],
    ['Sistemas a medida', '<path d="M18 13 7 24l11 11M30 13l11 11-11 11"/><path d="M27 9 21 39" class="ac"/>'],
    ['Desarrollo de páginas web', '<rect x="5" y="9" width="38" height="30" rx="4"/><path d="M5 17h38"/><circle cx="10.5" cy="13" r="1.1" class="ac"/><circle cx="15" cy="13" r="1.1" class="ac"/><path d="M12 26h12M12 31h8M30 25h7v8h-7z"/>']
  ];
  var MINI = [
    ['WhatsApp', '<path class="fl" transform="scale(2)" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>'],
    ['Instagram', '<rect x="7" y="7" width="34" height="34" rx="10"/><circle cx="24" cy="24" r="8"/><circle cx="34.2" cy="13.8" r="2" class="fl"/>'],
    ['Facebook', '<path class="fl" d="M27.5 43V27.4h5.3l.8-6.1h-6.1v-3.9c0-1.8.5-3 3-3h3.2V8.9c-.6-.1-2.5-.3-4.7-.3-4.6 0-7.8 2.8-7.8 8v4.6H16v6.1h5.2V43z"/>'],
    ['Agente IA', '<rect x="9" y="15" width="30" height="23" rx="7"/><path d="M24 15V9"/><circle cx="24" cy="7.5" r="2.5" class="fl"/><circle cx="18" cy="26" r="2.8" class="fl"/><circle cx="30" cy="26" r="2.8" class="fl"/><path d="M19.5 32.5h9M5 23v7M43 23v7"/>']
  ];
  var R = 134;
  var world = null;
  var JUJUY = [-24.19, -65.30];
  var CIUDADES = [[40.4, -3.7], [40.7, -74], [19.4, -99.1], [-23.5, -46.6], [51.5, -0.1], [25.8, -80.2], [-33.4, -70.7], [-12, -77], [4.7, -74.1], [-34.6, -58.4], [-34.9, -56.2], [35.7, 139.7], [-33.9, 151.2], [-33.9, 18.4], [41.9, 12.5], [34, -118.2], [48.9, 2.4], [-15.8, -47.9]];
  var D2R = Math.PI / 180;

  function toVec(lat, lon) { var p = lat * D2R, l = lon * D2R; return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)]; }
  function arco(a, b) {
    var A = toVec(a[0], a[1]), B = toVec(b[0], b[1]);
    var dot = Math.max(-1, Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2])), om = Math.acos(dot), so = Math.sin(om) || 1e-6, pts = [];
    for (var k = 0; k <= 48; k++) {
      var t = k / 48, s1 = Math.sin((1 - t) * om) / so, s2 = Math.sin(t * om) / so;
      var v = [A[0] * s1 + B[0] * s2, A[1] * s1 + B[1] * s2, A[2] * s1 + B[2] * s2];
      pts.push({ lat: Math.asin(Math.max(-1, Math.min(1, v[2]))) / D2R, lon: Math.atan2(v[1], v[0]) / D2R, h: 1 + Math.sin(Math.PI * t) * (.08 + om * .16) });
    }
    return pts;
  }
  function proyectar(lat, lon, v0, h) {
    var p = lat * D2R, dl = (lon - v0.lon) * D2R, p0 = v0.lat * D2R;
    var cp = Math.cos(p), x = cp * Math.sin(dl), y = Math.cos(p0) * Math.sin(p) - Math.sin(p0) * cp * Math.cos(dl), z = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * cp * Math.cos(dl);
    h = h || 1;
    return { x: R * x * h, y: -R * y * h, z: z };
  }

  function buildWorld(box) {
    var VB = '-260 -285 520 540';
    var back = el('svg', { viewBox: VB, 'aria-hidden': 'true', focusable: 'false', class: 'w-l' }, box);
    var defs = el('defs', {}, back);
    defs.innerHTML = '<radialGradient id="wGlow" cx="50%" cy="50%" r="50%"><stop offset=".62" stop-color="#00b4d8" stop-opacity=".38"/><stop offset="1" stop-color="#00b4d8" stop-opacity="0"/></radialGradient>';
    var stars = el('g', { class: 'w-stars' }, back);
    for (var s = 0; s < 52; s++) {
      var an = rnd() * Math.PI * 2, d = 160 + rnd() * 140;
      var c = el('circle', { cx: (Math.cos(an) * d).toFixed(1), cy: (Math.sin(an) * d * .95).toFixed(1), r: (.7 + rnd() * 1.5).toFixed(1) }, stars);
      c.style.animationDelay = (-rnd() * 5).toFixed(2) + 's';
    }
    el('ellipse', { class: 'w-floor', cx: 0, cy: R + 32, rx: R * .8, ry: 11 }, back);
    el('circle', { r: R + 38, fill: 'url(#wGlow)' }, back);
    var orbitsBack = el('g', { class: 'w-orb' }, back);
    var itemsBack = el('g', {}, back);

    var cv = document.createElement('canvas'); cv.className = 'w-l'; box.appendChild(cv);

    var front = el('svg', { viewBox: VB, 'aria-hidden': 'true', focusable: 'false', class: 'w-l' }, box);
    var orbitsFront = el('g', { class: 'w-orb f' }, front);
    var itemsFront = el('g', {}, front);

    var ORB = [{ rx: 228, ry: 62, tilt: -16, speed: .00020 }, { rx: 216, ry: 72, tilt: 28, speed: -.00016 }, { rx: 186, ry: 196, tilt: 0, speed: .00011, sinLinea: true }];
    ORB.forEach(function (o) {
      if (o.sinLinea) return;
      el('ellipse', { rx: o.rx, ry: o.ry, transform: 'rotate(' + o.tilt + ')' }, orbitsBack);
      el('path', { d: 'M ' + o.rx + ' 0 A ' + o.rx + ' ' + o.ry + ' 0 0 1 ' + (-o.rx) + ' 0', transform: 'rotate(' + o.tilt + ')' }, orbitsFront);
    });
    var items = ICONS.map(function (ic, k) {
      var g = el('g', { class: 'w-item' }, itemsBack);
      el('circle', { r: 23, class: 'med' }, g);
      var inner = el('g', { transform: 'translate(-13.5 -13.5) scale(.5625)', class: 'ico' }, g);
      inner.innerHTML = ic[1];
      return { g: g, name: ic[0], ring: k % 2, phase: Math.floor(k / 2) * (Math.PI / 2) + (k % 2) * .8, front: false };
    });
    MINI.forEach(function (ic, k) {
      var g = el('g', { class: 'w-item w-mini' }, itemsBack);
      el('circle', { r: 15, class: 'med-mini' }, g);
      var inner = el('g', { transform: 'translate(-9.5 -9.5) scale(.396)', class: 'ico-mini' }, g);
      inner.innerHTML = ic[1];
      items.push({ g: g, name: ic[0], ring: 2, phase: k * (Math.PI / 2) + .45, front: false, mini: true });
    });

    var T = window.RZ_TIERRA || [], tierra = [];
    for (var q = 0; q < T.length; q += 3) tierra.push({ lat: T[q] / 10, lon: T[q + 1] / 10, t: T[q + 2] });
    var arcos = CIUDADES.map(function (c, k) { return { pts: arco(c, JUJUY), off: rnd(), vel: .00016 + rnd() * .00012, delay: k * 140 }; });

    var w = { cv: cv, ctx: cv.getContext('2d'), items: items, ORB: ORB, itemsBack: itemsBack, itemsFront: itemsFront, tierra: tierra, arcos: arcos, box: box, s: 1 };
    function size() {
      var bw = box.clientWidth, bh = box.clientHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(bw * dpr); cv.height = Math.round(bh * dpr);
      w.s = bw / 520 * dpr;
    }
    size(); window.addEventListener('resize', size);
    return w;
  }

  function drawGlobe(w, t, arrive) {
    var ctx = w.ctx, s = w.s;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, w.cv.width, w.cv.height);
    ctx.setTransform(s, 0, 0, s, 260 * s, 285 * s);
    // vista: gira desde el Pacífico y frena con Jujuy de frente
    var a = ease(Math.min(1, arrive));
    var v0 = { lon: JUJUY[1] + 250 * (1 - a) + (arrive >= 1 ? Math.sin(t * .00035) * 9 : 0), lat: 8 + (-26 - 8) * a + (arrive >= 1 ? Math.sin(t * .00027) * 3 : 0) };

    var g = ctx.createRadialGradient(-R * .38, -R * .45, R * .1, 0, 0, R * 1.05);
    g.addColorStop(0, '#2f86b8'); g.addColorStop(.45, '#16497c'); g.addColorStop(1, '#081630');
    ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();

    // grilla de paralelos y meridianos
    ctx.lineWidth = .7; ctx.strokeStyle = 'rgba(170,230,255,.12)';
    for (var lat = -60; lat <= 60; lat += 30) linea(function (k) { return [lat, -180 + k * 6]; }, 60);
    for (var lon = -180; lon < 180; lon += 30) linea(function (k) { return [-90 + k * 6, lon]; }, 30);
    function linea(f, n) {
      ctx.beginPath(); var pen = false;
      for (var k = 0; k <= n; k++) { var c = f(k), p = proyectar(c[0], c[1], v0); if (p.z > 0) { pen ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); pen = true; } else pen = false; }
      ctx.stroke();
    }
    // tierra en puntos; Argentina más clara
    for (var i = 0; i < w.tierra.length; i++) {
      var d = w.tierra[i], p = proyectar(d.lat, d.lon, v0);
      if (p.z <= 0) continue;
      var k = .35 + .65 * p.z;
      if (d.t) { ctx.fillStyle = 'rgba(110,236,255,' + (.55 + .45 * p.z * a + .2 * (1 - a)).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(p.x, p.y, 1.55, 0, 6.283); ctx.fill(); }
      else { ctx.fillStyle = 'rgba(205,240,255,' + (k * .8).toFixed(2) + ')'; ctx.fillRect(p.x - 1, p.y - 1, 2, 2); }
    }
    // sombra y borde
    var sh = ctx.createRadialGradient(R * .45, R * .5, R * .2, 0, 0, R * 1.08);
    sh.addColorStop(0, 'rgba(3,8,18,.62)'); sh.addColorStop(.6, 'rgba(3,8,18,.2)'); sh.addColorStop(1, 'rgba(3,8,18,0)');
    var hl = ctx.createRadialGradient(-R * .45, -R * .5, 0, -R * .2, -R * .2, R * 1.1);
    hl.addColorStop(0, 'rgba(150,240,255,.18)'); hl.addColorStop(1, 'rgba(150,240,255,0)');
    ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fillStyle = hl; ctx.fill(); ctx.fillStyle = sh; ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(140,235,255,.55)'; ctx.stroke();

    // rutas: de todo el mundo a Jujuy
    var vis = Math.max(0, Math.min(1, (arrive - .72) / .28));
    if (vis > 0) {
      w.arcos.forEach(function (ar) {
        var P = ar.pts.map(function (q) { return proyectar(q.lat, q.lon, v0, q.h); });
        var ok = P.map(function (p) { return p.z > 0 || (p.x * p.x + p.y * p.y) > R * R; });
        ctx.lineWidth = 1.1; ctx.strokeStyle = 'rgba(72,202,228,' + (.42 * vis).toFixed(2) + ')';
        ctx.beginPath(); var pen = false;
        P.forEach(function (p, k) { if (ok[k]) { pen ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); pen = true; } else pen = false; });
        ctx.stroke();
        // pulso de luz que viaja hacia Jujuy
        var f = ((t * ar.vel + ar.off) % 1), n = P.length - 1, i0 = Math.floor(f * n);
        for (var k2 = Math.max(0, i0 - 7); k2 <= i0; k2++) {
          if (!ok[k2]) continue;
          var al = (1 - (i0 - k2) / 8) * vis;
          ctx.fillStyle = 'rgba(230,252,255,' + al.toFixed(2) + ')';
          ctx.beginPath(); ctx.arc(P[k2].x, P[k2].y, 1.1 + 1.3 * (1 - (i0 - k2) / 8), 0, 6.283); ctx.fill();
        }
        var o = P[0]; if (ok[0]) { ctx.fillStyle = 'rgba(160,240,255,' + (.8 * vis).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(o.x, o.y, 2, 0, 6.283); ctx.fill(); }
      });
    }
    // Jujuy
    var J = proyectar(JUJUY[0], JUJUY[1], v0);
    if (J.z > 0) {
      var pl = (t % 2400) / 2400;
      [pl, (pl + .5) % 1].forEach(function (u) {
        ctx.strokeStyle = 'rgba(255,255,255,' + ((1 - u) * .85 * a).toFixed(2) + ')'; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(J.x, J.y, 4 + u * 22, 0, 6.283); ctx.stroke();
      });
      var gj = ctx.createRadialGradient(J.x, J.y, 0, J.x, J.y, 16);
      gj.addColorStop(0, 'rgba(160,248,255,' + (.95 * a).toFixed(2) + ')'); gj.addColorStop(1, 'rgba(0,180,216,0)');
      ctx.fillStyle = gj; ctx.beginPath(); ctx.arc(J.x, J.y, 16, 0, 6.283); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(J.x, J.y, 3.4, 0, 6.283); ctx.fill();
    }
  }

  function drawWorld(w, t, ramp, capEl) {
    drawGlobe(w, t, ramp / 2.6);
    var k = ease(Math.min(1, ramp));
    var best = null;
    w.items.forEach(function (it) {
      var o = w.ORB[it.ring], th = it.phase + o.speed * t;
      var lx = o.rx * k * Math.cos(th), ly = o.ry * k * Math.sin(th), s = Math.sin(th);
      var tr = o.tilt * Math.PI / 180;
      var x = lx * Math.cos(tr) - ly * Math.sin(tr), y = lx * Math.sin(tr) + ly * Math.cos(tr);
      var isFront = s > 0;
      if (isFront !== it.front) { it.front = isFront; (isFront ? w.itemsFront : w.itemsBack).appendChild(it.g); }
      var sc = (.78 + .3 * (s + 1) / 2) * (0.4 + .6 * k) * (it.mini ? .85 : 1);
      it.g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + sc.toFixed(3) + ')');
      it.g.setAttribute('opacity', ((isFront ? 1 : .55) * k).toFixed(2));
      if (!it.mini && (!best || s > best.s)) best = { s: s, it: it };
    });
    if (capEl && best && capEl.dataset.n !== best.it.name) {
      capEl.dataset.n = best.it.name; capEl.textContent = best.it.name;
      capEl.classList.remove('flip'); void capEl.offsetWidth; capEl.classList.add('flip');
    }
  }

  var enterDone = false, startHero = function () {};

  function openWorld() {
    var ov = $('#mundo'); if (!ov) return enter(true);
    var stage = $('#mundo-stage'), cap = $('#mundo-cap'), btn = $('#mundo-enter');
    world = buildWorld(stage);
    var inert = $$('header.top, main, footer');
    inert.forEach(function (e) { e.setAttribute('inert', ''); });
    var t0 = performance.now(), raf = 0, running = true;
    function frame(now) {
      if (!running) return;
      var t = now - t0;
      drawWorld(world, t, t / 1800, cap);
      raf = requestAnimationFrame(frame);
    }
    if (reduce) drawWorld(world, 6000, 3, cap); else raf = requestAnimationFrame(frame);
    setTimeout(function () { btn.focus({ preventScroll: true }); }, 600);
    function go() {
      if (enterDone) return; enterDone = true;
      ov.classList.add('salir');
      inert.forEach(function (e) { e.removeAttribute('inert'); });
      root.classList.remove('intro-open');
      window.scrollTo(0, 0);
      setTimeout(function () { running = false; cancelAnimationFrame(raf); ov.hidden = true; }, 1100);
      startHero();
    }
    btn.addEventListener('click', go);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !enterDone) go(); });
  }
  function enter() { if (!enterDone) { enterDone = true; startHero(); } }

  /* ------------------------------------------------------------------
     Hoja de cuaderno: las tareas se tachan una por una
     ------------------------------------------------------------------ */
  var tareas = $$('#tareas .tarea');
  function terminar() { tareas.forEach(function (t) { t.classList.add('hecha'); }); }
  startHero = function () {
    if (reduce || !tareas.length) return terminar();
    var go = function () { tareas.forEach(function (t, i) { setTimeout(function () { t.classList.add('hecha'); }, 1100 + i * 850); }); };
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(go);
    setTimeout(terminar, 8000);
  };

  /* ------------------------------------------------------------------
     Aparición al hacer scroll, contadores, chat y mapa
     ------------------------------------------------------------------ */
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      var t = e.target;
      t.classList.add('in');
      if (t.matches('.cifra b')) contar(t);
      if (t.matches('.agente')) chat(t);
    });
  }, { threshold: .25, rootMargin: '0px 0px -8% 0px' }) : null;

  function contar(b) {
    var n = parseFloat(b.dataset.n), suf = b.dataset.suf || '', dur = 1900, t0 = performance.now();
    b.classList.add('on');
    function step(now) {
      var p = Math.min(1, (now - t0) / dur);
      b.textContent = Math.round(n * ease(p)) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function chat(box) {
    var ms = $$('.msg', box);
    ms.forEach(function (m, i) { setTimeout(function () { m.classList.add('show'); }, 500 + i * 1100); });
  }

  if (io && !reduce) {
    $$('.cifra b').forEach(function (b) {
      b.dataset.n = parseFloat(b.textContent);
      b.dataset.suf = b.textContent.replace(/[0-9.,]/g, '');
      b.textContent = '0' + b.dataset.suf;
      io.observe(b);
    });
    $$('.agente').forEach(function (a) { $$('.msg', a).forEach(function (m) { m.classList.add('pend'); }); io.observe(a); });
    $$('[data-rv]').forEach(function (e) { e.classList.add('rv'); e.style.setProperty('--s', [].indexOf.call(e.parentNode.children, e) % 4); io.observe(e); });
    $$('.mapa').forEach(function (m) { io.observe(m); });
  } else {
    $$('.cifra b,.agente,[data-rv],.mapa').forEach(function (e) { e.classList.add('in'); });
  }

  /* ------------------------------------------------------------------
     Formulario sin servidor: arma el mensaje y abre WhatsApp
     ------------------------------------------------------------------ */
  var f = $('#form'), nota = $('#form-nota');
  if (f) f.addEventListener('submit', function (e) {
    e.preventDefault();
    var n = f.nombre.value.trim(), m = f.msg.value.trim(), t = f.tel.value.trim();
    if (!n || !m) { nota.textContent = 'Completá tu nombre y contanos en qué podemos ayudarte.'; (n ? f.msg : f.nombre).focus(); return; }
    var txt = 'Hola, soy ' + n + '. ' + m + (t ? ' Mi teléfono: ' + t + '.' : '');
    window.open('https://wa.me/543885070493?text=' + encodeURIComponent(txt), '_blank', 'noopener');
    nota.textContent = 'Listo, se abrió WhatsApp con tu mensaje.';
  });

  /* ------------------------------------------------------------------
     Modo claro / oscuro
     ------------------------------------------------------------------ */
  var tb = $('#tema');
  function oscuro() { var t = root.getAttribute('data-theme'); return t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches; }
  function rotular() { if (tb) tb.setAttribute('aria-label', oscuro() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'); }
  if (tb) {
    rotular();
    tb.addEventListener('click', function () {
      var t = oscuro() ? 'light' : 'dark';
      root.setAttribute('data-theme', t);
      try { localStorage.setItem('rz-tema', t); } catch (e) {}
      rotular();
    });
  }

  /* ------------------------------------------------------------------ */
  if (root.classList.contains('intro-open')) openWorld(); else enter();
})();
