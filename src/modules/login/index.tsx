import Link from 'next/link';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Footer from '@components/footer';
import { login, loginSuccess } from '@redux/auth/actions';
import { updateUser } from '@redux/user/actions';
import { ILogin } from '@interface/auth';
import { PrimaryButton, GhostButton } from '@components/buttons';
import { Checkbox } from '@components/inputs';
import { useEffect } from 'react';
import { authService } from '@services/auth.service';
import { performerService } from '@services/performer.service';
import { userService } from '@services/user.service';
import SEO from './seo';
import {
  Wrapper,
  Title,
  Inner,
  Form,
  Input,
  Actions,
  SignupActions,
  PasswordLink
} from './styled';

type FormValues = {
  username: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    mode: 'onChange'
  });

  const dispatch = useDispatch();

  const onLogin = (values: FormValues) => {
    const data: ILogin = {
      username: values.username,
      email: values.username,
      password: values.password,
      loginUsername: values.username.indexOf('@') === -1
    };
    localStorage.setItem('rememberMe', values.remember ? 'true' : 'false');
    return dispatch(login(data));
  };

  const redirectLogin = async () => {
    const token = authService.getToken();
    const role = authService.getUserRole();
    const rememberMe = localStorage.getItem('rememberMe');
    if (!token || token === 'null' || !rememberMe) {
      return;
    }
    authService.setToken(token, role || 'user');
    try {
      let user = null;
      if (role === 'performer') {
        user = await performerService.me({
          Authorization: token
        });
      } else {
        user = await userService.me({
          Authorization: token
        });
      }
      if (!user.data._id) {
        return;
      }
      dispatch(loginSuccess());
      dispatch(updateUser(user.data));
      Router.push({ pathname: '/home', query: { id: user.data._id } }, '/home');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    redirectLogin();
  }, []);

  return (
    <>
      <SEO />
      <Wrapper>
        <Inner>
          <Title>Welcome</Title>
          <Form onSubmit={handleSubmit(onLogin)}>
            <Input
              id="username"
              placeholder="Email or username"
              {...register('username', { required: true })}
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register('password', { required: true, minLength: 6 })}
            />
            <Actions>
              <Checkbox>Remember me</Checkbox>
              <Link href="/auth/forgot-password">
                <PasswordLink>Lost password?</PasswordLink>
              </Link>
            </Actions>
            <PrimaryButton type="submit">Log into your account</PrimaryButton>
          </Form>
          <SignupActions>
            <Link href="/auth/model-register">
              <GhostButton as="a">Sign Up as Creator</GhostButton>
            </Link>
            <Link href="/auth/fan-register">
              <GhostButton as="a">Sign Up as Fan</GhostButton>
            </Link>
          </SignupActions>
          <Footer />
        </Inner>
      </Wrapper>
    </>
  );
};

Login.authenticate = false;

export default Login;
