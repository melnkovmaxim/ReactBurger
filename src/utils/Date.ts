import { isSameDay, format, parseISO, subDays, formatDistance } from 'date-fns';
import { ru } from "date-fns/locale";

function getOrderReadableDate(comparisonDate: string): string {
  const today: Date = new Date();
  today.setHours(0,0,0,0);
  const yesterday: Date = subDays(today, 1);
  const compare: Date = parseISO(comparisonDate);

  let result: string = '';

  if (isSameDay(compare, today)) {
    result = 'Сегодня';
  } else if (isSameDay(compare, yesterday)) {
    result = 'Вчера';
  } else  {
    result = formatDistance(subDays(compare, 1), today, { addSuffix: true, locale: ru });
  }
  const pattern: string = 'HH:mm \'i\'-z';
  result = result + ', ' + format(compare, pattern);

  return result;
}

export default getOrderReadableDate;