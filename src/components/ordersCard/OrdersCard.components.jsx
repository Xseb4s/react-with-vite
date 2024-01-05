import { CalendarIcon, ChevronRightIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

/* eslint-disable react/prop-types */
const OrdersCard = (props) => {
  const { totalPrice, totalProducts } = props;
  const date = new Date();
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return (
    <div className="flex justify-between items-center bg-white my-2 border-white border-2 rounded-lg p-1 " style={{ color: '#2f4f4f' }}>
      <div className="flex gap-6 justify-center items-center">
        <p className="flex flex-col gap-1 font-semibold text-sm">
          <span className="flex"><CalendarIcon className="w-5 mr-1"/> {formattedDate}</span>
          <span className="flex"><ShoppingBagIcon className="w-5 mr-1"/>{totalProducts} Products</span>
        </p>
        <span className="text-2xl font-bold">${totalPrice}</span>
        <ChevronRightIcon className="w-6 font-bold"/>
      </div>
    </div>
  );
};

export default OrdersCard;
