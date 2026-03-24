// 1. 設定初始變數
const initialGap = 30;
let gapSeconds = initialGap;
let lastKey = null;
let lastActivity = Date.now();

// 2. 抓取網頁元件
const fill = document.getElementById("progressFill");
const text = document.getElementById("progressText");
const heading = document.getElementById("describe");

// 3. 更新畫面的功能 (新手最容易讀懂的部分)
function updateUI() {
  // 計算百分比 (0-100)
  let percentage = ((initialGap - gapSeconds) / initialGap) * 100;
  percentage = Math.max(0, Math.min(100, percentage)); // 限制在 0-100 之間

  // 更新進度條長度
  fill.style.width = `${percentage}%`;

  // 更新文字與標題
  if (gapSeconds > 0) {
    text.textContent = `落後：${Math.round(gapSeconds)} 秒`;
    heading.textContent = "追擊領先選手中 請稍後";
  } else {
    text.textContent = `領先：${Math.abs(Math.round(gapSeconds))} 秒`;
    heading.textContent = "逃離主集團直到終點";
  }
}

// 4. 偵測鍵盤事件 (AD 鍵)
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (key !== "a" && key !== "d") return;

  // 判斷是否為「交替」按鍵
  if (key !== lastKey) {
    gapSeconds -= 0.5; // 減少秒差 (加速)
    lastKey = key;
    lastActivity = Date.now(); // 更新最後活動時間
    updateUI();
  }
});

// 5. 閒置扣分 (自動增加秒差)
setInterval(() => {
  const now = Date.now();
  if (now - lastActivity > 1000) {
    // 超過 1.2 秒沒動
    gapSeconds += 0.25;
    updateUI();
  }
}, 500);

// 網頁開啟時先跑一次
updateUI();
