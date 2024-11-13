import moment from 'moment';

export const getAge = (date: string | Date) => {
  const dateMoment = moment(date);
  return moment().diff(dateMoment, 'years');
};
