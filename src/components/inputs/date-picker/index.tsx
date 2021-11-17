import { forwardRef } from 'react';
import { range } from 'lodash';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TextInput } from '@components/inputs';
import { Wrapper, Header } from './styled';

const DateInput = forwardRef<HTMLInputElement>((props, ref) => (
  <TextInput ref={ref} {...props} />
));

const currentYear = new Date().getFullYear();
const years = range(currentYear - 60, currentYear, 1);
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const DatePicker = (props: ReactDatePickerProps) => (
  <Wrapper data-type="date">
    <ReactDatePicker
      customInput={<DateInput />}
      renderCustomHeader={({ date, changeYear, changeMonth }) => (
        <Header>
          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) =>
              changeYear(parseInt(value, 10))
            }
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Header>
      )}
      {...props}
    />
  </Wrapper>
);

export default DatePicker;
