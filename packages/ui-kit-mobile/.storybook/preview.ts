import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import 'normalize.css'
import '../src/styles/global-styles.css';
// import '../src/styles/spacings.css';
import './styles.css';

addParameters({
  options: {
    storySort: (a, b) => {
      return a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, {numeric: true})
    }
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});