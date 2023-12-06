import { createContext,ReactNode, useContext,useState ,useEffect} from "react";
import { dataitems } from "../../../inventoryItems";

export const ShopContext=createContext(null)

const getDefaultCart = (inventory) => {
  let cart = {};
  inventory.forEach((item) => {
    const itemId = item._id;
    if (itemId !== undefined ) {
      cart[itemId] = 0;
    }
  });
  return cart;
};


export const ShopContextProvider=(props)=>{

  const [inventory, setInventory] = useState([]);
useEffect(() => {
  // Fetch inventory data when the component mounts
  fetchInventory();
}, []);

const fetchInventory = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_API_HOST_URL}/allinventoryitems`, {
      method: 'GET',
    });
    const data = await response.json();
    if (data.success) {
      setInventory(data.data);
      // console.log(inventory.length)
    } else {
      console.error('Failed to fetch inventory:', data.message);
    }
  } catch (error) {
    console.error('Error fetching inventory:', error.message);
  }
};
  const [cartItems,setCartItems]=useState(getDefaultCart(inventory))

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: parseInt(prev[itemId], 10) + 1 || 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(parseInt(prev[itemId], 10) - 1, 0),
    }));
  };
  const deleteFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: 0,
    }));
  };

  const findTotal=()=>{
    let total = 0;
    for (const itemId in cartItems) {
      if (cartItems.hasOwnProperty(itemId)) {
        total += cartItems[itemId];
      }
    }
    return total;
  }

  const findUnique=()=>{
    const itemIds = Object.keys(cartItems);
    // Count the number of unique items
    const total = itemIds.filter(itemId => cartItems[itemId] > 0).length;
    return total;
  }

  const addMultiple=(itemId,quantity)=>{
    setCartItems((prev) => ({
      ...prev,
      [itemId]: parseInt(prev[itemId], 10) + quantity || quantity,
    }));
  }

   const contextValue={cartItems,setCartItems,addToCart,removeFromCart,deleteFromCart,findTotal,findUnique,addMultiple}
  // console.log(JSON.stringify(cartItems))
  // console.log(findUnique())

  return(
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

