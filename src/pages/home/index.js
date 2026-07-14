import { getData } from "../../plugins/CRUD";
import router from "../../router";

export const homePage = () => {
  const allDataGame = getData();
  const app = document.getElementById("app");
  app.innerHTML = `<div class="app-container">
  <header class="header">
    <h1 class="header-title large">Bảng chơi</h1>
    <button class="btn-icon green" id="btn-new-game">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    </button>
  </header>

  <main class="main-content" id="home-content">
      </main>

  <div class="bottom-nav-wrapper">
    <div class="bottom-nav">
      <a href="#" class="nav-item active"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg><span>Bảng chơi</span></a>
    </div>
  </div>
</div>`;
  const btnNewGame = document.getElementById("btn-new-game");
  btnNewGame.addEventListener("click", () => {
    router.navigate("/table-info");
  });

  const homeContent = document.getElementById("home-content");
  homeContent.innerHTML = "";
  if (allDataGame.length === 0) {
    homeContent.innerHTML = `<div class="empty-home-wrapper">
  <div class="empty-home-icon">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <path d="M3 9h18"/>
      <path d="M9 21V9"/>
    </svg>
  </div>
  <h2 class="empty-home-title">Chưa có bảng chơi nào</h2>
  <p class="empty-home-desc">Nhấn vào biểu tượng <strong>(+)</strong> ở góc phải trên cùng để tạo bảng ghi điểm mới nhé!</p>
</div>`;
    return;
  }
  let hasHomeContent = ``;
  for (let index = allDataGame.length - 1; index >= 0; index--) {
    const game = allDataGame[index];
    hasHomeContent += `<div class="board-card" data-id="${game.id}">`;
    hasHomeContent += `<div class="board-header">
    <h3 class="board-title">${game.nameBattle}</h3>
    <span class="badge badge-playing">${game.status}</span>
  </div>
  <div class="board-meta">
    <div class="meta-item">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      <span>${game.players.length} người chơi</span>
    </div>
    <div class="meta-item">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
      <span>${game.players[0].score.length} ván</span>
    </div>
  </div>`;
    hasHomeContent += `<div class="avatars">`;
    game.players.forEach((player) => {
      hasHomeContent += `<div class="avatar">${player.namePlayer}</div>`;
    });
    hasHomeContent += `</div>`;
    hasHomeContent += `</div>`;
  }
  homeContent.innerHTML = hasHomeContent;

  homeContent.addEventListener("click", (e) => {
    const btnTarget = e.target.closest(".board-card");
    if (btnTarget) {
      localStorage.setItem("currentGameId", btnTarget.getAttribute("data-id"));
      router.navigate("/game");
    }
  });
};
