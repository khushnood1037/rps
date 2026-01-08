import {
  CopyIcon,
  CsvIcon,
  RedirectIcon,
} from "../../../../assets/svgImgs/SvgImgs";
import CommonButton from "../../../common/button/CommonButton";
import CommonSearch from "../../../ui/commonSearch/CommonSearch";
import CommonTable from "../../../ui/commonTable/CommonTable";
import SelectField from "../../../ui/formik/selectField/SelectField";
import "./TransactionHistory.scss";
import CommonHeading from "../../../common/commonHeading/CommonHeading";

const TransactionHistory = () => {

  const fields = [
    { label: "Sr No" },
    { label: "User Address" },
    { label: "Email" },
    { label: "Amount Spent" },
    { label: "Received Token" },
    { label: "Phase" },
    { label: "Txn. Hash" },
    { label: "Date/Time(UTC)" },
  ];

  // Static transactions data with pre-formatted values
  const staticTransactions = [
    {
      userAddress: "0x1234...5678",
      fullUserAddress: "0x1234567890abcdef1234567890abcdef12345678",
      email: "user1@example.com",
      buyAmount: "1.5",
      buyType: 1,
      tokenAmount: "1000",
      phaseNo: 1,
      phaseName: "Phase 1",
      transactionHash: "0xabcd...ef12",
      fullTransactionHash: "0xabcdef1234567890abcdef1234567890abcdef12",
      formattedDate: "Jan 15, 2024 10:30 AM UTC",
      tokenicon: "Ξ",
    },
    {
      userAddress: "0xabcd...ef12",
      fullUserAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      email: "user2@example.com",
      buyAmount: "2500",
      buyType: 2,
      tokenAmount: "2000",
      phaseNo: 2,
      phaseName: "Phase 2",
      transactionHash: "0x9876...5432",
      fullTransactionHash: "0x9876543210fedcba9876543210fedcba98765432",
      formattedDate: "Jan 16, 2024 02:20 PM UTC",
      tokenicon: "$",
    },
    {
      userAddress: "0x9876...5432",
      fullUserAddress: "0x9876543210fedcba9876543210fedcba98765432",
      email: "user3@example.com",
      buyAmount: "3000",
      buyType: 3,
      tokenAmount: "2500",
      phaseNo: 3,
      phaseName: "Phase 3",
      transactionHash: "0x1111...1111",
      fullTransactionHash: "0x1111111111111111111111111111111111111111",
      formattedDate: "Jan 17, 2024 09:15 AM UTC",
      tokenicon: "$",
    },
  ];

  // Static options for phase filter
  const options = [
    { label: "All Phases", value: "all" },
    { label: "Phase 1", value: "1" },
    { label: "Phase 2", value: "2" },
    { label: "Phase 3", value: "3" },
    { label: "Phase 4", value: "4" },
    { label: "Phase 5", value: "5" },
    { label: "Phase 6", value: "6" },
    { label: "Phase 7", value: "7" },
    { label: "Phase 8", value: "8" },
    { label: "Phase 9", value: "9" },
  ];

  return (
    <>
      <div className="transaction_history">
        <div className="transaction_history_head">
          <div className="transaction_history_head_left">
            <CommonSearch
              placeholder="Search by user address..."
              value=""
              onChange={() => {}}
            />
            <SelectField
              value={{ label: "All Phases", value: "all" }}
              onChange={() => {}}
              options={options}
            />
            <CommonButton
              className="small"
              title="Reset"
              disabled={true}
              onClick={() => {}}
            />
          </div>
          <div className="transaction_history_head_btns">
            <CommonButton
              className="small yellow_btn csv_btn"
              title={
                <div>
                  <span className="me-3">
                    <CsvIcon />
                  </span>
                  Export CSV
                </div>
              }
            />
          </div>
        </div>
        <div className="transaction_history_table">
          <div className="transaction_history_table_head">
            <CommonHeading
              title="Transaction History"
              subtitle="Complete transaction history with detailed token information"
            />
          </div>

          <CommonTable fields={fields}>
            {staticTransactions.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <button type="button" className="user" disabled>
                    {item.userAddress}{" "}
                    <span>
                      <CopyIcon />
                    </span>
                  </button>
                </td>
                <td>{item.email || "--"}</td>
                <td className="amount" title={item.buyAmount}>
                  {item.tokenicon} {item.buyAmount}{" "}
                  {item.buyType == 1
                    ? "ETH"
                    : item.buyType == 2
                    ? "USDT"
                    : "USDC"}
                </td>
                <td className="token" title={item.tokenAmount}>
                  {item.tokenAmount} ROCK
                </td>
                <td>
                  <span className="phase">
                    {item.phaseName}
                  </span>
                </td>
                <td>
                  <a
                    href={`https://etherscan.io/tx/${item.fullTransactionHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="metaAddress"
                  >
                    {item.transactionHash}
                    <span className="text_btn ms-2">
                      <RedirectIcon />
                    </span>
                  </a>
                </td>
                <td>{item.formattedDate}</td>
              </tr>
            ))}
          </CommonTable>
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
