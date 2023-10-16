import { IAPIReturnData } from '@/types/article';
import returnNextDate from '@/utils/returnNextDate';

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
  pageParam: number; // 페이지 -> 무한스크롤
  headline?: string;
  date?: string;
  countries?: string[];
}

// 모든 Article 데이터 가져오기 -> 무한스크롤으로 구현하기 위해 page
export const getArticles = async ({
  pageParam = 0,
  headline,
  date,
  countries,
}: IParams): Promise<IAPIReturnData | null> => {
  try {
    /***** 무한 스크롤 rate-limit 설정 *****/
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    if (timeSinceLastRequest < 12000) {
      // 12초 이내에 다시 요청하는 경우
      await new Promise(resolve => setTimeout(resolve, 12000 - timeSinceLastRequest));
    }

    lastRequestTime = Date.now(); // 요청 시간 업데이트

    /*********** 필터링 조건 동적 생성 ************/
    const queryParams = new URLSearchParams({
      page: String(pageParam),
      sort: 'newest',
      'api-key': String(process.env.NEXT_PUBLIC_API_KEY),
    });

    let fq = '';

    if (headline && date) {
      fq = `headline:("${headline}") AND pub_date:("${returnNextDate(date)}")`;
    } else if (headline) {
      fq = `headline:("${headline}")`;
    } else if (date) {
      fq = `pub_date:("${returnNextDate(date)}")`; // 하루 뒤의 날짜로 설정
    }

    if (fq) {
      queryParams.append('fq', fq);
    }
    /****************************************/

    const allArticlesData = await fetchClient(`${BASE_URL}?${queryParams}`, {
      method: 'GET',
    });

    /***** 무한 스크롤 오류 시 재시도 ****/
    if (allArticlesData.status === 429) {
      await new Promise(resolve => setTimeout(resolve, 12000)); // 12초 딜레이
      return getArticles({ pageParam }); // 재시도
    }

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
