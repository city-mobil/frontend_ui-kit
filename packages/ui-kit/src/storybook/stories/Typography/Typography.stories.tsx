import React from 'react'
import { Typography } from '@city/ui-kit-core'
import styles from './styles.module.scss'

export default {
  title: 'Typography/Typography',
}

export const Primary = () => {
  return (
    <div className={styles.row}>
      <div>
        <Typography.H1>В компонентах</Typography.H1>
        <br />
        <Typography.H1>{'<Typography.H1 />'}</Typography.H1>
        <Typography.H2>{'<Typography.H2 />'}</Typography.H2>
        <Typography.H3>{'<Typography.H3 />'}</Typography.H3>
        <Typography.H4>{'<Typography.H4 />'}</Typography.H4>
        <Typography.H5>{'<Typography.H5 />'}</Typography.H5>
        <Typography.H6>{'<Typography.H6 />'}</Typography.H6>
        <br />
        <Typography.P17>{'<Typography.P17 />'}</Typography.P17>
        <Typography.P15>{'<Typography.P15 />'}</Typography.P15>
        <Typography.P13>{'<Typography.P13 />'}</Typography.P13>
        <Typography.P12>{'<Typography.P12 />'}</Typography.P12>
        <br />
        <Typography.S17 as={'p'}>{'<Typography.S17 />'}</Typography.S17>
        <Typography.S15 as={'p'}>{'<Typography.S15 />'}</Typography.S15>
        <Typography.S13 as={'p'}>{'<Typography.S13 />'}</Typography.S13>
        <Typography.S12 as={'p'}>{'<Typography.S12 />'}</Typography.S12>
      </div>
      <div>
        <Typography.H1>В дизайне</Typography.H1>
        <br />
        <Typography.H1>Head/H1</Typography.H1>
        <Typography.H2>Head/H2</Typography.H2>
        <Typography.H3>Head/H3</Typography.H3>
        <Typography.H4>Head/H4</Typography.H4>
        <Typography.H5>Head/H5</Typography.H5>
        <Typography.H6>Head/H6</Typography.H6>
        <br />
        <Typography.P17>fontWeight/Paragraph 17</Typography.P17>
        <Typography.P15>fontWeight/Paragraph 15</Typography.P15>
        <Typography.P13>fontWeight/Paragraph 13</Typography.P13>
        <Typography.P12>fontWeight/Paragraph 12</Typography.P12>
        <br />
        <Typography.S17 as={'p'}>fontWeight/Span 17</Typography.S17>
        <Typography.S15 as={'p'}>fontWeight/Span 15</Typography.S15>
        <Typography.S13 as={'p'}>fontWeight/Span 13</Typography.S13>
        <Typography.S12 as={'p'}>fontWeight/Span 12</Typography.S12>
      </div>
    </div>
  )
}

export const PropFontWeight = () => {
  return (
    <div className={styles.row}>
      <div>
        <Typography.H4>fontWeight={'regular'}</Typography.H4>
        <br />
        <Typography.P17>Typography.P17</Typography.P17>
        <Typography.P15>Typography.P15</Typography.P15>
        <Typography.P13>Typography.P13</Typography.P13>
        <Typography.P12>Typography.P12</Typography.P12>
        <br />
        <Typography.S17 as="div">Typography.S17</Typography.S17>
        <Typography.S15 as="div">Typography.S15</Typography.S15>
        <Typography.S13 as="div">Typography.S13</Typography.S13>
        <Typography.S12 as="div">Typography.S12</Typography.S12>
      </div>
      <div>
        <Typography.H4>fontWeight={'medium'}</Typography.H4>
        <br />
        <Typography.P17 fontWeight={'medium'}>Typography.P17</Typography.P17>
        <Typography.P15 fontWeight={'medium'}>Typography.P15</Typography.P15>
        <Typography.P13 fontWeight={'medium'}>Typography.P13</Typography.P13>
        <Typography.P12 fontWeight={'medium'}>Typography.P12</Typography.P12>
        <br />
        <Typography.S17 fontWeight={'medium'} as="div">
          Typography.S17
        </Typography.S17>
        <Typography.S15 fontWeight={'medium'} as="div">
          Typography.S15
        </Typography.S15>
        <Typography.S13 fontWeight={'medium'} as="div">
          Typography.S13
        </Typography.S13>
        <Typography.S12 fontWeight={'medium'} as="div">
          Typography.S12
        </Typography.S12>
      </div>
      <div>
        <Typography.H4>fontWeight={'bold'}</Typography.H4>
        <br />
        <Typography.P17 fontWeight={'bold'}>Typography.P17</Typography.P17>
        <Typography.P15 fontWeight={'bold'}>Typography.P15</Typography.P15>
        <Typography.P13 fontWeight={'bold'}>Typography.P13</Typography.P13>
        <Typography.P12 fontWeight={'bold'}>Typography.P12</Typography.P12>
        <br />
        <Typography.S17 fontWeight={'bold'} as="div">
          Typography.S17
        </Typography.S17>
        <Typography.S15 fontWeight={'bold'} as="div">
          Typography.S15
        </Typography.S15>
        <Typography.S13 fontWeight={'bold'} as="div">
          Typography.S13
        </Typography.S13>
        <Typography.S12 fontWeight={'bold'} as="div">
          Typography.S12
        </Typography.S12>
      </div>
    </div>
  )
}

export const PropColorName = () => {
  return (
    <div className={styles.row}>
      <Typography.H1 colorName={'primary900'}>primary900</Typography.H1>
      <Typography.H1 colorName={'accent900'}>accent900</Typography.H1>
      <Typography.H1 colorName={'link900'}>link900</Typography.H1>
      <Typography.H1 colorName={'success900'}>success900</Typography.H1>
    </div>
  )
}

export const PropAs = () => {
  return (
    <div className={styles.row}>
      <Typography.P17 as="div">As div</Typography.P17>
      <Typography.P17 as="p">As p</Typography.P17>
      <Typography.P17 as="span">As span</Typography.P17>
      <Typography.P17 as="a">As a</Typography.P17>
    </div>
  )
}

export const GlobalClassNames = () => {
  return (
    <div className={styles.row}>
      <div>
        <Typography.P17>Стили любого компонента можно получить через класс:</Typography.P17>
        <div className="city_ui_p17">.city_ui_h1</div>
        <div className="city_ui_p17">.city_ui_h2</div>
        <div className="city_ui_p17">.city_ui_h3</div>
        <div className="city_ui_p17">.city_ui_h4</div>
        <div className="city_ui_p17">.city_ui_h5</div>
        <div className="city_ui_p17">.city_ui_h6</div>
        <br />
        <div className="city_ui_p17">.city_ui_p17</div>
        <div className="city_ui_p17">.city_ui_p15</div>
        <div className="city_ui_p17">.city_ui_p13</div>
        <div className="city_ui_p17">.city_ui_p12</div>
        <br />
        <div className="city_ui_p17">.city_ui_s17</div>
        <div className="city_ui_p17">.city_ui_s15</div>
        <div className="city_ui_p17">.city_ui_s13</div>
        <div className="city_ui_p17">.city_ui_s12</div>
      </div>
      <div>
        <Typography.P17>fontWeight</Typography.P17>
        <br />
        <div className="city_ui_p17 city_ui_text_bold">.city_ui_text_bold</div>
        <div className="city_ui_p17 city_ui_text_medium">.city_ui_text_medium</div>
        <div className="city_ui_p17 city_ui_text_regular">.city_ui_text_regular</div>
      </div>
    </div>
  )
}
