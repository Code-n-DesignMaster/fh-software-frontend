import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { authService } from '@services/auth.service';
import { TextInput } from '@components/inputs';
import { PrimaryButton } from '@components/buttons';
import ValidationAlert from '@components/validation-alert';
import SEO from './seo';
import { Wrapper, Inner, Title } from './styled';

type FormValues = {
  password: string;
  confirm: string;
};

type InitialProps = {
  token: string;
};

const PasswordChange: NextPage<InitialProps> = ({ token }) => {
  const router = useRouter();
  const { register, handleSubmit, getValues, formState } = useForm<FormValues>({
    mode: 'onSubmit'
  });

  const onSubmit = async (data: FormValues) => {
    await authService.changePassword(token, data.password);
    message.success('Your password has been set!');
    router.push('/');
  };

  return (
    <>
      <SEO />
      <Wrapper>
        <Inner>
          <Title>Set your new password</Title>
          <ValidationAlert errors={formState.errors} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              placeholder="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
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
            <PrimaryButton type="submit">Set password</PrimaryButton>
          </form>
        </Inner>
      </Wrapper>
    </>
  );
};

PasswordChange.getInitialProps = (payload) => {
  // @ts-ignore
  const ctx = payload.ctx as typeof payload;
  return {
    token: ctx.query.token as string
  };
};

// @ts-ignore
PasswordChange.authenticate = false;

export default PasswordChange;
