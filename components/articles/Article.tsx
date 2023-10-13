import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Star from '@/public/assets/star-fill.svg';

interface ArticleProps {
  headline: string;
  source: string;
  kicker: string;
  pub_date: string;
  web_url: string;
}

function Article({ headline, source, kicker, pub_date, web_url }: ArticleProps) {
  return (
    <SLayout>
      <STitleDiv>
        <STitleText>{headline}</STitleText>
        <SIconBox>
          <Image src={Star} alt='star' width={16} height={16} />
        </SIconBox>
      </STitleDiv>
      <SInfoDiv>
        <SInfoLeft>
          <SInfoText>{source}</SInfoText>
          <SInfoText>{kicker}</SInfoText>
        </SInfoLeft>
        <SInfoRight>
          <SInfoDate>{pub_date}</SInfoDate>
        </SInfoRight>
      </SInfoDiv>
    </SLayout>
  );
}

export default Article;

const SLayout = styled.div`
  width: 100%;
  height: 6.5rem;
  background-color: white;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 0.5rem;
`;

const STitleDiv = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const STitleText = styled.div`
  width: 100%;
  color: black;
  font-size: 18px;
  font-family: 'Apple SD Gothic Neo', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 28px;
  word-wrap: break-word;
`;

const SIconBox = styled.div`
  width: 1rem;
  height: 1rem;
  top: 0.1563rem;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const SInfoDiv = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const SInfoLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;

const SInfoRight = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;

const SInfoText = styled.div`
  color: black;
  font-size: 13px;
  font-family: 'Apple SD Gothic Neo', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
`;

const SInfoDate = styled.div`
  color: #6d6d6d;
  font-size: 13px;
  font-family: 'Apple SD Gothic Neo', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
`;
