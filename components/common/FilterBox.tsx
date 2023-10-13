import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface EachFilterProps {
  type: string;
  title: string;
  image?: any;
}

function FilterBox({ type, title, image }: EachFilterProps) {
  return (
    <SEachFilterDiv $type={type === 'headerFilter'}>
      {image && <Image src={image} alt='filter icon' width={16} height={16} />}
      <span>{title}</span>
    </SEachFilterDiv>
  );
}

export default FilterBox;

export const SEachFilterDiv = styled.div<{ $type: boolean }>`
  max-width: 9rem;
  height: 2.125rem;
  padding: 0.3125rem 0.75rem 0.3125rem 0.75rem;
  margin-right: 0.4375rem;
  padding-right: 0.75rem;
  border-radius: 1.875rem;
  border: ${({ $type }) => ($type ? '1px solid #c4c4c4' : '1px solid var(--White60, #F2F2F2)')};
  justify-content: center;
  align-items: center;
  gap: 4px;
  display: inline-flex;
  font-size: 14px;
  color: #6d6d6d;
  cursor: pointer;
`;
