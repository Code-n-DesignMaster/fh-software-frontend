import { Wrapper, Ellipsis } from './styled';

export const LoaderInner = () => (
  <Ellipsis>
    <div />
    <div />
    <div />
    <div />
  </Ellipsis>
);

const Loader = () => (
  <Wrapper>
    <LoaderInner />
  </Wrapper>
);

export default Loader;
