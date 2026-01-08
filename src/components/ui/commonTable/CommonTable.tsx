import { Table } from "react-bootstrap";
import React from "react";
import "./CommonTable.scss";

interface Field {
  label?: string;
  icon?: React.ReactNode;
}

interface CommonTableProps {
  className?: string;
  fields?: Field[];
  children?: React.ReactNode;
}

const CommonTable = ({ className, fields, children }: CommonTableProps) => {

  const hasRows = React.Children.count(children) > 0;

  return (
    <>
      <div className={`commonTable ${className}`}>
        <Table responsive>
          {fields && (
            <thead>
              <tr>
                {fields?.map((item: Field) =>
                  item.label ? (
                    <th key={item.label}>
                      <h5>{item.label}</h5>
                      {item.icon && (
                        <span className="iconSec">{item.icon}</span>
                      )}
                    </th>
                  ) : (
                    ""
                  )
                )}
              </tr>
            </thead>
          )}

          <tbody>
            {hasRows ? (
              children
            ) : (
              <tr>
                <td colSpan={fields.length} className="no_record">
                  No record found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default CommonTable;
