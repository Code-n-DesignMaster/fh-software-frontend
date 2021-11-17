import moment from 'moment-timezone';

export function formatDate(date: Date, format = 'MM/DD/YYYY HH:mm:ss') {
  return moment(date).format(format);
}

export function formatDateNoTime(date: Date, format = 'MM/DD/YYYY') {
  return moment(date).format(format);
}