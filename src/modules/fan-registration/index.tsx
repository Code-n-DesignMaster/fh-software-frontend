import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { message } from 'antd';
import Link from 'next/link';
import { registerFan } from '@redux/auth/actions';
import { useDispatch } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import { PrimaryButton } from '@components/buttons';
import { TextInput, Select, Checkbox } from '@components/inputs';
import ValidationAlert from '@components/validation-alert';
import { NameRegex, UsernameRegex } from 'src/common/utils';
import env from 'src/env';
import SEO from './seo';
import {
  Wrapper,
  Left,
  Right,
  Benefits,
  Title,
  BenefitList,
  Inner,
  FormTitle,
  Form,
  CaptchaWrapper,
  Paragraph
} from './styled';

type FormValues = {
  firstName: string;
  lastName: string;
  username: string;
  gender: 'male' | 'female';
  email: string;
  password: string;
  confirm: string;
  ageConfirm: boolean;
  tosAccepted: boolean;
};

const FanRegister = () => {
  const dispatch = useDispatch();
  const [verified, setCaptcha] = useState(false);
  const { register, handleSubmit, getValues, formState } = useForm<FormValues>({
    mode: 'onSubmit'
  });

  const onSubmit = (values: FormValues) => {
    if (!verified) {
      return message.error('Please confirm you are not a robot', 5);
    }
    dispatch(registerFan(values));
  };

  return (
    <>
      <SEO />
      <Wrapper>
        <Left>
          <Inner>
            <FormTitle>Fan Register</FormTitle>
            <ValidationAlert errors={formState.errors} />
            <Form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                placeholder="First name"
                {...register('firstName', {
                  required: 'First name is required',
                  validate: (value) =>
                    NameRegex.test(value) ||
                    'First name cannot contain numbers and special characters'
                })}
              />
              <TextInput
                placeholder="Last name"
                {...register('lastName', {
                  required: 'Last name is required',
                  validate: (value) =>
                    NameRegex.test(value) ||
                    'Last name cannot contain numbers and special characters'
                })}
              />
              <TextInput
                placeholder="Username"
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters long'
                  },
                  validate: (value) =>
                    UsernameRegex.test(value) ||
                    'Username must contain letters and numbers only'
                })}
              />
              <Select
                {...register('gender', { required: 'Gender is required' })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
              <TextInput
                placeholder="Email address"
                type="email"
                {...register('email', { required: 'Email is required' })}
              />
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
              <Checkbox
                {...register('ageConfirm', {
                  required: 'Please verify you are over 18 years old'
                })}
              >
                I am at least 18 years old
              </Checkbox>
              <Checkbox
                {...register('tosAccepted', {
                  required: 'Please accept the Terms of Service'
                })}
              >
                I agree to the{' '}
                <Link href="/legal/terms">
                  <a>Terms of Service</a>
                </Link>
                <span> </span>
                and the{' '}
                <Link href="/legal/privacy">
                  <a>Privacy Policy</a>
                </Link>
              </Checkbox>
              <CaptchaWrapper>
                <ReCAPTCHA
                  theme="dark"
                  sitekey={env.sitekey}
                  onChange={(token) => setCaptcha(Boolean(token))}
                />
              </CaptchaWrapper>
              <PrimaryButton type="submit">Create your Account</PrimaryButton>
            </Form>
            <Paragraph>
              Have an account already?
              <Link href="/">
                <a> Login here.</a>
              </Link>
            </Paragraph>
            <Paragraph>
              Are you a creator?
              <Link href="/auth/model-register">
                <a> Register here.</a>
              </Link>
            </Paragraph>
          </Inner>
        </Left>
        <Right>
          <Benefits>
            <Title>Benefits</Title>
            <BenefitList>
              <li>View exclusive content</li>
              <li>Monthly subscriptions</li>
              <li>Fast and reliable buffering and viewing</li>
              <li>Multiple solution options to choose from</li>
              <li>Chat with creators</li>
              <li>Access creator's personal store</li>
              <li>Search and filter capabilities</li>
              <li>Favorite your video for future viewing</li>
            </BenefitList>
          </Benefits>
        </Right>
      </Wrapper>
    </>
  );
};

FanRegister.authenticate = false;

export default FanRegister;
