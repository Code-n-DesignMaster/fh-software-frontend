import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { IForgot } from 'src/interfaces';
import { PrimaryButton } from '@components/buttons';
import { TextInput } from '@components/inputs';
import { forgot } from '@redux/auth/actions';
import SEO from './seo';
import {
  Wrapper,
  Left,
  Right,
  Title,
  Form,
  FormTitle,
  Paragraph,
  InnerRight,
  InnerLeft,
  Text
} from './styled';

type InitialProps = {
  type?: string;
};

const ForgotPassword: NextPage<InitialProps> = ({ type }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<IForgot>({
    mode: 'onSubmit'
  });

  const onSubmit = (data: IForgot) => {
    dispatch(
      forgot({
        ...data,
        type: type || 'user'
      })
    );
  };

  return (
    <>
      <SEO />
      <Wrapper>
        <Left>
          <InnerLeft>
            <Title>So, you can&apos;t remember your password?</Title>
            <Text>
              No worries! It happens to all of us.
              <br />
              We&apos;re here to help you.
            </Text>
          </InnerLeft>
        </Left>
        <Right>
          <InnerRight>
            <FormTitle>Reset Password</FormTitle>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                placeholder="Email address"
                type="email"
                {...register('email', { required: 'Email is required' })}
              />
              <PrimaryButton type="submit">Send</PrimaryButton>
            </Form>
            <Paragraph>
              Have an account already?
              <Link href="/">
                <a> Login here.</a>
              </Link>
            </Paragraph>
            <Paragraph>
              Don&apos;t have an account yet?
              <Link href="/auth/fan-register">
                <a> Register as a fan here.</a>
              </Link>
              <br />
              <Link href="/auth/model-register">
                <a> Register as a creator here.</a>
              </Link>
            </Paragraph>
          </InnerRight>
        </Right>
      </Wrapper>
    </>
  );
};

ForgotPassword.getInitialProps = (ctx) => {
  const { query } = ctx;
  return { type: query?.type as string };
};

// @ts-ignore
ForgotPassword.authenticate = false;

export default ForgotPassword;
