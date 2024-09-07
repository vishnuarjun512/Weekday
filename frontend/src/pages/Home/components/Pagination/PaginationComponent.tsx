// src/components/PaginationComponent.tsx
import {
  Pagination as P,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import usePaginationStore from "@/states/PageState";

const PaginationComponent = ({}) => {
  const { page, totalPages, setPage, incrementPage, decrementPage } =
    usePaginationStore();

  const handlePageClick = (pageNum: number) => {
    setPage(pageNum);
  };

  const renderPaginationItems = () => {
    const pageNumbers = [];
    const range = 2; // Show 2 pages before and after the current page

    // Always show the first page
    pageNumbers.push(
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          onClick={() => handlePageClick(1)}
          className={page === 1 ? "bg-red-300" : ""}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Show ellipsis if there are pages between the first and the current range
    if (page > range + 2) {
      pageNumbers.push(<PaginationEllipsis key="start-ellipsis" />);
    }

    // Show pages around the current page
    for (
      let i = Math.max(2, page - range);
      i <= Math.min(totalPages - 1, page + range);
      i++
    ) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={() => handlePageClick(i)}
            className={page === i ? "bg-red-300" : ""}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show ellipsis if there are pages between the last visible page and the last page
    if (page < totalPages - range - 1) {
      pageNumbers.push(<PaginationEllipsis key="end-ellipsis" />);
    }

    // Always show the last page
    if (totalPages > 1) {
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={() => handlePageClick(totalPages)}
            className={page === totalPages ? "bg-red-300" : ""}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <P className="mt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={decrementPage} />
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem>
          <PaginationNext href="#" onClick={incrementPage} />
        </PaginationItem>
      </PaginationContent>
    </P>
  );
};

export default PaginationComponent;
