import { useContext } from "react";
import Layout from "../../components/layout/layout.components";
import OrdersCard from "../../components/ordersCard/OrdersCard.components";
import { ShoppingCartContext } from "../../context";
import { Link } from "react-router-dom";

const MyOrders = () => {
    const {order} = useContext(ShoppingCartContext)
    
    return(
        <Layout>
            <div className="flex justify-center items-center relative w-80">
                <h1>My Orders</h1>
            </div>
            {order.map((order, i) =>(    
                <Link key={i} to={`/my-orders/${i}`}>
                    <OrdersCard                
                    totalPrice={order.totalPrice}
                    totalProducts={order.totalProducts}
                    />
                </Link>
            ))}
        </Layout>
    )
}
export default MyOrders;