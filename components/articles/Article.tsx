import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import StarFill from '@/public/assets/star-fill.svg';
import Star from '@/public/assets/star.svg';
import formatDate from '@/utils/formatDate';
import { useScrappedStore } from '@/stores/scrappedList';

interface ArticleProps {
  _id: string;
  headline: string;
  source: string;
  kicker: string;
  pub_date: string;
  web_url: string;
  isScrapped: boolean;
}

function Article({ _id, headline, source, kicker, pub_date, web_url, isScrapped }: ArticleProps) {
  const { addScrap, removeScrap } = useScrappedStore();

  const handleScrapToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isScrapped) {
      removeScrap(_id);
      alert('스크랩에서 삭제되었습니다!');
    } else {
      addScrap(_id);
      alert('스크랩에 저장되었습니다!');
    }
  };

  return (
    <Link href={web_url} passHref>
      <SLayout>
        <STitleDiv>
          <STitleText>{headline}</STitleText>
          <SIconBox onClick={handleScrapToggle}>
            {isScrapped && <Image src={StarFill} alt='starFill' width={16} height={16} />}
            {!isScrapped && <Image src={Star} alt='star' width={16} height={16} />}
          </SIconBox>
        </STitleDiv>
        <SInfoDiv>
          <SInfoLeft>
            <SInfoText>{source}</SInfoText>
            <SInfoKicker>{kicker?.slice(3)}</SInfoKicker>
          </SInfoLeft>
          <SInfoRight>
            <SInfoDate>{formatDate(pub_date)}</SInfoDate>
          </SInfoRight>
        </SInfoDiv>
      </SLayout>
    </Link>
  );
}

export default Article;

const SLayout = styled.div`
  width: 100%;
  height: 6.5rem;
  background-color: white;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const STitleDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const STitleText = styled.div`
  width: 100%;
  max-height: 3.5rem;
  color: black;
  font-size: 16px;
  font-family: 'Apple SD Gothic Neo', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 28px;
  word-wrap: break-word;
  margin-right: 0.5rem;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SIconBox = styled.div`
  width: 1rem;
  height: 1rem;
  top: 0.1563rem;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

const SInfoDiv = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: flex-end;
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
  font-size: 12px;
  font-family: 'Apple SD Gothic Neo', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
`;

const SInfoKicker = styled.div`
  max-width: 6.25rem;
  color: black;
  font-size: 12px;
  font-family: 'Apple SD Gothic Neo', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SInfoDate = styled.div`
  color: #6d6d6d;
  font-size: 12px;
  font-family: 'Apple SD Gothic Neo', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
`;
