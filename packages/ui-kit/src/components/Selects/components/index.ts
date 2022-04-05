import { MultiselectItem, SelectAllItem, SelectItem } from './Items'
import { Loading } from './Loading'
import { NoOptions } from './NoOptions'
import { FlatSelectPopup, MultiselectPopup, SelectPopup } from './Popups'
import { Tag } from './Tag'
import { FlatSelectTarget, MultiselectTarget, SelectTarget } from './Targets'

export const SelectDefaults = {
  Target: SelectTarget,
  Popup: SelectPopup,
  Item: SelectItem,
  NoOptions: NoOptions,
  Loading: Loading,
}

export const MultiselectDefaults = {
  Target: MultiselectTarget,
  Popup: MultiselectPopup,
  Item: MultiselectItem,
  NoOptions: NoOptions,
  Loading: Loading,
  Tag: Tag,
  SelectAllItem,
}

export const FlatSelectDefaults = {
  Target: FlatSelectTarget,
  Popup: FlatSelectPopup,
  Item: SelectItem,
  NoOptions: NoOptions,
  Loading: Loading,
}
