function Pagination({ page, pages, onPageChange }) {
  const pageNumber = [];
  for (let i = 1; i <= pages; i++) {
    pageNumber.push(i);
  }
  return (
    <div className="flex justify-center my-4">
      <ul className="flex border border-slate-300">
        {pageNumber.map((number) => (
          <li
            key={number}
            className={`dark:text-gray-800 px-2 py-1 ${
              page === number ? "bg-gray-200" : ""
            }`}
          >
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
