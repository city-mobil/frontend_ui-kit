import { Caption } from './components/Caption'
import { NavBar } from './components/NavBar'

export const INPUT_DATE_FORMAT = 'dd.MM.yyyy'
export const VALUE_DATE_FORMAT = 'dd MMM yyyy'
export const MIN_DATE_PICKER_DATE = new Date('1900-01-01')
export const INVALID_DATE = 'Недействительная дата'
export const PLACEHOLDERS = {
  chooseDate: 'Выберите дату',
  pattern: 'дд.мм.гггг',
  start: 'Начало',
  end: 'Окончание',
}

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const WEEKDAYS_LONG = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

export const commonDayPickerOptions = {
  months: MONTHS,
  weekdaysLong: WEEKDAYS_LONG,
  weekdaysShort: WEEKDAYS_SHORT,
  firstDayOfWeek: 1,
  captionElement: Caption,
  navbarElement: NavBar,
  fromMonth: MIN_DATE_PICKER_DATE,
}
