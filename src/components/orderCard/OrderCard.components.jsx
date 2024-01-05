/* eslint-disable react/prop-types */
import { XMarkIcon } from "@heroicons/react/24/outline";

const OrderCard = props => {
    const {id, title, imageUrl, price, handleDelete } = props;
    
    return (
        <div className="flex justify-between items-center text-white mb-2">
             <div className="flex items-center gap-2">
                <figure className="w-20 h-20">
                    <img className="w-full h-full rounded-lg object-cover" src={imageUrl} alt={title} />
                </figure>
                <p className="text-sm font-light">{title}</p>
             </div>
            <div className="flex items-center gap-2">
                <p className="text-lg font-medium">{price}</p>
            {handleDelete &&
                <XMarkIcon 
                    onClick={()=>handleDelete(id)}
                    className="text-white w-10 cursor-pointer transform hover:scale-125 transition ease-in-out delay-150"                    
                /> 
            }                
            </div>
             
        </div>
    )
}
export default OrderCard