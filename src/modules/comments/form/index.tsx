import { FormEvent, useState } from 'react';
import { PrimaryButton } from '@components/buttons';
import { Form, Textarea } from './styled';

type Props = {
  onSubmit: (comment: string) => void;
};

const CommentForm = ({ onSubmit }: Props) => {
  const [val, setVal] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(val);
    setVal('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Textarea
        placeholder="Type your comment"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <PrimaryButton type="submit" disabled={val.length === 0}>
        Submit
      </PrimaryButton>
    </Form>
  );
};

export default CommentForm;
