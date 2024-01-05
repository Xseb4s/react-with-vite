import { useContext } from "react";
import Layout from "../../components/layout/layout.components";
import OrderCard from "../../components/orderCard/OrderCard.components";
import { ShoppingCartContext } from "../../context";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
const MyOrder = () => {
    const {order} = useContext(ShoppingCartContext);
    const currentPath = window.location.pathname;
    let index = currentPath.substring(currentPath.lastIndexOf("/")+1);
    if(index === "last") index = order?.length - 1
    return(
        <Layout>
            <div className="flex justify-center items-center relative w-80 mb-6">
                <Link to="/my-orders" className="absolute left-0">
                    <ChevronLeftIcon className="text-white w-10 cursor-pointer transform hover:scale-125 transition ease-in-out delay-150"/>
                </Link>
                <h1>My Order</h1>
            </div>
            <div className="p-2 flex-1">
                {order?.[index]?.products.map(product => (
                    <OrderCard 
                    key={product.id}
                    id={product.id} 
                    title={product.title} 
                    imageUrl={product.images} 
                    price={product.price}
                    />
                ))}
            </div>
        </Layout>
    )
}
export default MyOrder;