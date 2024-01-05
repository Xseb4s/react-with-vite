/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "./ProductDetail.css";

const ProductDeatil = () => {
    const {isDetailOpen, closeDetail, productShow} = useContext(ShoppingCartContext);
    return (
        <>
            <aside className={`${isDetailOpen ? 'flex' : 'hidden'} product-detail flex flex-col fixed bg-black right-0 border border-black rounded-lg`}>
                <div className="flex justify-between items-center p-6">
                    <h2 className="font-medium text-xl text-white">Detail</h2>
                    <XMarkIcon className="text-white w-10 cursor-pointer transform hover:scale-125 transition ease-in-out delay-150" onClick={()=> closeDetail()}/>
                </div>
                <figure className="p-6">
                    <img className="w-full h-full rounded-lg" src={productShow.images} alt={productShow.title} />
                </figure>
                <p className="text-white px-6  flex flex-col">
                    <span className="font-bold text-xl mb-1">${productShow.price}</span> 
                    <span className="font-medium text-lg">{productShow.title}</span> 
                    <span className="font-light w-full text-justify text-sm">{productShow.description}.</span>
                </p>
            </aside>
        </>
    )
}
export default ProductDeatil;