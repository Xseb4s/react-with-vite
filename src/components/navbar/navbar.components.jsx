import { NavLink } from "react-router-dom"

const Navbar = () => {
    const menu = [
        {title:'Shopi', href:'/'},
        {title:'Clothes', href:'/a'},
        {title:'Electronics', href:'/b'},
        {title:'Fernitures', href:'/c'},
        {title:'Toys', href:'/d'},
        {title:'Others', href:'/e'},
    ];
    const menuProfile = [
        {title:'My Orders', href:'/my-orders'},
        {title:'My Account', href:'/my-account'},
        {title:'Sign In', href:'/sign-in'},
    ];
    const activeStyle = 'underline underline-offset-4';

    return(
        <nav className="flex justify-between fixed top-0 z-99 w-full p-4">
            <ul className=" flex flex-row gap-4">
                {menu.map((item, i) => (
                    <li key={i} className={`text-white ${item.title.toLocaleLowerCase() === 'shopi' ? 'font-bold':''}`}>
                        <NavLink to={item.href} className={({isActive}) =>isActive ? activeStyle : undefined}>
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <ul className=" flex flex-row gap-4">
                <li className="text-white/60">
                    srodriguez@gmail.com
                </li>
                {menuProfile.map((item, i) => (
                    <li key={i} className="text-white" >
                        <NavLink to={item.href} className={({isActive}) =>isActive ? activeStyle : undefined}>
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Navbar;