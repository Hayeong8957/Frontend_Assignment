import React from 'react';
import styled from 'styled-components';
import color from '@/styles/color';
import Header from '@/components/common/Header';
import Main from '../main/Main';
import Menu from '@/components/common/Menu';

function Layout() {
  return (
    <SContainer>
      <Header />
      <Main />
      <Menu />
    </SContainer>
  );
}

export default Layout;

const { bgGray } = color;

const SContainer = styled.div`
  /* 모바일 뷰 설정 */
  position: relative;
  max-width: 480px;
  height: 100%;
  margin: auto;
  background-color: ${bgGray};
`;
