import { deleteData, updateData } from "../../plugins/CRUD";
import { findGameById } from "../../plugins/findGameById";
import router from "../../router";

export const setting = () => {
  document.documentElement.classList.add("unlock-scroll");
  document.body.classList.add("unlock-scroll");
  const game = findGameById();
  if (!game) {
    alert("Không tải được dữ liệu!");
    router.navigate("/");
    return;
  }
  const players = game.players;
  let settings = game.settings;
  const app = document.getElementById("app");
  app.innerHTML = `<div class="app-container">
    
    <header class="header">
      <button class="btn-icon" id="btn-back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      
      <h1 class="header-title">Cài đặt</h1>
      
      <button class="btn-pill">Lưu</button>
    </header>

    <main class="main-content">
      
      <div class="section-title" style="margin-top: 8px;">Người chơi</div>
      
      <div id="box-player-row">
        <div class="player-row">
          <div class="player-num">1</div>
          <input type="text" class="player-input" value="H">
        </div>
        <div class="player-row">
          <div class="player-num">2</div>
          <input type="text" class="player-input" value="V">
        </div>
        <div class="player-row">
          <div class="player-num">3</div>
          <input type="text" class="player-input" value="K">
        </div>
        <div class="player-row">
          <div class="player-num">4</div>
          <input type="text" class="player-input" value="3">
        </div>
      </div>

      <div class="section-title">Cài đặt luật chơi</div>
      
      <div class="setting-group">
        <div class="setting-item" style="flex-direction: column; align-items: flex-start; padding: 16px 16px 0;">
          <h4 style="font-size: 14px; margin-bottom: 12px; font-weight: 500;">Điều kiện kết thúc</h4>
          
          <div class="setting-tabs" style="width: 100%; border-bottom: none; background: var(--bg-main); border-radius: 20px; overflow: hidden; padding: 4px;">
            <div data-type="manual" class="s-tab active" style="border-radius: 16px;">Thủ công</div>
            <div data-type="round" class="s-tab" style="border-radius: 16px;">Giới hạn ván</div>
            <div data-type="score" class="s-tab" style="border-radius: 16px;">Giới hạn điểm</div>
          </div>
        </div>

        <div data-type="manual" class="setting-note rule-content">
          Kết thúc khi bạn bấm nút
        </div>

        <div data-type="round" class="setting-item rule-content" style="display: none; border-bottom: 1px solid var(--border-color);">
          <span style="font-size: 13px; color: var(--text-secondary);">Số ván tối đa</span>
          <input type="number" class="small-input" id="max-round-input" inputmode="numeric" pattern="[0-9]*" value="10">
        </div>

        <div data-type="score" class="setting-item rule-content" style="display: none; border-bottom: 1px solid var(--border-color);">
          <span style="font-size: 13px; color: var(--text-secondary);">Điểm mục tiêu</span>
          <input type="number" class="small-input" id="max-score-input" inputmode="numeric" pattern="[0-9]*" value="100">
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Hiển thị tổng điểm</h4>
            <p>Hiện tổng điểm của từng người chơi</p>
          </div>
          <label class="toggle"><input type="checkbox" id="show-total-score" ><span class="slider"></span></label>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Cân bằng điểm</h4>
            <p>Tổng điểm của tất cả người chơi trong mỗi ván phải bằng 0</p>
          </div>
          <label class="toggle"><input type="checkbox" id="balance-score"><span class="slider"></span></label>
        </div>
      </div>

      <button class="btn-delete-board">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        Xóa
      </button>

    </main>

  </div>`;

  const showTotalScore = document.getElementById("show-total-score");
  showTotalScore.checked = settings.showTotalScore;
  const balanceScore = document.getElementById("balance-score");
  balanceScore.checked = settings.balanceScore;
  let endCondition = settings.endCondition;
  console.log(endCondition);

  if (endCondition === "round") {
    document.getElementById("max-round-input").value = settings.round;
  }
  if (endCondition === "score") {
    document.getElementById("max-score-input").value = settings.score;
  }
  const allSTab = document.querySelectorAll(".s-tab");
  const ruleContents = document.querySelectorAll(".rule-content");
  const renderSettingGroup = () => {
    allSTab.forEach((sTab) => {
      sTab.classList = "s-tab";
      if (endCondition === sTab.getAttribute("data-type")) {
        sTab.classList += " active";
      }
    });
    ruleContents.forEach((ruleContent) => {
      if (ruleContent.getAttribute("data-type") === endCondition) {
        ruleContent.style.display = "flex";
        return;
      }
      ruleContent.style.display = "none";
    });
  };
  renderSettingGroup();
  const settingTabs = document.querySelector(".setting-tabs");
  settingTabs.addEventListener("click", (e) => {
    const btnTarget = e.target.closest(".s-tab");
    if (btnTarget) {
      endCondition = btnTarget.getAttribute("data-type");
      renderSettingGroup();
    }
  });
  const btnBack = document.getElementById("btn-back");
  btnBack.addEventListener("click", () => {
    document.documentElement.classList.remove("unlock-scroll");
    document.body.classList.remove("unlock-scroll");
    router.navigate("/game");
  });

  const boxPlayerRow = document.getElementById("box-player-row");
  boxPlayerRow.innerHTML = "";
  let boxPlayerRowContent = "";
  players.forEach((player, index) => {
    boxPlayerRowContent += `<div class="player-row">
        <div class="player-num">${index + 1}</div>
        <input type="text" class="player-input" data-id="${player.id}" value="${player.namePlayer}">
      </div>`;
  });
  boxPlayerRow.innerHTML = boxPlayerRowContent;
  const btnPill = document.querySelector(".btn-pill");
  const playerInputs = document.querySelectorAll(".player-input");
  btnPill.addEventListener("click", () => {
    let isOk = true;
    for (const playerInput of playerInputs) {
      if (!playerInput.value) {
        isOk = false;
        break;
      }
    }
    if (!isOk) {
      alert("Hãy nhập đầy đủ thông tin");
      return;
    }
    for (const playerInput of playerInputs) {
      const playerTarget = players.find(
        (player) => player.id === playerInput.getAttribute("data-id"),
      );
      if (!playerTarget) {
        alert("Đã có lỗi xảy ra");
        router.navigate("/");
        return;
      }
      playerTarget.namePlayer = playerInput.value;
    }
    settings = {};
    settings.endCondition = endCondition;
    if (endCondition === "round") {
      const inputValue = document.getElementById("max-round-input").value;
      if (!inputValue) {
        alert("Hãy nhập đầy đủ thông tin");
        return;
      }
      settings.round = Number(inputValue);
    }
    if (endCondition === "score") {
      const inputValue = document.getElementById("max-score-input").value;
      if (!inputValue) {
        alert("Hãy nhập đầy đủ thông tin");
        return;
      }
      settings.score = Number(inputValue);
    }
    settings.showTotalScore = showTotalScore.checked;
    settings.balanceScore = balanceScore.checked;
    game.players = players;
    game.settings = settings;
    if (confirm("Bạn có chắc chắn muốn lưu không?")) {
      updateData(game);
      document.documentElement.classList.remove("unlock-scroll");
      document.body.classList.remove("unlock-scroll");
      router.navigate("/game");
    }
  });

  const btnDeleteBoard = document.querySelector(".btn-delete-board");
  btnDeleteBoard.addEventListener("click", () => {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
      deleteData(game.id);
      document.documentElement.classList.remove("unlock-scroll");
      document.body.classList.remove("unlock-scroll");
      router.navigate("/");
    }
  });
};
