import { Breadcrumb } from "@components/ui/common";
import { EthereumRate, Wallet } from "@components/ui/web3";

const Header = () => {
  return (
    <>
      <Wallet />
      <EthereumRate />
      <div className="flex flex-row-reverse pt-4 px-4 sm:px-6 lg:px-8">
        <Breadcrumb />
      </div>
    </>
  );
};

export default Header;
