import { Table } from "react-bootstrap";
import "./AdminCommonTable.scss";
import React from "react";

interface Field {
  label?: string;
  icon?: React.ReactNode;
}

interface AdminCommonTableProps {
  className?: string;
  fields?: Field[];
  children?: React.ReactNode;
}

const AdminCommonTable = ({ className, fields, children }: AdminCommonTableProps) => {
  const hasRows = React.Children.count(children) > 0;

  return (
    <>
      <div className={`admin_commonTable ${className}`}>
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
      {/* </div> */}
    </>
  );
};

export default AdminCommonTable;
