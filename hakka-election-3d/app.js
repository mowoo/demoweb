/* 客家選情 3D 地圖 — 第二階段技術原型
 * Three.js r186 + camera-controls（運鏡／鎖定）+ GSAP（時間軸／升降）
 * 場景階層：地圖 → 縣市群組（整縣升降）→ 鄉鎮 Mesh（縣內起伏，界線為子物件跟著動）
 */
import * as THREE from 'three';
import CameraControls from 'camera-controls';

CameraControls.install({ THREE });
const gsap = window.gsap;

// ---------- 參數 ----------
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const dur = s => (REDUCED ? Math.min(s, 0.15) : s);
const ISLAND_H = 4;          // 島嶼厚度
const COUNTY_RISE = 6;       // 選取縣市整體升高
const TOWN_RISE = [0.4, 5.5];// 縣內鄉鎮依數據再升高（最小, 最大）
const SKIRT = 14;            // 側牆向下延伸量（≥ COUNTY_RISE + TOWN_RISE 最大值 + 鄉鎮加選升高）
const FOV = 38;
// 招牌視角（azimuth 0 = 從南往北看；polar 為與垂直軸夾角）。未列者用預設
const PRESETS = {
  '花蓮縣': { az: 0.75, polar: 0.92 },   // 從東南海上看向中央山脈
  '臺東縣': { az: 0.6, polar: 0.92 },
  '宜蘭縣': { az: 0.5, polar: 0.88 },
  '金門縣': { az: -0.35, polar: 0.8 },
  '連江縣': { az: -0.2, polar: 0.8 },
  '澎湖縣': { az: -0.4, polar: 0.82 },
};
const DEFAULT_POSE = { az: 0.12, polar: 0.82 };

const THEME = {
  bg: 0xf6f1e7, sea: 0xece3d0, island: 0xfffdf8,
  townEdge: 0xc7b394, countyLine: 0x8a6f4d,
};
// 色階（依客戶要求避開藍綠，取氣象署累積雨量圖例黃色以上區段）：淺黃 → 黃橙 → 紅 → 深紅 → 深紫
const STOPS = ['#f3e58a', '#f3a72a', '#f05a45', '#9a231f', '#8b2fa6'].map(c => new THREE.Color(c));
// 各指標的上色上限（鄉鎮／縣市分開）：比例用 %；人口用全國最高值附近
const COLOR_MAX = { pct: { town: 75, county: 70 }, hakka: { town: 240000, county: 920000 } };
function ramp(t) {
  t = Math.min(1, Math.max(0, t)) * (STOPS.length - 1);
  const i = Math.min(STOPS.length - 2, Math.floor(t));
  return new THREE.Color().lerpColors(STOPS[i], STOPS[i + 1], t - i);
}
const C_ISLAND = new THREE.Color(THEME.island);
const C_DIM = new THREE.Color(0xeee6d4);
const C_HOVER = new THREE.Color(0xffffff);   // hover／選取：往白色提亮（避免與色階中的黃橙混淆）

// ---------- 渲染器 / 場景 ----------
const canvas = document.getElementById('scene');
let lastGood = [1280, 720];
const isSmall = () => (innerWidth || lastGood[0]) <= 760;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall() ? 1.5 : 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap; // r182 起即為柔和陰影

const scene = new THREE.Scene();
scene.background = new THREE.Color(THEME.bg);
scene.fog = new THREE.Fog(THEME.bg, 520, 1100);

const camera = new THREE.PerspectiveCamera(FOV, 1, 0.5, 3000);
const controls = new CameraControls(camera, canvas);
controls.smoothTime = 0.3;
controls.draggingSmoothTime = 0.12;
controls.maxPolarAngle = Math.PI * 0.46;
controls.minDistance = 25;
controls.maxDistance = 900;
controls.dollyToCursor = true;
// 邊界約束：注視點不能離開地圖範圍（本島＋離島方框，外加一圈緩衝），避免讀者滑到一片空白
const MAP_BOUNDS = new THREE.Box3(new THREE.Vector3(-140, 0, -150), new THREE.Vector3(100, 60, 150));
controls.setBoundary(MAP_BOUNDS);
controls.boundaryFriction = 0.25;
// 觸控手勢對標 Google Maps 3D：單指拖曳＝平移、雙指＝開合縮放＋拖曳旋轉（俯仰／方位）
function setTouchScheme() {
  controls.touches.one = CameraControls.ACTION.TOUCH_TRUCK;
  controls.touches.two = CameraControls.ACTION.TOUCH_DOLLY_ROTATE;
  controls.touches.three = CameraControls.ACTION.TOUCH_DOLLY_ROTATE;
}
setTouchScheme();

scene.add(new THREE.HemisphereLight(0xffffff, 0xd9ccb0, 1.9));
const sun = new THREE.DirectionalLight(0xfff6e8, 2.2);
sun.position.set(80, 160, 70);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -180, right: 180, top: 180, bottom: -180, far: 600 });
sun.shadow.bias = -0.0004;
scene.add(sun);

const sea = new THREE.Mesh(new THREE.PlaneGeometry(4000, 4000), new THREE.MeshStandardMaterial({ color: THEME.sea, roughness: 1 }));
sea.rotation.x = -Math.PI / 2;
sea.position.y = -0.05;
sea.receiveShadow = true;
scene.add(sea);

// ---------- 狀態（需在任何呼叫 paintCounty 之前宣告，避免 TDZ）----------
let focused = null, selTown = null, hoverTown = null, hoverCounty = null;
let overviewDist = Infinity;   // 總覽時的鏡頭距離：滾輪往下縮到這裡之後，改為捲動頁面
let metric = 'hakka';   // 預設以「客家人口」優先（客戶要求）

// ---------- 資料 ----------
const norm = s => (s || '').replace(/臺/g, '台');
const show = s => s.replace(/台/g, '臺');                         // 顯示一律用「臺」
const COUNTY_LEVEL = new Set(Object.keys(HAKKA_COUNTY_LEVEL)); // 澎湖/金門/連江以縣為單位
const TOWNS = {};    // key -> { key, county, town, total, hakka, pct, meshes[], pos }
const COUNTIES = {}; // 縣名(台) -> { name, group, towns[], outline, total, hakka, pct, center }
Object.entries(HAKKA_DATA).forEach(([key, v]) => {
  const [county, town] = key.split('|');
  TOWNS[key] = { key, county, town, ...v, meshes: [] };
});
Object.entries(HAKKA_COUNTY_LEVEL).forEach(([county, v]) => {
  TOWNS[county] = { key: county, county, town: null, ...v, meshes: [] };
});

const topo = await fetch('data/towns.topo.json').then(r => r.json());
const townsGeo = topojson.feature(topo, topo.objects.towns);
const countiesGeo = topojson.feature(topo, topo.objects.counties);
const projection = d3.geoMercator().fitSize([220, 270], townsGeo);
// 離島方框：澎湖／金門／連江（馬祖）不照實際位置，各放進一個立體方框，沿本島西側由北到南排列
const ISLAND_BOX = { side: 40, x: -98, z: [-66, -18, 30], names: ['連江縣', '金門縣', '澎湖縣'] };
const ISLANDS = new Set(ISLAND_BOX.names);
const geoPath = d3.geoPath(projection);
const [cx0, cy0] = projection([120.95, 23.75]);  // 視覺中心固定在本島
const P = c => { const p = projection(c); return [p[0] - cx0, p[1] - cy0]; };

const mapGroup = new THREE.Group();
scene.add(mapGroup);
const edgeMat = new THREE.LineBasicMaterial({ color: THEME.townEdge, transparent: true, opacity: 0.6 });

function getCounty(name) {
  if (!COUNTIES[name]) {
    const group = new THREE.Group();
    group.userData.county = name;
    mapGroup.add(group);
    COUNTIES[name] = { name, group, towns: [], total: 0, hakka: 0, pct: 0, center: [0, 0], mix: { focus: 0, dim: 0, hover: 0 } };
  }
  return COUNTIES[name];
}
const toShapes = geom => {
  const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
  const shapes = [];
  polys.forEach(rings => {
    const pts = r => r.map(c => { const [x, z] = P(c); return new THREE.Vector2(x, -z); });
    const outer = pts(rings[0] || []);
    if (outer.length < 3) return;
    const s = new THREE.Shape(outer);
    rings.slice(1).forEach(h => { const hp = pts(h); if (hp.length >= 3) s.holes.push(new THREE.Path(hp)); });
    shapes.push(s);
  });
  return shapes;
};

townsGeo.features.forEach(f => {
  const county = norm(f.properties.COUNTYNAME);
  const key = COUNTY_LEVEL.has(county) ? county : county + '|' + norm(f.properties.TOWNNAME);
  const unit = TOWNS[key];
  if (!unit) return;
  const shapes = toShapes(f.geometry);
  if (!shapes.length) return;
  // 擠出深度多加 SKIRT，再往下平移：頂面仍在 ISLAND_H，側牆延伸到海面下；縣市升起時裙邊補住與鄰縣之間的縫
  const geom = new THREE.ExtrudeGeometry(shapes, { depth: ISLAND_H + SKIRT, bevelEnabled: false });
  geom.translate(0, 0, -SKIRT);
  const mesh = new THREE.Mesh(geom, new THREE.MeshStandardMaterial({ color: THEME.island, roughness: 0.8, metalness: 0.02 }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.castShadow = mesh.receiveShadow = true;
  mesh.userData.key = key;
  { const cc = geoPath.centroid(f); mesh.userData.ctr = [cc[0] - cx0, cc[1] - cy0]; }
  // 頂面輪廓線（不畫側牆轉角），為 Mesh 子物件 → 跟著鄉鎮升降
  shapes.forEach(sh => [sh, ...sh.holes].forEach(path => {
    const pts = path.getPoints().map(p => new THREE.Vector3(p.x, p.y, ISLAND_H + 0.03));
    mesh.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), edgeMat));
  }));
  unit.meshes.push(mesh);
  if (!unit.pos) { const c = geoPath.centroid(f); unit.pos = [c[0] - cx0, c[1] - cy0]; }
  const c = getCounty(county);
  c.group.add(mesh);
  if (!c.towns.includes(unit)) c.towns.push(unit);
});

const _fb = new THREE.Vector3();
// 縣界亮線（縣市群組的子物件）＋縣中心
countiesGeo.features.forEach(f => {
  const name = norm(f.properties.COUNTYNAME);
  const c = COUNTIES[name];
  if (!c) return;
  const mat = new THREE.LineBasicMaterial({ color: THEME.countyLine, transparent: true, opacity: 0.85 });
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  c.outline = [];
  polys.forEach(rings => rings.forEach(ring => {
    const pts = ring.map(p => { const [x, z] = P(p); return new THREE.Vector3(x, ISLAND_H + 0.06, z); });
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
    c.group.add(line);
    c.outline.push(line);
  }));
  c.outlineMat = mat;
  // 標籤位置用最大塊多邊形的質心（避免離島把中心拉偏）
  let best = null, area = -1;
  polys.forEach(rings => {
    const g = { type: 'Polygon', coordinates: rings };
    const a = geoPath.area(g);
    if (a > area) { area = a; best = g; }
  });
  const ct = geoPath.centroid(best);
  c.center = [ct[0] - cx0, ct[1] - cy0];
  // 構圖範圍：只納入主島周邊的多邊形（排除烏坵、東沙這類遠離本體的離島）
  c.frameBox = new THREE.Box3();
  polys.forEach(rings => {
    const pc = geoPath.centroid({ type: 'Polygon', coordinates: rings });
    if (Math.hypot(pc[0] - ct[0], pc[1] - ct[1]) > 55) return;
    rings[0].forEach(p => { const [x, z] = P(p); c.frameBox.expandByPoint(_fb.set(x, 0, z)); });
  });
  c.frameBox.max.y = ISLAND_H;
});

// ---------- 上色（overview 底色 ⇄ 聚焦色階 ⇄ 淡化 ⇄ hover）----------
const _c = new THREE.Color();
function paintCounty(c) {
  const { focus, dim, hover } = c.mix;
  c.towns.forEach(t => t.meshes.forEach(m => {
    _c.copy(m.userData.cBase).lerp(m.userData.cFocus, focus).lerp(C_DIM, dim * 0.85);
    // 被點選的鄉鎮只升起、不變色（標籤仍以紅底標示）；滑過時才輕微提亮
    if (t.key === hoverTown && t.key !== selTown) _c.lerp(C_HOVER, 0.4);
    else if (hover && t.key !== selTown) _c.lerp(C_HOVER, hover * 0.4);
    m.material.color.copy(_c);
  }));
  if (c.outlineMat) c.outlineMat.opacity = 0.85 * (1 - focus) * (1 - dim * 0.6);
}

// 縣市彙總
Object.values(COUNTIES).forEach(c => {
  c.total = c.towns.reduce((s, t) => s + t.total, 0);
  c.hakka = c.towns.reduce((s, t) => s + t.hakka, 0);
  c.pct = c.total ? (c.hakka / c.total) * 100 : 0;
  c.box = new THREE.Box3().setFromObject(c.group);
  c.area = (c.box.max.x - c.box.min.x) * (c.box.max.z - c.box.min.z);
});
// ---------- 離島方框 ----------
// group 的子物件座標都是投影後的世界座標，所以用 group 的 scale/position 把整縣搬進方框：
// world = local * s + pos；y 不縮放（保留擠出厚度）
const plateMat = new THREE.MeshStandardMaterial({ color: 0xf1e9d6, roughness: 0.95 });
const plateEdgeMat = new THREE.LineBasicMaterial({ color: THEME.countyLine, transparent: true, opacity: 0.9 });
// 本島西岸在各方框高度範圍內的最西點：方框與本島的距離 = 原距離 × ISLAND_BOX.gapKeep
const mainWestPts = [];
townsGeo.features.forEach(f => {
  if (ISLANDS.has(norm(f.properties.COUNTYNAME))) return;
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  polys.forEach(rings => rings[0].forEach(pt => { const [x, z] = P(pt); if (x < 0) mainWestPts.push([x, z]); }));
});
ISLAND_BOX.gapKeep = 0.3;
ISLAND_BOX.xs = ISLAND_BOX.z.map(bz => {
  let coast = Infinity;
  mainWestPts.forEach(([x, z]) => { if (Math.abs(z - bz) <= ISLAND_BOX.side / 2 && x < coast) coast = x; });
  const edge0 = ISLAND_BOX.x + ISLAND_BOX.side / 2;                 // 原本的方框右緣
  const edge1 = coast - (coast - edge0) * ISLAND_BOX.gapKeep;        // 距離縮減 70%
  return edge1 - ISLAND_BOX.side / 2;
});
ISLAND_BOX.names.forEach((name, i) => {
  const c = COUNTIES[name]; if (!c) return;
  const fb = c.frameBox, side = ISLAND_BOX.side;
  const w = fb.max.x - fb.min.x, d = fb.max.z - fb.min.z;
  const sc = (side * 0.74) / Math.max(w, d);                       // 留 13% 邊距
  const ctr = [(fb.min.x + fb.max.x) / 2, (fb.min.z + fb.max.z) / 2];
  const bx = ISLAND_BOX.xs[i], bz = ISLAND_BOX.z[i];
  // 離主體太遠、沒被納入 frameBox 的鄉鎮（金門的烏坵）不放進方框，隱藏
  c.towns.forEach(t => t.meshes.forEach(m => {
    const [mx, mz] = m.userData.ctr;
    const inside = mx > fb.min.x - 4 && mx < fb.max.x + 4 && mz > fb.min.z - 4 && mz < fb.max.z + 4;
    if (!inside) { m.visible = false; m.userData.hidden = true; }
  }));
  c.towns.forEach(t => { if (t.meshes.every(m => m.userData.hidden)) t.hidden = true; });
  c.boxScale = sc;
  c.boxPos = new THREE.Vector3(bx - ctr[0] * sc, 0, bz - ctr[1] * sc);
  c.group.scale.set(sc, 1, sc);
  c.group.position.copy(c.boxPos);
  // 方框底板：世界座標，不隨縣市升降；本身可點（整個方框都是感應區）
  const plate = new THREE.Mesh(new THREE.BoxGeometry(side, 1.4, side), plateMat);
  plate.position.set(bx, 0.7, bz);
  plate.receiveShadow = true;
  plate.userData.key = c.towns[0].key;
  scene.add(plate);
  const edge = new THREE.LineSegments(new THREE.EdgesGeometry(plate.geometry), plateEdgeMat);
  edge.position.copy(plate.position);
  scene.add(edge);
  c.plate = plate;
  c.center = [bx, bz];                                              // 標籤：方框上方
  c.worldBox = new THREE.Box3(new THREE.Vector3(bx - side / 2, 0, bz - side / 2), new THREE.Vector3(bx + side / 2, ISLAND_H, bz + side / 2));
});
// 縣市在世界座標的位置（本島＝原座標；離島＝經方框縮放）
const toWorld = (c, x, z) => ISLANDS.has(c.name) ? [x * c.boxScale + c.boxPos.x, z * c.boxScale + c.boxPos.z] : [x, z];

// 依目前指標重算顏色：總覽縣市底色（縣市值）與聚焦鄉鎮色（鄉鎮值）
const colorOf = (v, lvl) => ramp(v / COLOR_MAX[metric][lvl]);
function recolor() {
  Object.values(COUNTIES).forEach(c => {
    c.towns.forEach(t => t.meshes.forEach(m => {
      m.userData.cBase = new THREE.Color().lerpColors(C_ISLAND, colorOf(c[metric], 'county'), 0.42);
      m.userData.cFocus = colorOf(t[metric], 'town');
    }));
    paintCounty(c);
  });
}
recolor();

// ---------- 標籤 ----------
const labelLayer = document.getElementById('labels');
const mkLabel = (text, cls) => { const d = document.createElement('div'); d.className = 'lb ' + cls; d.textContent = text; labelLayer.appendChild(d); return d; };
Object.values(COUNTIES).forEach(c => { c.label = mkLabel(show(c.name), 'county'); });
Object.values(TOWNS).forEach(t => { if (t.town && t.pos) { t.label = mkLabel(show(t.town), 'town hide'); } });

const _v = new THREE.Vector3();
function placeLabel(el, x, y, z) {
  _v.set(x, y, z).project(camera);
  if (_v.z > 1) { el.style.visibility = 'hidden'; return false; }
  el.style.visibility = '';
  const [w, h] = canvasSize();
  const px = (_v.x + 1) / 2 * w, py = (1 - _v.y) / 2 * h;
  el.style.transform = `translate(-50%,-50%) translate(${px}px,${py}px)`;
  if (!el._wh) el._wh = [el.offsetWidth || el.textContent.length * 14, el.offsetHeight || 18];
  el._xy = { x: px, y: py, w: el._wh[0], h: el._wh[1] };
  return true;
}
const labelRects = [];
// 浮動指標切換：跟著聚焦縣市走，貼在縣市投影範圍的正下方（夾在可見區內）
const floatEl = document.getElementById('float-metric');
const _corner = new THREE.Vector3();
function placeFloat() {
  if (!focused) return;
  const c = COUNTIES[focused];
  const b = (c.worldBox || c.frameBox);
  const [w, h] = canvasSize();
  const yBase = c.group.position.y, yTop = yBase + ISLAND_H + TOWN_RISE[1];
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, cnt = 0;
  for (const x of [b.min.x, b.max.x]) for (const z of [b.min.z, b.max.z]) for (const y of [yBase, yTop]) {
    _corner.set(x, y, z).project(camera);
    if (_corner.z > 1) continue;
    const px = (_corner.x + 1) / 2 * w, py = (1 - _corner.y) / 2 * h;
    minX = Math.min(minX, px); maxX = Math.max(maxX, px); minY = Math.min(minY, py); maxY = Math.max(maxY, py); cnt++;
  }
  if (!cnt) return;
  const { vw, vh } = viewport();
  const fw = floatEl.offsetWidth || 240, fh = floatEl.offsetHeight || 40;
  // 可見區：桌機扣右側面板，手機扣下方抽屜與標題列
  const left = fw / 2 + 8, right = (isSmall() ? w : vw) - fw / 2 - 8;
  const top = isSmall() ? 64 : 8, bottom = (isSmall() ? vh + 56 : h) - fh - 8;
  const x = Math.min(right, Math.max(left, (minX + maxX) / 2));
  let y = Math.min(bottom, Math.max(top, maxY + 10)), above = false;
  // 桌機：若會壓到左下的縣市按鈕列（超寬／矮螢幕），改放到縣市上方
  if (!isSmall()) {
    const sr = canvas.getBoundingClientRect(), cr0 = chipsEl.getBoundingClientRect();
    const cr = { left: cr0.left - sr.left, right: cr0.right - sr.left, top: cr0.top - sr.top };
    const hitX = x + fw / 2 > cr.left - 8 && x - fw / 2 < cr.right + 8;
    if (hitX && y + fh > cr.top - 8) { y = Math.max(top, minY - fh - 12); above = true; }
  }
  floatEl.classList.toggle('above', above);
  floatEl.style.transform = `translate(${x - fw / 2}px, ${y}px)`;
}
const chipsEl = document.getElementById('chips');
const bubbleEl = document.getElementById('bubble');
function placeBubble() {
  if (!selTown || !focused) { bubbleEl.classList.remove('on'); return; }
  const t = TOWNS[selTown], c = COUNTIES[focused];
  if (!t || !t.pos) return;
  const m = t.meshes[0], [wx, wz] = toWorld(c, t.pos[0], t.pos[1]);
  _v.set(wx, c.group.position.y + m.position.y + ISLAND_H + 2, wz).project(camera);
  const [w, h] = canvasSize();
  const px = (_v.x + 1) / 2 * w, py = (1 - _v.y) / 2 * h;
  const bw = bubbleEl.offsetWidth || 160, bh = bubbleEl.offsetHeight || 36;
  const x = Math.min(w - bw / 2 - 8, Math.max(bw / 2 + 8, px));
  bubbleEl.style.transform = `translate(${x - bw / 2}px, ${py - bh - 26}px)`;   // 鄉鎮名標籤上方
}
function updateLabels() {
  placeFloat();
  placeBubble();
  const cand = [];
  Object.values(COUNTIES).forEach(c => {
    const on = focused !== c.name;
    c.label.classList.toggle('hide', !on);
    c.label.classList.toggle('dim', !!focused);
    if (on && placeLabel(c.label, c.center[0], c.group.position.y + ISLAND_H + (ISLANDS.has(c.name) ? 6 : 3), c.center[1]))
      cand.push({ el: c.label, pri: c.area * (1 + c.pct / 12), ...c.label._xy });
  });
  if (focused) COUNTIES[focused].towns.forEach(t => {
    if (!t.label || t.hidden || t.label.classList.contains('hide')) return;
    const m = t.meshes[0], fc = COUNTIES[focused], [wx, wz] = toWorld(fc, t.pos[0], t.pos[1]);
    if (placeLabel(t.label, wx, fc.group.position.y + m.position.y + ISLAND_H + 1.2, wz))
      cand.push({ el: t.label, pri: t.key === selTown ? Infinity : t[metric], ...t.label._xy });
  });
  // 依重要度貪婪擺放，與已擺放者重疊就淡出
  cand.sort((a, b) => b.pri - a.pri);
  labelRects.length = 0;
  cand.forEach(l => {
    const r = { x0: l.x - l.w / 2 - 2, x1: l.x + l.w / 2 + 2, y0: l.y - l.h / 2 - 1, y1: l.y + l.h / 2 + 1 };
    const clash = labelRects.some(o => r.x0 < o.x1 && r.x1 > o.x0 && r.y0 < o.y1 && r.y1 > o.y0);
    l.el.classList.toggle('clash', clash);
    if (!clash) labelRects.push(r);
  });
}

// ---------- 鏡頭：構圖計算 + 弧線飛行 ----------
const panelState = { x: 0, y: 0 };  // 面板避讓：以 view offset 平移畫面中心
// 畫布被隱藏（display:none、未展開的分頁）時尺寸會是 0，沿用最後一次有效尺寸，避免構圖退化
const canvasSize = () => {
  const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
  if (w > 0 && h > 0) lastGood = [w, h];
  return lastGood;
};
function viewport() {
  const [w, h] = canvasSize();
  const open = document.body.classList.contains('panel-open');
  if (!open) return { w, h, ox: 0, oy: 0, vw: w, vh: h };
  // 畫布被隱藏（尺寸 0）或極小時，可見區不能變成負值，否則算出負距離、鏡頭翻到地底
  if (isSmall()) { const sh = h * 0.45, top = 56; return { w, h, ox: 0, oy: (sh - top) / 2, vw: w, vh: Math.max(h * 0.3, h - sh - top) }; }
  const pw = 380 + 32; return { w, h, ox: pw / 2, oy: 0, vw: Math.max(w * 0.3, w - pw), vh: h };
}
function applyOffset() {
  const { w, h } = viewport();
  if (panelState.x || panelState.y) camera.setViewOffset(w, h, panelState.x, panelState.y, w, h);
  else camera.clearViewOffset();
  camera.updateProjectionMatrix();
}
function tweenOffset() {
  const { ox, oy } = viewport();
  gsap.to(panelState, { x: ox, y: oy, duration: dur(0.9), ease: 'power3.inOut', onUpdate: applyOffset });
}

// 依「可見區域」算出能完整框住 box 的距離
function poseFor(box, { az, polar }, pad = 1.18, halfExt = null) {
  const { h, vw, vh } = viewport();
  const sphere = box.getBoundingSphere(new THREE.Sphere());
  const t = Math.tan(THREE.MathUtils.degToRad(FOV) / 2);
  const vf = Math.atan(t * (vh / h));   // 可見區域的半視角（扣掉面板／標題）
  const hf = Math.atan(t * (vw / h));
  // halfExt=[半寬, 半長]：狹長物件（本島）用實際寬高分別算距離，比外接球準確
  const r = halfExt
    ? Math.max(halfExt[0] / Math.tan(hf), halfExt[1] / Math.tan(vf)) * pad
    : (sphere.radius * pad) / Math.sin(Math.min(vf, hf));
  return { target: sphere.center.clone(), r, az, polar };
}

const _p = new THREE.Vector3(), _t = new THREE.Vector3();
let flight = null;
function flyTo(pose, seconds = 2.0) {
  flight?.kill();
  const t0 = controls.getTarget(new THREE.Vector3());
  const s0 = new THREE.Spherical().setFromVector3(controls.getPosition(new THREE.Vector3()).sub(t0));
  let dAz = pose.az - s0.theta;
  dAz = Math.atan2(Math.sin(dAz), Math.cos(dAz));                 // 最短方位
  const travel = t0.distanceTo(pose.target);
  const lift = Math.min(220, travel * 0.55 + Math.abs(dAz) * 40);  // 中段拉高的量
  unlock();
  controls.enabled = false;
  const k = { v: 0 };
  return new Promise(resolve => {
    flight = gsap.to(k, {
      v: 1, duration: dur(seconds), ease: 'power2.inOut',
      onUpdate() {
        const e = k.v, arc = Math.sin(Math.PI * e);
        _t.lerpVectors(t0, pose.target, e);
        const r = THREE.MathUtils.lerp(s0.radius, pose.r, e) + arc * lift;
        const ph = THREE.MathUtils.lerp(s0.phi, pose.polar, e) - arc * 0.12; // 中段略往俯視
        const th = s0.theta + dAz * e;
        _p.setFromSphericalCoords(r, ph, th).add(_t);
        controls.setLookAt(_p.x, _p.y, _p.z, _t.x, _t.y, _t.z, false);
      },
      onComplete() { controls.enabled = true; flight = null; resolve(); },
    });
  });
}

// 到位後的鏡頭：全不鎖（依客戶決定），只靠 MAP_BOUNDS 邊界約束，讀者可自由滑到其他地區再點選
function lockAround(pose) { unlock(); }
function unlock() {
  controls.minAzimuthAngle = -Infinity; controls.maxAzimuthAngle = Infinity;
  controls.minPolarAngle = 0; controls.maxPolarAngle = Math.PI * 0.46;
  controls.minDistance = 25; controls.maxDistance = 900;
  controls.mouseButtons.right = CameraControls.ACTION.TRUCK;
  setTouchScheme();
}

// ---------- 縣市聚焦 ----------
function townLift(c, t) {
  const vals = c.towns.map(x => x[metric]);
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const n = hi > lo ? (t[metric] - lo) / (hi - lo) : 0.5;
  return THREE.MathUtils.lerp(TOWN_RISE[0], TOWN_RISE[1], n);
}
function riseTowns(c, delay = 0) {
  const [cx, cz] = c.center;
  const order = [...c.towns].sort((a, b) => Math.hypot(a.pos[0] - cx, a.pos[1] - cz) - Math.hypot(b.pos[0] - cx, b.pos[1] - cz));
  order.forEach((t, i) => t.meshes.forEach(m => gsap.to(m.position, {
    y: c.towns.length > 1 ? townLift(c, t) : 0, duration: dur(0.9), ease: 'back.out(1.7)', delay: dur(delay + i * 0.025), overwrite: true,
  })));
}
function settle(c) {
  gsap.to(c.group.position, { y: 0, duration: dur(0.8), ease: 'power3.inOut', overwrite: true });
  c.towns.forEach(t => t.meshes.forEach(m => gsap.to(m.position, { y: 0, duration: dur(0.6), ease: 'power2.inOut', overwrite: true })));
  c.towns.forEach(t => t.label?.classList.add('hide'));
}
function tweenMix(c, to) {
  gsap.to(c.mix, { ...to, duration: dur(0.8), ease: 'power2.inOut', overwrite: 'auto', onUpdate: () => paintCounty(c) });
}

async function focusCounty(name) {
  if (!COUNTIES[name] || focused === name) return;
  const prev = focused;
  focused = name; selTown = null; bubbleEl.classList.remove('on');
  const c = COUNTIES[name];
  if (prev) settle(COUNTIES[prev]);
  Object.values(COUNTIES).forEach(o => tweenMix(o, o === c ? { focus: 1, dim: 0 } : { focus: 0, dim: 1 }));
  document.body.classList.add('panel-open');
  if (!prev) setSheet(false);
  renderPanel();
  syncChips();
  document.getElementById('back').classList.add('on');
  document.getElementById('float-metric').classList.add('on');
  tweenOffset();

  // 依「升起後」的範圍構圖
  const box = (c.worldBox || c.frameBox).clone(); box.max.y += COUNTY_RISE + TOWN_RISE[1];
  const pose = poseFor(box, PRESETS[show(name)] || DEFAULT_POSE, c.towns.length > 1 ? 1.32 : 1.45);
  gsap.to(c.group.position, { y: COUNTY_RISE, duration: dur(1.1), ease: 'power3.out', delay: dur(0.5), overwrite: true });
  riseTowns(c, 0.9);
  await flyTo(pose, prev ? 1.7 : 2.1);
  if (focused !== name) return;
  c.towns.forEach(t => t.label?.classList.remove('hide'));
  lockAround(pose);
}

// 總覽構圖：接近俯視（polar 0.42），用「實際投影後的範圍」反覆修正距離，讓本島＋離島方框貼滿可見區
const OVERVIEW = { az: 0, polar: 0.42, fillY: 0.94, fillX: 0.92 };
const _tmpCam = new THREE.PerspectiveCamera();
function overviewPose() {
  // 內容範圍＝本島各縣實際範圍 ∪ 離島方框（不用投影時的估計值，本島實際只有約 -52..58 × -93..110）
  const boxes = Object.values(COUNTIES).map(c => c.worldBox || c.frameBox);
  const content = new THREE.Box3(); boxes.forEach(b => content.union(b));
  content.min.y = 0; content.max.y = ISLAND_H;
  const target = content.getCenter(new THREE.Vector3());
  const { w, h, vw, vh } = viewport();
  _tmpCam.copy(camera); _tmpCam.aspect = w / h; _tmpCam.updateProjectionMatrix();
  let r = 400;
  for (let i = 0; i < 6; i++) {
    _tmpCam.position.setFromSphericalCoords(r, OVERVIEW.polar, OVERVIEW.az).add(target);
    _tmpCam.lookAt(target); _tmpCam.updateMatrixWorld();
    let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    // 用各縣各自的範圍投影（聯集方框的空角落會把範圍撐大）
    boxes.forEach(b => { for (const x of [b.min.x, b.max.x]) for (const z of [b.min.z, b.max.z]) for (const y of [0, ISLAND_H]) {
      _corner.set(x, y, z).project(_tmpCam);
      x0 = Math.min(x0, _corner.x); x1 = Math.max(x1, _corner.x); y0 = Math.min(y0, _corner.y); y1 = Math.max(y1, _corner.y);
    } });
    const spanX = (x1 - x0) / 2 * (w / vw), spanY = (y1 - y0) / 2 * (h / vh);   // 佔可見區的比例
    r *= Math.max(spanX / OVERVIEW.fillX, spanY / OVERVIEW.fillY);
    // 透視下近端（南）投影較大，內容不會以 target 為中心：把 target 沿地面移動，讓投影中心回到畫面中央
    const unitY = r * Math.tan(THREE.MathUtils.degToRad(FOV) / 2);           // 1 個 NDC 對應的世界長度（約略）
    const midX = (x0 + x1) / 2, midY = (y0 + y1) / 2;
    target.x += midX * unitY * (w / h) * 0.8;
    target.z -= midY * unitY / Math.cos(OVERVIEW.polar) * 0.8;
  }
  return { target, r, az: OVERVIEW.az, polar: OVERVIEW.polar };
}
async function overview(seconds = 2.0) {
  const prev = focused;
  focused = null; selTown = null; bubbleEl.classList.remove('on'); toggleMenu(false);
  if (prev) settle(COUNTIES[prev]);
  Object.values(COUNTIES).forEach(o => tweenMix(o, { focus: 0, dim: 0 }));
  document.body.classList.remove('panel-open');
  setSheet(false);
  document.getElementById('back').classList.remove('on');
  document.getElementById('float-metric').classList.remove('on');
  syncChips();
  tweenOffset();
  // 本島範圍：以實際半寬／半長算距離，目標是本島盡量填滿畫面、屏東與基隆都在框內（桌機／手機實測調整 pad）
  const pose = overviewPose(); overviewDist = pose.r;
  await flyTo(pose, seconds);
}

// ---------- 候選人與政策（佔位；資料在 data/election.js）----------
// 專訪網址未填時先連到客新聞首頁（另開新頁）
const PLACEHOLDER_LINK = 'https://hakkanews.tw/';
// 預設插畫人像：election.js 填 photo 路徑即取代
function avatar(cd, i) {
  const hair = i === 0
    ? '<path d="M38 52c0-20 10-30 22-30s22 10 22 30c-6-10-14-14-22-14s-16 4-22 14z" fill="#2a2a33"/>'
    : '<path d="M34 60c-4-28 8-40 26-40s30 12 26 40c-2-12-6-22-12-26-8 4-20 4-28 0-6 4-10 14-12 26z" fill="#3b2a24"/>';
  return `<svg viewBox="0 0 120 130" role="img" aria-label="${cd.name}插畫（佔位）">
    <path d="M8 130c2-26 20-38 52-38s50 12 52 38z" fill="${cd.color}"/>
    <path d="M44 92l16 22 16-22" fill="#fffdf8"/>
    <path d="M30 130l30-36 30 36" fill="none" stroke="#f2b632" stroke-width="6" opacity=".9"/>
    <rect x="53" y="76" width="14" height="18" rx="6" fill="#e8b48f"/>
    <ellipse cx="60" cy="56" rx="22" ry="26" fill="#f2c7a5"/>${hair}
    <circle cx="51" cy="58" r="2.2" fill="#2a2a33"/><circle cx="69" cy="58" r="2.2" fill="#2a2a33"/>
    <path d="M52 70q8 7 16 0" fill="none" stroke="#a5532f" stroke-width="2.2" stroke-linecap="round"/></svg>`;
}
function renderCandidates(el) {
  const cs = el.candidates || [];
  const box = document.getElementById('p-cands'), pol = document.getElementById('p-policies');
  if (!cs.length) { box.innerHTML = '<div class="p-note">（候選人資料待補）</div>'; pol.innerHTML = ''; return; }
  box.innerHTML = cs.map((cd, i) => `
    <div class="cand" style="--cc:${ccOf(cd)}">
      <div class="art">${cd.photo
        ? `<img class="${cd.photoPlaceholder ? '' : 'photo'}" src="${cd.photo}" alt="${cd.name}${cd.photoPlaceholder ? '（示意人像）' : ''}">${cd.photoPlaceholder ? '<span class="ph">照片待補</span>' : ''}`
        : avatar(cd, i) + '<span class="ph">照片待補</span>'}</div>
      <div class="nm">${cd.name}</div>
      <div class="got">得票 <b>${fmt(gotOf(cd))}</b> 票</div>
      <span class="party">${cd.party}</span>
      <div class="age">${cd.age == null ? '年紀待補' : cd.age + ' 歲'}</div>
      <div class="role">${cd.role}</div>
      ${(cd.bio || []).length ? `<ul>${cd.bio.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
    </div>`).join('');
  box.classList.toggle('three', cs.length >= 3);
  pol.classList.toggle('three', cs.length >= 3);
  // 政見：兩欄並列，只放標題一句，下方「看完整政策」連到專訪新聞（link 未填時顯示待補、不可點）
  pol.innerHTML = cs.map(cd => `
    <div class="policy" style="--cc:${ccOf(cd)}">
      <b>${cd.name}</b>
      ${Array.isArray(cd.policy) && cd.policy.length
        ? `<ul>${cd.policy.map(x => `<li>${x}</li>`).join('')}</ul>`
        : `<p>${cd.policy || '（客家政策待補）'}</p>`}
      ${cd.policyNote ? `<small>${cd.policyNote}</small>` : ''}
      <a class="more" href="${cd.link || PLACEHOLDER_LINK}" target="_blank" rel="noopener">看完整政策 →</a>
    </div>`).join('');
}

// ---------- 面板 ----------
const fmt = n => Math.round(n).toLocaleString('zh-Hant');
const wan = n => (n >= 10000 ? (n / 10000).toFixed(1).replace(/\.0$/, '') + ' 萬' : fmt(n));
// 得票數：目前尚無統計，一律以 VOTE_PLACEHOLDER 佔位；正式資料填入 election.js 的 got（縣市）與 results[鄉鎮][序]（鄉鎮）後自動取代
const VOTE_PLACEHOLDER = 999999;
// 政黨色系：有黨籍的候選人，卡片外框、底色、文字、黨籍標籤、政見欄與氣泡人名一律用政黨色；無黨籍或未列者退回 election.js 的 color
const PARTY_COLOR = { '中國國民黨': '#1d4fa3', '民主進步黨': '#1b9431', '台灣民眾黨': '#1fb6b6', '時代力量': '#d9a300', '台灣基進': '#8b1a1a' };
const ccOf = cd => PARTY_COLOR[cd.party] || cd.color;
const gotOf = cd => cd.got == null ? VOTE_PLACEHOLDER : cd.got;
function townVotes(county, town) {
  const el = ELECTION[county]; if (!el || !(el.candidates || []).length) return '';
  const r = (el.results || {})[town] || [];
  return `<span class="v">${el.candidates.map((cd, i) => `<i style="--cc:${ccOf(cd)}">${cd.name}</i>${fmt(r[i] == null ? VOTE_PLACEHOLDER : r[i])} 票`).join('')}</span>`;
}
function renderPanel() {
  const c = COUNTIES[focused];
  if (!c) return;
  document.getElementById('p-name').textContent = show(c.name);
  document.getElementById('p-select-text').textContent = show(c.name);
  document.getElementById('p-total').textContent = wan(c.total);
  document.getElementById('p-hakka').textContent = wan(c.hakka);
  document.getElementById('p-pct').textContent = c.pct.toFixed(1) + '%';
  document.getElementById('p-count').textContent = c.towns.length > 1 ? `（${c.towns.length} 鄉鎮市區）` : '（以縣為單位）';
  const el = ELECTION[c.name] || { votes: null, candidates: [] };
  const vc = document.getElementById('p-votes-cell');
  vc.classList.toggle('stat-ph', el.votes == null);
  document.getElementById('p-votes').textContent = el.votes == null ? '待補' : wan(el.votes);
  renderCandidates(el);
  const list = [...c.towns].sort((a, b) => b[metric] - a[metric]);
  const sumHakka = c.towns.reduce((a, t) => a + t.hakka, 0) || 1;
  const ol = document.getElementById('p-towns');
  ol.innerHTML = list.map(t => {
    const few = metric === 'hakka' && t.hakka < 1000;            // 「少於 1,000 人」只用在客家人口模式；比例模式照常顯示比例
    const share = t.hakka / sumHakka * 100;                       // 佔全縣客家人口
    const width = metric === 'pct' ? t.pct : share;               // 比例＝絕對值（滿條 100%）；人口＝佔比（全縣加總 100%）
    const label = few ? '<small>少於 1,000 人</small>'
      : metric === 'pct' ? t.pct.toFixed(1) + '%' : `${wan(t.hakka)}<small>${share.toFixed(0)}%</small>`;
    return `<li class="${few ? 'few' : ''}"><button data-k="${t.key}" class="${t.key === selTown ? 'on' : ''}">
      <span>${show(t.town || t.county)}</span>
      <span class="bar"><i style="width:${Math.max(few ? 0 : 1.5, width)}%;background:#${colorOf(t[metric], 'town').getHexString()}"></i></span>
      <b>${label}</b></button></li>`;
  }).join('');
  ol.querySelectorAll('button').forEach(b => {
    b.onclick = () => selectTown(b.dataset.k);
    b.onmouseenter = () => { hoverTown = b.dataset.k; paintCounty(c); };
    b.onmouseleave = () => { hoverTown = null; paintCounty(c); };
  });
}
function selectTown(key) {
  const t = TOWNS[key];
  if (!t || norm(t.county) !== focused) return;
  selTown = selTown === key ? null : key;
  const c = COUNTIES[focused];
  paintCounty(c);
  c.towns.forEach(x => x.label?.classList.toggle('sel', x.key === selTown));
  // 資料氣泡：點選鄉鎮時顯示（手機沒有 hover，靠這個看數據）
  if (selTown) {
    bubbleEl.innerHTML = `<b>${show(t.town || t.county)}</b>${townVotes(norm(t.county), t.town)}客家 ${fmt(t.hakka)} 人（${t.pct.toFixed(1)}%）`;
    bubbleEl.classList.add('on');
  } else bubbleEl.classList.remove('on');
  // 選到的鄉鎮再多升一點
  c.towns.forEach(x => x.meshes.forEach(m => gsap.to(m.position, {
    y: (c.towns.length > 1 ? townLift(c, x) : 0) + (x.key === selTown ? 2.5 : 0), duration: dur(0.5), ease: 'back.out(2)', overwrite: true,
  })));
  renderPanel();
}
// 指標切換：面板內的 #metric-seg 與地圖上的浮動按鈕 #float-metric 共用同一個狀態
function setMetric(m) {
  metric = m;
  document.querySelectorAll('#metric-seg button, #float-metric button').forEach(x => x.classList.toggle('on', x.dataset.m === m));
  recolor();
  if (focused) { riseTowns(COUNTIES[focused]); renderPanel(); }
}
document.querySelectorAll('#metric-seg button, #float-metric button').forEach(b => b.onclick = () => setMetric(b.dataset.m));
// ---------- 手機底部抽屜：半屏 ⇄ 全屏（拖曳標題列／把手，或點把手切換）----------
const panelEl = document.getElementById('panel');
// 手機：把「基本數據」四格從抽屜標題下方移到候選人卡片之後，開啟抽屜第一眼就看到候選人與得票；桌機維持原位
const statsEl = panelEl.querySelector('.p-stats'), bodyEl = panelEl.querySelector('.p-body');
function placeStats() {
  if (isSmall()) { if (statsEl.parentElement !== bodyEl) bodyEl.insertBefore(statsEl, document.getElementById('p-pol-sec')); }
  else if (statsEl.parentElement !== panelEl) panelEl.insertBefore(statsEl, bodyEl);
}
placeStats();
addEventListener('resize', placeStats);
const sheet = { full: false, drag: null };
const vh = () => canvasSize()[1];   // 舞台高度（頁面可捲動後不再等於視窗高）
const sheetH = full => vh() * (full ? 0.92 : 0.45);          // 與 CSS --sheet-full / --sheet-half 對應
function setSheet(full) {
  sheet.full = full;
  panelEl.classList.toggle('full', full);
  document.body.classList.toggle('sheet-full', full);
  panelEl.classList.remove('dragging');
  panelEl.style.height = '';
  if (!full) document.querySelector('.p-body').scrollTop = 0;
}
const head = panelEl.querySelector('.p-head');
head.addEventListener('pointerdown', e => {
  if (!isSmall() || e.target.closest('.p-close, .p-pick, #p-menu')) return;   // 關閉鈕、縣市下拉選單不觸發抽屜拖曳／切換
  sheet.drag = { y0: e.clientY, base: sheetH(sheet.full), t0: performance.now(), moved: 0 };
  try { head.setPointerCapture(e.pointerId); } catch (_) {}
  panelEl.classList.add('dragging');
});
head.addEventListener('pointermove', e => {
  const d = sheet.drag; if (!d) return;
  const dy = e.clientY - d.y0; d.moved = dy;
  const h = Math.max(80, Math.min(sheetH(true), d.base - dy));   // 往上拖＝變高
  panelEl.style.height = h + 'px';
});
const endDrag = e => {
  const d = sheet.drag; if (!d) return;
  sheet.drag = null;
  const dt = performance.now() - d.t0, v = d.moved / Math.max(1, dt); // px/ms（往下為正）
  const tapped = Math.abs(d.moved) < 6 && dt < 300;
  if (tapped) { setSheet(!sheet.full); return; }                      // 點把手／標題列＝切換
  const h = d.base - d.moved;
  if (Math.abs(v) > 0.45) setSheet(v < 0);                           // 快速甩動依方向
  else setSheet(h > (sheetH(false) + sheetH(true)) / 2);             // 否則看停在哪半邊
};
head.addEventListener('pointerup', endDrag);
head.addEventListener('pointercancel', endDrag);
// 全屏時，內容捲到頂再往下拉 → 收回半屏
const body = document.querySelector('.p-body');
let bodyTouch = null;
body.addEventListener('touchstart', e => { bodyTouch = sheet.full && body.scrollTop <= 0 ? e.touches[0].clientY : null; }, { passive: true });
body.addEventListener('touchmove', e => {
  if (bodyTouch == null) return;
  if (e.touches[0].clientY - bodyTouch > 48 && body.scrollTop <= 0) { bodyTouch = null; setSheet(false); }
}, { passive: true });
document.getElementById('p-close').onclick = () => overview(1.6);
document.getElementById('back').onclick = () => overview(1.6);
// ---------- 操作說明 lightbox ----------
const helpEl = document.getElementById('help');
const AUTO_SHOW_HELP_ONCE = true;                     // 第一次進站自動跳一次（記在 localStorage）
const isTouch = matchMedia('(hover: none) and (pointer: coarse)').matches;
function showHelp(pane) {
  pane = pane || (isTouch ? 'touch' : 'desktop');
  helpEl.querySelectorAll('.help-tabs button').forEach(b => b.classList.toggle('on', b.dataset.pane === pane));
  helpEl.querySelectorAll('.help-pane').forEach(p => p.hidden = p.dataset.pane !== pane);
  helpEl.classList.add('on');
}
function hideHelp() { helpEl.classList.remove('on'); }
document.getElementById('help-btn').onclick = () => showHelp();
helpEl.querySelector('.help-close').onclick = hideHelp;
helpEl.addEventListener('click', e => { if (e.target === helpEl) hideHelp(); });
helpEl.querySelectorAll('.help-tabs button').forEach(b => b.onclick = () => showHelp(b.dataset.pane));
addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (helpEl.classList.contains('on')) hideHelp();
  else if (focused) overview(1.6);
});
try {
  if (AUTO_SHOW_HELP_ONCE && !localStorage.getItem('hakka3d-help-seen')) {
    localStorage.setItem('hakka3d-help-seen', '1');
    setTimeout(() => showHelp(), REDUCED ? 300 : 3200);   // 等開場運鏡結束
  }
} catch (_) {}

// ---------- 縣市快速切換 ----------
const ORDER = ['基隆市', '臺北市', '新北市', '桃園市', '新竹市', '新竹縣', '苗栗縣', '臺中市', '彰化縣', '南投縣', '雲林縣', '嘉義市', '嘉義縣',
  '臺南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣'];
// 縣市按鈕文字：桌機去掉「縣／市」，但新竹、嘉義同名縣市保留全名以資區別；手機選單一律全名
const DUP_BASE = new Set(ORDER.map(n => n.replace(/[縣市]$/, '')).filter((b, i, a) => a.indexOf(b) !== i));
const chipLabel = n => DUP_BASE.has(n.replace(/[縣市]$/, '')) ? n : n.replace(/[縣市]$/, '');
const chips = document.getElementById('chips');
chips.innerHTML = ORDER.filter(n => COUNTIES[norm(n)]).map(n =>
  `<button data-c="${norm(n)}">${chipLabel(n)}</button>`).join('');
chips.querySelectorAll('button').forEach(b => b.onclick = () => focusCounty(b.dataset.c));
// 手機抽屜標題的縣市選單：自訂小面板（不用原生 select，避免手機滿版選單）
const pPick = document.getElementById('p-pick'), pMenu = document.getElementById('p-menu');
pMenu.innerHTML = ORDER.filter(n => COUNTIES[norm(n)]).map(n => `<button type="button" role="option" data-c="${norm(n)}">${n}</button>`).join('');
function toggleMenu(open) {
  const on = open ?? pMenu.hidden;
  pMenu.hidden = !on;
  pPick.setAttribute('aria-expanded', on);
  if (on) pMenu.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.c === focused));
}
pPick.onclick = e => { e.stopPropagation(); toggleMenu(); };
pMenu.querySelectorAll('button').forEach(b => b.onclick = e => { e.stopPropagation(); toggleMenu(false); focusCounty(b.dataset.c); });
document.addEventListener('pointerdown', e => { if (!pMenu.hidden && !e.target.closest('#p-menu, #p-pick')) toggleMenu(false); });
function syncChips() { chips.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.c === focused)); }

// ---------- 指標互動（hover / click）----------
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const pickables = Object.values(TOWNS).flatMap(t => t.meshes.filter(m => m.visible));
// 離島：方框底板本身可點（見 ISLAND_BOX 區段）
ISLAND_BOX.names.forEach(n => { const c = COUNTIES[n]; if (c?.plate) pickables.push(c.plate); });
const tip = document.getElementById('tip');
function pick(e) {
  const r = canvas.getBoundingClientRect();
  pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(pickables, false)[0];
  return hit ? TOWNS[hit.object.userData.key] : null;
}
canvas.addEventListener('pointermove', e => {
  if (e.pointerType === 'touch' || flight) return;
  const t = pick(e);
  const cName = t ? norm(t.county) : null;
  if (cName !== hoverCounty) {
    if (hoverCounty) tweenMix(COUNTIES[hoverCounty], { hover: 0 });
    if (cName && cName !== focused) tweenMix(COUNTIES[cName], { hover: 1 });
    hoverCounty = cName;
  }
  const newTown = t && cName === focused ? t.key : null;
  if (newTown !== hoverTown) { hoverTown = newTown; if (focused) paintCounty(COUNTIES[focused]); }
  canvas.style.cursor = t ? 'pointer' : '';
  if (t) {
    const inFocus = cName === focused;
    tip.innerHTML = inFocus && t.town
      ? `<b>${show(t.town)}</b>${townVotes(cName, t.town)}客家 ${fmt(t.hakka)} 人（${t.pct.toFixed(1)}%）`
      : `<b>${show(cName)}</b>　客家 ${COUNTIES[cName].pct.toFixed(1)}%`;
    tip.style.left = e.clientX + 'px'; tip.style.top = e.clientY + 'px';
    tip.classList.add('on');
  } else tip.classList.remove('on');
});
canvas.addEventListener('pointerleave', () => tip.classList.remove('on'));
let down = null;
canvas.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY]; });
canvas.addEventListener('pointerup', e => {
  if (!down) return;
  const moved = Math.hypot(e.clientX - down[0], e.clientY - down[1]);
  down = null;
  if (moved > 6 || flight) return;
  const t = pick(e);
  if (!t) return;
  const cName = norm(t.county);
  if (cName === focused) { if (t.town) selectTown(t.key); }
  else focusCounty(cName);
});

// ---------- 尺寸 / 迴圈 ----------
function resize() {
  const [w, h] = canvasSize();
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  const { ox, oy } = viewport();
  panelState.x = ox; panelState.y = oy;
  applyOffset();
}
// 版面在手機／桌機之間切換（含手機轉向、嵌入後才展開）時，總覽重新構圖
let lastSmall = isSmall();
function refitOnModeChange() {
  if (lastSmall === isSmall()) return;
  lastSmall = isSmall();
  if (!focused && !flight) overview(0.6);
}
new ResizeObserver(() => { resize(); refitOnModeChange(); }).observe(canvas);
addEventListener('resize', resize);
resize();

let last = performance.now();
// 滾輪：在總覽且已縮到最遠時，往下滾改為捲動頁面（否則滾輪被地圖縮放吃掉，使用者捲不到下面的文章與 Footer）
const stageEl = document.getElementById('stage');
stageEl.addEventListener('wheel', e => {
  if (e.target === canvas && e.deltaY > 0 && !focused && !flight && controls.distance >= overviewDist * 0.985) e.stopPropagation();
}, { capture: true, passive: true });
// 舞台捲出視窗時暫停繪製，省電
let stageVisible = true;
new IntersectionObserver(es => { stageVisible = es[0].isIntersecting; }, { threshold: 0 }).observe(stageEl);
renderer.setAnimationLoop(now => {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  if (!stageVisible) return;
  controls.update(dt);
  updateLabels();
  renderer.render(scene, camera);
});

// 開場：從高空俯視拉到斜視全臺
controls.setLookAt(0, 900, 60, 0, 0, 0, false);
document.getElementById('veil').classList.add('off');
// 除錯／整合用（開場運鏡之前就掛上，不被動畫阻塞）
window.__HAKKA3D__ = { focusCounty, overview, COUNTIES, TOWNS, camera, controls, renderer, scene, updateLabels, viewport, poseFor, isSmall: () => isSmall() };
overview(REDUCED ? 0.1 : 2.6);

// ---------- 地圖下方文章區（資料在 data/articles.js）----------
(function renderNews() {
  const grid = document.getElementById('news-grid');
  if (!grid || !window.ARTICLES) return;
  grid.innerHTML = ARTICLES.slice(0, 6).map(a => `
    <a class="n-card" href="${a.url}" target="_blank" rel="noopener">
      <div class="n-img" ${a.img ? `style="background-image:url('${a.img}')"` : ''}>${a.img ? '' : '圖片'}</div>
      <div class="n-body"><span class="n-tag">${a.tag}</span><h3>${a.title}</h3><time>${a.date}</time></div>
    </a>`).join('');
})();
