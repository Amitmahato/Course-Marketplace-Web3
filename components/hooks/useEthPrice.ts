import { IUseEthPrice } from "interfaces/hooks/useEthPrice";
import useSWR from "swr";

enum EXTERNAL_SOURCES {
  COIN_GEKO = "coingecko",
  ETHER_SCAN = "etherscan",
}

const EXTERNAL_API_URLS = {
  [EXTERNAL_SOURCES.COIN_GEKO]:
    "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false",
  [EXTERNAL_SOURCES.ETHER_SCAN]: `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_TOKEN}`,
};

const fetcher = async (source) => {
  const res = await fetch(EXTERNAL_API_URLS[source]);
  const data = await res.json();

  let usdRate = 0;
  if (source === EXTERNAL_SOURCES.COIN_GEKO) {
    usdRate = data.market_data.current_price.usd;
  } else if (source === EXTERNAL_SOURCES.ETHER_SCAN) {
    usdRate = data.result.ethusd;
  }

  return Number(usdRate) ?? 0;
};

export const COURSE_PRICE = 15;

export const useEthPrice = (): IUseEthPrice => {
  const swrResponse = useSWR(
    "eth-price",
    () => fetcher(EXTERNAL_SOURCES.ETHER_SCAN),
    {
      refreshInterval: 10000,
    }
  );

  const perItem = Number(
    (COURSE_PRICE / Number(swrResponse.data) ?? 0).toFixed(6)
  );
  return {
    rate: swrResponse,
    courseEthRate: !isNaN(perItem) ? perItem : 0,
  };
};
