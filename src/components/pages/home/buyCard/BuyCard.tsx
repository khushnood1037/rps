import { Form, Formik } from "formik";
import { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import * as Yup from "yup";
import { EthTokenIcon, UsdcTokenIcon, UsdtTokenIcon } from "../../../../assets/svgImgs/SvgImgs";
import CommonButton from "../../../common/button/CommonButton";
import Countdown from "../../../common/countdown/Countdown";
import FormControl from "../../../ui/formik/FormControl";
import "./BuyCard.scss";
interface BuyCardFormValues {
    ethAmount: string;
    ROCKAmount: string;
}
const BuyCard = () => {
    const [selectedPayment, setSelectedPayment] = useState<"ETH" | "USDT" | "USDC">("ETH");
    const initialValues: BuyCardFormValues = {
        ethAmount: "0.0",
        ROCKAmount: "0.0",
    };
    // Calculate countdown timestamp (13 hours 55 minutes from now)
    const now = Math.floor(Date.now() / 1000);
    const expiryTimestamp = now + (13 * 3600) + (55 * 60) + 46;
    // Progress calculation
    const raised = 326873.93;
    const target = 469965;
    const progressPercentage = (raised / target) * 100;
    const paymentMethods = [
        { id: "ETH" as const, icon: <EthTokenIcon />, label: "ETH" },
        { id: "USDT" as const, icon: <UsdtTokenIcon />, label: "USDT" },
        { id: "USDC" as const, icon: <UsdcTokenIcon />, label: "USDC" },
    ];
    const getPaymentIcon = () => {
        switch (selectedPayment) {
            case "ETH":
                return <EthTokenIcon />;
            case "USDT":
                return <UsdtTokenIcon />;
            case "USDC":
                return <UsdcTokenIcon />;
            default:
                return <EthTokenIcon />;
        }
    };
    return (
        <div className="buy_card">
            <div className="buy_card_header">
                <h2>Buy Now</h2>
            </div>
            <div className="buy_card_countdown_section">
                <p className="buy_card_countdown_label">Next Price Change</p>
                <Countdown
                    className="buy_card_countdown"
                    startTimestamp={now}
                    expiryTimestamp={expiryTimestamp}
                />
            </div>
            <CommonButton
                className="buy_card_price_btn"
                title="ROCK Next Big Price Change"
            />
            <div className="buy_card_progress">
                <div className="buy_card_progress_value">
                    <p>USD RAISED</p>
                    <p className="yellowclr">${raised.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / ${target.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <ProgressBar now={progressPercentage} className="buy_card_progress_bar" />
            </div>
            <div className="buy_card_info_boxes">
                <div className="buy_card_info_box">
                    <p className="buy_card_info_label">1 ROCK</p>
                    <p className="buy_card_info_value">$0.049079</p>
                </div>
                <div className="buy_card_info_box">
                    <p className="buy_card_info_label">Available Balance:</p>
                    <p className="buy_card_info_value">0 ETH</p>
                </div>
            </div>
            <div className="buy_card_payment_methods">
                {paymentMethods.map((method) => (
                    <button
                        key={method.id}
                        className={`buy_card_payment_btn ${selectedPayment === method.id ? 'active' : ''}`}
                        onClick={() => setSelectedPayment(method.id)}
                    >
                        {method.icon}
                        <span>{method.label}</span>
                    </button>
                ))}
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    ethAmount: Yup.string(),
                    ROCKAmount: Yup.string(),
                })}
                onSubmit={(values) => {
                    // Handle form submission if needed
                    console.log(values);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                }) => (
                    <Form>
                        <div className="buy_card_inputs">
                            <div className="buy_card_input_group">
                                <FormControl
                                    label={`${selectedPayment} you pay`}
                                    name="ethAmount"
                                    type="number"
                                    placeholder="0.0"
                                    value={values.ethAmount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    rightIcon={getPaymentIcon()}
                                    error={touched.ethAmount && errors.ethAmount ? errors.ethAmount : ""}
                                />
                            </div>
                            <div className="buy_card_input_group">
                                <FormControl
                                    label="ROCK you receive"
                                    name="ROCKAmount"
                                    type="number"
                                    placeholder="0.0"
                                    value={values.ROCKAmount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.ROCKAmount && errors.ROCKAmount ? errors.ROCKAmount : ""}
                                />
                            </div>
                        </div>
                        <CommonButton
                            type="submit"
                            className="buy_card_proceed_btn"
                            title="Proceed to pay"
                            fluid
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};
export default BuyCard;
