// 오늘 날짜
export const getTodayDate = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${month}.${day}`; // mm.dd 형식 반환
};
