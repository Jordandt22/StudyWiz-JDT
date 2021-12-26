export const getRandomColor = () => {
  const colors = ['#ff00a3', '#ff5c00', '#00ff5c', '#00ffdc', '#ffdc00']
  const getRandomNum = Math.floor(Math.random() * colors.length);
  return colors[getRandomNum];
}