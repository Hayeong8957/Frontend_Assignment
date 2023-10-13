/**
 * @param inputDate string 2023-10-13T17:25:43+0000
 * @returns string 2023.10.13. (금)
 */
function formatDate(inputDate: string): string {
  // ISO 형식의 날짜를 Date 객체로 변환
  const date = new Date(inputDate);

  // 년, 월, 일 정보 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, '0');

  // 요일 정보 추출 (한국어로)
  const weekday = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date);

  return `${year}.${month}.${day}. (${weekday})`;
}

export default formatDate;
