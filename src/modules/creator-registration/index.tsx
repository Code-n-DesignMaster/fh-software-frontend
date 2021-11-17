import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { message } from 'antd';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { registerPerformer } from '@redux/auth/actions';
import { PrimaryButton } from '@components/buttons';
import { TextInput, Select, Checkbox, DatePicker } from '@components/inputs';
import ValidationAlert from '@components/validation-alert';
import { ICountry } from 'src/interfaces';
import { utilsService } from 'src/services';
import { NameRegex, UsernameRegex } from 'src/common/utils';
import moment from 'moment';
import ReCAPTCHA from 'react-google-recaptcha';
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
  email: string;
  gender: 'male' | 'female';
  location: string;
  password: string;
  confirm: string;
  age: Date;
  ageConfirm: boolean;
  tosAccepted: boolean;
};

const RegisterPerformer = () => {
  const dispatch = useDispatch();
  const [verified, setCaptcha] = useState(false);
  const [countries, setCountries] = useState<readonly ICountry[]>([]);
  const {
    register,
    handleSubmit,
    getValues,
    formState,
    setValue,
    control
  } = useForm<FormValues>({
    mode: 'onSubmit'
  });

  useEffect(() => {
    utilsService.countriesList().then((resp) => {
      setCountries(resp.data);
      setValue('location', 'US');
    });
  }, []);

  const onSubmit = (values: FormValues) => {
    if (!verified) {
      return message.error('Please confirm you are not a robot', 5);
    }
    dispatch(
      registerPerformer({
        ...values,
        age: moment(values.age).format('MM/DD/YYYY'),
        idVerificationFile: new File([''], 'filename'),
        documentVerificationFile: new File([''], 'filename')
      })
    );
  };

  return (
    <>
      <SEO />
      <Wrapper>
        <Left>
          <Benefits>
            <Title>Benefits</Title>
            <BenefitList>
              <li>Lightning fast uploading</li>
              <li>Multi-video uploading</li>
              <li>Model-to-Model communication</li>
              <li>Chat with fans</li>
              <li>Cross-over-content between models</li>
              <li>Individual model store</li>
              <li>Affiliate program for blogs to promote your content</li>
              <li>90% Standard commission rate</li>
              <li>(Deduct 5% when gained from affiliates)</li>
            </BenefitList>
          </Benefits>
        </Left>
        <Right>
          <Inner>
            <FormTitle>Creator Register</FormTitle>
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
              <TextInput
                placeholder="Email address"
                type="email"
                {...register('email', { required: 'Email is required' })}
              />
              <input type="hidden" value="female" {...register('gender')} />
              <Select
                {...register('location', { required: 'Location is required' })}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </Select>
              <TextInput
                placeholder="Password"
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
              <Controller
                control={control}
                name="age"
                rules={{
                  required: 'Birth date is required'
                }}
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Birth date"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    maxDate={moment()
                      .subtract(18, 'years')
                      .endOf('day')
                      .toDate()}
                  />
                )}
              />
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
              Are you a fan?
              <Link href="/auth/fan-register">
                <a> Register here.</a>
              </Link>
            </Paragraph>
          </Inner>
        </Right>
      </Wrapper>
    </>
  );
};

RegisterPerformer.authenticate = false;

export default RegisterPerformer;
