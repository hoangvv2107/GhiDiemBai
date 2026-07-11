import router from "../../router";

export const homePage = () => {
  const app = document.getElementById("app");
  app.innerHTML = `<div class="app-container">
    
    <header class="header">
      <h1 class="header-title large">Bảng chơi</h1>
      <button class="btn-icon green" id="btn-new-game">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
    </header>

    <main class="main-content">

      <div class="board-card">
        <div class="board-header">
          <h3 class="board-title">Phong Thần Bảng</h3>
          <span class="badge badge-playing">Đang chơi</span>
        </div>
        <div class="board-meta">
          <div class="meta-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span>4 người chơi</span></div>
          <div class="meta-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg><span>2 ván</span></div>
        </div>
        <div class="avatars">
          <div class="avatar">H</div><div class="avatar">V</div><div class="avatar">K</div><div class="avatar dark">3</div>
        </div>
      </div>

      <div class="board-card">
        <div class="board-header">
          <h3 class="board-title">Tiến Lên</h3>
          <span class="badge badge-ended">Đã kết thúc</span>
        </div>
        <div class="board-meta">
          <div class="meta-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span>3 người chơi</span></div>
          <div class="meta-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg><span>1 ván</span></div>
        </div>
        <div class="avatars">
          <div class="avatar">H</div><div class="avatar">D</div><div class="avatar">V</div>
        </div>
      </div>

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

  
};
