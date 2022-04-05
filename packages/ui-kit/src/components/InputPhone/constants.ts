import { ReactComponent as ArmeniaFlagIcon } from '../../assets/svg/ic-armenia-flag.svg'
import { ReactComponent as AzerbaijanFlagIcon } from '../../assets/svg/ic-azerbaijan-flag.svg'
import { ReactComponent as BelarusFlagIcon } from '../../assets/svg/ic-belarus-flag.svg'
import { ReactComponent as KazakhstanFlagIcon } from '../../assets/svg/ic-kazakhstan-flag.svg'
import { ReactComponent as KirghiziaFlagIcon } from '../../assets/svg/ic-kirghizia-flag.svg'
import { ReactComponent as RussiaFlagIcon } from '../../assets/svg/ic-russia-flag.svg'
import { ReactComponent as TajikistanFlagIcon } from '../../assets/svg/ic-tajikistan-flag.svg'
import { ReactComponent as UkraineFlagIcon } from '../../assets/svg/ic-ukraine-flag.svg'
import { ReactComponent as UzbekistanFlagIcon } from '../../assets/svg/ic-uzbekistan-flag.svg'
import { CountryAbbreviation, CountrySelectOption } from './types'

export const ABBREVIATIONS = {
  russia: 'rus',
  armenia: 'arm',
  belarus: 'blr',
  kirghizia: 'kgz',
  uzbekistan: 'uzb',
  azerbaijan: 'aze',
  kazakhstan: 'kaz',
  tajikistan: 'tjk',
  ukraine: 'ukr',
} as const

export const RUSSIA_AND_KAZAKHSTAN_COUNTRY_CODE = '+7'

// примеры масок для номеров различных стран
// russia +7 xxx xxx-xx-xx
// armenia +374 xx xx-xx-xx
// belarus +375 xx xxx-xx-xx
// kirgizia +996 xxx xx-xx-xx
// uzbekistan +998 xx xxx-xx-xx
// azerbaijan +994 xx xxx-xx-xx
// kazakhastan +7 xxx xxx-xx-xx
// tajikistan +992 xx xxx-xx-xx
// ukraine +380 xx xxx-xx-xx
export const COUNTRIES_MAP: Record<CountryAbbreviation, CountrySelectOption> = {
  [ABBREVIATIONS.russia]: {
    value: ABBREVIATIONS.russia,
    country: 'Россия',
    label: RUSSIA_AND_KAZAKHSTAN_COUNTRY_CODE,
    Flag: RussiaFlagIcon,
    regexp: /^(\d{3})?(\d{3})?(\d{2})?(\d{2})?/,
  },
  [ABBREVIATIONS.armenia]: {
    value: ABBREVIATIONS.armenia,
    country: 'Армения',
    label: '+374',
    Flag: ArmeniaFlagIcon,
    regexp: /^(\d{2})?(\d{2})?(\d{2})?(\d{2})?/,
  },
  [ABBREVIATIONS.belarus]: {
    value: ABBREVIATIONS.belarus,
    country: 'Белоруссия',
    label: '+375',
    Flag: BelarusFlagIcon,
    regexp: /^(\d{2})?(\d{3})?(\d{2})?(\d{2})?/,
  },
  [ABBREVIATIONS.kirghizia]: {
    value: ABBREVIATIONS.kirghizia,
    country: 'Киргизия',
    label: '+996',
    Flag: KirghiziaFlagIcon,
    regexp: /^(\d{3})?(\d{2})?(\d{2})?(\d{2})?/,
  },
  [ABBREVIATIONS.uzbekistan]: {
    value: ABBREVIATIONS.uzbekistan,
    country: 'Узбекистан',
    label: '+998',
    Flag: UzbekistanFlagIcon,
    regexp: /^(\d{2})?(\d{3})?(\d{2})?(\d{2})?/,
  },
  [ABBREVIATIONS.azerbaijan]: {
    value: ABBREVIATIONS.azerbaijan,
    country: 'Азербайджан',
    label: '+994',
    Flag: AzerbaijanFlagIcon,
    regexp: /^(\d{2})?(\d{3})?(\d{2})?(\d{2})?/,
  },
  [ABBREVIATIONS.kazakhstan]: {
    value: ABBREVIATIONS.kazakhstan,
    country: 'Казахстан',
    label: RUSSIA_AND_KAZAKHSTAN_COUNTRY_CODE,
    Flag: KazakhstanFlagIcon,
    regexp: /^(\d{3})?(\d{3})?(\d{2})?(\d{2})?/,
  },
  [ABBREVIATIONS.tajikistan]: {
    value: ABBREVIATIONS.tajikistan,
    country: 'Таджикистан',
    label: '+992',
    Flag: TajikistanFlagIcon,
    regexp: /^(\d{2})?(\d{3})?(\d{2})?(\d{2})?/,
  },
  [ABBREVIATIONS.ukraine]: {
    value: ABBREVIATIONS.ukraine,
    country: 'Украина',
    label: '+380',
    Flag: UkraineFlagIcon,
    regexp: /^(\d{2})?(\d{3})?(\d{2})?(\d{2})?/,
  },
}

export const COUNTRIES = [
  COUNTRIES_MAP[ABBREVIATIONS.russia],
  COUNTRIES_MAP[ABBREVIATIONS.armenia],
  COUNTRIES_MAP[ABBREVIATIONS.belarus],
  COUNTRIES_MAP[ABBREVIATIONS.kirghizia],
  COUNTRIES_MAP[ABBREVIATIONS.uzbekistan],
  COUNTRIES_MAP[ABBREVIATIONS.azerbaijan],
  COUNTRIES_MAP[ABBREVIATIONS.kazakhstan],
  COUNTRIES_MAP[ABBREVIATIONS.tajikistan],
  COUNTRIES_MAP[ABBREVIATIONS.ukraine],
]
