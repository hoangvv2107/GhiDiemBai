import router from "../../router";

export const setting = () => {
  const app = document.getElementById("app");
  app.innerHTML = `<div class="app-container">
    
    <header class="header">
      <button class="btn-icon" id="btn-back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      
      <h1 class="header-title">Cài đặt</h1>
      
      <button class="btn-pill dark">Lưu</button>
    </header>

    <main class="main-content">
      
      <div class="section-title" style="margin-top: 8px;">Người chơi</div>
      
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

      <div class="section-title">Cài đặt luật chơi</div>
      
      <div class="setting-group">
        <div class="setting-item" style="flex-direction: column; align-items: flex-start; padding: 16px 16px 0;">
          <h4 style="font-size: 14px; margin-bottom: 12px; font-weight: 500;">Điều kiện kết thúc</h4>
          
          <div class="setting-tabs" style="width: 100%; border-bottom: none; background: var(--bg-main); border-radius: 20px; overflow: hidden; padding: 4px;">
            <div id="tab-manual" class="s-tab active" style="border-radius: 16px;">Thủ công</div>
            <div id="tab-round" class="s-tab" style="border-radius: 16px;">Giới hạn ván</div>
            <div id="tab-score" class="s-tab" style="border-radius: 16px;">Giới hạn điểm</div>
          </div>
        </div>

        <div id="content-manual" class="setting-note">
          Kết thúc khi bạn bấm nút
        </div>

        <div id="content-round" class="setting-item" style="display: none; border-bottom: 1px solid var(--border-color);">
          <span style="font-size: 13px; color: var(--text-secondary);">Số ván tối đa</span>
          <input type="number" class="small-input" value="10">
        </div>

        <div id="content-score" class="setting-item" style="display: none; border-bottom: 1px solid var(--border-color);">
          <span style="font-size: 13px; color: var(--text-secondary);">Điểm mục tiêu</span>
          <input type="number" class="small-input" value="100">
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Hiển thị tổng điểm</h4>
            <p>Hiện tổng điểm của từng người chơi</p>
          </div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Cân bằng điểm</h4>
            <p>Tổng điểm của tất cả người chơi trong mỗi ván phải bằng 0</p>
          </div>
          <label class="toggle"><input type="checkbox" checked><span class="slider"></span></label>
        </div>
      </div>

      <button class="btn-delete-board">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        Xóa
      </button>

    </main>

  </div>`;

  const btnBack = document.getElementById("btn-back");
  btnBack.addEventListener("click", () => {
    if (history.length > 2) history.back();
    else router.navigate("/");
  });
};
