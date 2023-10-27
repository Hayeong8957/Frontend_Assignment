import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import importSvg from '@/public/assets/importSvg';
import { useMenuStore } from '@/stores/menu';
import { useFilterStore } from '@/stores/filter';

const menuContents = [
  {
    id: 1,
    name: '홈',
    icon: importSvg('Home'),
    grayIcon: importSvg('HomeGray'),
  },
  {
    id: 2,
    name: '스크랩',
    icon: importSvg('SheetLine'),
    grayIcon: importSvg('SheetLineGray'),
  },
];

function Menu() {
  const { focusedMenu, setFocusedMenu } = useMenuStore();

  const resetFilter = useFilterStore(state => {
    return {
      setHeadline: state.setHeadline,
      setDate: state.setDate,
      setCountries: state.setCountries,
    };
  });

  const handleMenuClick = (id: number) => {
    setFocusedMenu(id);
    resetFilter.setHeadline('');
    resetFilter.setDate('');
    resetFilter.setCountries([]);
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
