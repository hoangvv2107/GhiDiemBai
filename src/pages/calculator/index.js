import router from "../../router";

export const calculator = () => {
  const app = document.getElementById("app");
  app.innerHTML = `<div class="app-container">
    
    <header class="header">
      <button class="btn-pill" id="btn-back">Đóng</button>
      <h1 class="header-title">Ván 1</h1>
      <div style="width: 55px;"></div> </header>

    <div class="player-tabs">
      <div class="p-tab active">
        <div class="p-name">H</div>
        <div class="p-score">0</div>
      </div>
      <div class="p-tab inactive">
        <div class="p-name">V</div>
        <div class="p-score">0</div>
      </div>
    </div>

    <div class="numpad">
      <button class="num-btn">1</button>
      <button class="num-btn">2</button>
      <button class="num-btn">3</button>
      <button class="num-btn">4</button>
      <button class="num-btn">5</button>
      <button class="num-btn">6</button>
      <button class="num-btn">7</button>
      <button class="num-btn">8</button>
      <button class="num-btn">9</button>
      <button class="num-btn action">+/-</button>
      <button class="num-btn">0</button>
      <button class="num-btn action"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg></button>
      <button class="num-btn red">C</button>
      <button class="num-btn dark">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        Lưu
      </button>
    </div>

  </div>`;

  const btnBack = document.getElementById("btn-back");
  btnBack.addEventListener("click", () => {
    if (history.length > 2) history.back();
    else router.navigate("/");
  });

  const dataGame = localStorage.getItem("game");
  
};
