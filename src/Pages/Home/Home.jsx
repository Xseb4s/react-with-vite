import { useContext } from "react";
import Layout from "../../components/layout/layout.components";
import Card from "../../components/card/card.components";
import ProductDetail from "../../components/productDetail/ProductDetail.components";
import { ShoppingCartContext } from "../../context";

const Home = () => {
    const {items, setSearchByTitle, filteredItems } = useContext(ShoppingCartContext);
    const renderView = () => {
      const itemsToRender = filteredItems?.length > 0 ? filteredItems : items;
  
      if (itemsToRender?.length > 0) {
        return itemsToRender.map(item => (
          <Card key={item.id} data={item} />
        ));
      } else {
        return <p className="text-white text-center col-span-5 m-28 text-2xl font-bold">No Results Found</p>;
      }
    };
    return(
        <Layout>
            <h1 className="text-2xl">All Products</h1>
            <input 
              type="text" 
              placeholder="Search a product..." 
              className="p-1 rounded-lg border border-black focus:outline-none m-2 w-80" 
              onChange={(e) => setSearchByTitle(e.target.value)}/>
              <div className="grid gap-4 justify-center  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full max-w-screen-xl mt-10">
                {renderView()}
              </div>
            <ProductDetail />
        </Layout>
    )
}
export default Home;