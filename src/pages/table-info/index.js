import { v7 } from "uuid";
import { normalizationText } from "../../plugins/normalization-text";
import router from "../../router";
import { getVietnamTime } from "../../plugins/getVNTime";
import { getData, postData } from "../../plugins/CRUD";

export const tableInfo = () => {
  document.documentElement.classList.add("unlock-scroll");
  document.body.classList.add("unlock-scroll");

  const app = document.getElementById("app");
  app.innerHTML = `<div class="app-container">
    
    <header class="header">
      <button class="btn-icon" id="btn-back"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg></button>
      <h1 class="header-title">Tạo bảng mới</h1>
      <button class="btn-icon"  id="btn-next"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg></button>
    </header>

    <main class="main-content">
      <div class="section-title">Tên bảng chơi</div>
      <input type="text" class="input-box" id="name-battle" placeholder="Nhập tên bảng...">
      
      <div class="chip-scroll" id="suggested-name">
        <div class="chip" data-value="Tiến Lên">Tiến Lên</div>
        <div class="chip" data-value="Phong Thần Bảng">Phong Thần Bảng</div>
        <div class="chip" data-value="Tứ Đại Thiên Vương">Tứ Đại Thiên Vương</div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div class="section-title" style="margin: 12px 0;">Người chơi</div>
        <div id="number-player" style="font-size: 13px; color: var(--text-secondary);"></div>
      </div>

      <div id="player-box">
      </div>
      <button class="btn-dashed" id="add-player">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          Thêm người chơi
        </button>
      
      <div class="section-title">Cài đặt luật chơi</div>
      
      <div class="setting-group">
        
        <div class="setting-tabs" id="rule-tabs">
          <div class="s-tab active" data-type="manual">Thủ công</div>
          <div class="s-tab" data-type="round">Giới hạn ván</div>
          <div class="s-tab" data-type="score">Giới hạn điểm</div>
        </div>
        
        <div id="content-manual" data-type="manual" class="setting-note rule-content">
          Kết thúc khi bạn bấm nút
        </div>
        
        <div id="content-round" data-type="round" class="setting-item rule-content" style="display: none; border-bottom: 1px solid var(--border-color);">
          <span style="font-size: 13px; color: var(--text-secondary);">Số ván tối đa</span>
          <input type="number" id="max-round-input" inputmode="numeric" pattern="[0-9]*" value="10" style="width: 60px; text-align: center; background: var(--bg-surface-light); border: none; color: white; border-radius: 6px; padding: 6px;">
        </div>

        <div id="content-score" data-type="score" class="setting-item rule-content" style="display: none; border-bottom: 1px solid var(--border-color);">
          <span style="font-size: 13px; color: var(--text-secondary);">Điểm mục tiêu</span>
          <input type="number" id="max-score-input" inputmode="numeric" pattern="[0-9]*" value="100" style="width: 60px; text-align: center; background: var(--bg-surface-light); border: none; color: white; border-radius: 6px; padding: 6px;">
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Hiển thị tổng điểm</h4>
            <p>Hiện tổng điểm của từng người chơi</p>
          </div>
          <label class="toggle"><input type="checkbox" id="show-total-score" checked><span class="slider"></span></label>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Cân bằng điểm</h4>
            <p>Tổng điểm của tất cả người chơi trong mỗi ván phải bằng 0</p>
          </div>
          <label class="toggle"><input type="checkbox" id="balance-score"><span class="slider"></span></label>
        </div>
      </div>

    </main>
  </div>`;

  const btnBack = document.getElementById("btn-back");
  btnBack.addEventListener("click", () => {
    document.documentElement.classList.remove("unlock-scroll");
    document.body.classList.remove("unlock-scroll");
    router.navigate("/");
  });

  const btnNext = document.getElementById("btn-next");
  btnNext.addEventListener("click", () => {
    const arrPlayerInput = document.querySelectorAll(".player-input");
    if (!nameBattle.value) {
      alert("Hãy nhập đầy đủ thông tin");
      return;
    }
    let isOk = true;
    arrPlayerInput.forEach((playerInput) => {
      if (!playerInput.value) {
        isOk = false;
        return;
      }
    });
    if (!isOk) {
      alert("Hãy nhập đầy đủ thông tin");
      return;
    }
    const info = {};
    info.id = v7();
    info.nameBattle = normalizationText(nameBattle.value);
    info.status = "playing";
    info.createAt = getVietnamTime();

    const settings = {};
    settings.endCondition = typePlay;
    if (typePlay === "round") {
      const inputValue = document.getElementById("max-round-input").value;
      if (!inputValue) {
        alert("Hãy nhập đầy đủ thông tin");
        return;
      }
      settings.round = Number(inputValue);
    }
    if (typePlay === "score") {
      const inputValue = document.getElementById("max-score-input").value;
      if (!inputValue) {
        alert("Hãy nhập đầy đủ thông tin");
        return;
      }
      settings.score = Number(inputValue);
    }
    settings.showTotalScore =
      document.getElementById("show-total-score").checked;
    settings.balanceScore = document.getElementById("balance-score").checked;
    const players = [];
    arrPlayerInput.forEach((playerInput) => {
      const idPlayer = playerInput.getAttribute("data-id");
      const player = {};
      player.id = idPlayer;
      player.namePlayer = playerInput.value.trim();
      player.score = [];
      players.push(player);
    });
    info.settings = settings;
    info.players = players;

    const saveData = getData();
    saveData.unshift(info);
    postData(saveData);
    localStorage.setItem("currentGameId", info.id);

    document.documentElement.classList.remove("unlock-scroll");
    document.body.classList.remove("unlock-scroll");
    router.navigate("/game");
  });

  const nameBattle = document.getElementById("name-battle");
  const suggestedName = document.getElementById("suggested-name");
  suggestedName.addEventListener("click", (e) => {
    const btnTarget = e.target;
    if (btnTarget.classList.contains("chip"))
      nameBattle.value = btnTarget.getAttribute("data-value");
  });

  const numberPlayer = document.getElementById("number-player");
  const playerBox = document.getElementById("player-box");
  let playerCurr = 2;
  const playerMax = 8;
  const playerMin = 2;
  const addPlayer = document.getElementById("add-player");
  const updatePlayer = () => {
    numberPlayer.innerText = `${playerCurr}/${playerMax}  người chơi`;
    addPlayer.style.display = playerCurr >= playerMax ? "none" : "flex";

    const arrPlayerRow = document.querySelectorAll(".player-row");
    arrPlayerRow.forEach((playerRow, index) => {
      const numCurr = index + 1;
      playerRow.querySelector(".player-num").innerHTML = numCurr;
      playerRow
        .querySelector(".player-input")
        .setAttribute("data-id", `p${numCurr}`);

      playerRow
        .querySelector(".player-input")
        .setAttribute("placeholder", `Tên người chơi ${numCurr}`);
    });
    const arrBtnRemovePlayer = document.querySelectorAll(".btn-remove-player");
    arrBtnRemovePlayer.forEach((btn) => {
      btn.style.display = playerCurr > playerMin ? "flex" : "none";
    });
  };

  const initPlayerBox = () => {
    numberPlayer.innerText = `${playerCurr}/${playerMax}  người chơi`;
    playerBox.innerHTML = "";
    for (let i = 1; i <= playerCurr; i++) {
      playerBox.innerHTML += `<div class="player-row">
          <div class="player-num">${i}</div>
          <input type="text" class="player-input" data-id="p${i}" placeholder="Tên người chơi ${i}" />
          <button class="btn-remove-player">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 11H7v-2h10v2z"/></svg>
          </button>
        </div>`;
    }
    updatePlayer();
  };
  initPlayerBox();

  addPlayer.addEventListener("click", () => {
    playerCurr++;
    const newPlayer = `<div class="player-row">
          <div class="player-num">${playerCurr}</div>
          <input type="text" class="player-input" data-id="p${playerCurr}" placeholder="Tên người chơi ${playerCurr}" />
          <button class="btn-remove-player" >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 11H7v-2h10v2z"/></svg>
          </button>
        </div>`;

    playerBox.insertAdjacentHTML("beforeend", newPlayer);
    updatePlayer();
  });

  playerBox.addEventListener("click", (e) => {
    const btnTarget = e.target.closest(".btn-remove-player");
    if (btnTarget && playerCurr > playerMin) {
      btnTarget.closest(".player-row").remove();
      playerCurr--;
      updatePlayer();
    }
  });

  let typePlay = "manual";
  const settingTab = document.querySelector(".setting-tabs");
  settingTab.addEventListener("click", (e) => {
    const btnTarget = e.target.closest(".s-tab");
    typePlay = btnTarget.getAttribute("data-type");
    const arrSTab = settingTab.querySelectorAll(".s-tab");
    const arrRuleContent = document.querySelectorAll(".rule-content");

    if (btnTarget.classList.value === "s-tab") {
      arrSTab.forEach((sTab) => {
        sTab.classList.remove("active");
        if (sTab.getAttribute("data-type") === typePlay) {
          sTab.classList.add("active");
        }
      });

      arrRuleContent.forEach((rule) => {
        if (rule.getAttribute("data-type") === typePlay) {
          rule.style.display = "flex";
        } else {
          rule.style.display = "none";
        }
      });
    }
  });

  const players = {};
  const arrPlayerInput = document.querySelectorAll(".player-input");
  arrPlayerInput.forEach((playerInput) => {
    const idPlayer = playerInput.getAttribute("data-id");
    players[idPlayer] = {};
    players[idPlayer].namePlayer = playerInput.value;
    players[idPlayer].score = [];
  });
  console.log(players);
};
