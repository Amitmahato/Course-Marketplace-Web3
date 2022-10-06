import { toast } from "react-toastify";

export const withToast = (promise: Promise<any>) => {
  toast.promise(promise, {
    pending: {
      render() {
        return "Your transaction is being processed";
      },
      isLoading: true,
    },
    success: {
      render({ data }) {
        return process.env.NODE_ENV !== "production"
          ? "Transaction has been successfully processed"
          : `Tx: ${data.transactionHash.slice(0, 20)}...
        Has been successfully processed.
        See Tx Details at: https://goerli.etherscan.io/tx/${
          data.transactionHash
        }}`;
      },
      // other options
      icon: "🟢",
    },
    error: {
      render({ data }) {
        // When the promise reject, data will contains the error
        return data.message ?? "Transaction has failed";
      },
    },
  });
};
