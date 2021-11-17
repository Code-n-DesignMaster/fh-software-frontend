import { FieldErrors } from 'react-hook-form';
import { Wrapper } from './styled';

type Props = {
  errors: FieldErrors;
};

const ValidationAlert = ({ errors }: Props) => {
  return Object.keys(errors).length > 0 ? (
    <Wrapper>
      <ul>
        {Object.keys(errors).map((key) => (
          <li key={key}>{errors[key].message}</li>
        ))}
      </ul>
    </Wrapper>
  ) : null;
};

export default ValidationAlert;
