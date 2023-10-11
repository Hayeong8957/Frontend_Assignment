import React, { useEffect, useState } from 'react';
import { getAllArticles } from '@/pages/api/article';

function ArticleList() {
  const [articleList, setArticleList] = useState([]);

  async function getAllArticleList() {
    const allArticles = await getAllArticles();
    console.log(allArticles);
  }

  useEffect(() => {
    getAllArticleList();
  }, []);

  return <div>ㅎㅇㅎㅇ</div>;
}

export default ArticleList;
