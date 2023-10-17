import { useEffect, useState } from 'react';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';

interface IuseIntersectionObserverProps {
  threshold?: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

function useIntersectionObserver({ threshold = 0.3, hasNextPage, fetchNextPage }: IuseIntersectionObserverProps) {
  //스크롤 최하단 div요소에 setTarget을 ref로 넣어 사용
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

  useEffect(() => {
    if (!target) return;

    let debounceTimer: NodeJS.Timeout;

    const observerCallback: IntersectionObserverCallback = entries => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        entries.forEach(entry => {
          if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        });
      }, 300); // 300ms 디바운스 -> 429 error 안나게
    };

    //ointersection observer 인스턴스 생성
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    // 타겟 관찰 시작
    observer.observe(target);

    // 관찰 멈춤
    return () => observer.unobserve(target);
  }, [threshold, target, hasNextPage, fetchNextPage]);

  return { setTarget };
}

export default useIntersectionObserver;
