import NoDataX1 from '../../assets/png/info/no-data-x1.png'
import NoDataX2 from '../../assets/png/info/no-data-x2.png'
import NoVehicleX1 from '../../assets/png/info/no-vehicle-x1.png'
import NoVehicleX2 from '../../assets/png/info/no-vehicle-x2.png'
import NotFoundX1 from '../../assets/png/info/not-found-x1.png'
import NotFoundX2 from '../../assets/png/info/not-found-x2.png'
import NotLoadingX1 from '../../assets/png/info/not-loading-x1.png'
import NotLoadingX2 from '../../assets/png/info/not-loading-x2.png'
import { createAssets } from '../../helpers'

const iconsSource = {
  NoData: { main: NoDataX1, hight: NoDataX2 },
  NotFound: { main: NotFoundX1, hight: NotFoundX2 },
  NoVehicle: { main: NoVehicleX1, hight: NoVehicleX2 },
  NotLoading: { main: NotLoadingX1, hight: NotLoadingX2 },
} as const

export const InfoIcons = createAssets(iconsSource)
