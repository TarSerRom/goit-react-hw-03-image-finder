export default function Button({ loadMore }) {
  return (
    <button className="Button" type="button" onClick={loadMore}>
      Load more
    </button>
  );
}