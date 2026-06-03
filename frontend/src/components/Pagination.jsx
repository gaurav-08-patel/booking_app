const Pagination = ({ page, pages, onPageChange }) => {
    let pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="py-5">
            <ul className="flex border border-slate-300 flex-wrap">
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`p-1 px-3 cursor-pointer ${page === number ? "bg-gray-100" : ""} `}
                        onClick={()=> onPageChange(number) }
                    >
                        {number}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
