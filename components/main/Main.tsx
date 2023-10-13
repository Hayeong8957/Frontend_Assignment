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
  height: calc(100% - 3.75rem);
  display: flex;
  justify-content: center;
  overflow-y: auto;
  margin-bottom: 5.3125rem;
`;
