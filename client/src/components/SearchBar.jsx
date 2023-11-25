import React,{useState} from 'react'
import {FaSearch} from 'react-icons/fa'

const SearchBar = ({setResult}) => {
    const [input,setInput]=useState('')
    const [filteredItems, setFilteredItems] = useState([]);

    const inventoryItems = [
        {
          itemName: "Chair",
          itemId: "INV-001",
          itemQuantity: 50,
          user: null,
          admin: "ADMIN-001",
        },
        {
          itemName: "Table",
          itemId: "INV-002",
          itemQuantity: 25,
          user: null,
          admin: "ADMIN-002",
        },
        {
          itemName: "Rope",
          itemId: "INV-003",
          itemQuantity: 100,
          user: null,
          admin: "ADMIN-003",
        },
        {
          itemName: "Pen",
          itemId: "INV-004",
          itemQuantity: 200,
          user: null,
          admin: "ADMIN-004",
        },
        {
          itemName: "Pencil",
          itemId: "INV-005",
          itemQuantity: 300,
          user: null,
          admin: "ADMIN-005",
        },
        {
          itemName: "Laptop",
          itemId: "INV-006",
          itemQuantity: 10,
          user: "USER-001",
          admin: null,
        },
        {
          itemName: "Monitor",
          itemId: "INV-007",
          itemQuantity: 5,
          user: "USER-002",
          admin: null,
        },
        {
          itemName: "Keyboard",
          itemId: "INV-008",
          itemQuantity: 15,
          user: "USER-003",
          admin: null,
        },
        {
          itemName: "Mouse",
          itemId: "INV-009",
          itemQuantity: 20,
          user: "USER-004",
          admin: null,
        },
        {
          itemName: "Headphones",
          itemId: "INV-010",
          itemQuantity: 30,
          user: "USER-005",
          admin: null,
        },
      ];
    // const handleChange=(value)=>{
    //    setInput(value)
       
    //    const filtered = inventoryItems.filter((item) =>
    //    item.itemName.toLowerCase().includes(value.toLowerCase())
       
    //  );
 
    //  setFilteredItems(filtered);
    // //  console.log(filteredItems)
    //  setResult(filtered)
    // }

    const handleChange = (value) => {
      setInput(value);
  
      if (value.trim() !== '') {
        const filtered = inventoryItems.filter((item) =>
          item.itemName.toLowerCase().includes(value.toLowerCase())
        );
  
        setFilteredItems(filtered);
        setResult(filtered);
      } else {
        // If the input is null or empty, reset the filteredItems and result
        setFilteredItems([]);
        setResult([]);
      }
    };
    
  return (
    <>
    <div className='bg-white flex items-center h-10 w-full max-w-md rounded-[12px] p-2'>
    <FaSearch style={{ color: '#FFC436' }} />
    <input 
    className='pl-2 outline-none border-none' 
    placeholder='Type to Search...'
    value={input}
    onChange={(e)=>handleChange(e.target.value)}
    />
    </div>
    </>
  )
}

export default SearchBar