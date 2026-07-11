import { findGameById } from "../../plugins/findGameById";
import router from "../../router";

export const game = () => {
  const dataGame = findGameById();
  if (!dataGame) {
    alert("Khong tim thay tran");
    router.navigate("/");
    return;
  }
  const app = document.getElementById("app");
  app.innerHTML = `<div class="app-container">
    
    <header class="header">
      <button class="btn-icon" id="btn-back"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg></button>
      <h1 class="header-title">Ván 0</h1>
      <button class="btn-icon" id="btn-setting"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></button>
    </header>

    <div class="empty-wrapper">
      <div class="empty-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
      </div>
      <h2 class="empty-title">Chưa có ván nào</h2>
      <p class="empty-desc">Nhấn nút "Thêm ván" bên dưới để bắt đầu ghi điểm</p>
    </div>

    <div class="fixed-bottom">
      <button class="btn-primary" id="add-new-game">+ Thêm ván</button>
    </div>

  </div>`;

  const btnBack = document.getElementById("btn-back");
  btnBack.addEventListener("click", () => {
    if (history.length > 2) history.back();
    else router.navigate("/");
  });

  const btnSetting = document.getElementById("btn-setting");
  btnSetting.addEventListener("click", () => {
    router.navigate("/setting");
  });

  const addNewGame = document.getElementById("add-new-game");
  addNewGame.addEventListener("click", () => {
    router.navigate("/calculator");
  });

  console.log(dataGame);
  let round = dataGame.players.p1.score.length;
  const players = dataGame.players;
};
