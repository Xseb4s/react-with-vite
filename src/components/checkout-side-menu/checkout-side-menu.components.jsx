/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { XMarkIcon } from "@heroicons/react/24/outline";
import OrderCard from "../orderCard/OrderCard.components";
import { totalPrice } from "../../utils";
import "./checkout.css";
import { Link } from "react-router-dom";

const CheckoutSideMenu = () => {
    const {
        isCheckoutSideMenuOpen, 
        closeCheckoutSideMenu, 
        cartProducts, 
        setCartProducts, 
        order, 
        setOrder, 
        setCount,
        setSearchByTitle
    } = useContext(ShoppingCartContext);
    const handleDelete = (id) => {
        const filteredProducts = cartProducts.filter(product => product.id != id)
        setCartProducts(filteredProducts)
    }
    const handleCheckout = () => {
        const orderToAdd = {
          date: '01.02.2023',
          products: cartProducts,
          totalProducts: cartProducts.length,
          totalPrice: totalPrice(cartProducts),
        };
    
        setOrder([...order, orderToAdd]);
        setCartProducts([]);
        setCount(0);
        setSearchByTitle(null)
      }
    return (
        <>
            <aside className={`${isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex flex-col fixed bg-black right-0 border border-black rounded-lg h-[85%]`}>
                <div className="flex justify-between items-center p-6">
                    <h2 className="font-medium text-xl text-white">My order</h2>
                    <XMarkIcon 
                    className="text-white w-10 cursor-pointer transform hover:scale-125 transition ease-in-out delay-150" 
                    onClick={()=> closeCheckoutSideMenu()}
                    />
                </div>
                <div className="p-2 overflow-y-scroll flex-1">
                    {cartProducts.map(product => (
                        <OrderCard 
                        key={product.id}
                        id={product.id} 
                        title={product.title} 
                        imageUrl={product.images} 
                        price={product.price}
                        handleDelete={handleDelete}
                        />
                    ))}
                </div>
                <div className="p-6 text-white">
                    <p className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-xl">${totalPrice(cartProducts)}</span>
                    </p>
                    <Link to="/my-orders/last">
                        <button className="bg-white text-black p-2 font-semibold w-full rounded-lg" onClick={()=>handleCheckout()}>Checkout</button>
                    </Link>
                </div>
            </aside>
        </>
    )
}
export default CheckoutSideMenu; 