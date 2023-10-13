import React, { useEffect, useState } from 'react';
import { getArticles } from '@/pages/api/article';
import Article from './Article';
import { IArticle } from '@/types/article';
import styled from 'styled-components';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useInfiniteQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

function ArticleList() {
  const [articleList, setArticleList] = useState<IArticle[] | null>([]);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['articles'],
    ({ pageParam = 0 }) => getArticles({ pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage?.length === 0 ? undefined : nextPage;
      },
      select: data => ({
        pages: data?.pages.flatMap(page => page),
        pageParams: data.pageParams,
      }),
    },
  );

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  useEffect(() => {
    if (data?.pages) {
      setArticleList(prev => [...(prev || []), ...data.pages.filter((item): item is IArticle => item !== null)]);
    }
  }, [data]);

  return (
    <>
      <SLayout>
        {articleList &&
          articleList.map(article => (
            <Article
              key={uuidv4()}
              headline={article.headline.main}
              source={article.source}
              kicker={article.byline.original}
              pub_date={article.pub_date}
              web_url={article.web_url}
            />
          ))}
        <STarget ref={setTarget} />
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
  height: 1rem;
`;

