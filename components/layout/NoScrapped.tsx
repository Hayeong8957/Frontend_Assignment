import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import FileText from '@/public/assets/file-text.svg';
import { useMenuStore } from '@/stores/menu';

function NoScrapped() {
  const { setFocusedMenu } = useMenuStore();
  return (
    <SLayout>
      <Image src={FileText} alt='파일 없음' width={36} height={36} />
      <p>저장된 스크랩이 없습니다.</p>
      <SButton onClick={() => setFocusedMenu(1)}>스크랩 하러 가기</SButton>
    </SLayout>
  );
}

export default NoScrapped;

const SLayout = styled.div`
  width: 100%;
  height: 70vh;
  top: 17.875rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  p {
    margin-top: 8px;
    color: #6d6d6d;
    font-family: Apple SD Gothic Neo;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.9px;
    text-transform: uppercase;
  }
`;

const SButton = styled.div`
  width: 18.4375rem;
  height: 3.75rem;
  margin-top: 1.25rem;
  border-radius: 16px;
  background: #3478f6;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  font-family: Apple SD Gothic Neo;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.8px;
  cursor: pointer;
`;
