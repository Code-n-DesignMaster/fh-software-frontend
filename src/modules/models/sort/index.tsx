import DropdownIcon from '@components/icons/dropdown';
import { Wrapper, Select, Label } from './styled';

const options = [
  { key: 'feature', name: 'featured' },
  { key: 'latest', name: 'latest' },
  { key: 'oldest', name: 'oldest' },
  { key: 'popular', name: 'popular' }
];

type Props = {
  onChange: (value: string) => void;
};

const Sort = ({ onChange }: Props) => (
  <Wrapper>
    <Label>Sort by: </Label>
    <Select onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.key} value={option.key}>
          {option.name}
        </option>
      ))}
    </Select>
    <DropdownIcon />
  </Wrapper>
);

export default Sort;
