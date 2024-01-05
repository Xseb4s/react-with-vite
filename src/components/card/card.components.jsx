/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { ShoppingCartContext } from '../../context';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid'

const Card = ({data}) => {
    const { count, setCount, openDetail, closeDetail, setProductShow, cartProducts, setCartProducts, openCheckoutSideMenu } = useContext(ShoppingCartContext);
    const showProduct = (productDetail) =>{
        openDetail();
        setProductShow(productDetail)
    }
    const addProducts = (e, productData) => {
        e.stopPropagation();
        setCount(count + 1);
        setCartProducts([...cartProducts, productData]);
        openCheckoutSideMenu();
        closeDetail();
    }
    const renderIcon = (id) => {
        const isInCart = cartProducts.filter(product => product.id === id ).length > 0;
        if(!isInCart){
            return(
                <div onClick={(e) => addProducts(e, data)}
                    className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 border-0 transform hover:scale-125 transition ease-in-out delay-150'>
                    <PlusIcon />
                </div>
            )
        }else{
            return(
                <div className='absolute top-0 right-0 flex justify-center items-center bg-blue-600 w-6 h-6 rounded-full m-2 border-0 transform hover:scale-125 transition ease-in-out delay-150'>
                    <CheckIcon className='text-white'/>
                </div>
            )
        }
        
    }
    return (
        <>
            <div className='bg-white cursor-pointer w-56 h-60 p-[1%] rounded-lg'>
                <figure className='relative mb-2 w-full h-4/5' onClick={() => showProduct(data)}>
                    <span className='absolute bottom-0 left-0 bg-black/80 rounded-lg text-white text-xs m2 px-3 py-0.5'>{data.category.name}</span>
                    <img src={data.images[0]} alt={data.title} className='w-full h-full rounded-lg object-cover px-[2%]'/>
                    {renderIcon(data.id)}
                </figure>
                <p className='flex justify-between p-2'>
                    <span className='text-sm font-light'>{data.title}</span>
                    <span className='text-lg font-medium'>${data.price}</span>
                </p>
            </div>
        </>
    );
};

export default Card;