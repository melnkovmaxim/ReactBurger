import { isAfter, isSameDay, format, parseISO, subDays, differenceInDays, formatDistance } from 'date-fns';
import { ru } from "date-fns/locale";

function getOrderReadableDate(comparisonDate) {
  const today = new Date();
  today.setHours(0,0,0,0);
  const yesterday = subDays(today, 1);
  const compare = parseISO(comparisonDate);

  let result = '';

  if (isSameDay(compare, today)) {
    result = 'Сегодня';
  } else if (isSameDay(compare, yesterday)) {
    result = 'Вчера';
  } else  {
    console.log(compare);
    result = formatDistance(subDays(compare, 1), today, { addSuffix: true, locale: ru });
  }
  const pattern = 'HH:mm \'i\'-z'
  result = result + ', ' + format(compare, pattern);

  return result;
}

export default getOrderReadableDate;