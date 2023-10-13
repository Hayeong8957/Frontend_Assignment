import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import HomeIcon from '@/public/assets/ico_Home.svg';
import ScrapIcon from '@/public/assets/ico_Sheet_Line.svg';

const menuContents = [
  {
    id: 1,
    name: '홈',
    icon: HomeIcon,
  },
  {
    id: 2,
    name: '스크랩',
    icon: ScrapIcon,
  },
];

function Menu() {
  return (
    <SLayout>
      {menuContents.map(content => (
        <SButtonDiv key={content.id}>
          <Image src={content.icon} alt={content.name} width={24} height={24} />
          <p>{content.name}</p>
        </SButtonDiv>
      ))}
    </SLayout>
  );
}

export default Menu;

export const SLayout = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 5.3125rem;
  padding-left: 5rem;
  padding-right: 5rem;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  background: black;
  border-radius: 30px 30px 0px 0px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export const SButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 10px;
    color: white;
    margin-top: 0.5rem;
  }
`;
