import React from 'react';
import styled from 'styled-components';
import Search from '@/public/assets/search.svg';
import SearchCheck from '@/public/assets/search-check.svg';
import Calender from '@/public/assets/calendar.svg';
import CalenderCheck from '@/public/assets/calendar-check.svg';
import FilterBox from '@/components/common/FilterBox';
import { useFilterStore } from '@/stores/filter';
interface EachFilter {
  title: string;
  image?: any;
  checkImage?: any;
  isChecked: boolean;
}

interface Filters {
  id: number;
  data: {
    [key: string]: EachFilter;
  };
}

function Header() {
  const toggleModal = useFilterStore(state => state.toggleModal);
  const headline = useFilterStore(state => state.headline); // getState() 제거
  const date = useFilterStore(state => state.date); // getState() 제거
  const countries = useFilterStore(state => state.countries); // getState() 제거

  const filterData: Filters[] = [
    {
      id: 1,
      data: {
        search: {
          title: headline !== '' ? headline : '전체 헤드라인',
          image: Search,
          checkImage: SearchCheck,
          isChecked: headline !== '' ? true : false,
        },
      },
    },
    {
      id: 2,
      data: {
        date: {
          title: date !== '' ? date : '전체 날짜',
          image: Calender,
          checkImage: CalenderCheck,
          isChecked: date !== '' ? true : false,
        },
      },
    },
    {
      id: 3,
      data: {
        country: {
          title:
            countries.length !== 0
              ? countries.length === 1
                ? `${countries[0]}`
                : `${countries[0]} 외 ${countries.length - 1}`
              : '전체 국가',
          isChecked: countries.length > 0 ? true : false,
        },
      },
    },
  ];

  return (
    <SLayout>
      {filterData.map(filter => {
        const key = Object.keys(filter.data)[0];
        return (
          <FilterBox
            key={filter.id}
            type='headerFilter'
            title={filter.data[key].title}
            image={filter.data[key].isChecked ? filter.data[key].checkImage : filter.data[key].image}
            isChecked={filter.data[key].isChecked}
            onClick={toggleModal}
          />
        );
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
  /* flex-wrap: wrap; */
  gap: 0.5rem;
  align-items: center;
  background-color: white;
  box-shadow: 0 4px 6px 0 rgba(0, 28, 36, 0.1);
  z-index: 10;
  overflow-x: auto;
`;
