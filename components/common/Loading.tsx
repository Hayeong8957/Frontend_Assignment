import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

function Loading() {
  return (
    <SLayout>
      <Spin size='large' />
    </SLayout>
  );
}

export default Loading;

const SLayout = styled.div`
  width: 100%;
  height: 1.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;
