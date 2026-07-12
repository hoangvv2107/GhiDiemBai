export const getData = () => {
  return JSON.parse(localStorage.getItem("game")) || [];
};
export const postData = (data) => {
  localStorage.setItem("game", JSON.stringify(data));
};

export const updateData = (game) => {
  const allData = getData();
  const index = allData.findIndex((data) => data.id === game.id);
  if (index !== -1) {
    allData[index] = game;
    postData(allData);
  } else throw new Error("Không tìm thấy dữ liệu!");
};
