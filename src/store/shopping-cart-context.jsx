import { 
    createContext ,
     useReducer
    
    } from 'react';

 import { DUMMY_PRODUCTS} from '../dummy-products.js'

export  const CartContext = createContext({
    items:[],

})
// get latest state snapshot automatically --> state 
function shoppingCartReducer(state , action) {
 if(action.type=== 'ADD_ITEM'){
    const updatedItems = [...state.items];
    
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
        ...state , 
      items: updatedItems,
    };
  };
 
 if(action.type=== 'UPDATE_ITEM'){
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
        ...state,
      items: updatedItems,
    };
  };
 }
    


export default function CartContextProvider({children}){

    const [ shoppingCart , shoppingCartDispatch] = useReducer(shoppingCartReducer , {
        items: [],
    })

    
      function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type:'ADD_ITEM',
            payload :id
        })

    }
    
    
    
      function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type:'UPDATE_ITEM',
            payload:{
                productId,
                amount
            }
        })

    }


    
      const ctxValue = {
        items:shoppingCart.items,
        addItemToCart: handleAddItemToCart,
        udatedItemQuantity: handleUpdateCartItemQuantity
      }
    //The default value is set when creating the context is only used if a component that was not wrapped by the Provider component tries to access the context value
      return  <CartContext.Provider value={ ctxValue}>
       {children}
      </CartContext.Provider>
}


////*********-----------------using useState---------------***** */

// export default function CartContextProvider({children}){

//     const [shoppingCart, setShoppingCart] = useState({
//         items: [],
//       });
    
//       function handleAddItemToCart(id) {
//         setShoppingCart((prevShoppingCart) => {
//           const updatedItems = [...prevShoppingCart.items];
    
//           const existingCartItemIndex = updatedItems.findIndex(
//             (cartItem) => cartItem.id === id
//           );
//           const existingCartItem = updatedItems[existingCartItemIndex];
    
//           if (existingCartItem) {
//             const updatedItem = {
//               ...existingCartItem,
//               quantity: existingCartItem.quantity + 1,
//             };
//             updatedItems[existingCartItemIndex] = updatedItem;
//           } else {
//             const product = DUMMY_PRODUCTS.find((product) => product.id === id);
//             updatedItems.push({
//               id: id,
//               name: product.title,
//               price: product.price,
//               quantity: 1,
//             });
//           }
    
//           return {
//             items: updatedItems,
//           };
//         });
//       }
    
    
    
//       function handleUpdateCartItemQuantity(productId, amount) {
//         setShoppingCart((prevShoppingCart) => {
//           const updatedItems = [...prevShoppingCart.items];
//           const updatedItemIndex = updatedItems.findIndex(
//             (item) => item.id === productId
//           );
    
//           const updatedItem = {
//             ...updatedItems[updatedItemIndex],
//           };
    
//           updatedItem.quantity += amount;
    
//           if (updatedItem.quantity <= 0) {
//             updatedItems.splice(updatedItemIndex, 1);
//           } else {
//             updatedItems[updatedItemIndex] = updatedItem;
//           }
    
//           return {
//             items: updatedItems,
//           };
//         });
//       }
    
//       const ctxValue = {
//         items:shoppingCart.items,
//         addItemToCart: handleAddItemToCart,
//         udatedItemQuantity: handleUpdateCartItemQuantity
//       }
//     //The default value is set when creating the context is only used if a component that was not wrapped by the Provider component tries to access the context value
//       return  <CartContext.Provider value={ ctxValue}>
//        {children}
//       </CartContext.Provider>
// }