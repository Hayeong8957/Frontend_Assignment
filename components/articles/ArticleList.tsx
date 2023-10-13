import React, { useEffect, useState } from 'react';
import { getAllArticles } from '@/pages/api/article';
import Article from './Article';
import { IArticle } from '@/types/article';
import styled from 'styled-components';

function ArticleList() {
  const [articleList, setArticleList] = useState<IArticle[] | null>([]);

  async function getAllArticleList() {
    const allArticles = await getAllArticles();
    setArticleList(allArticles);
    console.log(articleList);
  }

  useEffect(() => {
    getAllArticleList();
  }, []);

  return (
    <SLayout>
      {articleList &&
        articleList.map(article => (
          <Article
            key={article._id}
            headline={article.headline.main}
            source={article.source}
            kicker={article.headline.kicker}
            pub_date={article.pub_date}
            web_url={article.web_url}
          />
        ))}
    </SLayout>
  );
}

export default ArticleList;

export const SLayout = styled.div`
  width: 100%;
  padding: 0.5rem 1.25rem;
  margin-top: 5rem;
  margin-bottom: 5.3125rem;
`;
