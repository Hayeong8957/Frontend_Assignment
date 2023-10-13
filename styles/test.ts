import { media } from './media';
import styled from 'styled-components';

const Article = styled.article`
  padding: 2.4rem 1.6rem;
  max-width: 80%;

  margin: 0 auto;

  ${media.small`
    padding: 1.6rem 1.4rem;
    max-width: 100%;
  `}
`;
