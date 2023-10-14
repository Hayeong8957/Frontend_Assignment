import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import styled from 'styled-components';

function Loading() {
  return (
    <SLayout>
      <RotatingLines strokeColor='grey' strokeWidth='5' animationDuration='0.75' width='30' visible={true} />
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
  margin-top: 0.625rem;
`;
