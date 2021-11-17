import Link from 'next/link';
import { Banner, Title, Inner, Panel, Question, Answer } from './styled';

const About = () => (
  <>
    <Banner>
      <Title>About HoneyDrip?</Title>
    </Banner>
    <Inner>
      <Panel>
        <Question>What is HoneyDrip?</Question>
        <Answer>
          HoneyDrip is an exclusive community that aims to remove the stigma of
          creating subscription-based content for fans. We enable creatives to
          connect with their audiences while making residual income. Each
          creator and piece of content is carefully screened to meet our
          community standards. No sexually explicit content is allowed on our
          site.
        </Answer>
        <Question>Why did we create HoneyDrip?</Question>
        <Answer>
          Our #1 goal is to empower both creators and fans to connect without
          all the social stigma. Whether it be live chats or personalized
          videos, we facilitate friendships and give fans an unrivaled
          connection to their favorite creators. Our approach to building the
          HoneyDrip community ensures that every interaction is kept
          sophisticated and most of all, fun!
        </Answer>
        <Question>Who can use HoneyDrip?</Question>
        <Answer>
          For those fans who want to take the next step in getting to know their
          favorite creators a little better. For those who want to not only see
          more but also engage more closely with their favorite creators and
          models.
          <br />
          Our platform is designed for creators that want to build their brand.
          We are a company that strives to create a respectable environment
          which helps maintain and complement brand partnerships.
          <br />
          Because we value our creators we want to offer them higher percentages
          in return. This means more money in their pocket to support them in
          making amazing content.
        </Answer>
        <Question>How can I sign up for HoneyDrip?</Question>
        <Answer>
          For fans,{' '}
          <Link href="/auth/fan-register">
            <a>sign up here</a>
          </Link>
          . It is completely free.
          <br />
          For creators,{' '}
          <Link href="/auth/model-register">
            <a>apply today</a>
          </Link>
          . Our talent team will reach out to you within 3 to 5 business days
          and let you know if you have been approved.
        </Answer>
      </Panel>
    </Inner>
  </>
);

About.authenticate = false;

export default About;
