interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNo: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div
      className="mt-5 px-3 sm:px-5 flex items-center justify-between text-sm 
    sm:text-normal font-medium sm:font-normal"
    >
      <div>
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </div>
      <div className="flex">
        <div>
          <button
            onClick={() => {
              if (currentPage - 1 > 0) {
                onPageChange(currentPage - 1);
              }
            }}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Prev
          </button>
        </div>
        <div>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNo: number) => (
              <button
                key={pageNo}
                onClick={() => onPageChange(pageNo)}
                className={`min-w-10 p-2 rounded ${
                  currentPage === pageNo ? "bg-primary" : "bg-gray-200"
                } hover:${
                  currentPage === pageNo ? "bg-secondary" : "bg-gray-300"
                } mx-2`}
              >
                {pageNo}
              </button>
            )
          )}
        </div>
        <div>
          <button
            onClick={() => {
              if (currentPage + 1 <= totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
