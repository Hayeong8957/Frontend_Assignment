import React from 'react';
import styled from 'styled-components';
import ArticleList from '@/components/articles/ArticleList';

function Main() {
  return (
    <SLayout>
      <ArticleList />
    </SLayout>
  );
}

export default Main;

export const SLayout = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;
