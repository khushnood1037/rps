import { Col, Row } from "react-bootstrap";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CopyIcon,
  FundsIcon,
  ProfileIcon,
  RedirectIcon,
  SoldIcon,
} from "../../../../assets/svgImgs/SvgImgs";
import CommonHeading from "../../../common/commonHeading/CommonHeading";
import CommonTable from "../../../ui/commonTable/CommonTable";
import "./Dashboard.scss";
import useCopyClipboard from "../../../../hooks/useCopyToClipboard";
import Toaster from "../../../common/Toast";

const Dashboard = () => {
  const [staticCopy] = useCopyClipboard();

  // Static data for dashboard cards
  const data = [
    {
      text: "Total Users",
      toottip: "1,234",
      amount: "1,234",
      picture: <ProfileIcon />,
    },
    {
      text: "Tokens Sold",
      toottip: "5,678,900 ROCK",
      amount: "5.67M ROCK",
      picture: <SoldIcon />,
    },
    {
      text: "Funds Raised",
      toottip: "$12,345,678",
      amount: "12.34M",
      picture: <FundsIcon />,
    },
  ];

  const fields = [
    { label: "User Address" },
    { label: "Amount Spent" },
    { label: "Received Token" },
    { label: "Phase" },
    { label: "Txn. Hash" },
    { label: "Date/Time(UTC)" },
  ];

  // Static sales overview data
  const salesOverviewData = [
    { month: "Jan", sales: 1000000 },
    { month: "Feb", sales: 1500000 },
    { month: "Mar", sales: 2000000 },
    { month: "Apr", sales: 1800000 },
    { month: "May", sales: 2500000 },
    { month: "Jun", sales: 3000000 },
  ];

  // Static tokens by phase data
  const tokensByPhaseData = [
    { phase: "Phase 1", tokensSold: 1000000 },
    { phase: "Phase 2", tokensSold: 2000000 },
    { phase: "Phase 3", tokensSold: 1500000 },
    { phase: "Phase 4", tokensSold: 1800000 },
  ];

  // Static transactions data with formatted values
  const staticTransactions = [
    {
      userAddress: "0x1234...5678",
      fullUserAddress: "0x1234567890abcdef1234567890abcdef12345678",
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

  return (
    <>
      <div className="dashboard">
        <div className="dashboard_head">
          <Row>
            {data.map((item, index) => (
              <Col lg={4} key={index}>
                <div className="dashboard_card">
                  <div className="head">
                    <div>
                      <p>{item?.text}</p>
                      <h3 title={String(item?.toottip)}>{item?.amount}</h3>
                    </div>
                    <span>{item?.picture}</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <div className="dashboard_graph">
          <Row>
            <Col lg={6}>
              <div className="dashboard_graph_left">
                <div className="header">
                  <h4>Sales Overview</h4>
                  <p>Sales</p>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                    backgroundColor: "#000",
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesOverviewData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12, fill: "#fff" }}
                        axisLine={{ stroke: "#333" }}
                        tickLine={{ stroke: "#333" }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "#fff" }}
                        axisLine={{ stroke: "#333" }}
                        tickLine={{ stroke: "#333" }}
                        tickFormatter={(value) => {
                          return `$${(value / 1000000).toFixed(1)}M`;
                        }}
                      />
                      <Tooltip
                        formatter={(value: number | undefined) => [
                          `$${(value ?? 0 / 1000000).toFixed(2)}M`,
                          "Sales",
                        ]}
                        labelFormatter={(label) => `Month: ${label}`}
                        contentStyle={{
                          backgroundColor: "#333",
                          border: "1px solid #555",
                          color: "#fff",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#87CEEB"
                        strokeWidth={3}
                        dot={{ fill: "#87CEEB", strokeWidth: 2, r: 5 }}
                        activeDot={{
                          r: 7,
                          stroke: "#87CEEB",
                          strokeWidth: 2,
                          fill: "#87CEEB",
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="dashboard_graph_right">
                <div className="header">
                  <h4>Tokens Sold by Phase</h4>
                </div>
                <div style={{ width: "100%", height: "300px" }}>
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    className="token_sold_graph"
                  >
                    <BarChart data={tokensByPhaseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="phase"
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => {
                          return `${(value / 1000000).toFixed(1)}M`;
                        }}
                      />
                      <Tooltip
                        formatter={(value: number | undefined) => [
                          `${(value ?? 0 / 1000000).toFixed(2)}M`,
                          "Tokens Sold",
                        ]}
                        labelFormatter={(label) => `Phase: ${label}`}
                      />
                      <Bar
                        dataKey="tokensSold"
                        fill="#FFD700"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="dashboard_table">
          <div className="dashboard_table_head">
            <CommonHeading
              className="pt-4"
              title="Recent Transactions"
              subtitle="Latest token purchases and transactions"
            />
          </div>
          <CommonTable fields={fields}>
            {staticTransactions.map((item, index) => (
              <tr key={index}>
                <td>
                  <button type="button" className="useraddress" 
                  onClick={() => {
                          staticCopy(item.userAddress);
                          Toaster.success("Wallet address copied");
                        }}>
                    {item.userAddress}{" "}
                    <span>
                      <CopyIcon />
                    </span>
                  </button>
                </td>
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
                  <span className={`phase phase-${item.phaseNo}`}>
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
          <div className="transaction">
            <p>Showing latest 5 transactions</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
