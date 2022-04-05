# UNDER CONSTRUCTION

## Installation

`@city/ui-kit` is a npm package, but published only to local npm registry.

To use package in your project you should switch to local npm registry by adding `.npmrc` file to the root of the project with the following content:

```
registry=${NpmProxyUrl}ru/
```

Then you can install package by typing

```
npm install @city/ui-kit
```

or

```
yarn add @city/ui-kit
```

> :warning: UI-kit requires `react`, `react-dom` to be already installed in the project for correct work.

Add global styles **(required)**

```jsx
// App.tsx
import '@city/ui-kit/index.css'
```

Add fonts **(required)**

```html
// index.html
<link
  href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
  rel="stylesheet"
/>
```

## Usage

### ThemeProvider

Ui-kit provides `ThemeProvider` component (similar to `Provider` from react-redux), which creates theme context and allows you, any styled-component and all components from `@city/ui-kit` package access colors via context.

> :exclamation: Use any component from package **only** as `ThemeProvider` child.

```jsx
// App.tsx
import { ThemeProvider } from '@city/ui-kit'
const App = () => (
  <ThemeProvider>
    <AllYourApp />
  </ThemeProvider>
)
```

`ThemeProvider` accepts `initialTheme` prop.

To change theme in runtime use `ThemeManager`:

```jsx
import { ThemeProvider, ThemeManager } from '@city/ui-kit'

const App = () => (
  <ThemeProvider>
    <RestApp />
  </ThemeProvider>
)

const RestApp = () => {
  const changeTheme = useContext(ThemeManager)

  return <button onClick={() => changeTheme('ClockworkOrange')}>Change theme</button>
}
```

### Color palette and semantic colors

#### Access

You can access colors, used in chosen color theme in any styled component via `props.theme` (preferred way)

```jsx
const MyStyled = styled.div`
  color: ${(props) => props.theme.primary700};
  background-color: ${(props) => props.theme.secondaryActiveColor};
`
```

or via css variables

```css
.my-class-name {
  color: var(--secondary200);
  background-color: var(--secondaryActiveColor);
}
```

or in js/ts

```jsx
import { useTheme } from '@city/ui-kit'

const MyComponent = () => {
  const theme = useTheme()

  return <div style={{ color: theme.mainTextColor }} />
}
```

#### Semantic colors

`props.theme` includes colors from color palette (`primary700`, `gray200`, etc.) and semantic colors (`primaryTextColor`, `iconHoverColor`, etc.).

It is preferred to use semantic colors. If your designers did everything right, then on any element in figma you will see which variable you should use.

### Typography

You must not write any `font-size` or `line-height`. Use predefined typography styles.

Object `Typography` NOT includes styled-components (capitalized properties) and styles (lower-cased properties).

```jsx
import { Typography } from '@city/ui-kit'

const MyComp = () => <Typography.H5>Hello wrold</Typography.H5>

const MyStyledComponent = styled(Typography.P13)`
  border: 1px solid;
  border-radius: 50%;
  // lots of other your styles

  ${Typography.p13};
`
```

### Development workflow

1. Install dependencies

```bash
npm run init
```

2. Turn on strict mode while developing in root **tsconfing.json** _(We are not ready to turn it on for the whole project yet)_

```json
"compilerOptions": {
  "strict": true
}
```

3. Launch storybook in dev mode

```bash
npm run dev:desktop
# For mobile ui-kit use
# npm run dev:mobile
```
