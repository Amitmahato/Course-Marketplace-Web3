import { useEthPrice } from "@components/hooks/useEthPrice";
import { Button, Modal } from "@components/ui/common";
import { course } from "interfaces/course";
import React, { useEffect, useState } from "react";

export interface IOrderState {
  price: number;
  email: string;
  confirmEmail: string;
}

interface IModal {
  open: boolean;
  course: course;
  onClose: () => void;
  onSubmit: (order: IOrderState) => void;
}

const DefaultOrder: IOrderState = {
  price: 0.0,
  email: "",
  confirmEmail: "",
};

interface FormState {
  disabled: boolean;
  message: string[];
}

const createFromState: (
  order: IOrderState,
  hasAgreedTOS: boolean
) => FormState = ({ price, email, confirmEmail }, hasAgreedTOS) => {
  const formState: FormState = { disabled: false, message: [] };

  if (!price || price <= 0) {
    formState.message.push("Price is not valid");
  }

  if (email.length === 0 || confirmEmail.length === 0) {
    formState.message.push("Email cannot be empty");
  }

  if (email !== confirmEmail) {
    formState.message.push("Email & Confirmation Email should match");
  }

  if (!hasAgreedTOS) {
    formState.message.push(
      "You need to agree with terms of service in order to submit the form"
    );
  }

  formState.disabled = formState.message.length > 0;
  return formState;
};

const OrderModal: React.FC<IModal> = ({ open, onClose, onSubmit, course }) => {
  const [_open, setOpen] = useState(open);
  const { courseEthRate } = useEthPrice();
  const [adjustPrice, setAdjustPrice] = useState(false);
  const [hasAgreedTOS, setHasAgreedTOS] = useState(false);

  const [order, setOrder] = useState<IOrderState>({
    price: courseEthRate,
    email: "",
    confirmEmail: "",
  });

  useEffect(() => {
    setOrder({
      ...order,
      price: courseEthRate,
    });
  }, [courseEthRate]);

  const _onClose = () => {
    setOpen(false);
    setOrder(DefaultOrder);
    onClose();
  };

  const _onSubmit = () => {
    onSubmit(order);
    setOpen(false);
  };

  const formState = createFromState(order, hasAgreedTOS);

  return (
    <Modal open={open}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="mb-7 text-lg font-bold leading-6 text-gray-900"
                id="modal-title"
              >
                {course?.title}
              </h3>
              <div className="mt-1 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Price(eth)</label>
                  <div className="text-xs text-gray-700 flex">
                    <label className="flex items-center mr-2">
                      <input
                        checked={adjustPrice}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setAdjustPrice(checked);
                          setOrder({
                            ...order,
                            ...(!checked ? { price: courseEthRate } : {}),
                          });
                        }}
                        type="checkbox"
                        className="form-checkbox"
                      />
                    </label>
                    <span>
                      Adjust Price - only when the price is not correct
                    </span>
                  </div>
                </div>
                <input
                  value={order.price}
                  disabled={!adjustPrice}
                  onChange={(e) => {
                    const value = e.target.value;
                    const price = Number(value);
                    if (!isNaN(price)) {
                      setOrder({
                        ...order,
                        price: price,
                      });
                    }
                  }}
                  type="text"
                  name="price"
                  id="price"
                  className="disabled:opacity-50 w-80 mb-1 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-700">
                  Price will be verified at the time of the order. If the price
                  will be lower, order can be declined (+- 2% slipage is
                  allowed)
                </p>
              </div>
              <div className="mt-2 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Email</label>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={order.email}
                  onChange={(e) => {
                    const email = e.target.value.trim();
                    setOrder({
                      ...order,
                      email,
                    });
                  }}
                  className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="x@y.com"
                />
                <p className="text-xs text-gray-700 mt-1">
                  It&apos;s important to fill a correct email, otherwise the
                  order cannot be verified. We are not storing your email
                  anywhere
                </p>
              </div>
              <div className="my-2 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Confirmation Email</label>
                </div>
                <input
                  type="email"
                  name="confirmationEmail"
                  id="confirmationEmail"
                  value={order.confirmEmail}
                  onChange={(e) => {
                    const confirmEmail = e.target.value.trim();
                    setOrder({
                      ...order,
                      confirmEmail,
                    });
                  }}
                  className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="x@y.com"
                />
              </div>
              <div className="text-xs text-gray-700 flex">
                <label className="flex items-center mr-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={hasAgreedTOS}
                    onChange={({ target: { checked } }) => {
                      setHasAgreedTOS(checked);
                    }}
                  />
                </label>
                <span>
                  I accept Eincode &apos;terms of service&apos; and I agree that
                  my order can be rejected in the case data provided above are
                  not correct
                </span>
              </div>
              {formState.message.length > 0 && (
                <div className="p-4 my-3 text-red-700 bg-red-200 rounded-lg text-sm">
                  <ul>
                    {formState.message.map((message, index) => (
                      <li key={index}>
                        {index + 1}. {message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <Button
            title="Submit"
            disabled={formState.disabled}
            onClick={_onSubmit}
          />
          <Button title="Cancel" variant="red" onClick={_onClose} />
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;
