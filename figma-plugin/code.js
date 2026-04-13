// ClearPath Design System — Datepicker & Timepicker Component Generator
// Figma Plugin v1.0

figma.showUI(__html__, { width: 320, height: 180 });

figma.ui.onmessage = async (msg) => {
  if (msg.type !== 'create') return;
  await buildAll();
  figma.closePlugin('✅ Datepicker & Timepicker components created!');
};

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const T = {
  // Brand
  brand100:    { r: 0.914, g: 0.969, b: 0.969 }, // #E9F7F7
  brand200:    { r: 0.831, g: 0.941, b: 0.941 }, // #D4F0F0
  brand500:    { r: 0.153, g: 0.698, b: 0.698 }, // #27B2B2
  brand600:    { r: 0.106, g: 0.490, b: 0.490 }, // #1B7D7D
  // Neutral
  neutral50:   { r: 0.980, g: 0.980, b: 0.980 }, // #fafafa
  neutral100:  { r: 0.953, g: 0.957, b: 0.965 }, // #f3f4f6
  neutral200:  { r: 0.941, g: 0.941, b: 0.969 }, // #F0F0F7
  neutral400:  { r: 0.612, g: 0.639, b: 0.686 }, // #9ca3af
  neutral600:  { r: 0.400, g: 0.400, b: 0.537 }, // #666689
  neutral900:  { r: 0.071, g: 0.071, b: 0.098 }, // #121219
  white:       { r: 1,     g: 1,     b: 1     },
  // Red
  red50:       { r: 0.996, g: 0.949, b: 0.949 }, // #fef2f2
  red200:      { r: 0.996, g: 0.792, b: 0.792 }, // #fecaca
  red500:      { r: 0.937, g: 0.267, b: 0.267 }, // #ef4444
  red600:      { r: 0.863, g: 0.149, b: 0.149 }, // #dc2626
};

function solid(c, a = 1) { return [{ type: 'SOLID', color: c, opacity: a }]; }
function noFill()         { return []; }

// ─────────────────────────────────────────────
// FONT HELPERS
// ─────────────────────────────────────────────
const FONTS = {
  regular:  { family: 'Manrope', style: 'Regular' },
  medium:   { family: 'Manrope', style: 'Medium'  },
  semibold: { family: 'Manrope', style: 'SemiBold' },
  bold:     { family: 'Manrope', style: 'Bold' },
};

async function loadFonts() {
  await Promise.all(Object.values(FONTS).map(f => figma.loadFontAsync(f)));
}

// ─────────────────────────────────────────────
// PRIMITIVE CREATORS
// ─────────────────────────────────────────────
function makeRect(w, h, color, opts = {}) {
  const r = figma.createRectangle();
  r.resize(w, h);
  r.fills = color ? solid(color) : noFill();
  if (opts.stroke)       { r.strokes = solid(opts.stroke); r.strokeWeight = opts.strokeWeight || 1.5; r.strokeAlign = 'INSIDE'; }
  if (opts.radius != null) r.cornerRadius = opts.radius;
  if (opts.name)         r.name = opts.name;
  return r;
}

async function makeText(content, size, font, color, opts = {}) {
  const t = figma.createText();
  t.fontName = font;
  t.fontSize = size;
  t.characters = content;
  t.fills = solid(color);
  if (opts.name) t.name = opts.name;
  return t;
}

function makeFrame(w, h, opts = {}) {
  const f = figma.createFrame();
  f.resize(w, h);
  f.fills = opts.fill ? solid(opts.fill) : noFill();
  if (opts.name)    f.name = opts.name;
  if (opts.radius != null) f.cornerRadius = opts.radius;
  if (opts.clip)    f.clipsContent = true;
  if (opts.layout) {
    f.layoutMode = opts.layout;
    if (opts.spacing != null)  f.itemSpacing = opts.spacing;
    if (opts.paddingH != null) { f.paddingLeft = opts.paddingH; f.paddingRight = opts.paddingH; }
    if (opts.paddingV != null) { f.paddingTop = opts.paddingV; f.paddingBottom = opts.paddingV; }
    if (opts.align)   f.primaryAxisAlignItems = opts.align;
    if (opts.cross)   f.counterAxisAlignItems = opts.cross;
  }
  return f;
}

// ─────────────────────────────────────────────
// ICON: render a simple tabler-style SVG icon as a frame
// ─────────────────────────────────────────────
function calendarIconNode(color) {
  const frame = makeFrame(16, 16, { name: 'icon/calendar' });
  // Draw using vectors (simplified calendar shape)
  const v = figma.createVector();
  v.vectorPaths = [{
    windingRule: 'EVENODD',
    data: 'M 3 4 L 13 4 C 13.552 4 14 4.448 14 5 L 14 13 C 14 13.552 13.552 14 13 14 L 3 14 C 2.448 14 2 13.552 2 13 L 2 5 C 2 4.448 2.448 4 3 4 Z M 2 7 L 14 7 M 5 2 L 5 5 M 11 2 L 11 5'
  }];
  v.strokes = solid(color);
  v.strokeWeight = 1.5;
  v.fills = noFill();
  v.strokeCap = 'ROUND';
  v.strokeJoin = 'ROUND';
  v.resize(16, 16);
  frame.appendChild(v);
  return frame;
}

function clockIconNode(color) {
  const frame = makeFrame(16, 16, { name: 'icon/clock' });
  const v = figma.createVector();
  v.vectorPaths = [{
    windingRule: 'EVENODD',
    data: 'M 8 8 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 8 5 L 8 8 L 10.5 10.5'
  }];
  v.strokes = solid(color);
  v.strokeWeight = 1.5;
  v.fills = noFill();
  v.strokeCap = 'ROUND';
  v.strokeJoin = 'ROUND';
  v.resize(16, 16);
  frame.appendChild(v);
  return frame;
}

function chevronIcon(dir, color) {
  const frame = makeFrame(12, 12, { name: `icon/chevron-${dir}` });
  const v = figma.createVector();
  const paths = {
    left:  'M 8 2 L 4 6 L 8 10',
    right: 'M 4 2 L 8 6 L 4 10',
    up:    'M 2 8 L 6 4 L 10 8',
    down:  'M 2 4 L 6 8 L 10 4',
  };
  v.vectorPaths = [{ windingRule: 'EVENODD', data: paths[dir] }];
  v.strokes = solid(color);
  v.strokeWeight = 1.5;
  v.fills = noFill();
  v.strokeCap = 'ROUND';
  v.strokeJoin = 'ROUND';
  v.resize(12, 12);
  frame.appendChild(v);
  return frame;
}

function alertCircleIcon(color) {
  const frame = makeFrame(12, 12, { name: 'icon/alert-circle' });
  const v = figma.createVector();
  v.vectorPaths = [{ windingRule: 'EVENODD', data: 'M 6 6 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 6 4 L 6 6 M 6 8 L 6 8.1' }];
  v.strokes = solid(color);
  v.strokeWeight = 1.5;
  v.fills = noFill();
  v.strokeCap = 'ROUND';
  v.strokeJoin = 'ROUND';
  v.resize(12, 12);
  frame.appendChild(v);
  return frame;
}

// ─────────────────────────────────────────────
// INPUT FIELD (floating label, outlined)
// Shared by both Datepicker and Timepicker
// ─────────────────────────────────────────────
async function buildInputField(cfg) {
  // cfg: { borderColor, labelColor, labelFloated, valueText, iconNode, bgColor, opacity, shadowColor }
  const W = 300, H = 48;
  const frame = makeFrame(W, H, { name: cfg.name || 'input-field', clip: true });
  frame.fills = solid(cfg.bgColor || T.white);
  if (cfg.opacity != null) frame.opacity = cfg.opacity;

  // Border rectangle
  const border = makeRect(W, H, null, {
    stroke: cfg.borderColor,
    strokeWeight: 1.5,
    radius: 8,
    name: 'border',
  });
  border.fills = solid(cfg.bgColor || T.white);
  frame.appendChild(border);

  // Focus ring (shadow effect — shown for focused/error)
  if (cfg.showRing) {
    const ring = makeRect(W, H, null, { name: 'focus-ring' });
    ring.fills = noFill();
    ring.strokes = noFill();
    ring.effects = [{
      type: 'DROP_SHADOW',
      color: { ...cfg.showRing, a: 0.14 },
      offset: { x: 0, y: 0 },
      radius: 4,
      spread: 3,
      visible: true,
      blendMode: 'NORMAL',
    }];
    ring.cornerRadius = 8;
    ring.resize(W, H);
    frame.appendChild(ring);
  }

  // Floating label
  const labelSize = cfg.labelFloated ? 11 : 14;
  const labelFont = cfg.labelFloated ? FONTS.semibold : FONTS.medium;
  const label = await makeText(cfg.labelText || 'Label', labelSize, labelFont, cfg.labelColor, { name: 'label' });

  if (cfg.labelFloated) {
    // Label sits on the top border
    label.x = 8;
    label.y = -Math.round(label.height / 2);
    // White bg behind label to cut through border
    const labelBg = makeRect(label.width + 8, label.height, T.white, { name: 'label-bg' });
    labelBg.x = label.x - 4;
    labelBg.y = label.y;
    frame.appendChild(labelBg);
    frame.appendChild(label);
  } else {
    label.x = 16;
    label.y = Math.round((H - label.height) / 2);
    frame.appendChild(label);
  }

  // Placeholder or value text
  if (cfg.valueText || cfg.placeholderText) {
    const isPlaceholder = !cfg.valueText;
    const textColor = isPlaceholder ? T.neutral400 : (cfg.textColor || T.neutral900);
    const textFont = isPlaceholder ? FONTS.regular : FONTS.medium;
    const txt = await makeText(
      cfg.valueText || cfg.placeholderText,
      14, textFont, textColor,
      { name: isPlaceholder ? 'placeholder' : 'value' }
    );
    txt.x = 16;
    txt.y = Math.round((H - txt.height) / 2);
    frame.appendChild(txt);
  }

  // Icon on right
  if (cfg.iconNode) {
    cfg.iconNode.x = W - 16 - 16; // right: 16px from edge
    cfg.iconNode.y = Math.round((H - 16) / 2);
    frame.appendChild(cfg.iconNode);
  }

  // Optional clear button circle (for Filled state)
  if (cfg.showClear) {
    const clearCircle = makeRect(18, 18, T.neutral200, { radius: 9, name: 'clear-btn' });
    clearCircle.x = W - 16 - 16 - 24;
    clearCircle.y = Math.round((H - 18) / 2);
    frame.appendChild(clearCircle);
    // X mark
    const xMark = await makeText('×', 12, FONTS.semibold, T.neutral600, { name: 'x' });
    xMark.x = clearCircle.x + 4;
    xMark.y = clearCircle.y + 2;
    frame.appendChild(xMark);
  }

  frame.resize(W, H);
  return frame;
}

// ─────────────────────────────────────────────
// ERROR MESSAGE ROW
// ─────────────────────────────────────────────
async function buildErrorMsg(msgText) {
  const frame = makeFrame(300, 20, { name: 'error-message', layout: 'HORIZONTAL', spacing: 4, cross: 'CENTER' });
  const icon = alertCircleIcon(T.red600);
  frame.appendChild(icon);
  const txt = await makeText(msgText, 12, FONTS.regular, T.red600, { name: 'error-text' });
  frame.appendChild(txt);
  frame.resize(300, 20);
  return frame;
}

// ─────────────────────────────────────────────
// CALENDAR PANEL
// ─────────────────────────────────────────────
async function buildCalendarPanel(opts = {}) {
  // opts: { selectedDay, rangeStart, rangeEnd }
  const W = 296, RADIUS = 8;
  const panel = makeFrame(W, 0, { name: 'calendar-panel', clip: true, radius: RADIUS });
  panel.fills = solid(T.white);
  panel.strokes = solid(T.neutral200);
  panel.strokeWeight = 1;
  panel.strokeAlign = 'INSIDE';
  panel.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.10 },
    offset: { x: 0, y: 8 },
    radius: 24,
    spread: 0,
    visible: true,
    blendMode: 'NORMAL',
  }];

  let yOffset = 0;

  // ── Nav header ──
  const nav = makeFrame(W, 44, { name: 'nav-header', fill: T.neutral50 });
  nav.y = yOffset;
  // Left chevron
  const chevL = chevronIcon('left', T.neutral600);
  chevL.x = 12; chevL.y = 16;
  nav.appendChild(chevL);
  // Month/Year title
  const monthTitle = await makeText('April 2026', 14, FONTS.bold, T.neutral900, { name: 'month-title' });
  monthTitle.textAlignHorizontal = 'CENTER';
  monthTitle.resize(160, monthTitle.height);
  monthTitle.x = Math.round((W - 160) / 2);
  monthTitle.y = Math.round((44 - monthTitle.height) / 2);
  nav.appendChild(monthTitle);
  // Right chevron
  const chevR = chevronIcon('right', T.neutral600);
  chevR.x = W - 12 - 12; chevR.y = 16;
  nav.appendChild(chevR);
  // Bottom border line
  const navLine = makeRect(W, 1, T.neutral100, { name: 'divider' });
  navLine.y = 43;
  nav.appendChild(navLine);
  panel.appendChild(nav);
  yOffset += 44;

  // ── Weekday headers ──
  const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const weekRow = makeFrame(W, 32, { name: 'weekday-row' });
  weekRow.y = yOffset;
  const cellW = Math.floor((W - 16) / 7);
  for (let i = 0; i < 7; i++) {
    const d = await makeText(DAYS_OF_WEEK[i], 11, FONTS.bold, T.neutral400);
    d.textAlignHorizontal = 'CENTER';
    d.resize(cellW, d.height);
    d.x = 8 + i * cellW;
    d.y = Math.round((32 - d.height) / 2);
    weekRow.appendChild(d);
  }
  panel.appendChild(weekRow);
  yOffset += 32;

  // ── Day grid (April 2026 — starts Wednesday = col index 3) ──
  // April 2026: starts Wed (index 3), 30 days
  // Row 1: [blank, blank, blank, 1, 2, 3, 4]
  // We'll render 5 rows of 7 days
  const GRID_DAYS = [
    null, null, null, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, null, null,
  ];

  const CELL_H = 34;
  const ROWS = 5;
  const gridFrame = makeFrame(W, ROWS * CELL_H + 8, { name: 'day-grid' });
  gridFrame.y = yOffset;

  for (let i = 0; i < GRID_DAYS.length; i++) {
    const row = Math.floor(i / 7);
    const col = i % 7;
    const day = GRID_DAYS[i];
    const x = 8 + col * cellW;
    const y = 4 + row * CELL_H;

    if (day === null) continue;

    const isSelected = day === (opts.selectedDay || 15);
    const isToday    = day === 10;
    const isRangeS   = day === (opts.rangeStart);
    const isRangeE   = day === (opts.rangeEnd);
    const inRange    = opts.rangeStart && opts.rangeEnd
      && day > opts.rangeStart && day < opts.rangeEnd;

    // Day cell background
    let bgColor = null;
    let textColor = T.neutral900;
    let strokeColor = null;
    let cellRadius = 4;
    let fontStyle = FONTS.medium;

    if (isSelected || isRangeS || isRangeE) {
      bgColor = T.brand500;
      textColor = T.white;
      fontStyle = FONTS.bold;
    } else if (isToday) {
      bgColor = T.brand100;
      textColor = T.brand600;
      strokeColor = T.brand500;
      fontStyle = FONTS.bold;
    } else if (inRange) {
      bgColor = T.brand200;
      textColor = T.brand600;
      cellRadius = 0;
    }

    if (isRangeS) {
      cellRadius = 0;
      // left rounded only – Figma doesn't support per-corner on rect easily, use frame
    }

    const cellFrame = makeFrame(cellW, CELL_H, { name: `day-${day}` });
    cellFrame.x = x;
    cellFrame.y = y;

    if (bgColor || strokeColor) {
      const bg = makeRect(cellW - 2, CELL_H - 4, bgColor, {
        radius: cellRadius,
        stroke: strokeColor,
        strokeWeight: 1.5,
        name: 'day-bg',
      });
      bg.x = 1; bg.y = 2;
      if (!bgColor) bg.fills = noFill();
      cellFrame.appendChild(bg);
    }

    const dayTxt = await makeText(String(day), 13, fontStyle, textColor, { name: 'day-label' });
    dayTxt.textAlignHorizontal = 'CENTER';
    dayTxt.resize(cellW - 2, dayTxt.height);
    dayTxt.x = 1;
    dayTxt.y = Math.round((CELL_H - dayTxt.height) / 2);
    cellFrame.appendChild(dayTxt);
    gridFrame.appendChild(cellFrame);
  }

  panel.appendChild(gridFrame);
  yOffset += ROWS * CELL_H + 8;

  // ── Action strip ──
  const actions = makeFrame(W, 40, { name: 'action-strip', fill: T.neutral50 });
  actions.y = yOffset;
  const topLine = makeRect(W, 1, T.neutral100, { name: 'divider' });
  actions.appendChild(topLine);

  const clearBtn = await makeText('Clear', 12, FONTS.semibold, T.red600, { name: 'btn-clear' });
  clearBtn.x = 12;
  clearBtn.y = Math.round((40 - clearBtn.height) / 2) + 1;
  actions.appendChild(clearBtn);

  const todayBtn = await makeText('Today', 12, FONTS.semibold, T.brand500, { name: 'btn-today' });
  todayBtn.x = W - 12 - todayBtn.width;
  todayBtn.y = Math.round((40 - todayBtn.height) / 2) + 1;
  actions.appendChild(todayBtn);

  panel.appendChild(actions);
  yOffset += 40;

  panel.resize(W, yOffset);
  return panel;
}

// ─────────────────────────────────────────────
// TIME PANEL
// ─────────────────────────────────────────────
async function buildTimePanel(is24hr = false) {
  const W = 280, RADIUS = 8;
  const panel = makeFrame(W, 0, { name: 'time-panel', clip: true, radius: RADIUS });
  panel.fills = solid(T.white);
  panel.strokes = solid(T.neutral200);
  panel.strokeWeight = 1;
  panel.strokeAlign = 'INSIDE';
  panel.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.10 },
    offset: { x: 0, y: 8 },
    radius: 24,
    spread: 0,
    visible: true,
    blendMode: 'NORMAL',
  }];

  let yOff = 0;

  // ── Format bar ──
  const fmtBar = makeFrame(W, 40, { name: 'format-bar', fill: T.neutral50 });
  fmtBar.y = yOff;
  const fmtLine = makeRect(W, 1, T.neutral100, { name: 'divider' });
  fmtLine.y = 39;
  fmtBar.appendChild(fmtLine);

  const fmtLabel = await makeText('Format', 11, FONTS.bold, T.neutral400, { name: 'fmt-label' });
  fmtLabel.x = 12;
  fmtLabel.y = Math.round((40 - fmtLabel.height) / 2);
  fmtBar.appendChild(fmtLabel);

  // Toggle pill
  const toggleBg = makeRect(82, 26, T.neutral200, { radius: 5, name: 'toggle-bg' });
  toggleBg.x = W - 12 - 82;
  toggleBg.y = Math.round((40 - 26) / 2);
  fmtBar.appendChild(toggleBg);

  // Active toggle
  const activeBtn = makeRect(38, 22, T.white, { radius: 3, name: 'active-pill' });
  activeBtn.x = is24hr ? toggleBg.x + 42 : toggleBg.x + 2;
  activeBtn.y = toggleBg.y + 2;
  fmtBar.appendChild(activeBtn);

  const t12 = await makeText('12hr', 11, is24hr ? FONTS.medium : FONTS.bold,
    is24hr ? T.neutral400 : T.neutral900, { name: '12hr-label' });
  t12.x = toggleBg.x + 2 + Math.round((38 - t12.width) / 2);
  t12.y = toggleBg.y + Math.round((26 - t12.height) / 2);
  fmtBar.appendChild(t12);

  const t24 = await makeText('24hr', 11, is24hr ? FONTS.bold : FONTS.medium,
    is24hr ? T.neutral900 : T.neutral400, { name: '24hr-label' });
  t24.x = toggleBg.x + 42 + Math.round((38 - t24.width) / 2);
  t24.y = toggleBg.y + Math.round((26 - t24.height) / 2);
  fmtBar.appendChild(t24);

  panel.appendChild(fmtBar);
  yOff += 40;

  // ── Columns ──
  const COLS = is24hr
    ? [{ label: 'HR', items: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'], selected: '9' },
       { label: 'MIN', items: ['00','05','10','15','20','25','30','35','40','45','50','55'], selected: '30' }]
    : [{ label: 'HR', items: ['1','2','3','4','5','6','7','8','9','10','11','12'], selected: '9' },
       { label: 'MIN', items: ['00','05','10','15','20','25','30','35','40','45','50','55'], selected: '30' },
       { label: '—', items: ['AM','PM'], selected: 'AM', isAmPm: true }];

  const COL_COUNT = COLS.length;
  const colW = Math.floor(W / COL_COUNT);
  const VISIBLE_ITEMS = 4;
  const ITEM_H = 36;
  const INC_BTN_H = 28;
  const COL_HDR_H = 28;
  const COL_BODY_H = VISIBLE_ITEMS * ITEM_H;
  const COL_TOTAL = INC_BTN_H + COL_HDR_H + COL_BODY_H + INC_BTN_H;

  const colsFrame = makeFrame(W, COL_TOTAL, { name: 'columns' });
  colsFrame.y = yOff;

  for (let ci = 0; ci < COLS.length; ci++) {
    const col = COLS[ci];
    const cx = ci * colW;

    const colFrame = makeFrame(colW, COL_TOTAL, { name: `col-${col.label}` });
    colFrame.x = cx;

    // Right border (not for last col)
    if (ci < COLS.length - 1) {
      const divLine = makeRect(1, COL_TOTAL, T.neutral100, { name: 'col-divider' });
      divLine.x = colW - 1;
      colFrame.appendChild(divLine);
    }

    let localY = 0;

    // Inc button top
    const incTop = makeFrame(colW, INC_BTN_H, { name: 'inc-btn', fill: T.neutral50 });
    incTop.y = localY;
    const incLine = makeRect(colW, 1, T.neutral100, { name: 'divider' });
    incLine.y = INC_BTN_H - 1;
    incTop.appendChild(incLine);
    if (!col.isAmPm) {
      const cUp = chevronIcon('up', T.neutral400);
      cUp.x = Math.round((colW - 12) / 2);
      cUp.y = Math.round((INC_BTN_H - 12) / 2);
      incTop.appendChild(cUp);
    }
    colFrame.appendChild(incTop);
    localY += INC_BTN_H;

    // Column header
    const hdr = makeFrame(colW, COL_HDR_H, { name: 'col-header', fill: T.neutral50 });
    hdr.y = localY;
    const hdrLine = makeRect(colW, 1, T.neutral100, { name: 'divider' });
    hdrLine.y = COL_HDR_H - 1;
    hdr.appendChild(hdrLine);
    const hdrTxt = await makeText(col.label, 10, FONTS.bold, T.neutral400, { name: 'header-label' });
    hdrTxt.textAlignHorizontal = 'CENTER';
    hdrTxt.resize(colW, hdrTxt.height);
    hdrTxt.y = Math.round((COL_HDR_H - hdrTxt.height) / 2);
    hdr.appendChild(hdrTxt);
    colFrame.appendChild(hdr);
    localY += COL_HDR_H;

    // Items — show 4 centered around selected
    const selIdx = col.items.indexOf(col.selected);
    const startIdx = Math.max(0, Math.min(selIdx - 1, col.items.length - VISIBLE_ITEMS));
    const visibleItems = col.items.slice(startIdx, startIdx + VISIBLE_ITEMS);

    for (let ii = 0; ii < visibleItems.length; ii++) {
      const itemVal = visibleItems[ii];
      const isSelected = itemVal === col.selected;
      const itemFrame = makeFrame(colW, ITEM_H, { name: `item-${itemVal}` });
      itemFrame.y = localY;

      if (isSelected) {
        const selBg = makeRect(colW - 4, ITEM_H - 4, T.brand500, { radius: 3, name: 'selected-bg' });
        selBg.x = 2; selBg.y = 2;
        itemFrame.appendChild(selBg);
      }

      const itemTxt = await makeText(itemVal, 14,
        isSelected ? FONTS.bold : FONTS.medium,
        isSelected ? T.white : T.neutral900,
        { name: 'item-label' }
      );
      itemTxt.textAlignHorizontal = 'CENTER';
      itemTxt.resize(colW, itemTxt.height);
      itemTxt.y = Math.round((ITEM_H - itemTxt.height) / 2);
      itemFrame.appendChild(itemTxt);
      colFrame.appendChild(itemFrame);
      localY += ITEM_H;
    }

    // Dec button bottom
    const decBot = makeFrame(colW, INC_BTN_H, { name: 'dec-btn', fill: T.neutral50 });
    decBot.y = localY;
    const decLine = makeRect(colW, 1, T.neutral100, { name: 'divider' });
    decBot.appendChild(decLine);
    if (!col.isAmPm) {
      const cDn = chevronIcon('down', T.neutral400);
      cDn.x = Math.round((colW - 12) / 2);
      cDn.y = Math.round((INC_BTN_H - 12) / 2);
      decBot.appendChild(cDn);
    }
    colFrame.appendChild(decBot);

    colsFrame.appendChild(colFrame);
  }

  panel.appendChild(colsFrame);
  yOff += COL_TOTAL;

  // ── Action strip ──
  const actions = makeFrame(W, 40, { name: 'action-strip', fill: T.neutral50 });
  actions.y = yOff;
  const actLine = makeRect(W, 1, T.neutral100, { name: 'divider' });
  actions.appendChild(actLine);

  const clearBtn = await makeText('Clear', 12, FONTS.semibold, T.red600, { name: 'btn-clear' });
  clearBtn.x = 12;
  clearBtn.y = Math.round((40 - clearBtn.height) / 2) + 1;
  actions.appendChild(clearBtn);

  const doneFrame = makeFrame(0, 28, { name: 'btn-done', fill: T.brand500, radius: 4 });
  const doneTxt = await makeText('Done', 12, FONTS.semibold, T.white, { name: 'done-label' });
  doneFrame.resize(doneTxt.width + 24, 28);
  doneTxt.x = 12;
  doneTxt.y = Math.round((28 - doneTxt.height) / 2);
  doneFrame.appendChild(doneTxt);
  doneFrame.x = W - 12 - doneFrame.width;
  doneFrame.y = Math.round((40 - 28) / 2);
  actions.appendChild(doneFrame);

  panel.appendChild(actions);
  yOff += 40;

  panel.resize(W, yOff);
  return panel;
}

// ─────────────────────────────────────────────
// BUILD ONE DATEPICKER VARIANT
// ─────────────────────────────────────────────
async function buildDatepickerVariant(state) {
  const isOpen    = state === 'Focused' || state === 'Open';
  const isFilled  = state === 'Filled';
  const isDisabled= state === 'Disabled';
  const isError   = state === 'Error';
  const isHover   = state === 'Hover';

  let borderColor = T.neutral200;
  let labelColor  = T.neutral600;
  let labelFloated = isFilled || isError;
  let showRing    = null;
  let valueText   = isFilled  ? 'Apr 10, 2026' : (isError ? 'Feb 30, 2026' : null);
  let placeholderText = (!isFilled && !isError) ? 'DD MMM YYYY' : null;
  if (isFilled || isError) labelFloated = true;
  if (isOpen) { labelColor = T.brand500; borderColor = T.brand500; labelFloated = true; showRing = T.brand500; }
  if (isHover) { borderColor = T.neutral600; }
  if (isFilled) { borderColor = T.brand500; labelColor = T.brand500; }
  if (isError) { borderColor = T.red500; labelColor = T.red500; showRing = T.red500; }
  if (isDisabled) { borderColor = T.neutral200; labelColor = T.neutral400; }

  const comp = figma.createComponent();
  comp.name = `State=${state}`;
  comp.resize(300, isOpen ? 370 : (isError ? 72 : 48));
  comp.fills = noFill();
  comp.clipsContent = false;

  const iconNode = calendarIconNode(
    isDisabled ? T.neutral400 : (isOpen || isFilled) ? T.brand500 : T.neutral400
  );

  const inputField = await buildInputField({
    name: 'input-field',
    borderColor,
    labelColor,
    labelText: 'Appointment date',
    labelFloated: labelFloated || isOpen,
    valueText,
    placeholderText,
    bgColor: isDisabled ? T.neutral100 : T.white,
    opacity: isDisabled ? 0.6 : 1,
    showRing,
    showClear: isFilled,
    iconNode,
  });
  comp.appendChild(inputField);

  if (isError) {
    const errMsg = await buildErrorMsg('Please select a valid date.');
    errMsg.x = 0;
    errMsg.y = 52;
    comp.appendChild(errMsg);
    comp.resize(300, 72);
  }

  if (isOpen) {
    const cal = await buildCalendarPanel({ selectedDay: 15 });
    cal.x = 0;
    cal.y = 54;
    comp.appendChild(cal);
    comp.resize(300, 54 + cal.height + 8);
  }

  return comp;
}

// ─────────────────────────────────────────────
// BUILD ONE TIMEPICKER VARIANT
// ─────────────────────────────────────────────
async function buildTimepickerVariant(state, is24hr = false) {
  const isOpen    = state === 'Focused' || state === 'Open';
  const isFilled  = state === 'Filled';
  const isDisabled= state === 'Disabled';
  const isError   = state === 'Error';
  const isHover   = state === 'Hover';

  let borderColor = T.neutral200;
  let labelColor  = T.neutral600;
  let labelFloated = isFilled || isError;
  let showRing    = null;
  let valueText   = isFilled ? (is24hr ? '14:30' : '9:30 AM') : (isError ? '25:99' : null);
  let placeholderText = (!isFilled && !isError) ? (is24hr ? 'HH:MM' : 'HH:MM AM') : null;
  if (isOpen) { labelColor = T.brand500; borderColor = T.brand500; labelFloated = true; showRing = T.brand500; }
  if (isHover) { borderColor = T.neutral600; }
  if (isFilled) { borderColor = T.brand500; labelColor = T.brand500; labelFloated = true; }
  if (isError) { borderColor = T.red500; labelColor = T.red500; showRing = T.red500; labelFloated = true; }
  if (isDisabled) { borderColor = T.neutral200; labelColor = T.neutral400; }

  const comp = figma.createComponent();
  const fmtSuffix = is24hr ? ', Format=24hr' : ', Format=12hr';
  comp.name = `State=${state}${fmtSuffix}`;
  comp.resize(300, 48);
  comp.fills = noFill();
  comp.clipsContent = false;

  const iconNode = clockIconNode(
    isDisabled ? T.neutral400 : (isOpen || isFilled) ? T.brand500 : T.neutral400
  );

  const inputField = await buildInputField({
    name: 'input-field',
    borderColor,
    labelColor,
    labelText: 'Appointment time',
    labelFloated: labelFloated || isOpen,
    valueText,
    placeholderText,
    bgColor: isDisabled ? T.neutral100 : T.white,
    opacity: isDisabled ? 0.6 : 1,
    showRing,
    iconNode,
  });
  comp.appendChild(inputField);

  if (isError) {
    const errMsg = await buildErrorMsg('Please enter a valid time.');
    errMsg.x = 0;
    errMsg.y = 52;
    comp.appendChild(errMsg);
    comp.resize(300, 72);
  }

  if (isOpen) {
    const panel = await buildTimePanel(is24hr);
    panel.x = 0;
    panel.y = 54;
    comp.appendChild(panel);
    comp.resize(300, 54 + panel.height + 8);
  }

  return comp;
}

// ─────────────────────────────────────────────
// MAIN BUILD
// ─────────────────────────────────────────────
async function buildAll() {
  await loadFonts();

  const page = figma.currentPage;
  const STATES = ['Default', 'Hover', 'Focused', 'Filled', 'Disabled', 'Error'];

  // ── Datepicker ComponentSet ──
  const dpVariants = [];
  for (const state of STATES) {
    const comp = await buildDatepickerVariant(state);
    page.appendChild(comp);
    dpVariants.push(comp);
  }

  const dpSet = figma.combineAsVariants(dpVariants, page);
  dpSet.name = 'Datepicker';
  dpSet.x = 80;
  dpSet.y = 300;
  dpSet.paddingLeft = 40;
  dpSet.paddingRight = 40;
  dpSet.paddingTop = 40;
  dpSet.paddingBottom = 40;
  dpSet.itemSpacing = 40;
  dpSet.fills = [{ type: 'SOLID', color: T.neutral100, opacity: 0.6 }];
  dpSet.strokeWeight = 1;
  dpSet.strokes = solid(T.neutral200);
  dpSet.cornerRadius = 8;
  dpSet.layoutMode = 'HORIZONTAL';
  dpSet.primaryAxisSizingMode = 'AUTO';
  dpSet.counterAxisSizingMode = 'AUTO';
  dpSet.counterAxisAlignItems = 'MIN';

  // ── Timepicker ComponentSet (12hr) ──
  const tp12Variants = [];
  for (const state of STATES) {
    const comp = await buildTimepickerVariant(state, false);
    page.appendChild(comp);
    tp12Variants.push(comp);
  }

  // ── Timepicker variants (24hr) ──
  const tp24Variants = [];
  for (const state of STATES) {
    const comp = await buildTimepickerVariant(state, true);
    page.appendChild(comp);
    tp24Variants.push(comp);
  }

  const tpSet = figma.combineAsVariants([...tp12Variants, ...tp24Variants], page);
  tpSet.name = 'Timepicker';
  tpSet.x = 80;
  tpSet.y = dpSet.y + dpSet.height + 80;
  tpSet.paddingLeft = 40;
  tpSet.paddingRight = 40;
  tpSet.paddingTop = 40;
  tpSet.paddingBottom = 40;
  tpSet.itemSpacing = 40;
  tpSet.fills = [{ type: 'SOLID', color: T.neutral100, opacity: 0.6 }];
  tpSet.strokeWeight = 1;
  tpSet.strokes = solid(T.neutral200);
  tpSet.cornerRadius = 8;
  tpSet.layoutMode = 'HORIZONTAL';
  tpSet.layoutWrap = 'WRAP';
  tpSet.primaryAxisSizingMode = 'FIXED';
  tpSet.resize(tpSet.width, tpSet.height);
  tpSet.counterAxisSizingMode = 'AUTO';

  // Scroll to the components
  figma.viewport.scrollAndZoomIntoView([dpSet, tpSet]);
}
