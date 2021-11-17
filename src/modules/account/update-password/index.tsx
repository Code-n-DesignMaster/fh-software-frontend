import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { PrimaryButton } from '@components/buttons';
import { TextInput } from '@components/inputs';
import { authService } from '@services/auth.service';
import { Form, Title, Inputs } from './styled';

type FormValues = {
  password: string;
  confirm: string;
};

const UpdatePassword = () => {
  const { register, handleSubmit, getValues, reset } = useForm<FormValues>({
    mode: 'onSubmit'
  });

  const onSubmit = async (values: FormValues) => {
    await authService.updatePassword(values.password);
    message.success('Password has been updated.');
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Change password</Title>
      <Inputs>
        <TextInput
          placeholder="Password (at least 6 characters)"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: 6
          })}
        />
        <TextInput
          placeholder="Confirm password"
          type="password"
          {...register('confirm', {
            required: 'Please confirm your password',
            validate: (value) =>
              value === getValues('password') || "Passwords don't match"
          })}
        />
      </Inputs>
      <PrimaryButton type="submit">Update Password</PrimaryButton>
    </Form>
  );
};

export default UpdatePassword;
