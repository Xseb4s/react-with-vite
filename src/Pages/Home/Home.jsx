import { useState, useEffect } from "react";
import Layout from "../../components/layout/layout.components";
import Card from "../../components/card/card.components";
import { apiUrl } from '../../api/getProducts';

const Home = () => {
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
    return(
        <Layout>
            <h1>Home</h1>
            {items?.map(item => (
            <Card
              key={item.id}
              data={item}
            />
          ))
        }
        </Layout>
    )
}
export default Home;