import { useEffect, useState } from "react";
import useSWR from "swr";

let count = 0;

const fetcher = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false"
  );
  const data = await res.json();
  let usdRate = data.market_data.current_price.usd;
  const r = Number(usdRate) + ++count;

  return r ?? 0;
};

const useEthPrice = () => {
  const swrResponse = useSWR("eth-price", fetcher, {
    refreshInterval: 1000,
  });

  console.log("Hook useEthPrice Called, rate = ", swrResponse.data);

  return {
    rate: swrResponse,
  };
};

const useCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
  }, []);

  console.log("Calling useCounter!");

  return count;
};

const SimpleComponent = () => {
  // const count = useCounter()
  const {
    rate: { data: count },
  } = useEthPrice();
  console.log("SimpleComponent Called, rate =  ", count);

  return <h1>Simple Component - {count}</h1>;
};

export default function HooksPage() {
  //   const count = useCounter();
  const {
    rate: { data: count },
  } = useEthPrice();

  console.log("HooksPage Called, rate =  ", count);
  return (
    <>
      <h1>Hello World - {count}</h1>
      <SimpleComponent />
    </>
  );
}
