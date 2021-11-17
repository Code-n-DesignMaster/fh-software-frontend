import { useForm } from 'react-hook-form';
import { TextInput } from '@components/inputs';
import SearchIcon from '@components/icons/search';
import { Form, Button } from './styled';

type FormValues = {
  q: string;
};

type Props = {
  onSubmit: (values: FormValues) => void;
};

const Search = ({ onSubmit }: Props) => {
  const { register, handleSubmit } = useForm<FormValues>({
    mode: 'all'
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextInput placeholder="Search models" {...register('q')} />
      <Button type="submit">
        <SearchIcon />
      </Button>
    </Form>
  );
};

export default Search;
