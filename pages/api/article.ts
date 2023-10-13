import { IArticle } from '@/types/article';

const BASE_URL = '/api-url';

const fetchClient = async (url: string, options: RequestInit) => {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
    },
    ...options,
  });
};

// 모든 Article 데이터 가져오기 -> 무한스크롤으로 구현하기 위해 page
export const getArticles = async ({  pageParam = 0 }): Promise<IArticle[] | null> => {
  try {
    const allArticlesData = await fetchClient(
      `${BASE_URL}?page=${pageParam}&api-key=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        method: 'GET',
      },
    );

    if (allArticlesData.ok) {
      const allArticlesJson = await allArticlesData.json();
      return allArticlesJson.response.docs;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
