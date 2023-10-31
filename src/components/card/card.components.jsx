const Card = () => {
    return (
        <>
            <div className='bg-white cursor-pointer w-56 h-60 p-[1%] rounded-lg'>
                <figure className='relative mb-2 w-full h-4/5'>
                    <span className='absolute bottom-0 left-0 bg-black/80 rounded-lg text-white text-xs m2 px-3 py-0.5'>Electronics</span>
                    <img src='https://www.wom.co/media/catalog/product/cache/3256a9de7286b3bbe6e52f27a1fe5818/i/p/iphone_15_pro_max_black.jpg' alt='Iphone' className='w-full h-full rounded-lg object-cover px-[2%]'/>
                    <div className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 border border-solid border-black border-1'>+</div>
                </figure>
                <p className='flex justify-between'>
                    <span className='text-sm font-light'>Iphone</span>
                    <span className='text-lg font-medium'>$1000</span>
                </p>
            </div>
        </>
    );
};

export default Card;