import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./customBreadcrumbs.scss";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface CustomBreadcrumbsProps {
  breadcrumbData: BreadcrumbItem[];
}

const CustomBreadcrumbs = ({ breadcrumbData }: CustomBreadcrumbsProps) => {
  return (
    <Breadcrumb>
      {breadcrumbData.map((item, index) => (
        <Breadcrumb.Item
          key={index}
          linkAs={Link}
          linkProps={{ to: item.path || "#" }}
          active={!item.path}
        >
          {item.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default CustomBreadcrumbs;
