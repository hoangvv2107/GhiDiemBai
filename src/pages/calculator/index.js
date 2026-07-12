import { updateData } from "../../plugins/CRUD";
import { findGameById } from "../../plugins/findGameById";
import router from "../../router";

export const calculator = () => {
  const dataGame = findGameById();
  const targetIndex = parseInt(localStorage.getItem("targetIndex"));
  if (!dataGame || isNaN(targetIndex)) {
    alert("Không tải đuọc dữ liệu");
    router.navigate("/");
    return;
  }
  const settings = dataGame.settings;
  const idGame = dataGame.id;
  const players = dataGame.players;
  const tempScore = {};
  players.forEach((player) => {
    const lastScore = player.score[targetIndex];
    tempScore[player.id] = lastScore !== undefined ? lastScore.toString() : "0";
  });
  let playerActiveId = players[0].id;
  let currStr = tempScore[playerActiveId];
  const app = document.getElementById("app");
  app.innerHTML = `<div class="app-container" style="display: flex; flex-direction: column; height: 100vh;">
    
    <header class="header">
      <button class="btn-pill" id="btn-back">Đóng</button>
      <h1 class="header-title">Ván ${targetIndex + 1}</h1>
      <div style="width: 55px;"></div> </header>

    <div
      class="player-tabs"
      style="
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        padding: 16px;
        flex: 1; /* Bung rộng ra chiếm hết khoảng trống */
        align-content: start; /* Dồn các ô lên trên cùng */
        overflow-y: auto; /* Chỉ cuộn khi nội dung tràn ra khỏi khoảng trống này */
      "
    ></div>

    <div id="balance-alert" style="text-align: center;margin-top: 12px; margin-bottom: 12px; font-size: 14px; font-weight: 500; display: none;">
    </div>

    <div class="numpad">
      <button class="num-btn" data-value="1">1</button>
      <button class="num-btn" data-value="2">2</button>
      <button class="num-btn" data-value="3">3</button>
      <button class="num-btn" data-value="4">4</button>
      <button class="num-btn" data-value="5">5</button>
      <button class="num-btn" data-value="6">6</button>
      <button class="num-btn" data-value="7">7</button>
      <button class="num-btn" data-value="8">8</button>
      <button class="num-btn" data-value="9">9</button>
      <button class="num-btn action" data-action="+/-">+/-</button>
      <button class="num-btn" data-value="0">0</button>
      <button class="num-btn action" data-action="del"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg></button>
      <button class="num-btn red" data-action="clear">C</button>
      <button class="num-btn green" id="btn-save">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        Lưu
      </button>
    </div>

  </div>`;

  const btnBack = document.getElementById("btn-back");
  btnBack.addEventListener("click", () => {
    router.navigate("/game");
  });

  const playerTabs = document.querySelector(".player-tabs");
  const renderPlayerTabs = () => {
    playerTabs.innerHTML = "";
    players.forEach((player) => {
      const pTabStatus = player.id === playerActiveId ? "active" : "inactive";
      const pScoreStatus = tempScore[player.id] >= 0 ? "positive" : "negative";
      playerTabs.innerHTML += `<div class="p-tab ${pTabStatus}" data-id="${player.id}">
        <div class="p-name">${player.namePlayer}</div>
        <div class="p-score ${pScoreStatus}" data-value="${tempScore[player.id]}">${tempScore[player.id]}</div>
      </div>`;
    });
  };
  renderPlayerTabs();

  playerTabs.addEventListener("click", (e) => {
    const btnTarget = e.target.closest(".p-tab");
    if (btnTarget) {
      playerActiveId = btnTarget.getAttribute("data-id");
      currStr = tempScore[playerActiveId];
      renderPlayerTabs();
    }
  });
  const balanceAlert = document.getElementById("balance-alert");
  balanceAlert.style.display = settings.balanceScore ? "block" : "none";
  const renderBalanceAlert = () => {
    if (!settings.balanceScore) return;
    let sum = 0;
    for (const key in tempScore) {
      const scorePlayer = tempScore[key];
      sum += Number(scorePlayer);
    }
    if (sum === 0) {
      balanceAlert.innerHTML = `<span style="color: #30D158; display: flex; align-items: center; justify-content: center; gap: 6px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          Tổng điểm cân bằng
        </span>`;
    } else {
      balanceAlert.innerHTML = `<span style="color: #FF453A; display: flex; align-items: center; justify-content: center; gap: 6px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          Tổng điểm: ${sum}
        </span>`;
    }
  };
  renderBalanceAlert();
  const numpad = document.querySelector(".numpad");
  numpad.addEventListener("click", (e) => {
    const btnTarget = e.target.closest(".num-btn");
    if (btnTarget) {
      const dataValue = btnTarget.getAttribute("data-value");
      const dataAction = btnTarget.getAttribute("data-action");
      if (dataValue) {
        if (currStr === "0") currStr = dataValue;
        else if (currStr === "-0") currStr = "-" + dataValue;
        else currStr += dataValue;
      } else {
        if (dataAction === "del") {
          if (currStr.length === 1 || currStr === "-0") currStr = "0";
          else if (currStr.length === 2 && currStr.startsWith("-"))
            currStr = "-0";
          else currStr = currStr.slice(0, -1);
        } else if (dataAction === "clear") currStr = "0";
        else if (dataAction === "+/-") {
          if (currStr.startsWith("-")) currStr = currStr.slice(1);
          else currStr = "-" + currStr;
        }
      }
      tempScore[playerActiveId] = currStr;
      renderPlayerTabs();
      renderBalanceAlert();
    }
  });

  const btnSave = document.getElementById("btn-save");
  btnSave.addEventListener("click", () => {
    players.forEach((player) => {
      player.score[targetIndex] = Number(tempScore[player.id]);
    });
    updateData(dataGame);
    localStorage.removeItem("targetIndex");
    router.navigate("/game");
  });
};
