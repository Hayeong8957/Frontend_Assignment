import { IAPIReturnData } from '@/types/article';

const BASE_URL = '/api-url';
let lastRequestTime = 0; // 마지막 요청 시간을 저장할 변수

const fetchClient = async (url: string, options: RequestInit) => {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
};

interface IParams {
  pageParam: number;
}

// 모든 Article 데이터 가져오기 -> 무한스크롤으로 구현하기 위해 page
export const getArticles = async ({ pageParam = 0 }: IParams): Promise<IAPIReturnData | null> => {
  try {
    // const now = Date.now();
    // const timeSinceLastRequest = now - lastRequestTime;

    // if (timeSinceLastRequest < 12000) {
    //   // 12초 이내에 다시 요청하는 경우
    //   await new Promise(resolve => setTimeout(resolve, 12000 - timeSinceLastRequest));
    // }

    // lastRequestTime = Date.now(); // 요청 시간 업데이트

    const allArticlesData = await fetchClient(
      `${BASE_URL}?page=${pageParam}&sort=newest&api-key=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        method: 'GET',
      },
    );

    // if (allArticlesData.status === 429) {
    //   await new Promise(resolve => setTimeout(resolve, 12000)); // 12초 딜레이
    //   return getArticles({ pageParam }); // 재시도
    // }

    if (allArticlesData.ok) {
      const allArticlesJson = await allArticlesData.json();
      console.log('nextPage : ', pageParam + 1);
      return { articles: allArticlesJson.response.docs, nextPage: pageParam + 1 };
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
