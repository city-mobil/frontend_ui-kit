import Error403x1 from '../../assets/png/errors/403-x1.png'
import Error403x2 from '../../assets/png/errors/403-x2.png'
import Error404x1 from '../../assets/png/errors/404-x1.png'
import Error404x2 from '../../assets/png/errors/404-x2.png'
import Error500x1 from '../../assets/png/errors/500-x1.png'
import Error500x2 from '../../assets/png/errors/500-x2.png'
import Error50Xx1 from '../../assets/png/errors/500x-x1.png'
import Error50Xx2 from '../../assets/png/errors/500x-x2.png'
import Error501x1 from '../../assets/png/errors/501-x1.png'
import Error501x2 from '../../assets/png/errors/501-x2.png'
import Error502x1 from '../../assets/png/errors/502-x1.png'
import Error502x2 from '../../assets/png/errors/502-x2.png'
import Error503x1 from '../../assets/png/errors/503-x1.png'
import Error503x2 from '../../assets/png/errors/503-x2.png'
import ErrorFrontx1 from '../../assets/png/errors/error-front-x1.png'
import ErrorFrontx2 from '../../assets/png/errors/error-front-x2.png'
import { createAssets } from '../../helpers'

const iconsSource = {
  Error403: { main: Error403x1, hight: Error403x2 },
  Error404: { main: Error404x1, hight: Error404x2 },
  Error500: { main: Error500x1, hight: Error500x2 },
  Error501: { main: Error501x1, hight: Error501x2 },
  Error502: { main: Error502x1, hight: Error502x2 },
  Error503: { main: Error503x1, hight: Error503x2 },
  Error50X: { main: Error50Xx1, hight: Error50Xx2 },
  ErrorFront: { main: ErrorFrontx1, hight: ErrorFrontx2 },
}

export const ErrorIcons = createAssets(iconsSource)
