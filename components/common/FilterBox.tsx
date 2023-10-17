import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface EachFilterProps {
  type: string;
  title: string;
  image?: any;
  isChecked: boolean;
  onClick: () => void;
}

function FilterBox({ type, title, image, isChecked, onClick }: EachFilterProps) {
  return (
    <SEachFilterDiv $type={type === 'headerFilter'} $isChecked={isChecked} onClick={onClick}>
      {image && <Image src={image} alt='filter icon' width={16} height={16} />}
      <span>{title}</span>
    </SEachFilterDiv>
  );
}

export default FilterBox;

export const SEachFilterDiv = styled.div<{ $type: boolean; $isChecked: boolean }>`
  /* 공통 스타일 */
  max-width: 9rem;
  height: 2.125rem;
  padding: 0.3125rem 0.75rem;
  border-radius: 1.875rem;
  justify-content: center;
  align-items: center;
  gap: 4px;
  display: inline-flex;
  font-size: 14px;
  cursor: pointer;

  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  border: ${({ $type, $isChecked }) => {
    if ($type && $isChecked) return '1px solid var(--Sub---BlueSky, #82B0F4)';
    return $type ? '1px solid #c4c4c4' : '1px solid var(--White60, #F2F2F2)';
  }};
  color: ${({ $type, $isChecked }) => {
    if ($type && $isChecked) return 'var(--Blue---Main, #3478F6)';
    if (!$type && $isChecked) return 'var(--White-100, #FFF)';
    return '#6d6d6d';
  }};
  background: ${({ $type, $isChecked }) => {
    if (!$type && $isChecked) return 'var(--Sub---BlueSky, #82B0F4)';
    return 'none';
  }};
`;
