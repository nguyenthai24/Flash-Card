import { createGlobalStyle } from 'styled-components';
import { AccordionOveride } from './Accordion';
import { AnchorOveride } from './Anchor';
import { ComboBoxOveride } from './ComboBox';
import { DatePickerInputOveride } from './DatePickerInput';
import { InputOveride } from './Input';
import { MantineReactTableOveride } from './MantineReactTable';
import { MenuOveride } from './Menu';
import { NotificationsOveride } from './Notifications';
import { resetCss } from './reset';
import { responsive } from './response';
import { SelectOveride } from './Select';
import { TabsOveride } from './Tabs';
import { TextOveride } from './Text';
import { TreeCheckboxOveride } from './TreeCheckbox';
import { CkEditorOveride } from './CkEditor';

export const GlobalStyle = createGlobalStyle`

  ${resetCss}
  ${responsive}
  ${CkEditorOveride}
  ${MantineReactTableOveride}
  ${TextOveride}
  ${AccordionOveride}
  ${InputOveride}
  ${DatePickerInputOveride}
  ${TreeCheckboxOveride}
  ${SelectOveride}
  ${ComboBoxOveride}
  ${TabsOveride}
  ${AnchorOveride}
  ${MenuOveride}
  ${NotificationsOveride}

  body {
    /* min-width: ${(props) => props.theme.breakpoints.XL}; */
    color: ${(props) => props.theme.colors.TEXT_PRIMARY};
    min-height: 100vh;
    max-width: 1920px;
    margin-inline: auto;
  }

  html::-webkit-scrollbar,
  body::-webkit-scrollbar {
    width: 8px;
  }

  html::-webkit-scrollbar-track,
  body::-webkit-scrollbar-track {
    background: #0e1729;
  }

  html::-webkit-scrollbar-thumb,
  body::-webkit-scrollbar-thumb {
    background: #3f4250;
    border-radius: 999px;
  }

  html::-webkit-scrollbar-thumb:hover,
  body::-webkit-scrollbar-thumb:hover {
    background: #26344b;
  }
`;
