import toast from "react-hot-toast";
import { CopyIcon, CsvIcon } from "../../../../assets/svgImgs/SvgImgs";
import CommonButton from "../../../common/button/CommonButton";
import CommonSearch from "../../../ui/commonSearch/CommonSearch";
import CommonTable from "../../../ui/commonTable/CommonTable";
import "./Users.scss";
import useCopyClipboard from "../../../../hooks/useCopyToClipboard";
import { useState, type ChangeEvent, type ChangeEventHandler } from "react";

const Users = () => {
  const [staticCopy] = useCopyClipboard();
  const [search, setSearch] = useState("");
  console.log(search);


  const fields = [
    {
      label: "Sr No",
    },
    {
      label: "Wallet Address",
    },
    {
      label: "Tokens Bought",
    },
    {
      label: "Total Spent USD",
    },
    {
      label: "Total Reward",
    },
    {
      label: "Total USDT Reward",
    },
    { label: "Remaining token" },
    { label: "Remaining USDT token" },
    { label: "Date/Time(UTC)" },
    {
      label: "Action",
    },
  ];

  // Static users data with pre-formatted values
  const staticUsers = [
    {
      userAddress: "0x1234...5678",
      fullUserAddress: "0x1234567890abcdef1234567890abcdef12345678",
      totalTokensBought: "5000",
      totalSpentUSD: "10000",
      totalRewardRock: "250",
      totalRewardUsdt: "500",
      rockOutstanding: "4750",
      usdtOutstanding: "4500",
      joinDate: "2024-01-15T10:30:00Z",
      formattedDate: "Jan 15, 2024 10:30 AM UTC",
      hasUser: "1",
    },
    {
      userAddress: "0xabcd...ef12",
      fullUserAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      totalTokensBought: "8000",
      totalSpentUSD: "16000",
      totalRewardRock: "400",
      totalRewardUsdt: "800",
      rockOutstanding: "7600",
      usdtOutstanding: "7200",
      joinDate: "2024-01-16T14:20:00Z",
      formattedDate: "Jan 16, 2024 02:20 PM UTC",
      hasUser: "1",
    },
    {
      userAddress: "0x9876...5432",
      fullUserAddress: "0x9876543210fedcba9876543210fedcba98765432",
      totalTokensBought: "3000",
      totalSpentUSD: "6000",
      totalRewardRock: "150",
      totalRewardUsdt: "300",
      rockOutstanding: "2850",
      usdtOutstanding: "2700",
      joinDate: "2024-01-17T09:15:00Z",
      formattedDate: "Jan 17, 2024 09:15 AM UTC",
      hasUser: "0",
    },
  ];

  return (
    <>
      <div className="users">
        <div className="users_head">
          <div className="d-flex">
            <CommonSearch
              placeholder="Search by wallet address"
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value as string)}
            />

            <CommonButton
              className="small ms-3"
              title="Reset"
              disabled={true}
              onClick={() => {}}
            />
          </div>
          <div className="btns">
            <CommonButton
              className="small yellow_btn csv_btn"
              title="Export CSV"
              svgIcon={<CsvIcon />}
            />
          </div>
        </div>
        <div className="users_table">
          <CommonTable fields={fields}>
            {staticUsers.map((item, index) => (
              <tr key={item.userAddress}>
                <td>{index + 1}</td>
                <td>
                  <button
                    type="button"
                    className="users_table_useraddress text-white "
                    onClick={() => {
                      staticCopy(item.userAddress);
                      toast.success("Wallet address copied");
                    }}>
                    {item.userAddress}{" "}
                    <span className="ps-2">
                      <CopyIcon />
                    </span>
                  </button>
                </td>
                <td className="token" title={item.totalTokensBought}>
                  {item.totalTokensBought} ROCK
                </td>
                <td title={item.totalSpentUSD}>
                  $ {item.totalSpentUSD}
                </td>
                <td className="token" title={item.totalRewardRock}>
                  {item.totalRewardRock} ROCK
                </td>
                <td title={item.totalRewardUsdt}>
                  $ {item.totalRewardUsdt}
                </td>
                <td className="token" title={item.rockOutstanding}>
                  {item.rockOutstanding} ROCK
                </td>
                <td title={item.usdtOutstanding}>
                  $ {item.usdtOutstanding}
                </td>
                <td>{item.formattedDate}</td>
                <td>
                  <div className="table_action">
                    <CommonButton
                      className="btn-style small yellow_btn"
                      title="Referral Details"
                      disabled={item.hasUser === "0"}
                    />
                    <CommonButton
                      className="btn-style small yellow_btn"
                      title="Withdraw history"
                      disabled={item.hasUser === "0"}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </CommonTable>
        </div>
      </div>
    </>
  );
};

export default Users;
