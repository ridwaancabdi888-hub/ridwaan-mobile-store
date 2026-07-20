/* =========================================================
   Ridwaan Mobile Store — script.js
   Vanilla JS. State persisted in localStorage under "rms:v1".
   ========================================================= */
"use strict";

/* ---------------- Product data ---------------- */
// gr = [thumb background, phone body] gradients for the CSS product art.
const PRODUCTS = [
  {id:"ip16pm", name:"iPhone 16 Pro Max", brand:"Apple", price:1199, old:1299, rating:4.9, reviews:2381,
   storage:["256GB","512GB","1TB"], colors:["#3b3b40","#d9d3c7","#c9b380","#3a4a5a"], stock:true, points:240,
   gr:["#EFE3D2,#E4CBAA","#5a5a62,#17171d"],
   desc:"Titanium design with the A18 Pro chip, a 48MP Fusion camera system, Camera Control, and the best iPhone battery life ever."},
  {id:"ip15", name:"iPhone 15", brand:"Apple", price:699, old:799, rating:4.7, reviews:4102,
   storage:["128GB","256GB","512GB"], colors:["#f4c9d2","#f7e9a8","#b9d9c9","#a7b8d8","#2f2f33"], stock:true, points:140,
   gr:["#F6E7EA,#EFC9D2","#e7aab8,#b06077"],
   desc:"Dynamic Island, a 48MP main camera with 2× telephoto quality, USB-C, and all-day battery in a color-infused glass design."},
  {id:"s25u", name:"Samsung Galaxy S25 Ultra", brand:"Samsung", price:1149, old:1299, rating:4.8, reviews:1954,
   storage:["256GB","512GB","1TB"], colors:["#2b2f38","#cfd4dc","#3c4f6e","#d9c9a8"], stock:true, points:230,
   gr:["#E3E8EF,#C9D2DF","#4a5568,#171c26"],
   desc:"Galaxy AI, a 200MP camera, built-in S Pen, and the Snapdragon 8 Elite for Galaxy inside a slim titanium frame."},
  {id:"a56", name:"Samsung Galaxy A56", brand:"Samsung", price:449, old:499, rating:4.4, reviews:3287,
   storage:["128GB","256GB"], colors:["#b8c6e6","#3a3d45","#e7dfd2","#c8e3d4"], stock:true, points:90,
   gr:["#E7EDF8,#C9D6F0","#8ea4d6,#4a5f92"],
   desc:"Awesome value: a bright 120Hz Super AMOLED display, 50MP OIS camera, IP67 rating, and six years of updates."},
  {id:"px9p", name:"Google Pixel 9 Pro", brand:"Google", price:899, old:999, rating:4.7, reviews:1622,
   storage:["128GB","256GB","512GB"], colors:["#e8e3da","#2e2f33","#dfc6ce","#b9c8bd"], stock:true, points:180,
   gr:["#EAE6DE,#D6CFC2","#7d7a72,#3c3a36"],
   desc:"Gemini built in, a pro triple camera with Super Res Zoom, the Tensor G4 chip, and seven years of OS updates."},
  {id:"px8a", name:"Google Pixel 8a", brand:"Google", price:399, old:499, rating:4.5, reviews:2870,
   storage:["128GB","256GB"], colors:["#a9c8e8","#2e2f33","#e8e3da","#c9e2c9"], stock:true, points:80,
   gr:["#E2ECF7,#BFD7EE","#7fb0dd,#3f6ea8"],
   desc:"The best of Pixel for less: Tensor G3, a stunning 6.1-inch Actua display, and amazing AI-powered photo editing."},
  {id:"x15u", name:"Xiaomi 15 Ultra", brand:"Xiaomi", price:1099, old:1199, rating:4.6, reviews:987,
   storage:["256GB","512GB","1TB"], colors:["#1f1f23","#e6e2da","#5a4a3a"], stock:true, points:220,
   gr:["#EDE7DE,#DBCFBE","#4d4438,#1c1712"],
   desc:"Co-engineered Leica optics with a 1-inch main sensor, 200MP periscope zoom, and blazing 90W HyperCharge."},
  {id:"rn14p", name:"Redmi Note 14 Pro", brand:"Xiaomi", price:329, old:379, rating:4.3, reviews:5241,
   storage:["128GB","256GB","512GB"], colors:["#2c2c30","#cfe0ef","#e9d8c8"], stock:false, points:66,
   gr:["#E7EEF4,#CBDCEA","#9db8cd,#4e6d86"],
   desc:"A 200MP AI camera, curved 120Hz AMOLED display, IP68 protection, and huge battery life at a friendly price."},
  {id:"op13", name:"OnePlus 13", brand:"OnePlus", price:899, old:999, rating:4.7, reviews:1348,
   storage:["256GB","512GB"], colors:["#20242c","#e8e4dd","#3a5a8c"], stock:true, points:180,
   gr:["#E5EAF2,#C7D3E6","#5c78a8,#26374f"],
   desc:"Snapdragon 8 Elite, Hasselblad cameras, a radiant 2K ProXDR display, and 100W SUPERVOOC fast charging."},
  {id:"np3", name:"Nothing Phone 3", brand:"Nothing", price:799, old:849, rating:4.5, reviews:764,
   storage:["256GB","512GB"], colors:["#f2f2f2","#1c1c1e"], stock:true, points:160,
   gr:["#EFEFEF,#DCDCDC","#c9c9cc,#8b8b90"],
   desc:"The iconic transparent design with the new Glyph Matrix, a fast dual 50MP camera, and clean Nothing OS."},
  {id:"me60p", name:"Motorola Edge 60 Pro", brand:"Motorola", price:549, old:649, rating:4.4, reviews:892,
   storage:["256GB","512GB"], colors:["#3d2f4f","#2c4437","#5a4632"], stock:true, points:110,
   gr:["#EAE4F1,#D3C6E4","#8f7cae,#4a3a66"],
   desc:"A quad-curved pOLED display, 50MP camera tuned with Pantone color, military-grade toughness, and 90W charging."},
  {id:"hm7p", name:"Honor Magic7 Pro", brand:"Honor", price:999, old:1099, rating:4.5, reviews:611,
   storage:["256GB","512GB"], colors:["#26303e","#e6e0d5","#a8bfd6"], stock:true, points:200,
   gr:["#E4EAF1,#C6D4E4","#6d86a3,#2c3e52"],
   desc:"AI Falcon camera with a 200MP telephoto, huge silicon-carbon battery, and an ultra-bright quad-curved display."},
];
const BRANDS = ["All","Apple","Samsung","Google","Xiaomi","OnePlus","Nothing","Motorola","Honor"];
const LEVELS = [
  {name:"Bronze",   min:0,    max:999,  icon:"🥉", perks:"Member prices"},
  {name:"Silver",   min:1000, max:1799, icon:"🥈", perks:"Free delivery over $500"},
  {name:"Gold",     min:1800, max:2999, icon:"🥇", perks:"Free delivery + 1.5× points"},
  {name:"Platinum", min:3000, max:Infinity, icon:"💎", perks:"VIP support + early access"},
];
const POINT_VALUE = 0.02;       // 1 point = $0.02
const POINTS_REDEEM = 500;      // redeemable chunk in cart
const DELIVERY_FEE = 15;
const FREE_DELIVERY_OVER = 800;

/* ---------------- State (localStorage) ---------------- */
const STORE_KEY = "rms:v1";
const defaultState = () => ({
  cart: [],                      // {id, storage, color, qty}
  wishlist: [],
  points: 1850,                  // demo user starts Gold
  orders: [],
  activity: [
    {name:"Welcome bonus", pts:+150, date:"Jun 02"},
    {name:"Order #RMS-48213", pts:+180, date:"Jun 21"},
    {name:"Redeemed at checkout", pts:-500, date:"Jul 01"},
    {name:"Order #RMS-51907", pts:+220, date:"Jul 09"},
  ],
  promo: null,
  usePoints: false,
  prefs: { dark:false, notif:true, bio:false, lang:"en" },
  goldSeen: false,
});
let S = loadState();
function loadState(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(!raw) return defaultState();
    return Object.assign(defaultState(), JSON.parse(raw));
  }catch(e){ console.warn("State reset:", e); return defaultState(); }
}
function save(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(S)); }catch(e){ /* storage full/blocked */ } }

/* ---------------- Tiny helpers ---------------- */
const $  = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
const money = n => "$" + n.toLocaleString("en-US", {maximumFractionDigits:2});
const prod = id => PRODUCTS.find(p => p.id === id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pct = p => Math.round((1 - p.price/p.old) * 100);
function stars(r){ return "★".repeat(Math.round(r)); }
function levelFor(pts){ return LEVELS.find(l => pts >= l.min && pts <= l.max) || LEVELS[LEVELS.length-1]; }

function toast(msg){
  const t = document.createElement("div");
  t.className = "toast"; t.textContent = msg;
  $("#toastWrap").appendChild(t);
  setTimeout(() => t.remove(), 2700);
}

/* Phone illustration markup — never breaks, no network needed */
function phoneArt(p, cls=""){
  const [bg, body] = p.gr;
  return `<div class="ph ${cls}" role="img" aria-label="${esc(p.name)} in ${esc(p.brand)} style"
    style="--pi-bg:linear-gradient(140deg,${bg});--pi-phone:linear-gradient(160deg,${body})">
    <div class="body"><div class="cam"></div></div></div>`;
}

/* ---------------- Navigation ---------------- */
let activeTab = "home";
function showTab(name){
  if(name === activeTab && $("#screen-detail").classList.contains("hidden")) return;
  closeDetail(true);
  activeTab = name;
  $$(".screen").forEach(s => s.classList.add("hidden"));
  const sc = $("#screen-" + name);
  sc.classList.remove("hidden");
  sc.style.animation = "none"; void sc.offsetWidth; sc.style.animation = "";
  $$(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === name));
  if(name === "cart") renderCart();
  if(name === "rewards") renderRewards(true);
  if(name === "profile") renderProfileMeta();
  if(name === "shop") renderShop();
}
$$(".tab").forEach(t => t.addEventListener("click", () => showTab(t.dataset.tab)));
document.addEventListener("click", e => {
  const go = e.target.closest("[data-goto]");
  if(go) showTab(go.dataset.goto);
});

/* ---------------- Product cards ---------------- */
function cardHTML(p, i=0){
  const inWish = S.wishlist.includes(p.id);
  return `<article class="p-card" style="animation-delay:${i*40}ms" data-open="${p.id}">
    <div class="p-thumb">${phoneArt(p)}
      <span class="badge-off">-${pct(p)}%</span>
      <button class="wish ${inWish ? "on":""}" data-wish="${p.id}" aria-label="${inWish?"Remove from":"Add to"} wishlist" aria-pressed="${inWish}">${inWish?"♥":"♡"}</button>
      ${p.stock ? "" : `<span class="oos">Out of stock</span>`}
    </div>
    <span class="p-brand">${esc(p.brand)}</span>
    <h4 class="p-name">${esc(p.name)}</h4>
    <p class="p-rate"><b>${stars(p.rating)}</b> ${p.rating} · ${p.reviews.toLocaleString()} reviews</p>
    <div class="p-foot">
      <span class="p-price">${money(p.price)}</span>
      <span class="p-old">${money(p.old)}</span>
      <button class="add-mini" data-add="${p.id}" aria-label="Add ${esc(p.name)} to cart" ${p.stock?"":"disabled"}>+</button>
    </div>
  </article>`;
}

document.addEventListener("click", e => {
  const w = e.target.closest("[data-wish]");
  if(w){ e.stopPropagation(); toggleWish(w.dataset.wish); return; }
  const a = e.target.closest("[data-add]");
  if(a){ e.stopPropagation(); quickAdd(a.dataset.add, a); return; }
  const o = e.target.closest("[data-open]");
  if(o){ openDetail(o.dataset.open); }
});

function toggleWish(id){
  const i = S.wishlist.indexOf(id);
  if(i >= 0){ S.wishlist.splice(i,1); toast("Removed from wishlist"); }
  else { S.wishlist.push(id); toast("Saved to wishlist ♥"); }
  save();
  $$(`[data-wish="${id}"]`).forEach(b => {
    const on = S.wishlist.includes(id);
    b.classList.toggle("on", on); b.textContent = on ? "♥" : "♡";
    b.setAttribute("aria-pressed", on);
  });
  if(detailId === id) syncDetailWish();
  renderProfileMeta();
}

function quickAdd(id, btn){
  const p = prod(id);
  if(!p.stock){ toast("Sorry, this phone is out of stock"); return; }
  addToCart(id, p.storage[0], p.colors[0], 1);
  if(btn){ btn.animate([{transform:"scale(1)"},{transform:"scale(1.4) rotate(90deg)"},{transform:"scale(1)"}],{duration:320,easing:"ease-out"}); }
}

/* ---------------- Home ---------------- */
function renderHome(){
  const hero = prod("ip16pm");
  $("#heroArt").innerHTML = phoneArt(hero);
  $("#homeBrands").innerHTML = BRANDS.slice(0,6).map(b =>
    `<button class="chip ${b==="All"?"active":""}" data-hbrand="${b}">${b}</button>`).join("");
  const popular = [...PRODUCTS].sort((a,b) => b.rating - a.rating).slice(0,6);
  const offers  = [...PRODUCTS].sort((a,b) => pct(b) - pct(a)).slice(0,6);
  $("#popularRow").innerHTML = popular.map(cardHTML).join("");
  $("#offersRow").innerHTML  = offers.map(cardHTML).join("");
  updateMiniRewards();
}
$("#homeBrands")?.addEventListener?.("click", ()=>{}); // delegated below
document.addEventListener("click", e => {
  const hb = e.target.closest("[data-hbrand]");
  if(hb){ filters.brand = hb.dataset.hbrand; showTab("shop"); }
});
$("#heroShop").addEventListener("click", () => openDetail("ip16pm"));
$("#homeAvatar").addEventListener("click", () => showTab("profile"));
$("#homeRewards").addEventListener("click", () => showTab("rewards"));
$("#homeRewards").addEventListener("keydown", e => { if(e.key==="Enter"||e.key===" "){ e.preventDefault(); showTab("rewards"); }});
$("#notifBtn").addEventListener("click", () => toast(S.prefs.notif ? "You're all caught up 🎉" : "Notifications are off"));
$("#homeFilterBtn").addEventListener("click", () => { showTab("shop"); setFiltersOpen(true); });
$("#homeSearch").addEventListener("input", e => {
  filters.q = e.target.value;
  $("#shopSearch").value = e.target.value;
});
$("#homeSearch").addEventListener("keydown", e => { if(e.key === "Enter") showTab("shop"); });
function updateMiniRewards(){
  $("#miniPts").textContent = S.points.toLocaleString();
  $("#miniLevelText").textContent = `${levelFor(S.points).name} member · ${money(S.points*POINT_VALUE)} value`;
}

/* ---------------- Shop: search / filter / sort ---------------- */
const filters = { q:"", brand:"All", maxPrice:1500, inStock:false, sort:"featured" };

function renderShopBrands(){
  $("#shopBrands").innerHTML = BRANDS.map(b =>
    `<button class="chip ${filters.brand===b?"active":""}" data-sbrand="${b}">${b}</button>`).join("");
}
document.addEventListener("click", e => {
  const sb = e.target.closest("[data-sbrand]");
  if(sb){ filters.brand = sb.dataset.sbrand; renderShop(); }
});

function filteredProducts(){
  let list = PRODUCTS.filter(p =>
    (filters.brand === "All" || p.brand === filters.brand) &&
    p.price <= filters.maxPrice &&
    (!filters.inStock || p.stock) &&
    (p.name + " " + p.brand).toLowerCase().includes(filters.q.trim().toLowerCase())
  );
  const by = {
    "price-asc": (a,b) => a.price - b.price,
    "price-desc": (a,b) => b.price - a.price,
    "rating": (a,b) => b.rating - a.rating,
    "discount": (a,b) => pct(b) - pct(a),
  }[filters.sort];
  if(by) list.sort(by);
  return list;
}

function renderShop(){
  renderShopBrands();
  $("#shopSearch").value = filters.q;
  const list = filteredProducts();
  $("#shopCount").textContent = `${list.length} phone${list.length===1?"":"s"} found`;
  $("#shopGrid").innerHTML = list.length
    ? list.map(cardHTML).join("")
    : `<div class="empty" style="grid-column:1/-1"><div class="empty-art">🔍</div>
       <h2>No matches</h2><p>Try a different search or clear your filters.</p></div>`;
}
$("#shopSearch").addEventListener("input", e => { filters.q = e.target.value; renderShop(); });
$("#sortSel").addEventListener("change", e => { filters.sort = e.target.value; renderShop(); });
$("#priceRange").addEventListener("input", e => {
  filters.maxPrice = +e.target.value;
  $("#priceLabel").textContent = money(filters.maxPrice);
  renderShop();
});
$("#inStockOnly").addEventListener("change", e => { filters.inStock = e.target.checked; renderShop(); });
function setFiltersOpen(open){
  $("#filtersPanel").classList.toggle("hidden", !open);
  $("#shopFilterBtn").setAttribute("aria-expanded", open);
}
$("#shopFilterBtn").addEventListener("click", () =>
  setFiltersOpen($("#filtersPanel").classList.contains("hidden")));
$("#clearFilters").addEventListener("click", () => {
  Object.assign(filters, { q:"", brand:"All", maxPrice:1500, inStock:false, sort:"featured" });
  $("#sortSel").value = "featured"; $("#priceRange").value = 1500;
  $("#priceLabel").textContent = money(1500); $("#inStockOnly").checked = false;
  $("#homeSearch").value = "";
  renderShop(); toast("Filters cleared");
});

/* ---------------- Product detail ---------------- */
let detailId = null, sel = { storage:null, color:null, qty:1 };

function openDetail(id){
  const p = prod(id);
  detailId = id;
  sel = { storage:p.storage[0], color:p.colors[0], qty:1 };
  $("#detailBody").innerHTML = `
    <div class="d-img">${phoneArt(p, "lg")}</div>
    <div class="dots" aria-hidden="true"><i class="on"></i><i></i><i></i></div>
    <div class="d-body">
      <div>
        <p class="d-brand">${esc(p.brand)}</p>
        <h1 class="d-name">${esc(p.name)}</h1>
        <p class="d-rate"><b>${stars(p.rating)}</b> ${p.rating} · ${p.reviews.toLocaleString()} reviews</p>
      </div>
      <div class="d-price"><strong>${money(p.price)}</strong><s>${money(p.old)}</s><span class="d-off">Save ${pct(p)}%</span></div>
      <p class="d-desc">${esc(p.desc)}</p>
      <div><p class="opt-title">Color</p>
        <div class="opt-row" id="colorRow">${p.colors.map((c,i) =>
          `<button class="swatch ${i===0?"on":""}" data-color="${c}" style="background:${c}" aria-label="Color option ${i+1}"></button>`).join("")}
        </div></div>
      <div><p class="opt-title">Storage</p>
        <div class="opt-row" id="stoRow">${p.storage.map((s,i) =>
          `<button class="opt ${i===0?"on":""}" data-sto="${s}">${s}</button>`).join("")}
        </div></div>
      <div class="d-meta">
        <span class="stock ${p.stock?"in":"out"}">${p.stock?"● In stock":"● Out of stock"}</span>
        <span class="earn">✨ Earn ${p.points} pts</span>
        <div class="qty" style="margin-left:auto">
          <button id="qMinus" aria-label="Decrease quantity">−</button>
          <span id="qVal" aria-live="polite">1</span>
          <button id="qPlus" aria-label="Increase quantity">+</button>
        </div>
      </div>
    </div>`;
  $("#detailAdd").disabled = !p.stock;
  $("#detailAdd").textContent = p.stock ? "Add to cart" : "Out of stock";
  syncDetailWish(); syncDetailTotal();
  $("#screen-detail").classList.remove("hidden");
  $("#screen-detail").scrollTop = 0;

  $("#colorRow").addEventListener("click", e => {
    const b = e.target.closest("[data-color]"); if(!b) return;
    sel.color = b.dataset.color;
    $$("#colorRow .swatch").forEach(x => x.classList.toggle("on", x === b));
  });
  $("#stoRow").addEventListener("click", e => {
    const b = e.target.closest("[data-sto]"); if(!b) return;
    sel.storage = b.dataset.sto;
    $$("#stoRow .opt").forEach(x => x.classList.toggle("on", x === b));
  });
  $("#qMinus").addEventListener("click", () => { sel.qty = Math.max(1, sel.qty-1); syncQty(); });
  $("#qPlus").addEventListener("click", () => { sel.qty = Math.min(9, sel.qty+1); syncQty(); });
}
function syncQty(){ $("#qVal").textContent = sel.qty; syncDetailTotal(); }
function syncDetailTotal(){ $("#detailTotal").textContent = money(prod(detailId).price * sel.qty); }
function syncDetailWish(){
  const on = S.wishlist.includes(detailId);
  const b = $("#detailWish");
  b.textContent = on ? "♥" : "♡";
  b.classList.toggle("on", on);
  b.setAttribute("aria-label", on ? "Remove from wishlist" : "Add to wishlist");
}
function closeDetail(silent){
  if($("#screen-detail").classList.contains("hidden")) return;
  $("#screen-detail").classList.add("hidden");
  if(!silent) detailId = null;
}
$("#detailBack").addEventListener("click", () => closeDetail());
$("#detailWish").addEventListener("click", () => toggleWish(detailId));
$("#detailAdd").addEventListener("click", () => {
  addToCart(detailId, sel.storage, sel.color, sel.qty);
  closeDetail();
  showTab("cart");
});

/* ---------------- Cart ---------------- */
function addToCart(id, storage, color, qty){
  const line = S.cart.find(l => l.id===id && l.storage===storage && l.color===color);
  if(line) line.qty = Math.min(9, line.qty + qty);
  else S.cart.push({ id, storage, color, qty });
  save();
  updateCartBadge(true);
  toast(`${prod(id).name} added to cart`);
  if(activeTab === "cart") renderCart();
}
function cartCount(){ return S.cart.reduce((n,l) => n + l.qty, 0); }
function cartSubtotal(){ return S.cart.reduce((n,l) => n + prod(l.id).price * l.qty, 0); }
function cartTotals(){
  const sub = cartSubtotal();
  const delivery = S.cart.length === 0 ? 0 :
    (sub >= FREE_DELIVERY_OVER || levelFor(S.points).name === "Gold" || levelFor(S.points).name === "Platinum") ? 0 : DELIVERY_FEE;
  const promoOff = S.promo === "RIDWAAN10" ? Math.round(sub * 0.10) : 0;
  const ptsAvail = S.usePoints && S.points >= POINTS_REDEEM ? POINTS_REDEEM * POINT_VALUE : 0;
  const ptsOff = Math.min(ptsAvail, Math.max(0, sub + delivery - promoOff));
  const total = Math.max(0, sub + delivery - promoOff - ptsOff);
  return { sub, delivery, promoOff, ptsOff, total };
}
function updateCartBadge(bump){
  const n = cartCount(), b = $("#cartBadge");
  b.textContent = n;
  b.classList.toggle("hidden", n === 0);
  if(bump && n > 0){ b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
}

function renderCart(){
  const list = $("#cartList");
  const empty = S.cart.length === 0;
  $("#cartEmpty").classList.toggle("hidden", !empty);
  $("#cartFooter").classList.toggle("hidden", empty);
  $("#cartCountPill").textContent = `${cartCount()} item${cartCount()===1?"":"s"}`;
  list.innerHTML = empty ? "" : S.cart.map((l,i) => {
    const p = prod(l.id);
    return `<div class="c-item" style="animation-delay:${i*50}ms" data-line="${i}">
      <div class="c-thumb">${phoneArt(p)}</div>
      <div class="c-info">
        <p class="c-name">${esc(p.name)}</p>
        <p class="c-var">${esc(l.storage)} · <span style="display:inline-block;width:11px;height:11px;border-radius:50%;background:${esc(l.color)};vertical-align:-1px;border:1px solid var(--line)"></span></p>
        <p class="c-price">${money(p.price * l.qty)}</p>
      </div>
      <div class="c-side">
        <button class="c-remove" data-rm="${i}" aria-label="Remove ${esc(p.name)}">✕</button>
        <div class="qty">
          <button data-dec="${i}" aria-label="Decrease quantity">−</button>
          <span>${l.qty}</span>
          <button data-inc="${i}" aria-label="Increase quantity">+</button>
        </div>
      </div>
    </div>`;
  }).join("");
  const t = cartTotals();
  $("#sumSub").textContent = money(t.sub);
  $("#sumDel").textContent = t.delivery === 0 ? "Free" : money(t.delivery);
  $("#rowPromo").classList.toggle("hidden", t.promoOff === 0);
  $("#sumPromo").textContent = "–" + money(t.promoOff);
  $("#sumPts").textContent = "–" + money(t.ptsOff);
  $("#usePointsBtn").textContent = S.usePoints ? "Remove points" : `Use ${POINTS_REDEEM} pts`;
  $("#sumTotal").textContent = money(t.total);
  $("#promoInput").value = S.promo || "";
}
$("#cartList").addEventListener("click", e => {
  const rm = e.target.closest("[data-rm]");
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  if(rm){
    const i = +rm.dataset.rm, el = $(`[data-line="${i}"]`);
    el.classList.add("removing");
    setTimeout(() => { S.cart.splice(i,1); save(); updateCartBadge(); renderCart(); }, 260);
    toast("Removed from cart");
  }
  if(inc){ S.cart[+inc.dataset.inc].qty = Math.min(9, S.cart[+inc.dataset.inc].qty + 1); save(); updateCartBadge(true); renderCart(); }
  if(dec){
    const l = S.cart[+dec.dataset.dec];
    if(l.qty > 1) l.qty--; else S.cart.splice(+dec.dataset.dec,1);
    save(); updateCartBadge(); renderCart();
  }
});
$("#applyPromo").addEventListener("click", () => {
  const code = $("#promoInput").value.trim().toUpperCase();
  if(code === "RIDWAAN10"){ S.promo = code; toast("Promo applied: 10% off 🎉"); }
  else if(code === ""){ S.promo = null; toast("Promo removed"); }
  else { toast("That promo code isn't valid"); return; }
  save(); renderCart();
});
$("#usePointsBtn").addEventListener("click", () => {
  if(!S.usePoints && S.points < POINTS_REDEEM){ toast(`You need ${POINTS_REDEEM} points to redeem`); return; }
  S.usePoints = !S.usePoints; save(); renderCart();
  toast(S.usePoints ? `${POINTS_REDEEM} points applied` : "Points removed");
});

/* ---------------- Sheets / overlay ---------------- */
let openSheetId = null;
function openSheet(id){
  closeSheet(true);
  openSheetId = id;
  $("#overlay").classList.remove("hidden");
  requestAnimationFrame(() => $("#overlay").classList.add("show"));
  const sh = $("#" + id);
  sh.classList.remove("hidden");
  requestAnimationFrame(() => requestAnimationFrame(() => sh.classList.add("open")));
  sh.scrollTop = 0;
}
function closeSheet(instant){
  if(!openSheetId) return;
  const sh = $("#" + openSheetId);
  sh.classList.remove("open");
  $("#overlay").classList.remove("show");
  const id = openSheetId; openSheetId = null;
  setTimeout(() => {
    $("#" + id).classList.add("hidden");
    if(!openSheetId) $("#overlay").classList.add("hidden");
  }, instant ? 0 : 420);
}
$("#overlay").addEventListener("click", () => closeSheet());
document.addEventListener("keydown", e => {
  if(e.key === "Escape"){
    if(openSheetId) closeSheet();
    else if(!$("#screen-detail").classList.contains("hidden")) closeDetail();
  }
});

/* ---------------- Checkout ---------------- */
$("#checkoutBtn").addEventListener("click", () => {
  const t = cartTotals();
  $("#ckItems").textContent = `${cartCount()} item${cartCount()===1?"":"s"}`;
  $("#ckTotal").textContent = money(t.total);
  $("#ckEarn").textContent = "+" + earnedPoints() + " pts";
  $("#ckErr").classList.add("hidden");
  openSheet("checkoutSheet");
});
function earnedPoints(){
  const base = S.cart.reduce((n,l) => n + prod(l.id).points * l.qty, 0);
  const mult = ["Gold","Platinum"].includes(levelFor(S.points).name) ? 1.5 : 1;
  return Math.round(base * mult);
}
$("#placeOrder").addEventListener("click", () => {
  const fields = [
    ["ckName", v => v.length >= 2, "Please enter your full name."],
    ["ckPhone", v => /^[+0-9 ()-]{7,}$/.test(v), "Please enter a valid phone number."],
    ["ckEmail", v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Please enter a valid email address."],
    ["ckAddress", v => v.length >= 4, "Please enter your delivery address."],
    ["ckCity", v => v.length >= 2, "Please enter your city."],
  ];
  let err = null;
  for(const [id, ok, msg] of fields){
    const el = $("#" + id), good = ok(el.value.trim());
    el.classList.toggle("bad", !good);
    if(!good && !err) err = msg;
  }
  if(err){
    const e = $("#ckErr"); e.textContent = err; e.classList.remove("hidden");
    return;
  }
  const t = cartTotals();
  const earn = earnedPoints();
  const orderNo = "RMS-" + Math.floor(100000 + Math.random() * 900000);
  const name = $("#ckName").value.trim();
  const pay = $('input[name="pay"]:checked').value;
  const date = new Date().toLocaleDateString("en-US", {month:"short", day:"numeric"});

  if(S.usePoints && S.points >= POINTS_REDEEM){
    S.points -= POINTS_REDEEM;
    S.activity.unshift({name:"Redeemed at checkout", pts:-POINTS_REDEEM, date});
  }
  S.points += earn;
  S.activity.unshift({name:"Order #" + orderNo, pts:+earn, date});
  S.orders.unshift({
    no: orderNo, name, pay, total: t.total, date,
    items: S.cart.map(l => ({ name: prod(l.id).name, qty: l.qty, storage: l.storage })),
  });
  S.cart = []; S.promo = null; S.usePoints = false;
  save();
  updateCartBadge(); renderCart(); updateMiniRewards();

  $("#okName").textContent = `Thank you, ${name}! Your order is confirmed.`;
  $("#okNumber").textContent = "Order #" + orderNo;
  $("#okTotal").textContent = money(t.total);
  $("#okPoints").textContent = "+" + earn + " pts";
  openSheet("successSheet");
  confettiBurst();
  ["ckName","ckPhone","ckEmail","ckAddress","ckCity"].forEach(id => $("#"+id).classList.remove("bad"));
});
$("#okDone").addEventListener("click", () => { closeSheet(); showTab("shop"); });

/* ---------------- Rewards ---------------- */
const RING_LEN = 2 * Math.PI * 52; // matches r=52 in the SVG

function renderRewards(animate){
  const lvl = levelFor(S.points);
  const next = LEVELS[LEVELS.indexOf(lvl) + 1];
  const spanMax = next ? lvl.max + 1 : S.points || 1;
  const frac = next ? Math.min(1, (S.points - lvl.min) / (spanMax - lvl.min)) : 1;

  // Animated points counter
  const ptsEl = $("#ringPts");
  const from = animate ? 0 : S.points, to = S.points, t0 = performance.now();
  (function tick(now){
    const k = Math.min(1, (now - t0) / 900);
    ptsEl.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))).toLocaleString();
    if(k < 1) requestAnimationFrame(tick);
  })(t0);

  // Animated ring
  const fg = $("#ringFg");
  fg.style.strokeDasharray = RING_LEN;
  fg.style.strokeDashoffset = RING_LEN;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    fg.style.strokeDashoffset = RING_LEN * (1 - frac);
  }));

  $("#ringProgress").textContent = next
    ? `${(next.min - S.points).toLocaleString()} points to ${next.name} · you're ${lvl.name}`
    : `You've reached ${lvl.name} — the top tier ✨`;

  // Level cards
  $("#levelList").innerHTML = LEVELS.map((L,i) => {
    const isCur = L === lvl;
    const rangeTxt = L.max === Infinity ? `${L.min.toLocaleString()}+ pts` : `${L.min.toLocaleString()}–${L.max.toLocaleString()} pts`;
    return `<button class="level ${isCur?"current":""}" data-level="${L.name}" style="animation-delay:${i*60}ms">
      <div class="lv-top">
        <span class="lv-ic">${L.icon}</span>
        <span><span class="lv-name">${L.name}</span><br><span class="lv-range">${rangeTxt} · ${L.perks}</span></span>
        ${isCur ? '<span class="lv-tag">Your level</span>' : ""}
      </div>
      <div class="bar"><i data-bar style="width:0"></i></div>
    </button>`;
  }).join("");
  requestAnimationFrame(() => requestAnimationFrame(() => {
    $$("#levelList [data-bar]").forEach((b,i) => {
      const L = LEVELS[i];
      const done = S.points > L.max ? 1 : S.points < L.min ? 0 : (S.points - L.min) / ((L.max === Infinity ? Math.max(S.points, L.min+1) : L.max) - L.min);
      b.style.width = Math.round(done * 100) + "%";
    });
  }));

  // Benefits for current level
  const perks = {
    Bronze:["🏷️ Member-only prices","✨ Earn points on every order"],
    Silver:["🏷️ Member-only prices","🚚 Free delivery over $500","✨ Earn points on every order"],
    Gold:["🚚 Free delivery on every order","💰 1.5× points on all purchases","🎂 Birthday bonus of 200 points","⚡ Priority support"],
    Platinum:["🚚 Free express delivery","💰 2× points on all purchases","🛎️ VIP support line","🚀 Early access to new phones"],
  }[lvl.name];
  $("#benefitList").innerHTML = perks.map(p => `<li>${p}</li>`).join("");

  // Activity
  $("#activityList").innerHTML = S.activity.slice(0,6).map(a => `
    <div class="act">
      <span class="act-ic">${a.pts >= 0 ? "🛍️" : "🎁"}</span>
      <span class="act-info"><span class="act-name">${esc(a.name)}</span><br><span class="act-date">${esc(a.date)}</span></span>
      <span class="act-pts ${a.pts >= 0 ? "plus" : "minus"}">${a.pts >= 0 ? "+" : ""}${a.pts}</span>
    </div>`).join("");

  updateMiniRewards();

  // First-time Gold celebration
  if(!S.goldSeen && (lvl.name === "Gold" || lvl.name === "Platinum")){
    S.goldSeen = true; save();
    setTimeout(showGoldSheet, 800);
  }
}
function showGoldSheet(){ openSheet("goldSheet"); confettiBurst(true); }
$("#goldView").addEventListener("click", () => { closeSheet(); showTab("rewards"); });

document.addEventListener("click", e => {
  const lv = e.target.closest("[data-level]");
  if(lv && lv.dataset.level === levelFor(S.points).name && ["Gold","Platinum"].includes(lv.dataset.level)){
    showGoldSheet();
  } else if(lv){
    toast(`${lv.dataset.level}: ${LEVELS.find(x => x.name === lv.dataset.level).perks}`);
  }
});
$("#raPurchases").addEventListener("click", () => openListSheet("Purchases", ordersListHTML()));
$("#raPoints").addEventListener("click", () => openListSheet("Points activity",
  S.activity.map(a => `<div class="act"><span class="act-ic">${a.pts>=0?"🛍️":"🎁"}</span>
   <span class="act-info"><span class="act-name">${esc(a.name)}</span><br><span class="act-date">${esc(a.date)}</span></span>
   <span class="act-pts ${a.pts>=0?"plus":"minus"}">${a.pts>=0?"+":""}${a.pts}</span></div>`).join("")));
$("#raLevel").addEventListener("click", () => {
  const lvl = levelFor(S.points);
  if(["Gold","Platinum"].includes(lvl.name)) showGoldSheet();
  else toast(`Keep shopping — ${(LEVELS[LEVELS.indexOf(lvl)+1].min - S.points)} pts to ${LEVELS[LEVELS.indexOf(lvl)+1].name}!`);
});
$("#raRedeem").addEventListener("click", () => {
  toast(`Apply ${POINTS_REDEEM} pts (${money(POINTS_REDEEM*POINT_VALUE)}) in your cart at checkout`);
  showTab("cart");
});

/* ---------------- Profile ---------------- */
function renderProfileMeta(){
  $("#orderCount").textContent = S.orders.length ? `${S.orders.length} order${S.orders.length===1?"":"s"}` : "None yet";
  $("#wishCount").textContent = S.wishlist.length ? `${S.wishlist.length} saved` : "Empty";
  $("#tgNotif").checked = S.prefs.notif;
  $("#tgBio").checked = S.prefs.bio;
  $("#tgDark").checked = S.prefs.dark;
  $("#langSel").value = S.prefs.lang;
}
function ordersListHTML(){
  return S.orders.length
    ? S.orders.map(o => `<div class="act"><span class="act-ic">📦</span>
       <span class="act-info"><span class="act-name">#${esc(o.no)} · ${esc(o.pay)}</span><br>
       <span class="act-date">${esc(o.date)} · ${o.items.map(i => `${i.qty}× ${esc(i.name)}`).join(", ")}</span></span>
       <span class="act-pts">${money(o.total)}</span></div>`).join("")
    : `<p class="ok-line">No orders yet — your purchases will appear here.</p>`;
}
function wishlistHTML(){
  return S.wishlist.length
    ? S.wishlist.map(id => { const p = prod(id); return `<div class="act" data-open="${p.id}" role="button" tabindex="0">
        <span class="act-ic">🤍</span>
        <span class="act-info"><span class="act-name">${esc(p.name)}</span><br><span class="act-date">${esc(p.brand)}</span></span>
        <span class="act-pts">${money(p.price)}</span></div>`; }).join("")
    : `<p class="ok-line">Your wishlist is empty. Tap ♡ on any phone to save it.</p>`;
}
function openListSheet(title, html){
  $("#listTitle").textContent = title;
  $("#listBody").innerHTML = html;
  openSheet("listSheet");
}
$("#miOrders").addEventListener("click", () => openListSheet("Order history", ordersListHTML()));
$("#miWishlist").addEventListener("click", () => openListSheet("Wishlist", wishlistHTML()));
$("#listBody").addEventListener("click", e => {
  const o = e.target.closest("[data-open]");
  if(o){ closeSheet(); openDetail(o.dataset.open); }
});
$("#miAddress").addEventListener("click", () => openListSheet("Saved addresses",
  `<div class="act"><span class="act-ic">🏠</span><span class="act-info"><span class="act-name">Home</span><br><span class="act-date">Jigjiga Yar, Hargeisa, Somaliland</span></span></div>
   <div class="act"><span class="act-ic">🏢</span><span class="act-info"><span class="act-name">Work</span><br><span class="act-date">Road No 1, Hargeisa</span></span></div>`));
$("#miPayments").addEventListener("click", () => openListSheet("Payment methods",
  `<div class="act"><span class="act-ic">📱</span><span class="act-info"><span class="act-name">Zaad</span><br><span class="act-date">Default · +252 63 •••• 512</span></span></div>
   <div class="act"><span class="act-ic">📲</span><span class="act-info"><span class="act-name">eDahab</span><br><span class="act-date">+252 65 •••• 907</span></span></div>
   <div class="act"><span class="act-ic">💵</span><span class="act-info"><span class="act-name">Cash on Delivery</span><br><span class="act-date">Available in Hargeisa</span></span></div>`));
$("#miHelp").addEventListener("click", () => openListSheet("Help & support",
  `<p class="ok-line">This is a front-end demo store. For questions, email <strong>support@ridwaanstore.demo</strong>.</p>
   <div class="act"><span class="act-ic">💬</span><span class="act-info"><span class="act-name">Chat with us</span><br><span class="act-date">Every day, 8am–8pm</span></span></div>
   <div class="act"><span class="act-ic">🔁</span><span class="act-info"><span class="act-name">Returns</span><br><span class="act-date">14-day free returns</span></span></div>`));
$("#editProfile").addEventListener("click", () => toast("Profile editing is a demo placeholder"));
$("#logoutBtn").addEventListener("click", () => toast("Logged out (demo) — see you soon 👋"));

$("#tgNotif").addEventListener("change", e => { S.prefs.notif = e.target.checked; save();
  toast(e.target.checked ? "Notifications on" : "Notifications off"); });
$("#tgBio").addEventListener("change", e => { S.prefs.bio = e.target.checked; save();
  toast(e.target.checked ? "Biometric lock on 🔒" : "Biometric lock off"); });
$("#tgDark").addEventListener("change", e => { setDark(e.target.checked); });
$("#langSel").addEventListener("change", e => { S.prefs.lang = e.target.value; save();
  toast({en:"Language: English", so:"Luuqadda: Soomaali", ar:"اللغة: العربية"}[e.target.value]); });

function setDark(on){
  S.prefs.dark = on; save();
  document.documentElement.style.setProperty("color-scheme", on ? "dark" : "light");
  document.documentElement.dataset.theme = on ? "dark" : "";
  if(!on) delete document.documentElement.dataset.theme;
}

/* ---------------- Confetti ---------------- */
function confettiBurst(golden){
  const cv = $("#confetti"), ctx = cv.getContext("2d");
  const rect = cv.parentElement.getBoundingClientRect();
  cv.width = rect.width; cv.height = rect.height;
  const colors = golden ? ["#F3C05C","#DD9A2B","#FFE9B8","#C6531B"] : ["#C6531B","#E2A63D","#2E7D4F","#FFFCF7","#D96A2B"];
  const bits = Array.from({length:90}, () => ({
    x: cv.width/2 + (Math.random()-.5)*120, y: cv.height*0.42,
    vx: (Math.random()-.5)*9, vy: -(4+Math.random()*8),
    s: 4+Math.random()*5, r: Math.random()*Math.PI, vr:(Math.random()-.5)*.3,
    c: colors[Math.floor(Math.random()*colors.length)],
  }));
  let frames = 0;
  (function anim(){
    ctx.clearRect(0,0,cv.width,cv.height);
    bits.forEach(b => {
      b.vy += .25; b.x += b.vx; b.y += b.vy; b.r += b.vr;
      ctx.save(); ctx.translate(b.x,b.y); ctx.rotate(b.r);
      ctx.fillStyle = b.c; ctx.fillRect(-b.s/2,-b.s/2,b.s,b.s*.6); ctx.restore();
    });
    if(++frames < 130) requestAnimationFrame(anim);
    else ctx.clearRect(0,0,cv.width,cv.height);
  })();
}

/* ---------------- Boot with skeletons ---------------- */
function bootSkeletons(){
  $("#popularRow").innerHTML = $("#offersRow").innerHTML =
    Array.from({length:3}, () => `<div class="p-card sk sk-box" style="width:168px;flex:none"></div>`).join("");
  $("#heroArt").innerHTML = "";
}
function init(){
  if(S.prefs.dark) setDark(true);
  bootSkeletons();
  updateCartBadge();
  updateMiniRewards();
  setTimeout(() => { renderHome(); }, 520);   // brief skeleton shimmer on first paint
  renderShop();
  renderProfileMeta();
}
document.addEventListener("DOMContentLoaded", init);
