import {FC} from 'react'


interface LoadMoreProp{
  loadMore:()=>void
}

const LoadMoreBtn: FC<LoadMoreProp>= ({ loadMore }) => {
  const handleLoadMore = () => {
    loadMore();
  };
  return (
    <div>
      <button onClick={handleLoadMore} type='button'>
        Load More
      </button>
    </div>
  );
};
export default LoadMoreBtn;