import { GroupButtonOption } from '../../../../components/Buttons'
import { SelectBaseOption } from '../../../../components/Selects'

export const SexOptions: GroupButtonOption[] = [
  {
    label: 'Мужской',
    value: 'male',
  },
  {
    label: 'Женский',
    value: 'female',
  },
]

export const carBrandOptions: SelectBaseOption[] = [
  {
    label: 'Lada',
    value: 'lada',
  },
  {
    label: 'Audi',
    value: 'audi',
  },
  {
    label: 'KIA',
    value: 'kia',
  },
  {
    label: 'Ford',
    value: 'ford',
  },
]

export const carModelOptions: SelectBaseOption[] = [
  {
    label: 'Vesta',
    value: 'vesta',
  },
  {
    label: 'GL',
    value: 'GL',
  },
]

export const colorOptions: SelectBaseOption[] = [
  {
    label: 'Белый',
    value: 'white',
  },
  {
    label: 'Черный',
    value: 'black',
  },
  {
    label: 'Желтый',
    value: 'yellow',
  },
]

export const ownerShipOptions = [
  {
    label: 'Собственный автомобиль',
    value: 'own',
  },
  {
    label: 'Арендный автомобиль',
    value: 'rental',
  },
]

export const childSeatOptions = {
  '0-10': {
    label: '0-10 кг',
    selected: false,
  },
  '9-18': {
    label: '9-18 кг',
    selected: true,
  },
  '15-25': {
    label: '15-25кг',
    selected: true,
  },
  '22-36': {
    label: '22-36 кг',
    selected: true,
  },
}

export const childSeatOptionsEmpty = {
  '0-10': {
    label: '0-10 кг',
    selected: false,
  },
  '9-18': {
    label: '9-18 кг',
    selected: false,
  },
  '15-25': {
    label: '15-25кг',
    selected: false,
  },
  '22-36': {
    label: '22-36 кг',
    selected: false,
  },
}

export const FORM_FILLED = {
  surname: 'Константинопольский',
  patronim: 'Равшанович',
  name: 'Константин',
  birthDate: new Date('2000-06-01'),
  sex: SexOptions[0].value,
  deafDriver: true,
  phone: '79035551122',
  email: 'driver@taxi.ru',
  car: {
    plateNumber: 'ВО259 197',
    brand: carBrandOptions[0],
    model: carModelOptions[0],
    year: '2004',
    color: colorOptions[0],
  },
  ownership: ownerShipOptions[0].value,
  medicalRecordRequired: false,
  childSeatOptions,
  priorityLane: false,
  nonSmoking: true,
  thermalBag: true,
  comment: '',
} as const

export const FORM_EMPTY = {
  surname: '',
  patronim: '',
  name: '',
  birthDate: null,
  // birthDate: new Date('2011-01-02'),
  sex: '',
  deafDriver: false,
  phone: '',
  email: '',
  car: {
    plateNumber: '',
    brand: null,
    model: null,
    year: '',
    color: null,
  },
  ownership: '',
  medicalRecordRequired: false,
  childSeatOptions: childSeatOptionsEmpty,
  priorityLane: false,
  nonSmoking: false,
  thermalBag: false,
  comment: '',
} as const
