import faqItems from './data';
import { Banner, Title, Text, Inner, Panel, Details } from './styled';

const FAQ = () => (
  <>
    <Banner>
      <div>
        <Text>Got questions?</Text>
        <Title>Frequently asked questions</Title>
      </div>
    </Banner>
    <Inner>
      <Panel>
        {faqItems.map((item, index) => (
          <Details key={item.question} open={index === 0}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </Details>
        ))}
      </Panel>
    </Inner>
  </>
);

FAQ.authenticate = false;

export default FAQ;
