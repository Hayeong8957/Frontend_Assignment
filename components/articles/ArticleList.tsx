import React from 'react';
import { getArticles } from '@/pages/api/article';
import Article from '@/components/articles/Article';
import NoScrapped from '@/components/layout/NoScrapped';

import styled from 'styled-components';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useInfiniteQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import Loading from '@/components/common/Loading';
import { useScrappedStore } from '@/stores/scrappedList';
import { useMenuStore } from '@/stores/menu';

// mock data -> api가 제대로 동작하지 않을 때
import { data } from './articleMockData';

function ArticleList() {
  const { scrappedIds } = useScrappedStore();
  const { focusedMenu } = useMenuStore();

  /*********** 무한 스크롤 구현 **********/
  // const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(
  //   ['articles'],
  //   ({ pageParam }) => getArticles({ pageParam }),
  //   {
  //     getNextPageParam: lastPage => {
  //       const totalPage = 100;
  //       if (lastPage?.nextPage == totalPage) return false;
  //       return lastPage?.nextPage;
  //     },
  //     retry: 3, // 최대 3회 재시도
  //     retryDelay: attemptIndex => Math.min(attemptIndex * 1000, 3000), // 재시도 간격 설정
  //     refetchInterval: 1000 * 12, // 12초마다 자동으로 새로고침
  //   },
  // );

  // const { setTarget } = useIntersectionObserver({
  //   hasNextPage,
  //   fetchNextPage,
  // });

  return (
    <>
      <SLayout>
        {focusedMenu == 1 ? (
          <div>
            {data?.pages.map(page => (
              <div key={uuidv4()}>
                {page?.articles?.map(article => (
                  <Article
                    key={uuidv4()}
                    _id={article._id}
                    isScrapped={scrappedIds.includes(article._id)}
                    headline={article.headline.main}
                    source={article.source}
                    kicker={article.byline.original}
                    pub_date={article.pub_date}
                    web_url={article.web_url}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div>
            {scrappedIds.length === 0 && <NoScrapped />}
            {data?.pages.map(page => (
              <div key={uuidv4()}>
                {page?.articles
                  ?.filter(article => scrappedIds.includes(article._id))
                  .map(article => (
                    <Article
                      key={uuidv4()}
                      _id={article._id}
                      isScrapped={true} // 여기서는 스크랩된 것만 보이므로 true로 설정합니다.
                      headline={article.headline.main}
                      source={article.source}
                      kicker={article.byline.original}
                      pub_date={article.pub_date}
                      web_url={article.web_url}
                    />
                  ))}
              </div>
            ))}
          </div>
        )}
        {/* {isFetching && <Loading />}
        <STarget ref={setTarget} /> */}
      </SLayout>
    </>
  );
}

export default ArticleList;

export const SLayout = styled.div`
  width: 100%;
  padding: 0rem 1.25rem;
  padding-top: 5rem;
  padding-bottom: 6.5625rem;
  overflow-y: auto;
`;

export const STarget = styled.div`
  width: 100%;
  height: 1.875rem;
`;
