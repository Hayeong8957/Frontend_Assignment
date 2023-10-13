import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Search from '@/public/assets/search.svg';
import Calender from '@/public/assets/calendar-check.svg';
import FilterBox from '@/components/common/FilterBox';

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
      {filterData.map(filter => {
        const key = Object.keys(filter.data)[0];
        return <FilterBox key={filter.id} type='headerFilter' {...filter.data[key]} />;
      })}
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
  box-shadow: 0 4px 6px 0 rgba(0, 28, 36, 0.1);
  z-index: 10;
`;
