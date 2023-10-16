function returnNextDate(date: string) {
  const formattedDate = date.split('.').join('-'); // '2023.10.15' -> '2023-10-15'
  const dateObj = new Date(formattedDate); // 문자열을 Date 객체로 변환
  dateObj.setDate(dateObj.getDate() - 1); // 하루를 더함

  const nextDay = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(
    dateObj.getDate(),
  ).padStart(2, '0')}`;

  return nextDay;
}

export default returnNextDate;
