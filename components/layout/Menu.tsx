import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import HomeIcon from '@/public/assets/ico_Home.svg';
import HomeIconGray from '@/public/assets/ico_Home_gray.svg';
import ScrapIcon from '@/public/assets/ico_Sheet_Line.svg';
import ScrapIconGray from '@/public/assets/ico_Sheet_Line_gray.svg';
import { useMenuStore } from '@/stores/menu';

const menuContents = [
  {
    id: 1,
    name: '홈',
    icon: HomeIcon,
    grayIcon: HomeIconGray,
  },
  {
    id: 2,
    name: '스크랩',
    icon: ScrapIcon,
    grayIcon: ScrapIconGray,
  },
];

function Menu() {
  const { focusedMenu, setFocusedMenu } = useMenuStore();

  const handleMenuClick = (id: number) => {
    setFocusedMenu(id);
  };

  return (
    <SLayout>
      {menuContents.map(content => (
        <SButtonDiv key={content.id} onClick={() => handleMenuClick(content.id)} $isActive={content.id === focusedMenu}>
          <Image
            src={content.id === focusedMenu ? content.icon : content.grayIcon}
            alt={content.name}
            width={24}
            height={24}
          />
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
  box-shadow: 0 -4px 6px 0 rgba(0, 28, 36, 0.2);
  z-index: 200;
`;

export const SButtonDiv = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  p {
    font-size: 10px;
    color: ${({ $isActive }) => ($isActive ? 'white' : '#6D6D6D')};
    margin-top: 0.5rem;
  }
`;
