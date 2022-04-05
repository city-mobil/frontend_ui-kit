import './styles/index.scss'

import { H1, H2, H3, H4, H5, H6 } from './Headers'
import { P12, P13, P15, P17 } from './Paragraphs'
import { S12, S13, S15, S17 } from './Spans'

interface TypographyComponents {
  H1: typeof H1
  H2: typeof H2
  H3: typeof H3
  H4: typeof H4
  H5: typeof H5
  H6: typeof H6
  P12: typeof P12
  P13: typeof P13
  P15: typeof P15
  P17: typeof P17
  S12: typeof S12
  S13: typeof S13
  S15: typeof S15
  S17: typeof S17
}

export const Typography: TypographyComponents = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P12,
  P13,
  P15,
  P17,
  S12,
  S13,
  S15,
  S17,
}
