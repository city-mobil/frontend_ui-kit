import React, { useCallback, useState } from 'react'
import { Typography, useModal } from '@city/ui-kit-core'
import { Input } from '../../../../components/Input'
import { InputPhone } from '../../../../components/InputPhone'
import { DatePicker } from '../../../../components/DatePickers'
import { Button, GroupButton, GroupButtonOption } from '../../../../components/Buttons'
import { Checkbox } from '../../../../components/Checkbox'
import { SelectBaseOption, Select } from '../../../../components/Selects'
import {
  carBrandOptions,
  carModelOptions,
  childSeatOptions,
  colorOptions,
  FORM_EMPTY,
  FORM_FILLED,
  ownerShipOptions,
  SexOptions,
} from './data'
import { Radio } from '../../../../components/Radio'
import { Switcher } from '../../../../components/Switcher'
import { Textarea } from '../../../../components/Textarea'
import { ReactComponent as CalendarIcon } from '../../../../assets/svg/ic_calendar.svg'
import { FormModal } from './FormModal'
import styles from './styles.module.scss'

interface FormDemoProps {
  empty?: boolean
}

export const FormDemo = ({ empty = false }: FormDemoProps): JSX.Element => {
  const DEFAULT = empty ? FORM_EMPTY : FORM_FILLED
  const [surname, setSurname] = useState<string>(DEFAULT.surname)
  const [patronim, setPatronim] = useState<string>(DEFAULT.patronim)
  const [name, setName] = useState<string>(DEFAULT.name)
  const [birthDate, setBirthDate] = useState<Date | null>(DEFAULT.birthDate)
  const [sex, setSex] = useState<GroupButtonOption['value']>(DEFAULT.sex)
  const [deafDriver, setDeafDriver] = useState<boolean>(DEFAULT.deafDriver)
  const [phone, setPhone] = useState<string>(DEFAULT.phone)
  const [email, setEmail] = useState<string>(DEFAULT.email)
  const [plateNumber, setPlateNumber] = useState<string>(DEFAULT.car.plateNumber)
  const [carBrand, setCarBrand] = useState<SelectBaseOption | null>(DEFAULT.car.brand)
  const [carModel, setCarModel] = useState<SelectBaseOption | null>(DEFAULT.car.model)
  const [carYear, setCarYear] = useState<string>(DEFAULT.car.year)
  const [carColor, setCarColor] = useState<SelectBaseOption | null>(DEFAULT.car.color)
  const [ownership, setOwnership] = useState(DEFAULT.ownership)
  const [hasMedicalRecord, setHasMedicalRecord] = useState<boolean>(DEFAULT.medicalRecordRequired)
  const [childSeat0_10, setChildSeat0_10] = useState<boolean>(DEFAULT.childSeatOptions['0-10'].selected)
  const [childSeat9_18, setChildSeat9_18] = useState<boolean>(DEFAULT.childSeatOptions['9-18'].selected)
  const [childSeat15_25, setChildSeat15_25] = useState<boolean>(DEFAULT.childSeatOptions['15-25'].selected)
  const [childSeat22_36, setChildSeat22_36] = useState<boolean>(DEFAULT.childSeatOptions['22-36'].selected)
  const [priorityLane, setPriorityLane] = useState<boolean>(DEFAULT.priorityLane)
  const [nonSmoking, setNonSmoking] = useState<boolean>(DEFAULT.nonSmoking)
  const [thermalBag, setThermalBag] = useState<boolean>(DEFAULT.thermalBag)
  const [comment, setComment] = useState<string>(DEFAULT.comment)

  const resetForm = () => {
    setSurname(FORM_EMPTY.surname)
    setPatronim(FORM_EMPTY.patronim)
    setName(FORM_EMPTY.name)
    setBirthDate(FORM_EMPTY.birthDate)
    setSex(FORM_EMPTY.sex)
    setDeafDriver(FORM_EMPTY.deafDriver)
    setPhone(FORM_EMPTY.phone)
    setEmail(FORM_EMPTY.email)
    setPlateNumber(FORM_EMPTY.car.plateNumber)
    setCarBrand(FORM_EMPTY.car.brand)
    setCarModel(FORM_EMPTY.car.model)
    setCarYear(FORM_EMPTY.car.year)
    setCarColor(FORM_EMPTY.car.color)
    setOwnership(FORM_EMPTY.ownership)
    setHasMedicalRecord(FORM_EMPTY.medicalRecordRequired)
    setChildSeat0_10(FORM_EMPTY.childSeatOptions['0-10'].selected)
    setChildSeat9_18(FORM_EMPTY.childSeatOptions['9-18'].selected)
    setChildSeat15_25(FORM_EMPTY.childSeatOptions['15-25'].selected)
    setChildSeat22_36(FORM_EMPTY.childSeatOptions['22-36'].selected)
    setPriorityLane(FORM_EMPTY.priorityLane)
    setNonSmoking(FORM_EMPTY.nonSmoking)
    setThermalBag(FORM_EMPTY.thermalBag)
    setComment(FORM_EMPTY.comment)
  }

  const { openModal } = useModal()

  const onClickCancel = useCallback(() => {
    openModal(FormModal)
      .then(() => {
        resetForm()
      })
      .catch(() => {
        // nothing
      })
  }, [openModal])

  return (
    <form>
      <div className="mb-32">Анкета нового водителя</div>
      <div className={styles.block}>
        <div className="mb-24">Персональные данные</div>
        <Input value={surname} onChange={setSurname} size="lg" placeholder="Фамилия" />
        <div className={styles.row}>
          <Input value={patronim} onChange={setPatronim} size="lg" placeholder="Отчество" />
          <Input name="name" value={name} onChange={setName} size="lg" placeholder="Имя" />
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>
            <DatePicker value={birthDate} onChange={setBirthDate} size="lg" placeholder="Дата рождения" />
          </div>
          <div className={styles.cell}>
            <GroupButton size="lg" options={SexOptions} selectedOption={sex} onChange={setSex} />
          </div>
        </div>
        <Checkbox checked={deafDriver} onChange={setDeafDriver} label="Водитель глухонемой" />
      </div>
      <div className={styles.block}>
        <div className="mb-24">Контактные данные</div>
        <div className={styles.row}>
          <div className={styles.cell}>
            <InputPhone value={phone} onChange={setPhone} size="lg" />
          </div>
          <div className={styles.cell}>
            <Input value={email} onChange={setEmail} placeholder="E-mail" size="lg" />
          </div>
        </div>
      </div>
      <div className={styles.dashedDivider} />
      <div className={styles.block}>
        <div className="mb-24">Данные о машине</div>
        <Input value={plateNumber} onChange={setPlateNumber} placeholder="Госномер" size="lg" />
        <div className={styles.row}>
          <Select
            value={carBrand}
            options={carBrandOptions}
            onChange={(value) => setCarBrand(value)}
            placeholder="Марка"
            size="lg"
          />
          <Select
            value={carModel}
            options={carModelOptions}
            onChange={(value) => setCarModel(value)}
            placeholder="Модель"
            size="lg"
          />
        </div>
        <div className={styles.row}>
          <Input value={carYear} onChange={setCarYear} placeholder="Год выпуска" size="lg" suffixIcon={CalendarIcon} />
          <Select
            value={carColor}
            options={colorOptions}
            onChange={(value) => setCarColor(value)}
            placeholder="Цвет"
            size="lg"
          />
        </div>
        <Radio.Group vertical>
          {ownerShipOptions.map((option) => (
            <Radio
              value={option.value}
              key={option.value}
              name={option.value}
              checked={option.value === ownership}
              onChange={(v) => setOwnership(v as string)}
            >
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </div>
      <div className={styles.dashedDivider} />
      <div className={styles.block}>
        <Typography.H6 className={styles.optionsSubHeader}>Дополнительные опции</Typography.H6>
        <Typography.P13 className="mb-16" colorName="labelsTextColor">
          Доставка
        </Typography.P13>
        <div className={styles.row}>
          <Typography.P13>Наличие медицинской книжки</Typography.P13>
          <Switcher checked={hasMedicalRecord} onChange={setHasMedicalRecord} />
        </div>
        <Typography.P13 className="mb-16" colorName="labelsTextColor">
          Детское кресло
        </Typography.P13>
        <div className={styles.checkBoxGroup}>
          <Checkbox checked={childSeat0_10} onChange={setChildSeat0_10} label={childSeatOptions['0-10'].label} />
          <Checkbox checked={childSeat9_18} onChange={setChildSeat9_18} label={childSeatOptions['9-18'].label} />
          <Checkbox checked={childSeat15_25} onChange={setChildSeat15_25} label={childSeatOptions['15-25'].label} />
          <Checkbox checked={childSeat22_36} onChange={setChildSeat22_36} label={childSeatOptions['22-36'].label} />
        </div>
        <Typography.P13 className="mb-16" colorName="labelsTextColor">
          Салон и вождение
        </Typography.P13>
        <Checkbox checked={priorityLane} onChange={setPriorityLane} label="Езда по выделенной полосе" />
        <Checkbox checked={nonSmoking} onChange={setNonSmoking} label="Салон для некурящих" />
        <Checkbox checked={thermalBag} onChange={setThermalBag} label="Термопакет" />
      </div>

      <div className={styles.block}>
        <Textarea value={comment} onChange={setComment} placeholder="комментарий" autoresize />
      </div>
      <div className={styles.divider} />
      <div className={styles.submitBlock}>
        <Button>Сохранить</Button>
        <Button variant="secondary" onClick={onClickCancel}>
          Отменить
        </Button>
      </div>
    </form>
  )
}
