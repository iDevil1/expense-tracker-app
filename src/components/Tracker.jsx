import React, { useRef, useState } from "react";
import Chart from "react-apexcharts";
const options = {
  labels: ["Expenses", "Income"],
  charts: {
    width: "50px",
  },
  states: {
    hover: {
      fitler: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: true,
        },
      },
    },
  },
  fill: {
    colors: ["#008ffb", "#00e360"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
    style: {
      fontSize: "12px",
      fonFamily: undefined,
      backgroundColor: "black",
    },
  },
};
function Tracker() {
  const [incomeList, setIncomeList] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expensesList, setExpensesList] = useState([]);
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const dialogRef = useRef();

  function showModal() {
    dialogRef.current.showModal();
  }

  function hideModal() {
    dialogRef.current.close();
  }

  function addTransaction() {
    if (
      value1 !== "" &&
      value2 !== "" &&
      value2 % 1 == 0 &&
      transactionType !== ""
    ) {
      if (transactionType === "income") {
        setIncomeList((i) => [
          ...i,
          {
            description: value1,
            amount: value2,
          },
        ]);
        setTotalIncome((i) => i + Number(value2));
      } else if (transactionType === "expense") {
        setExpensesList((e) => [
          ...e,
          {
            description: value1,
            amount: value2,
          },
        ]);
        setTotalExpense((i) => i + Number(value2));
      }

      cancelTransaction();
    }
  }

  function cancelTransaction() {
    dialogRef.current.close();
    setValue1("");
    setValue2("");
  }
  return (
    <div className="parent">
      <div>
        <div>Balance is $ {totalIncome - totalExpense}</div>
        <br />
        <div>Total Income</div>
        <h3>$ {totalIncome}</h3>
        <br />
        <div>Total Expenses</div>
        <h3>$ {totalExpense}</h3>
        <br />
        <div>Income</div>
        <div>
          {incomeList.length > 0 &&
            incomeList.map((item, index) => {
              return (
                <div key={index}>
                  <span>{item.description} </span>
                  <span>$ {item.amount}</span>
                </div>
              );
            })}
        </div>
        <br />
        <div>Expense</div>
        <div>
          {expensesList.length > 0 &&
            expensesList.map((item, index) => {
              return (
                <div key={index}>
                  <span>{item.description} </span>
                  <span>$ {item.amount}</span>
                </div>
              );
            })}
        </div>

        <br />

        <button onClick={() => showModal()}>Add a new transaction</button>
        <dialog ref={dialogRef}>
          <div className="header">
            <h3>Add a new transaction</h3>
            <button className="close-modal-button" onClick={() => hideModal()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
              </svg>
            </button>
          </div>
          <div>Enter description</div>
          <input
            type="text"
            placeholder="Enter transaction description"
            value={value1}
            onInput={(e) => setValue1(e.target.value)}
          />
          <div>Enter amount</div>
          <input
            type="text"
            placeholder="Enter transaction amount"
            value={value2}
            onInput={(e) => setValue2(e.target.value)}
          />
          <div className="transaction-choice-container">
            <div>
              <input
                type="radio"
                name="radio"
                id="income"
                onChange={(e) => {
                  setTransactionType(e.target.id);
                }}
              />
              <label htmlFor="income">Income</label>
            </div>
            <div>
              <input
                type="radio"
                name="radio"
                id="expense"
                onChange={(e) => {
                  setTransactionType(e.target.id);
                }}
              />
              <label htmlFor="expense">Expense</label>
            </div>
          </div>
          <div className="add-cancel-container">
            <button onClick={() => cancelTransaction()}>Cancel</button>
            <button onClick={() => addTransaction()}>Add</button>
          </div>
        </dialog>
      </div>
      <Chart
        options={options}
        series={[totalExpense, totalIncome]}
        width="300px"
        type="pie"
        className="chart"
      />
    </div>
  );
}

export default Tracker;
