// 年月を基に月初の曜日を特定し、日曜始まりのカレンダーの1日目を合わせる
export function getFirstDayDay(year, month) {
  let day = new Date();
  day.setYear(year);
  day.setMonth(month - 1);
  day.setDate(1);
  return day.getDay() * -1 + 1;
}

// 年月からその日の最終日が何日かを返す
export function getLastDay(year, month) {
  let day = new Date();
  return new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate();
}
