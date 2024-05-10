"use client";
// import logo from "./logo.svg";
import axios from "axios";
// import * as crypto from "crypto-js";
import HmacSHA256 from "crypto-js/hmac-sha256";
import { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const makeSignature = (amount: string) => {
    const order_number = Date.now().toString();
    const stringCompile =
      "amount" +
      amount +
      "cartkindercurrencyUSDlanguageenorder_number" +
      order_number +
      "require_completefalse" +
      "store_id" +
      "29307" +
      "version1.3";
    const inFunctionSignature = HmacSHA256(
      stringCompile,
      "ItQ4hlM208WTktInBRqJ7ps13"
    );
    const completeURL = `store_id=29307&order_number=${order_number}&language=en&amount=${amount}&cart=kinder&signature=${inFunctionSignature}&require_complete=false&version=1.4`;
    return completeURL;
  };

  const makeRequest = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const sign = makeSignature(amount);
    console.log(sign);
    try {
      const response = await axios.post("/api/corvus-pay", {
        data: sign,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="">
      <div className="">
        <form onSubmit={makeRequest}>
          <input
            placeholder="Amount"
            type="text"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}

export default App;
