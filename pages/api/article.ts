import { IAPIReturnData } from '@/types/article';
import returnNextDate from '@/utils/returnNextDate';
import convertCountryList from '@/utils/convertCountryList';

const BASE_URL = '/api-url';
let lastRequestTime = 0; // 마지막 요청 시간을 저장할 변수

interface IParams {
  pageParam: number; // 페이지 -> 무한스크롤
  headline?: string;
  date?: string;
  countries?: string[];
}

const fetchClient = async (url: string, options: RequestInit) => {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
};

// fq를 설정하는 함수
const buildFq = (headline?: string, date?: string, countries?: string[]) => {
  let fq = '';
  const countryList = convertCountryList(countries);
  const countriesParams = countryList?.map(item => `"${item}"`).join(', ');

  if (headline && date && countries?.length !== 0) {
    fq = `headline:("${headline}") AND pub_date:("${returnNextDate(
      date,
    )}") AND glocations.contains(${countriesParams})`;
  } else if (headline && date) {
    fq = `headline:("${headline}") AND pub_date:("${returnNextDate(date)}")`;
  } else if (headline && countries?.length !== 0) {
    fq = `headline:("${headline}") AND glocations.contains(${countriesParams})`;
  } else if (date && countries?.length !== 0) {
    fq = `pub_date:("${returnNextDate(date)}") AND glocations.contains(${countriesParams})`;
  } else if (headline) {
    fq = `headline:("${headline}")`;
  } else if (date) {
    fq = `pub_date:("${returnNextDate(date)}")`;
  } else if (countries && countries?.length !== 0) {
    fq = `glocations.contains(${countriesParams})`;
  }

  return fq;
};

// 레이트 리미트 관리 함수
const handleRateLimit = async (lastRequestTime: number) => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  // 마지막 요청으로부터 12초가 지나지 않았다면, 12초가 될 때까지 대기
  if (timeSinceLastRequest < 12000) {
    await new Promise(resolve => setTimeout(resolve, 12000 - timeSinceLastRequest));
  }

  // 레이트 리미트 조건을 만족하면 함수는 현재 시간을 다시 측정해서 반환
  return Date.now();
};

// 모든 Article 데이터 가져오기 -> 무한스크롤으로 구현하기 위해 page
export const getArticles = async ({
  pageParam = 0,
  headline,
  date,
  countries,
}: IParams): Promise<IAPIReturnData | null> => {
  try {
    lastRequestTime = await handleRateLimit(lastRequestTime);
    // 요청 시간 업데이트

    /*********** 필터링 조건 동적 생성 ************/
    const queryParams = new URLSearchParams({
      page: String(pageParam),
      sort: 'newest',
      'api-key': String(process.env.NEXT_PUBLIC_API_KEY),
    });

    const fq = buildFq(headline, date, countries);
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
      return { articles: allArticlesJson.response.docs, nextPage: pageParam + 1 };
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
