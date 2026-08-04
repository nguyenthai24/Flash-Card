import { createTheme, InputWrapper } from '@mantine/core';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { theme } from '~/constants';
import { MantineButton } from './components/Button';
import { MantineCheckbox } from './components/Checkbox';
import { MantineContainer } from './components/Container';
import { MantineDatePickerInput } from './components/DatePickerInput';
import { MantineFileInput } from './components/FileInput';
import { MantineGroup } from './components/Group';
import { MantineImage } from './components/Image';
import { MantineInput, MantineInputWrapper } from './components/Input';
import { MantineLoader } from './components/Loader';
import { MantineModal } from './components/Modal';
import { MantineMultiSelect } from './components/MultiSelect';
import { MantineNumberInput } from './components/NumberInput';
import { MantinePasswordInput } from './components/PasswordInput';
import { MantineSelect } from './components/Select';
import { MantineSwitch } from './components/Switch';
import { MantineTable } from './components/Table';
import { MantineTextarea } from './components/Textarea';
import { MantineTextInput } from './components/TextInput';
import { MantineTooltip } from './components/Tooltip';
// import './font/index.scss';

dayjs.locale('vi');
dayjs.extend(customParseFormat);

// https://www.figma.com/design/NwbadBqrYpRxJGa854XCJw/Vihub---23.04.2024?node-id=0-1&t=6TspHzcQfzpojuKf-0
export const mantineTheme = createTheme({
  scale: 1.6,
  defaultRadius: 12,
  breakpoints: theme.breakpoints,
  cursorType: 'pointer',
  primaryColor: 'primary',
  colors: {
    primary: [
      '#e6f6ff',
      '#d2e8fd',
      '#a7cdf3',
      '#79b1eb',
      '#5299e3',
      '#398adf',
      '#217CD9',
      '#1971c6',
      '#0964b2',
      '#00569f',
    ],
  },
  other: {
    RED: '#FF0000',
    YELLOW: '#FFC926',
    GREEN: '#46B649',
    ORANGE: '#FF9428',
    PINK: '#f7527c',
    PINK_2: '#F06292',

    CYAN: '#009c8f',
    CYAN_2: '#27A69A',

    VIOLET: '#8979FF',
    VIOLET_2: '#9575CD',
    VIOLET_3: '#8663B7',
    VIOLET_4: '#A194FF',

    ORANGE_1: '#EC8235',
    GREEN_1: '#1ACC0A',

    TEXT_1: '#062D79',

    GRAY: '#919499',
    GRAY_20: '#dcdfe2',
    GRAY_60: '#797c81',
    GRAY_80: '#888888',

    LIGHT_GRAY: '#F5F5F5',
    LIGHT_GRAY_2: '#DDDFE4',

    BLUE_GRAY: '#0F2E4D',
    BLUE_GRAY_2: '#7A8A99',
    BLUE_GRAY_3: '#8FA1B2',

    BLUE_LIGHT: '#E5F2FF',
    BLUE_1: '#268CF3',

    PRIMARY_BLUE: '#217CD9',
    PRIMARY_GREEN: '#46B649',

    WHITE: '#ffffff',
    WHITE_80: '#d9d9d9',
    WHITE_60: '#ffffff60',
    WHITE_40: '#8c8c8c',

    BLACK: '#000',
    BLACK_40: '#262626',
    BLACK_75: '#101010',
    BLACK_90: '#070707',

    LIGHT_BLUE: '#268CF31A',
    BACKGROUND: '#DAEEF24D',
    BACKGROUND_PRIMARY: '#ffffff',
    BACKGROUND_SECONDARY: '#fafafa',

    PRIMARY: '#217CD9',
    TEXT_PRIMARY: '#F6F7F9',
    TEXT_SECONDARY: '#636567',

    HOVER_PRIMARY: '#268CF31A',
    BORDER_PRIMARY: '#CFDAE5',
    INPUT_DISABLED_BG: '#f1f3f5',
    BACKGROUND_TOPUP: '#daeef275',

    BG_HEADER: '#172036',
    BG_MAIN: '#0E1729',
    BG_BUTTON: '#272B3B',
    BT_BUTTON_1: '#282d3cf2',
    BG_TOGGLE_TRACK: '#17203A',
    BG_ICON_LIGHT: '#F5F7F9',
    BG_BUTTON_HOVER: '#26344b',

    BORDER_DEFAULT: '#3F4250',
    BORDER_ACCENT: '#302355',
    BORDER_1: '#ffffff1a',

    TEXT_DEFAULT: '#f0f1f5',
  },

  components: {
    Container: MantineContainer,
    Image: MantineImage,
    Button: MantineButton,
    Input: MantineInput,
    TextInput: MantineTextInput,
    Select: MantineSelect,
    MultiSelect: MantineMultiSelect,
    DatePickerInput: MantineDatePickerInput,
    Table: MantineTable,
    Group: MantineGroup,
    Modal: MantineModal,
    Textarea: MantineTextarea,
    Switch: MantineSwitch,
    Tooltip: MantineTooltip,
    Checkbox: MantineCheckbox,
    NumberInput: MantineNumberInput,
    FileInput: MantineFileInput,
    Loader: MantineLoader,
    PasswordInput: MantinePasswordInput,
    InputWrapper: MantineInputWrapper,
  },
});
