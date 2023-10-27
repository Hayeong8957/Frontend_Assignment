import React from 'react';
import styled from 'styled-components';
import color from '@/styles/color';
import { useNewsUrlStore } from '@/stores/news';

function NYTimes() {
  const { newsUrl } = useNewsUrlStore();
  return (
    <SContainer>
      <iframe src={newsUrl} width='100%' height='100%' />
    </SContainer>
  );
}

export default NYTimes;

const { bgGray } = color;

const SContainer = styled.div`
  /* 모바일 뷰 설정 */
  position: relative;
  max-width: 480px;
  height: 100%;
  margin: auto;
  background-color: ${bgGray};
`;
