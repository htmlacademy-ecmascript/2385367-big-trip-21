import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DurationFormats } from '../consts.js';

dayjs.extend(duration);

function calculateDuration(timeFrom, timeTo) {
  return dayjs.duration(dayjs(timeTo).diff(timeFrom));
}

function getDuration(timeFrom, timeTo) {
  const timeDuration = calculateDuration(timeFrom, timeTo);

  const isDaysLong = Boolean(timeDuration.days());
  const isHoursLong = Boolean(timeDuration.hours());

  let format;

  switch (true) {
    case isDaysLong:
      format = DurationFormats.DAYS;
      break;
    case isHoursLong:
      format = DurationFormats.HOURS;
      break;
    default:
      format = DurationFormats.MINUTES;
  }

  return timeDuration.format(format);
}

function humanizeDate(eventDate, dateFormat) {
  return eventDate ? dayjs(eventDate).format(dateFormat) : '';
}

function capitalize(text) {
  return text.charAt(0).toUpperCase().concat(text.slice(1));
}

export { humanizeDate, capitalize, getDuration };
