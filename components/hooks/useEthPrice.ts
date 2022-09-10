import { IUseEthPrice } from "interfaces/hooks/useEthPrice";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  const usdRate = data.market_data.current_price.usd;
  return usdRate ?? 0;
};

export const useEthPrice = (): IUseEthPrice => {
  const ethRateUrl =
    "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false";

  const swrResponse = useSWR("eth-price", () => fetcher(ethRateUrl), {
    refreshInterval: 10000,
  });

  return {
    rate: swrResponse,
  };
};
