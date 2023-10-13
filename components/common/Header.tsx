import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Search from '@/public/assets/search.svg';
import Calender from '@/public/assets/calendar-check.svg';

interface EachFilter {
  title: string;
  image?: any;
}

interface Filters {
  id: number;
  data: {
    [key: string]: EachFilter;
  };
}

function Header() {
  const [filterData, setFilterData] = useState<Filters[]>([
    {
      id: 1,
      data: {
        search: {
          title: '전체 헤드라인',
          image: Search,
        },
      },
    },
    {
      id: 2,
      data: {
        date: {
          title: '전체 날짜',
          image: Calender,
        },
      },
    },
    {
      id: 3,
      data: {
        country: {
          title: '전체 국가',
        },
      },
    },
  ]);

  return (
    <SLayout>
      {filterData.map(filter => (
        <SEachFilterDiv key={filter.id}>
          {filter.data[Object.keys(filter.data)[0]].image && (
            <Image src={filter.data[Object.keys(filter.data)[0]].image} alt='search' width={16} height={16} />
          )}
          <span>{filter.data[Object.keys(filter.data)[0]].title}</span>
        </SEachFilterDiv>
      ))}
    </SLayout>
  );
}

export default Header;

export const SLayout = styled.header`
  position: absolute;
  padding: 0.8125rem 0rem 0.8125rem 1.25rem;
  top: 0;
  width: 100%;
  height: 3.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  z-index: 10;
`;

export const SEachFilterDiv = styled.div`
  max-width: 8.125rem;
  height: 2.125rem;
  padding: 0.3125rem 0.75rem 0.3125rem 0.75rem;
  margin-right: 0.4375rem;
  padding-right: 0.75rem;
  border-radius: 1.875rem;
  border: 1px #c4c4c4 solid;
  justify-content: center;
  align-items: center;
  gap: 4px;
  display: inline-flex;
  font-size: 14px;
  color: #6d6d6d;
`;
