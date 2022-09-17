import { useAccount } from "@components/hooks/web3/useAccount";
import { Breadcrumb } from "@components/ui/common";
import { EthereumRate, Wallet } from "@components/ui/web3";

const Header = () => {
  const {
    account: { isAdmin },
  } = useAccount();
  return (
    <>
      <div className="pt-4">
        <Wallet />
      </div>
      <EthereumRate />
      <div className="flex flex-row-reverse p-4 sm:px-6 lg:px-8">
        <Breadcrumb isAdmin={isAdmin} />
      </div>
    </>
  );
};

export default Header;
