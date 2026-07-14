import { findGameById } from "../../plugins/findGameById";
import { sumTotalOfArr } from "../../plugins/sumTotalOfArr";
import router from "../../router";

export const game = () => {
  const dataGame = findGameById();
  if (!dataGame) {
    alert("Không tải đuọc dữ liệu");
    router.navigate("/");
    return;
  }

  let round = dataGame.players[0].score.length;
  const app = document.getElementById("app");
  app.innerHTML = `<div class="app-container" style="display: flex; flex-direction: column; height: 100vh;">
  
  <header class="header">
    <button class="btn-icon" id="btn-back">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <h1 class="header-title" id="game-title">Ván ${round}</h1>
    <button class="btn-icon" id="btn-settings">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    </button>
  </header>

  <main id="board-content" style="flex: 1; overflow: hidden; min-height: 0; display: flex; flex-direction: column;">
  </main>

 <div id="bottom-actions" style="display: flex; gap: 12px; padding: 16px; padding-bottom: 32px;">    
    <button id="btn-end" class="btn-action btn-end" style="display: none; flex: 1; background-color: #E24C4C; color: white; padding: 14px; border-radius: 12px; font-weight: 600; font-size: 16px; border: none; cursor: pointer; justify-content: center; align-items: center; gap: 8px;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
      Kết thúc
    </button>

    <button id="btn-add" class="btn-action btn-add" style="flex: 1; background-color: #22C55E; color: white; padding: 14px; border-radius: 12px; font-weight: 600; font-size: 16px; border: none; cursor: pointer;">
      + Thêm ván
    </button>

  </div>

</div>`;

  const btnBack = document.getElementById("btn-back");
  btnBack.addEventListener("click", () => {
    if (history.length > 2) history.back();
    else router.navigate("/");
  });

  const btnSettings = document.getElementById("btn-settings");
  btnSettings.addEventListener("click", () => {
    router.navigate("/setting");
  });

  const players = dataGame.players;

  const boardContent = document.getElementById("board-content");

  const renderTableRound = () => {
    const noScore = `<div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
  <div style="background: var(--bg-surface-light, #2C2C2E); padding: 18px; border-radius: 50%; margin-bottom: 20px;">
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary, #8E8E93)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/>
      <line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>
    </svg>
  </div>
  <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 8px 0; color: white;">Chưa có ván nào</h2>
  <p style="color: var(--text-secondary, #8E8E93); font-size: 14px; margin: 0;">Nhấn nút "Thêm ván" bên dưới để bắt đầu ghi điểm</p>
</div>`;

    let hasScore = `<div class="scoreboard-container" style="padding-top: 16px;">`;

    let namePlayer = `
  <div class="score-grid-row" style="grid-template-columns: repeat(${players.length}, 1fr);">`;
    for (const player of players) {
      const sum = sumTotalOfArr(player.score);
      const bgStatus = sum >= 0 ? "bg-positive" : "bg-negative";
      const bageStatus = sum >= 0 ? "badge-positive" : "badge-negative";
      namePlayer += `
    <div class="player-header-cell ${bgStatus}">
      <div class="player-name-text">${player.namePlayer}</div>
      <div class="score-badge ${bageStatus}">${sum}</div>
    </div>`;
    }
    namePlayer += `</div>`;
    hasScore += namePlayer;

    let score = `<div class="round-row-box">`;
    for (let i = round - 1; i >= 0; i--) {
      score += `<div class="round-row" data-id="${i}" style="grid-template-columns: repeat(${players.length}, 1fr);">`;
      for (const player of players) {
        score += `<div class="score-cell">${player.score[i]}</div>`;
      }
      score += `</div>`;
    }
    score += `</div>`;
    hasScore += score;
    hasScore += `<div class="hint-text">Chạm vào ô để sửa điểm</div>
          </div>`;

    const final = round > 0 ? hasScore : noScore;
    boardContent.innerHTML = final;
  };
  renderTableRound();

  const btnAdd = document.getElementById("btn-add");
  btnAdd.addEventListener("click", () => {
    const targetIndex = round;
    localStorage.setItem("targetIndex", targetIndex);
    router.navigate("/calculator");
  });

  const editRound =
    document.querySelector(".scoreboard-container") || undefined;

  if (editRound) {
    editRound.addEventListener("click", (e) => {
      const btnTarget = e.target.closest(".round-row");
      if (btnTarget) {
        const targetIndex = btnTarget.getAttribute("data-id");
        localStorage.setItem("targetIndex", targetIndex);
        router.navigate("/calculator");
      }
    });
  }

  const btnEnd = document.getElementById("btn-end");
  btnEnd.style.display = round > 0 ? "flex" : "none";
  btnEnd.addEventListener("click", () => {
    confirm("Ban co chac chan muon ket thuc");
  });

  const settings = dataGame.settings;
  if (round > 0) {
    const arrTotalScore = document.querySelectorAll(".score-badge");
    arrTotalScore.forEach((totalScore) => {
      totalScore.style.display = settings.showTotalScore ? "block" : "none";
    });
  }
};
