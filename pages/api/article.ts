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

export const getAllArticles = async (): Promise<IArticle[] | null> => {
  const q = 'Manchin';
  try {
    const allArticlesData = await fetchClient(`${BASE_URL}?q=${q}&api-key=${process.env.NEXT_PUBLIC_API_KEY}`, {
      method: 'GET',
    });

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
