import React, { useEffect, useState } from 'react';
import FilterBox from '../common/FilterBox';
import { useFilterStore } from '@/stores/filter';
import { styled } from 'styled-components';
import { DatePicker, Input } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';

const countryList = [
  { id: '1', country: '대한민국', glocation: 'South Korea', type: 'modalFilter' },
  { id: '2', country: '중국', glocation: 'China', type: 'modalFilter' },
  { id: '3', country: '일본', glocation: 'Japan', type: 'modalFilter' },
  { id: '4', country: '미국', glocation: 'United States', type: 'modalFilter' },
  { id: '5', country: '북한', glocation: 'North Korea', type: 'modalFilter' },
  { id: '6', country: '러시아', glocation: 'Russia', type: 'modalFilter' },
  { id: '7', country: '프랑스', glocation: 'France', type: 'modalFilter' },
  { id: '8', country: '영국', glocation: 'England', type: 'modalFilter' },
];

function FilterModal() {
  const [inputValue, setInputValue] = useState({
    headLine: '',
    date: '',
  });
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const { headline, date, countries } = useFilterStore.getState();
  const { isModalOpen, toggleModal, setHeadline, setDate, setCountries } = useFilterStore(state => state);

  // 버튼을 눌러 전역 상태에 저장시킨것이 아니면 모달이 닫힐 때 상태를 초기화
  useEffect(() => {
    if (!isModalOpen) {
      setInputValue({
        headLine: '',
        date: '',
      });
      setSelectedCountries([]);
    }
    setInputValue({
      headLine: headline,
      date: date,
    });
    setSelectedCountries(countries);
  }, [isModalOpen]);

  if (!isModalOpen) {
    return null;
  }

  // 이벤트의 타겟과 currentTarget을 비교하여 SOverlay 외부에서 클릭이 발생한 경우에만 토글 닫히게
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const handleClickButton = () => {
    setHeadline(inputValue.headLine);
    setDate(inputValue.date);
    setCountries(selectedCountries);
    toggleModal();
  };

  const handleHealineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, headLine: e.target.value });
  };

  const handleDateChange: DatePickerProps['onChange'] = (_, dateString) => {
    setInputValue({ ...inputValue, date: dateString });
  };

  const handleCountryClick = (countryName: string) => {
    if (selectedCountries.includes(countryName)) {
      setSelectedCountries(selectedCountries.filter(existingCountry => existingCountry !== countryName));
    } else {
      setSelectedCountries([...selectedCountries, countryName]);
    }
  };

  return (
    <>
      <SLayout onClick={handleOverlayClick}>
        <SOverlay>
          <SInputContainer>
            <SInputTitle>헤드라인</SInputTitle>
            <SInput
              value={inputValue.headLine}
              type='text'
              placeholder='검색하실 헤드라인을 입력해주세요.'
              onChange={e => handleHealineChange(e)}
            />
          </SInputContainer>
          <SInputContainer>
            <SInputTitle>날짜</SInputTitle>
            <SDatePicker
              value={inputValue.date ? dayjs(inputValue.date) : null}
              placeholder='날짜를 선택해주세요.'
              format='YYYY.MM.DD'
              onChange={handleDateChange}
            />
          </SInputContainer>
          <SInputCountryContainer>
            <SInputTitle>국가</SInputTitle>
            <SCountryFilterContainer>
              {countryList.map(country => (
                <FilterBox
                  key={country.id}
                  title={country.country}
                  type={country.type}
                  isChecked={selectedCountries.includes(country.country)}
                  onClick={() => handleCountryClick(country.country)}
                />
              ))}
            </SCountryFilterContainer>
          </SInputCountryContainer>
          <SButton onClick={handleClickButton}>필터 적용하기</SButton>
        </SOverlay>
      </SLayout>
    </>
  );
}

export default FilterModal;

const SLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const SOverlay = styled.div`
  width: 20.9375rem;
  height: 30rem;
  background-color: white;
  border-radius: 16px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.25rem;
`;

const SInputContainer = styled.div`
  width: 100%;
  height: 4.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 2.5rem;
`;

const SInputCountryContainer = styled.div`
  width: 100%;
  height: 6.75rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2.3rem;
`;

const SInputTitle = styled.span`
  color: #000;
  font-family: Apple SD Gothic Neo;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.8px;
  margin-bottom: 0.5rem;
`;

const SInput = styled(Input)`
  display: flex;
  width: 100%;
  padding: 0.625rem 1.25rem;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid var(--Gray, #c4c4c4);
`;

const SDatePicker = styled(DatePicker)`
  display: flex;
  width: 100%;
  padding: 0.625rem 1.25rem;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid var(--Gray, #c4c4c4);
`;

const SCountryFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.5rem;
`;

const SButton = styled.div`
  width: 100%;
  height: 3.75rem;
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
