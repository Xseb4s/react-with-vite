import { createContext, useEffect, useState } from "react";
import {apiUrl} from "../api/getProducts"

export const ShoppingCartContext = createContext();

export const initializeStorage = () => {
  const accountStorage = localStorage.getItem("account");
  const signOutStorage = localStorage.getItem("sign-out");
  let parsedAccount
  let parsedSignOut

  if(!accountStorage){ 
    localStorage.setItem("account", JSON.stringify({}))
    parsedAccount = {}
  } else {
    parsedAccount = JSON.parse(accountStorage);
  }

  if (!signOutStorage) {
    localStorage.setItem("sign-out", JSON.stringify(false))
    parsedSignOut = false
  } else {
    parsedSignOut = JSON.parse(signOutStorage);
  }

}

// eslint-disable-next-line react/prop-types
export const ShoppingCartProvider = ({children}) => {

    /* account */
    const [account, setAccount] = useState({})
    /* sign out */
    const [signOut, setSignOut] = useState(false)
    /* shopping cart - increment quantity */
    const [count, setCount] = useState(0);
    /* shopping cart - add to cart */
    const [cartProducts, setCartProducts] = useState([]);
    /* shopping cart - order */
    const [order, setOrder] = useState([]);

    /* product detail - open/close */
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const openDetail = () => setIsDetailOpen(true);
    const closeDetail = () => setIsDetailOpen(false);

    /* checkout side menu - open/close */
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

    /* product detail - show product */
    const [productShow, setProductShow] = useState({});

    
    
    /* get products */
    const [items, setItems] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiUrl}/products`)
          const data = await response.json()
          setItems(data)
        } catch (error) {
          console.error(`Error en la fetchData: ${error}`);
        }
      }
      fetchData()
    }, [])
    
    /* search by title */
    const [searchByTitle, setSearchByTitle] = useState(null);

    /* search by category */
    const [searchByCategory, setSearchByCategory] = useState(null);
    
    /* filter products */
    const [filteredItems, setFilteredItems] = useState([]);

    const filteredItemsByTitle = (items, searchByTitle) => {
      return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    const filteredItemsByCategory = (items, searchByCategory) => {
      return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory));
    }
    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
      if (searchType === "BY_TITLE") {
        return filteredItemsByTitle(items, searchByTitle)
      }
      if (searchType === "BY_CATEGORY") {
        return filteredItemsByCategory(items, searchByCategory)
      }
      if (searchType === "BY_TITLE_AND_CATEGORY") {
        return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
      }
      if(!searchType){
        return items;
      }
    }

    useEffect(() => {
      if (searchByTitle && searchByCategory) setFilteredItems(filterBy("BY_TITLE_AND_CATEGORY", items, searchByTitle, searchByCategory));
      if (searchByTitle && !searchByCategory) setFilteredItems(filterBy("BY_TITLE", items, searchByTitle, searchByCategory));
      if (searchByCategory && !searchByTitle) setFilteredItems(filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory)); 
      if (!searchByCategory && !searchByTitle) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, searchByTitle, searchByCategory]);
    
    return(
        <>
            <ShoppingCartContext.Provider value={{
                items,
                count, 
                setCount,
                isDetailOpen,
                openDetail,
                closeDetail,
                productShow,
                setProductShow,
                cartProducts,
                setCartProducts,
                isCheckoutSideMenuOpen,
                setIsCheckoutSideMenuOpen,
                openCheckoutSideMenu,
                closeCheckoutSideMenu,
                order, 
                setOrder,
                searchByTitle,
                setSearchByTitle,
                filteredItems,
                searchByCategory,
                setSearchByCategory,
                account,
                setAccount,
                signOut,
                setSignOut
            }}>
                {children}
            </ShoppingCartContext.Provider>
        </>
    )
}