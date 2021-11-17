import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { IUser, IUserFormData } from 'src/interfaces';
import { PrimaryButton } from '@components/buttons';
import { TextInput, Select } from '@components/inputs';
import { AvatarUpload } from '@components/user/avatar-upload';
import { NameRegex, UsernameRegex } from 'src/common/utils';
import { authService } from '@services/auth.service';
import { userService } from '@services/user.service';
import { updateUser, updateCurrentUserAvatar } from 'src/redux/user/actions';
import { Form, Wrapper } from './styled';

type Props = {
  user: IUser;
};

const UpdateProfile = ({ user }: Props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<IUserFormData>({
    mode: 'onSubmit',
    defaultValues: user
  });

  const onSubmit = (values: IUserFormData) => {
    dispatch(updateUser(values));
  };

  const onUpload = (data) => {
    dispatch(updateCurrentUserAvatar(data.response.data.url));
  };

  return (
    <Wrapper>
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
        <Select {...register('gender', { required: 'Gender is required' })}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
        <PrimaryButton type="submit">Update Profile</PrimaryButton>
      </Form>
      <AvatarUpload
        imageUrl={user.avatar}
        uploadUrl={userService.getAvatarUploadUrl()}
        headers={{
          authorization: authService.getToken()
        }}
        onUploaded={onUpload}
      />
    </Wrapper>
  );
};

export default UpdateProfile;
