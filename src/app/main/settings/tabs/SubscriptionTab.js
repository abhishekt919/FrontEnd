import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Chip, Typography } from "@mui/material";
import moment from "moment";
import RecordStatus from "app/theme-layouts/shared-components/RecordStatus";
import { selectCompany } from "app/store/companySlice";
import {
  getCurrentBill,
  getBillingHistory,
  selectBillingHistory,
} from "app/store/shared/billingSlice";
import { DATETIME_FORMAT_MM_DD_YYYY } from "app/configs/constants";
import { LoadingView, NoRecordsView } from "app/shared-components/index";

function SubscriptionTab() {
  const dispatch = useDispatch();
  const company = useSelector(selectCompany);
  const billingHistory = useSelector(selectBillingHistory);
  const [isLoading, setLoading] = useState(false);
  const [billingData, setBillingData] = useState(null);

  useEffect(() => {
    let inputJson = {
      companyId: company._id,
    };
    setLoading(true);
    dispatch(getCurrentBill(inputJson)).then((result) => {
      setBillingData(result.payload.data);
      dispatch(getBillingHistory(inputJson)).then((result1) => {
        setLoading(false);
      });
    });
  }, [dispatch]);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  if (isLoading) {
    return <LoadingView />;
  }

  /**
   * Show this if the requested Module Access is not available
   */
  if (!billingData) {
    return <NoRecordsView />;
  }

  return (
    <>
      <motion.div
        className="grid grid-cols-1 w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Typography className="text-20 md:text-20 font-bold tracking-tight">
          Current Bill From{" "}
          {moment(billingData?.timePeriod?.startDate)
            .startOf("month")
            .format(DATETIME_FORMAT_MM_DD_YYYY)}{" "}
          To{" "}
          {moment(billingData?.timePeriod?.endDate)
            .endOf("month")
            .format(DATETIME_FORMAT_MM_DD_YYYY)}
        </Typography>
        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">Module Name</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Assets</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Charges</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">
                    Total ({billingData?.currency})
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {billingData?.activeModules.map((module, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      <span className="truncate">{module.name}</span>
                    </td>
                    <td>
                      <span className="truncate">{module.count}</span>
                    </td>
                    <td>
                      <span className="truncate">
                        ${module.charges} (Per {module.unit})
                      </span>
                      {Number(module.discountPercentage) >= 1 && (
                        <span className="truncate">
                          {" "}
                          {"=>"} $
                          {Number(module.charges * module.count).toFixed(2)}
                        </span>
                      )}
                    </td>
                    <td>
                      <span className="truncate">${module.moduleTotal}</span>
                      {Number(module.discountPercentage) >= 1 && (
                        <Chip
                          label={
                            module.discountPercentage + " % Discount Applied "
                          }
                          size="small"
                          className="ml-10"
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td></td>
                <td></td>
                <td>
                  <Typography className="font-semibold">
                    Subtotal
                    {billingData.creditsAmount !== 0 && (
                      <span className="truncate">
                        {" "}
                        {"=>"} ${Number(billingData.amount)}
                      </span>
                    )}
                  </Typography>
                </td>
                <td>
                  <span className="font-semibold">
                    ${billingData?.finalAmount}
                  </span>
                  {billingData.creditsAmount !== 0 && (
                    <Chip
                      label={billingData.creditsAmount + " Credits Applied"}
                      size="small"
                      className="ml-10"
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <Typography className="font-semibold">
                    Tax (
                    <span className="uppercase">{billingData?.country}:</span>{" "}
                    {billingData?.taxPercentage} %)
                  </Typography>
                </td>
                <td>
                  <Typography className="font-semibold">
                    ${billingData?.taxAmount}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <Typography className="font-semibold">
                    Processing Fee ({billingData?.processingFeePercentage} %)
                  </Typography>
                </td>
                <td>
                  <Typography className="font-semibold">
                    ${billingData?.processingFeeAmount}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <Typography className="font-semibold text-lg text-blue-600">
                    BILLING TOTAL
                  </Typography>
                </td>
                <td>
                  <Typography className="font-semibold text-lg text-blue-600">
                    {billingData?.currency} ${billingData?.invoiceAmount}
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
      {billingHistory && billingHistory.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 w-full my-32"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <Typography className="text-20 md:text-20 font-bold tracking-tight">
            Billing History
          </Typography>

          <div className="table-responsive">
            <table className="simple">
              <thead>
                <tr>
                  <th>
                    <Typography className="font-semibold">
                      Service Period
                    </Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">
                      Payment Method
                    </Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">
                      Payment Type
                    </Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Subtotal</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Total</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Status</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Action</Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {billingHistory?.map((bill, idx) => {
                  return (
                    <tr key={idx}>
                      <td>
                        <span className="truncate">
                          {moment(bill?.timePeriod?.startDate)
                            .startOf("month")
                            .format(DATETIME_FORMAT_MM_DD_YYYY)}{" "}
                          To{" "}
                          {moment(bill?.timePeriod?.endDate)
                            .endOf("month")
                            .format(DATETIME_FORMAT_MM_DD_YYYY)}
                        </span>
                      </td>
                      <td></td>
                      <td></td>
                      <td>
                        <span className="truncate">${bill.finalAmount}</span>
                        <span className="truncate">
                          {" "}
                          (+${bill.taxAmount} Tax)
                        </span>
                        <span className="truncate">
                          {" "}
                          (+${bill.processingFeeAmount} Processing)
                        </span>
                      </td>
                      <td>
                        <span className="truncate">
                          {bill.currency} ${bill.invoiceAmount}
                        </span>
                      </td>
                      <td>
                        <RecordStatus
                          name={bill.status === 0 ? "UNPAID" : "PAID"}
                        />
                      </td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : null}
    </>
  );
}

export default SubscriptionTab;
