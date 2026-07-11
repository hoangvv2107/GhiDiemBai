export const findGameById = (id = undefined) => {
  const currentGameId = id || localStorage.currentGameId;
  const allGame = JSON.parse(localStorage.game);
  return allGame.find((game) => game.id === currentGameId);
};
