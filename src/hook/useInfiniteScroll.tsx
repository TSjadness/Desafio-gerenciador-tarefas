import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}
// Scroll infinito na tela, quando o usuário chega no final da lista, carrega mais itens chamando a função onLoadMore.
export const useInfiniteScroll = ({ hasMore, loading, onLoadMore }: UseInfiniteScrollOptions) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: "100px" }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  return elementRef;
};
