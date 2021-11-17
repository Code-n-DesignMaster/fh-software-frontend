import { useForm } from 'react-hook-form';
import { message } from 'antd';
import { settingService } from '@services/setting.service';
import { IContact } from '@interface/setting';
import { TextInput, TextArea } from '@components/inputs';
import { PrimaryButton } from '@components/buttons';
import SEO from './seo';
import { Wrapper, Left, Right, Title, Inner, FormTitle, Form } from './styled';

const Contact = () => {
  const { register, handleSubmit, reset } = useForm<IContact>({
    mode: 'all'
  });

  const onSubmit = async (values: IContact) => {
    try {
      const response = await settingService.contact(values);
      if (response.data.success) {
        message.success(
          'Thank you for contact us, we will respond as soon as possible.'
        );
        reset();
      }
    } catch {
      message.error('Error occurred, please try again later');
    }
  };

  return (
    <>
      <SEO />
      <Wrapper>
        <Left>
          <Title>
            How can
            <br />
            we help you today?
          </Title>
        </Left>
        <Right>
          <Inner>
            <FormTitle>How can we help?</FormTitle>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                placeholder="Your name"
                {...register('name', { required: true })}
              />
              <TextInput
                placeholder="Your email"
                type="email"
                {...register('email', { required: true })}
              />
              <TextArea
                placeholder="Your message"
                rows={3}
                {...register('message', { required: true })}
              />
              <PrimaryButton type="submit">Send</PrimaryButton>
            </Form>
          </Inner>
        </Right>
      </Wrapper>
    </>
  );
};

Contact.authenticate = true;
Contact.noredirect = true;

export default Contact;
