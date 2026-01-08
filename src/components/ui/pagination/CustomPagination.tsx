import { Pagination } from "react-bootstrap";
import "./CustomPagination.scss";

const CustomPagination = (props: {
  pageSize?: number;
  totalPage?: number;
  currentpage?: number;
  onChange?: (page: number) => void;
  limit?: number;
  className?: string;
}) => {
  const { totalPage = 0, currentpage = 1, onChange, className } = props;

  // Calculate total pages

  const handlePageChange = (newPage: number) => {
    if (onChange) {
      onChange(newPage);
    }
  };

  // Render pagination items
  const renderItems = () => {
    const items = [];
    for (let i = 1; i <= totalPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentpage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div className={`customPagination ${className || ""}`}>
      <Pagination>
        <Pagination.Prev
          disabled={currentpage === 1}
          onClick={() => handlePageChange(currentpage - 1)}
        />
        {renderItems()}
        <Pagination.Next
          disabled={currentpage === totalPage}
          onClick={() => handlePageChange(currentpage + 1)}
        />
      </Pagination>
    </div>
  );
};

export default CustomPagination;
