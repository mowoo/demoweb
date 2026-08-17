/* ============================================================
   一日講六句 — 互動邏輯
   由 六句倡議網站.dc.html（Claude Design / DCLogic）等價移植為原生 JS。

   資料狀態：連署名單、影音清單、連署人數、日期、連續天數全為模擬值；
   六句內容取自 六句資料/六句.json，同樣是模擬素材。
   ============================================================ */

(function () {
  "use strict";

  // ---------- 模擬設定（客戶正式資料到位後抽換） ----------

  var CONFIG = {
    signatureCount: 512,
    celebTotal: 24,   // 名人
    orgTotal: 62,     // 團體
    streak: 12,
    dayLabel: "7月31日",
    showHanyu: true
  };
  // 個人 = 總數 - 名人 - 團體
  CONFIG.personTotal = CONFIG.signatureCount - CONFIG.celebTotal - CONFIG.orgTotal;

  var TASKS = ["聽音辨義", "看華語．講族語", "詞卡拼句"];

  var ROLES = ["苗栗．退休教師", "臺北．設計師", "六堆．青農", "新竹．國小老師",
    "桃園．客語薪傳師", "臺中．學生", "花蓮．社工", "高雄．書店店主",
    "屏東．導覽員", "宜蘭．新住民媽媽", "臺東．族語老師", "南投．記者"];

  var SIGNERS = ["劉阿英", "徐世昌", "范美玲", "彭家興", "羅淑芬", "鍾明德", "曾秀蘭",
    "邱志豪", "黃春妹", "詹文彬", "李金蘭", "宋國樑", "傅雅雯", "溫俊哲", "葉秋菊",
    "賴進發", "廖美珠", "涂建良", "古慧君", "藍振源", "何金英", "馮定國", "游麗雪",
    "陳運昌", "張桂枝", "吳伯庸", "楊素芬", "林大山", "許家豪", "蔡月霞", "謝正忠",
    "簡淑惠", "郭添丁", "周雅慧", "洪世傑", "石秀梅", "湯明彥", "康妙音", "巴奈·卡拉", "阮氏梅"];

  // ⚠️ 全為虛構人名，僅供版面示意。
  // 絕對不可填入真實公眾人物姓名 —— 那等同於在頁面上偽造他人的連署背書。
  // 客戶提供正式名單後整批抽換。
  var CELEBS = [
    { name: "羅思賢", sub: "民謠歌手" },
    { name: "邱曼容", sub: "紀錄片導演" },
    { name: "彭立言", sub: "作家" },
    { name: "杜宛青", sub: "舞台劇演員" },
    { name: "范松柏", sub: "陶藝家" },
    { name: "黎家瑜", sub: "主持人" },
    { name: "宋懷恩", sub: "劇場導演" },
    { name: "溫其璇", sub: "插畫家" },
    { name: "傅永成", sub: "音樂製作人" },
    { name: "呂靜妍", sub: "編舞家" }
  ];

  var ORGS = [
    { name: "苗栗縣獅潭鄉客語家庭促進會", kind: "民間社團" },
    { name: "新竹縣北埔國民小學", kind: "學校" },
    { name: "六堆伙房文化工作室", kind: "文化團隊" },
    { name: "屏東縣內埔鄉母語推廣協會", kind: "民間社團" },
    { name: "桃園市客語生活學校聯盟", kind: "學校聯盟" },
    { name: "花蓮縣富里鄉多族語共學班", kind: "社區組織" },
    { name: "高雄美濃田野書店", kind: "獨立書店" },
    { name: "臺中市東勢客語薪傳師工作坊", kind: "教學單位" },
    { name: "新北市新住民語文教學中心", kind: "教學單位" },
    { name: "客庄小學堂podcast", kind: "媒體" },
    { name: "臺東縣阿美族語言巢", kind: "族語機構" },
    { name: "南庄老街商圈發展協會", kind: "商圈團體" }
  ];

  var VIDEOS = [
    { title: "阿婆教你講六句", by: "獅潭客語家庭促進會", len: "2:14" },
    { title: "飯桌上的六句：一家四代", by: "六堆伙房文化工作室", len: "3:48" },
    { title: "北埔國小三年級的六句", by: "新竹縣北埔國小", len: "1:52" },
    { title: "海陸腔六句慢慢講", by: "客庄小學堂podcast", len: "4:20" },
    { title: "阿美語版六句", by: "臺東縣阿美族語言巢", len: "2:36" },
    { title: "越南語．客語．六句對照", by: "新住民語文教學中心", len: "3:05" }
  ];

  // ---------- 六句資料 ----------
  // 來源 js/data.js（由 tools/sync-data.ps1 從 六句資料/六句.json 產生）
  // 每組轉成 { name: 主題, sub: 語別, lines: [[族語, 華語], …] }

  var GROUPS = (function () {
    var d = window.SIX_DATA;
    if (!d || !d.組別 || !d.組別.length) {
      console.error("[六句] 找不到 window.SIX_DATA，請先執行 tools/sync-data.ps1");
      return [];
    }
    return d.組別.map(function (g) {
      return {
        name: g.主題,
        sub: g.語別,
        lines: g.句子.map(function (s) { return [s.文, s.華語]; })
      };
    });
  })();

  var LINES_PER_GROUP = 6;

  // ---------- 工具 ----------

  /** 以 seed 產生固定的洗牌順序，讓每次重整看到的題目排列一致。 */
  function seededOrder(n, seed) {
    var arr = [];
    for (var i = 0; i < n; i++) arr.push(i);
    var s = Math.abs(seed * 2654435761) % 2147483647;
    for (var j = n - 1; j > 0; j--) {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      var k = s % (j + 1);
      var t = arr[j]; arr[j] = arr[k]; arr[k] = t;
    }
    return arr;
  }

  /**
   * 切成詞卡。拉丁字母語言按空白切，漢字按字切。
   * 用 Array.from 而非 split("")，否則 𠊎（U+2000E）這類增補平面字
   * 會被拆成兩個破碎的代理對，詞卡會顯示成亂碼。
   */
  function tokenize(s) {
    var clean = s.replace(/[。？！，、；：.?!,;:]/g, "").trim();
    if (/[a-zA-Zà-ỹÀ-Ỹ]/.test(clean)) {
      return { toks: clean.split(/\s+/).filter(Boolean), sep: " " };
    }
    return { toks: Array.from(clean), sep: "" };
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function $(sel) { return document.querySelector(sel); }

  // ---------- 狀態 ----------

  var state = {
    sel: 0,        // 目前主題索引
    ri: 0,         // 目前第幾句 0–5
    picked: null,  // 選了哪個選項
    tiles: [],     // 已放入的詞卡索引
    phase: "ask",  // ask | ok | no | done
    speaking: false,
    flt: "all",    // 名單篩選 all | person | org
    sent: false,
    form: { type: "org", org: "", name: "", email: "", publish: true }
  };

  var speakTimer = null;

  function set(patch) {
    Object.assign(state, patch);
    render();
  }

  // ---------- 題目 ----------

  var C = {
    okBg: "var(--color-accent-2-200)",
    okBd: "var(--color-accent-2-500)",
    okFg: "var(--color-accent-2-900)",
    noBg: "var(--color-accent-200)",
    noBd: "var(--color-accent-500)",
    idle: "var(--color-surface)",
    idleBd: "var(--color-neutral-300)"
  };

  function buildGame() {
    var G = GROUPS[state.sel];
    var ri = state.ri;
    var type = ri % 3;                    // 0 聽音辨義 / 1 看華語講族語 / 2 詞卡拼句
    var pair = G.lines[ri];
    var phase = state.phase;
    var ask = phase === "ask", ok = phase === "ok", no = phase === "no";

    // 誘答選項：從同組另外 5 句抽 3 句，加上正解後洗牌
    var others = [];
    for (var i = 0; i < LINES_PER_GROUP; i++) if (i !== ri) others.push(i);
    var dOrd = seededOrder(others.length, state.sel * 7 + ri + 1);
    var pool = [ri, others[dOrd[0]], others[dOrd[1]], others[dOrd[2]]];
    var shown = seededOrder(4, state.sel * 13 + ri + 5).map(function (i) { return pool[i]; });

    var options = shown.map(function (idx, n) {
      var isAns = idx === ri, isPicked = state.picked === idx;
      var bg = C.idle, bd = C.idleBd, fg = "var(--color-text)";
      if (!ask && isAns) { bg = C.okBg; bd = C.okBd; fg = C.okFg; }
      else if (!ask && isPicked) { bg = C.noBg; bd = C.noBd; }
      else if (!ask) { fg = "var(--color-neutral-600)"; }
      return {
        text: type === 0 ? G.lines[idx][1] : G.lines[idx][0],
        letter: "ABCD".charAt(n),
        idx: idx, isAns: isAns,
        bg: bg, bd: bd, fg: fg
      };
    });

    // 詞卡：正解的字 + 另一句的前 2 個字當干擾
    var tk = tokenize(pair[0]);
    var extra = tokenize(G.lines[(ri + 2) % LINES_PER_GROUP][0]).toks.slice(0, 2);
    var bag = tk.toks.concat(extra);
    var tileText = seededOrder(bag.length, state.sel * 29 + ri + 3).map(function (i) { return bag[i]; });
    var used = state.tiles;

    var tiles = tileText.map(function (t, i) {
      return { t: t, i: i, vis: used.indexOf(i) >= 0 ? "hidden" : "visible" };
    });

    var slots = [];
    for (var s = 0; s < tk.toks.length; s++) {
      var filled = used.length > s;
      slots.push({
        t: filled ? tileText[used[s]] : "＿",
        bg: filled ? (ok ? C.okBg : no ? C.noBg : "var(--color-accent-200)") : "transparent",
        fg: filled ? "var(--color-text)" : "var(--color-neutral-500)"
      });
    }

    var dots = [];
    for (var d = 0; d < LINES_PER_GROUP; d++) {
      dots.push(d < ri || phase === "done" ? "var(--color-accent-2-500)"
        : d === ri ? "var(--color-accent)" : "var(--color-neutral-300)");
    }

    return {
      group: G, type: type, pair: pair, tk: tk, tileText: tileText,
      dots: dots, options: options, tiles: tiles, slots: slots,
      ask: ask, ok: ok, no: no,
      last: ri === LINES_PER_GROUP - 1,
      hak: pair[0],
      zh: CONFIG.showHanyu ? pair[1] : ""
    };
  }

  // ---------- 畫面 ----------

  function renderChips() {
    $("#chips").innerHTML = GROUPS.map(function (g, i) {
      var on = i === state.sel;
      return '<button class="btn" data-act="chip" data-i="' + i + '"' +
        ' aria-pressed="' + on + '"' +
        ' style="background:' + (on ? "var(--color-accent)" : "var(--color-surface)") +
        ";color:" + (on ? "var(--color-bg)" : "var(--color-text)") +
        ";border:1px solid " + (on ? "var(--color-accent)" : "var(--color-divider)") +
        ';padding:11px 20px;font-size:15px">' + esc(g.name) + "</button>";
    }).join("");
  }

  function renderGame() {
    var g = buildGame();
    var out = "";

    // 進度列
    out += '<div style="display:flex;align-items:center;gap:20px;padding:20px 32px;background:var(--color-surface)">' +
      '<div style="display:flex;gap:8px;flex:1">' +
      g.dots.map(function (bg) {
        return '<div style="height:12px;flex:1;border-radius:999px;background:' + bg + '"></div>';
      }).join("") +
      '</div><span style="font-family:var(--font-heading);font-size:16px;color:var(--color-accent-700);flex:none">' +
      "第 " + (state.ri + 1) + " 句 / " + LINES_PER_GROUP + "</span></div>";

    if (state.phase !== "done") {
      out += '<div style="padding:34px 32px 32px">';
      out += '<p class="text-muted" style="font-size:13px;margin:0 0 18px;letter-spacing:.1em">' +
        String(state.ri + 1).padStart(2, "0") + " · " + TASKS[g.type] + "</p>";

      if (g.type === 0) {
        out += '<div style="display:flex;align-items:center;gap:24px;margin-bottom:26px;flex-wrap:wrap">' +
          '<button class="btn btn-primary" data-act="replay" style="width:104px;height:104px;border-radius:999px;font-size:16px;padding:0;flex:none">' +
          (state.speaking ? "◉ 播放中" : "▸ 播放") + "</button><div>" +
          '<p style="font-family:var(--font-heading);font-size:28px;margin:0">聽聽看，這句係麼个意思？</p>' +
          '<p class="text-muted" style="font-size:14px;margin:8px 0 0">' + esc(g.group.sub) +
          " · 示意音檔，正式錄音待補</p></div></div>";
      }

      if (g.type === 1) {
        out += '<div style="margin-bottom:26px">' +
          '<p class="text-muted" style="font-size:15px;margin:0 0 10px">用「' + esc(g.group.sub) + '」講這句：</p>' +
          '<p style="font-family:var(--font-heading);font-size:36px;line-height:1.2;margin:0">' + esc(g.zh) + "</p></div>";
      }

      if (g.type < 2) {
        out += '<div class="duo" style="display:grid;grid-template-columns:1fr 1fr;gap:14px">' +
          g.options.map(function (op) {
            return '<button data-act="answer" data-i="' + op.idx + '"' +
              ' style="display:flex;align-items:center;gap:14px;text-align:left;padding:18px 24px;border-radius:999px;border:2px solid ' +
              op.bd + ";background:" + op.bg + ";color:" + op.fg +
              ';font-family:var(--font-body);font-size:19px;cursor:pointer;min-height:64px">' +
              '<span style="font-family:var(--font-heading);font-size:14px;opacity:.6;flex:none">' + op.letter + "</span>" +
              "<span>" + esc(op.text) + "</span></button>";
          }).join("") + "</div>";
      }

      if (g.type === 2) {
        out += "<div>" +
          '<p class="text-muted" style="font-size:15px;margin:0 0 8px">用詞卡拼出這句：</p>' +
          '<p style="font-family:var(--font-heading);font-size:30px;margin:0 0 18px">' + esc(g.zh) + "</p>" +
          '<div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;min-height:76px;padding:14px 18px;border-radius:var(--radius-lg);background:var(--color-surface);margin-bottom:18px">' +
          g.slots.map(function (s) {
            return '<span style="font-family:var(--font-heading);font-size:26px;padding:10px 18px;border-radius:999px;background:' +
              s.bg + ";color:" + s.fg + ';min-width:58px;text-align:center">' + esc(s.t) + "</span>";
          }).join("") +
          '<button class="btn btn-ghost" data-act="undo" style="margin-left:auto;padding:10px 18px;font-size:14px">退一格</button></div>' +
          '<div style="display:flex;flex-wrap:wrap;gap:12px">' +
          g.tiles.map(function (t) {
            return '<button data-act="tile" data-i="' + t.i + '"' +
              ' style="font-family:var(--font-heading);font-size:26px;padding:12px 22px;border-radius:999px;border:2px solid ' +
              C.idleBd + ";background:" + C.idle + ";color:var(--color-text);visibility:" + t.vis +
              ';cursor:pointer;min-height:56px">' + esc(t.t) + "</button>";
          }).join("") + "</div></div>";
      }

      out += "</div>";
    }

    // 答題回饋
    if (g.ok || g.no) {
      out += '<div style="display:flex;align-items:center;gap:24px;padding:26px 32px;background:' +
        (g.ok ? C.okBg : C.noBg) + ';flex-wrap:wrap"><div>' +
        '<p style="font-family:var(--font-heading);font-size:24px;margin:0;color:' +
        (g.ok ? C.okFg : "var(--color-text)") + '">' +
        (g.ok ? "著咧！就係恁樣講。" : "差一點仔——正解係：") + "</p>" +
        '<p style="font-size:24px;margin:10px 0 0">' + esc(g.hak) + "</p>" +
        '<p class="text-muted" style="font-size:16px;margin:3px 0 0">' + esc(g.zh) + "</p></div>" +
        '<button class="btn btn-primary" data-act="next" style="margin-left:auto;flex:none;padding:16px 36px;font-size:17px">' +
        (g.last ? "看今日成績" : "下一句") + "</button></div>";
    }

    // 完成
    if (state.phase === "done") {
      out += '<div class="split" style="padding:38px 32px 34px;display:grid;grid-template-columns:.9fr 1.1fr;gap:36px;align-items:start"><div>' +
        '<div style="width:120px;height:120px;border-radius:999px;background:var(--color-sun);display:grid;place-items:center;text-align:center;font-family:var(--font-heading);font-size:26px;line-height:1.2;color:var(--color-sky-900)">六句<br>講煞</div>' +
        '<h3 style="font-size:32px;margin:20px 0 0">今日六句，講煞咧！</h3>' +
        '<p class="text-muted" style="font-size:16px;margin:10px 0 0">連續第 ' + CONFIG.streak +
        ' 日。明晡日換一个情境，再來六句。</p>' +
        '<div style="display:flex;gap:12px;margin-top:22px;flex-wrap:wrap">' +
        '<button class="btn btn-secondary" data-act="restart" style="padding:13px 24px">再練一遍</button>' +
        '<a class="btn btn-primary" href="#form" style="padding:13px 26px">我要連署</a></div></div>' +
        '<div style="display:flex;flex-direction:column;gap:8px">' +
        g.group.lines.map(function (p, i) {
          return '<div style="display:flex;gap:18px;align-items:baseline;padding:12px 20px;border-radius:20px;background:var(--color-surface)">' +
            '<span style="font-family:var(--font-heading);font-size:15px;color:var(--color-accent-600);flex:none;width:20px">' + (i + 1) + "</span><div>" +
            '<p style="font-family:var(--font-heading);font-size:22px;line-height:1.3;margin:0">' + esc(p[0]) + "</p>" +
            '<p class="text-muted" style="font-size:14px;margin:3px 0 0">' + esc(CONFIG.showHanyu ? p[1] : "") + "</p></div></div>";
        }).join("") + "</div></div>";
    }

    $("#game").innerHTML = out;
  }

  /* 名單卡片樣式。客戶文件標示「名人(大) 團體(中) 個人(小)」，
     大中小指的是顯示字級，因此三類各自一組尺寸與配色。 */
  var KIND_STYLE = {
    /* 名人採反白處理：整頁卡片都是淺色，只有這一類是深底，
       與鄰近個人卡的明度對比約 13:1，掃視時第一眼就會落上來。
       深藍取自既有的 --color-sky-900（同主視覺與頁尾），非新增色。 */
    "名人": {
      size: 26, pad: "20px 32px",
      bg: "var(--color-sky-900)", bd: "var(--color-sky-900)", fg: "var(--color-sun)",
      subFg: "#cfe3ff", subOpacity: ".85",
      shadow: "0 8px 24px rgba(10,33,73,.34)"
    },
    "團體": {
      size: 21, pad: "17px 26px",
      bg: "var(--color-accent-200)", bd: "var(--color-accent-500)", fg: "var(--color-accent-900)",
      subFg: "inherit", subOpacity: ".7",
      shadow: "var(--shadow-sm)"
    },
    "個人": {
      size: 17, pad: "13px 22px",
      bg: "var(--color-surface)", bd: "var(--color-neutral-300)", fg: "var(--color-text)",
      subFg: "inherit", subOpacity: ".7",
      shadow: "var(--shadow-sm)"
    }
  };

  function renderList() {
    var total = CONFIG.signatureCount;

    var celebs = CELEBS.map(function (c) {
      return { name: c.name, kind: "名人", sub: c.sub };
    });
    var groups = ORGS.map(function (g) {
      return { name: g.name, kind: "團體", sub: g.kind };
    });
    var people = SIGNERS.map(function (n, i) {
      return { name: n, kind: "個人", sub: ROLES[i % ROLES.length] };
    });

    var combined = celebs.concat(groups, people);
    var mixedAll = seededOrder(combined.length, 91).map(function (i) { return combined[i]; });
    var pool = state.flt === "celeb" ? celebs
      : state.flt === "org" ? groups
        : state.flt === "person" ? people
          : mixedAll;

    $("#cloud").innerHTML = pool.map(function (it, i) {
      var st = KIND_STYLE[it.kind], s = (i * 37) % 7;
      // 個人數量多，字級加一點隨機微差讓名單看起來不呆板
      var size = it.kind === "個人" ? st.size + (s % 3) * 1.5 : st.size;
      return '<div style="animation:flt ' + (8 + (s % 5) * 1.3).toFixed(1) + "s ease-in-out -" +
        (s * 0.9).toFixed(1) + "s infinite;border-radius:999px;background:" + st.bg +
        ";border:1px solid " + st.bd + ";color:" + st.fg + ";padding:" + st.pad +
        ";box-shadow:" + st.shadow +
        ';display:flex;align-items:baseline;gap:12px;cursor:default">' +
        '<span style="font-family:var(--font-heading);font-size:' + size + 'px;line-height:1.2">' +
        esc(it.name) + "</span>" +
        '<span style="font-size:13px;color:' + st.subFg + ";opacity:" + st.subOpacity +
        ';white-space:nowrap">' + esc(it.sub) + "</span></div>";
    }).join("");

    var filters = [
      { id: "all", label: "全部", n: total },
      { id: "celeb", label: "名人", n: CONFIG.celebTotal },
      { id: "org", label: "團體", n: CONFIG.orgTotal },
      { id: "person", label: "個人", n: CONFIG.personTotal }
    ];
    $("#filters").innerHTML = filters.map(function (f) {
      var on = state.flt === f.id;
      return '<button data-act="filter" data-id="' + f.id + '" aria-pressed="' + on + '"' +
        ' style="display:flex;align-items:center;gap:9px;padding:11px 22px;border-radius:999px;border:2px solid ' +
        (on ? "var(--color-accent)" : "var(--color-neutral-300)") + ";background:" +
        (on ? "var(--color-accent)" : "var(--color-surface)") + ";color:" +
        (on ? "var(--color-bg)" : "var(--color-text)") +
        ';font-family:var(--font-body);font-size:15px;cursor:pointer;min-height:46px">' +
        "<span>" + f.label + "</span>" +
        '<span style="font-family:var(--font-heading);font-size:13px;opacity:.75">' + f.n + "</span></button>";
    }).join("");

    // 未列出的數量，依目前篩選只提示相關類別
    var rest = [
      { label: "位名人", n: CONFIG.celebTotal - celebs.length, show: state.flt === "all" || state.flt === "celeb" },
      { label: "個團體", n: CONFIG.orgTotal - groups.length, show: state.flt === "all" || state.flt === "org" },
      { label: "位個人", n: CONFIG.personTotal - people.length, show: state.flt === "all" || state.flt === "person" }
    ].filter(function (r) { return r.show && r.n > 0; });

    $("#restNote").textContent = rest.length
      ? "另有 " + rest.map(function (r) { return r.n + " " + r.label; }).join("、") + "未及列出"
      : "";
  }

  function renderVideos() {
    $("#videos").innerHTML = VIDEOS.map(function (v) {
      return "<div>" +
        '<div class="ph" style="aspect-ratio:16/9;border-radius:22px;background-color:var(--color-neutral-200)">' +
        '<span class="phl">YouTube 嵌入 · 16:9</span></div>' +
        '<p style="font-family:var(--font-heading);font-size:18px;margin:12px 0 4px">' + esc(v.title) + "</p>" +
        '<p class="text-muted" style="font-size:13px;margin:0">' + esc(v.by) + " · " + esc(v.len) + "</p></div>";
    }).join("");
  }

  function renderForm() {
    $("#formSent").hidden = !state.sent;
    $("#formEntry").hidden = state.sent;
    // 團體連署顯示單位名稱，個人連署顯示姓名
    if (state.sent) {
      setText("#sentName", state.form.org || state.form.name || "朋友");
    }
  }

  /* 團體／個人二選一。
     未選取那一組的欄位設為 disabled —— 不能輸入、不參與 HTML5 驗證、
     也不會隨表單送出，避免兩組資料同時被帶走。 */
  function initSignModes() {
    var form = $("#signForm");
    if (!form) return;
    var modes = Array.prototype.slice.call(form.querySelectorAll(".sign-mode"));

    function apply() {
      modes.forEach(function (m) {
        var radio = m.querySelector('input[type="radio"]');
        var active = radio.checked;
        m.classList.toggle("is-active", active);
        Array.prototype.forEach.call(m.querySelectorAll(".sign-mode-body .input"), function (input) {
          input.disabled = !active;
          input.required = active;
        });
      });
    }

    form.addEventListener("change", function (e) {
      if (e.target.name === "signType") apply();
    });

    // 直接點未選取那組的欄位時自動切換過去，不必先點單選鈕
    modes.forEach(function (m) {
      m.addEventListener("mousedown", function () {
        var radio = m.querySelector('input[type="radio"]');
        if (!radio.checked) { radio.checked = true; apply(); }
      });
    });

    apply();
    return { form: form };
  }

  /* 這些節點會隨文案調整而增減（例如連署名單的 #listCount 已隨文案改寫移除），
     逐一判空，少一個不會讓整段初始化中斷。 */
  function setText(sel, value) {
    var el = $(sel);
    if (el) el.textContent = value;
  }

  function renderCounts() {
    var t = CONFIG.signatureCount.toLocaleString("en-US");
    setText("#heroCount", t);
    setText("#listCount", t);
    setText("#streak", CONFIG.streak);
    setText("#dayLabel", CONFIG.dayLabel);
  }

  function render() {
    renderChips();
    renderGame();
    renderList();
    renderForm();
  }

  // ---------- 事件 ----------

  function onAnswer(idx) {
    if (state.phase !== "ask") return;
    set({ picked: idx, phase: idx === state.ri ? "ok" : "no" });
  }

  function onTile(i) {
    if (state.phase !== "ask") return;
    var g = buildGame();
    var nt = state.tiles.concat([i]);
    if (nt.length >= g.tk.toks.length) {
      var built = nt.map(function (x) { return g.tileText[x]; }).join(g.tk.sep);
      set({ tiles: nt, phase: built === g.tk.toks.join(g.tk.sep) ? "ok" : "no" });
    } else {
      set({ tiles: nt });
    }
  }

  function onSpeak() {
    // 尚無真實音檔，沿用原稿的示意行為：1.4 秒後恢復按鈕文字
    clearTimeout(speakTimer);
    set({ speaking: true });
    speakTimer = setTimeout(function () { set({ speaking: false }); }, 1400);
  }

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act]");
    if (!el) return;
    var act = el.dataset.act;

    if (act === "chip") set({ sel: +el.dataset.i, ri: 0, picked: null, tiles: [], phase: "ask" });
    else if (act === "answer") onAnswer(+el.dataset.i);
    else if (act === "tile") onTile(+el.dataset.i);
    else if (act === "undo") { if (state.phase === "ask") set({ tiles: state.tiles.slice(0, -1) }); }
    else if (act === "replay") onSpeak();
    else if (act === "next") {
      if (state.ri === LINES_PER_GROUP - 1) set({ phase: "done" });
      else set({ ri: state.ri + 1, picked: null, tiles: [], phase: "ask" });
    }
    else if (act === "restart") set({ ri: 0, picked: null, tiles: [], phase: "ask" });
    else if (act === "filter") set({ flt: el.dataset.id });
    else if (act === "resetForm") set({ sent: false, form: { type: "org", org: "", name: "", email: "", publish: true } });
  });

  // ---------- 起動 ----------

  /* 願景說明 lightbox。
     用原生 <dialog>：焦點鎖定、Esc 關閉、backdrop 都由瀏覽器負責。
     按鈕的 href 指向 vision.html，JS 在此攔截改開燈箱；
     沒有 JS（或 dialog 不支援）時就正常連到那一頁，不會變成死連結。 */
  function initVisionModal() {
    var dlg = $("#visionModal");
    var open = $("#visionOpen");
    var close = $("#visionClose");
    if (!dlg || !open || typeof dlg.showModal !== "function") return;

    open.addEventListener("click", function (e) {
      e.preventDefault();
      dlg.showModal();
    });

    close.addEventListener("click", function () { dlg.close(); });

    // 點 backdrop 關閉：點在 dialog 本身（而非內容）才算
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg) dlg.close();
    });

    // 燈箱內的錨點連結：先關閉再讓瀏覽器捲過去
    dlg.addEventListener("click", function (e) {
      var a = e.target.closest('[data-act="visionGoto"]');
      if (a) dlg.close();
    });
  }

  /* 願景說明的動態背景：無限循環。
     進入視線才播、離開視線就暫停 —— 背景影片在畫面外持續解碼是白耗
     CPU 與電量，尤其手機。 */
  function initVisionBg() {
    var v = $("#visionBg");
    if (!v) return;

    // 使用者偏好減少動態時完全不播，只留 poster 靜圖
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce && reduce.matches) return;

    var section = v.closest("section");

    function play() {
      v.preload = "auto";
      var p = v.play();
      if (p && p.catch) p.catch(function () {});   // 自動播放被擋下時不要噴錯
    }

    if (!("IntersectionObserver" in window)) { play(); return; }

    /* threshold 必須是 0，不能用比例。
       threshold 是「區塊自身高度的百分比」，這個區塊高 900px，
       0.35 就要求 315px 落在偵測範圍內；而 rootMargin 又把範圍縮小，
       視窗一矮（例如 540px）範圍就不足 315px，條件永遠成立不了，影片不會播。
       改用 threshold 0 + rootMargin：只要區塊進到視窗上方 75% 就開始，
       與區塊高度無關。 */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) play();
        else if (!v.paused) v.pause();
      });
    }, { threshold: 0, rootMargin: "0px 0px -25% 0px" });
    io.observe(section);   // 不 disconnect：要持續依進出視線切換播放
  }

  /* 願景說明的元素進出場。
     .reveal-ready 由這裡加上，CSS 的隱藏狀態才會生效——
     JS 沒跑到就等於沒有動畫，內容照常顯示。 */
  function initVisionReveal() {
    var sec = document.querySelector("#vision");
    if (!sec) return;

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if ((reduce && reduce.matches) || !("IntersectionObserver" in window)) return;

    sec.classList.add("reveal-ready");

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        // 不 disconnect：捲出去再回來會重新進場
        sec.classList.toggle("is-in", e.isIntersecting);
      });
    }, { threshold: 0, rootMargin: "0px 0px -20% 0px" });
    io.observe(sec);
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderCounts();
    renderVideos();
    render();
    initVisionModal();
    initVisionBg();
    initVisionReveal();

    // hero 影片：靜音自動播放，被瀏覽器擋下時不要噴錯
    var v = $("#heroVideo");
    if (v) {
      v.muted = true; v.defaultMuted = true; v.volume = 0;
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    }

    initSignModes();

    $("#signForm").addEventListener("submit", function (e) {
      e.preventDefault();
      // 尚無後端，維持原稿行為：僅切換為感謝畫面，資料不送出也不留存
      // 一律走 form.elements 取值：form.name 之類的屬性會被 HTMLFormElement
      // 自身的同名屬性遮蔽，直接用 f.name 取欄位並不可靠
      var el = e.target.elements;
      var isOrg = el.signType.value === "org";
      set({
        sent: true,
        form: {
          type: isOrg ? "org" : "person",
          org: isOrg ? el.orgName.value.trim() : "",
          name: isOrg ? "" : el.personName.value.trim(),
          email: (isOrg ? el.orgEmail : el.personEmail).value.trim(),
          publish: el.publish.checked
        }
      });
    });
  });
})();
