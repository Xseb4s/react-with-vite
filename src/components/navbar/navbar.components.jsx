import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { NavLink } from "react-router-dom";
import menu from "../../utils/menuData.json";
import menuProfile from "../../utils/menuProfileData.json"
import { ShoppingCartIcon } from '@heroicons/react/24/outline';


const Navbar = () => {
    const {count, setSearchByCategory, setSignOut} = useContext(ShoppingCartContext);
    const handleNavLinkClick = (item) => {
        if (item.href !== "/") {
            setSearchByCategory(item.href);
        } else {
            setSearchByCategory(null);
        }
    };
    const handleSignOut = () =>{
        const stringifiedSignOut = JSON.stringify(true)
        localStorage.setItem("sign-out", stringifiedSignOut)
        setSignOut(true)
    }
    const activeStyle = 'underline underline-offset-4';

    return(
        <nav className="flex justify-between fixed top-0 z-99 w-full p-4">
            <ul className=" flex flex-row gap-4">
                {menu.map((item, i) => (
                    <li key={i} className={`text-white ${item.title.toLocaleLowerCase() === 'shopi' ? 'font-bold':''}`}>
                        <NavLink 
                            onClick={() => handleNavLinkClick(item)}
                            to={item.href}
                            className={({isActive}) =>isActive ? activeStyle : undefined}>
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <ul className=" flex flex-row gap-4">
                <li className="text-white/60">
                    srodriguez44482@gmail.com
                </li>
                {menuProfile.map((item, i) => (
                    <li key={i} className="text-white" >
                        {!item.required ? (
                            <NavLink to={item.href} className={({isActive}) =>isActive ? activeStyle : undefined}>
                                {item.title}
                            </NavLink>
                        ) : (
                            <NavLink 
                            to={item.href} 
                            className={({isActive}) =>isActive ? activeStyle : undefined}
                            onClick={() => handleSignOut()}
                            >
                                {item.title}
                            </NavLink>
                        )
                        }                        
                    </li>
                ))}
                <li>
                    <ShoppingCartIcon className="w-6 h-6 text-gray-300"/> <strong className="flex justify-center items-center bg-white absolute top-2 right-2 border-0 rounded-full w-4 h-4">{count}</strong>    
                </li>
            </ul>
        </nav>
    )
}
export default Navbar;