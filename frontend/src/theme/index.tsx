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
