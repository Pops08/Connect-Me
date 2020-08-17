import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_OFFERINGS } from "../utils/queries";
import spinner from '../assets/spinner.gif'
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../components/Cart';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_OFFERINGS,
} from '../utils/actions';
import { idbPromise } from '../utils/helpers';


function Detail() {


  const state = useSelector((state) => {
    return state
  });
  const dispatch = useDispatch();



  const { id } = useParams();

  const [currentOffering, setCurrentOffering] = useState({});

  const { loading, data } = useQuery(QUERY_OFFERINGS);

  const { offerings, cart } = state;

  useEffect(() => {
    // already in global store
    if (offerings.length) {
      setCurrentOffering(offerings.find(offering => offering._id === id));
    } 
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_OFFERINGS,
        offerings: data.offerings
      });
  
      data.offerings.forEach((product) => {
        idbPromise('offerings', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('offerings', 'get').then((indexedOfferings) => {
        dispatch({
          type: UPDATE_OFFERINGS,
          offerings: indexedOfferings
        });
      });
    }
  }, [offerings, data, loading, dispatch, id]);



  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)
  
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentOffering, purchaseQuantity: 1 }
      });
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'put', { ...currentOffering, purchaseQuantity: 1 });
    }
  }


  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentOffering._id
    });
  
    // upon removal from cart, delete the item from IndexedDB using the `currentOffering._id` to locate what to remove
    idbPromise('cart', 'delete', { ...currentOffering });
  };

  return(
    <>
     {currentOffering ? (
      <div className="card mx-auto my-5 bg-light border-info rounded" style={{width: 18+ "em"}}>
            <img src="..." className="card-img-top" alt={currentOffering.image}/>
            <hr />
              <div className="card-body">
                  <h5 className="card-title">{currentOffering.name}</h5><hr/>
                   <p className="card-text">{currentOffering.description}</p>
              </div>

        <ul className="list-group list-group-flush bg-light">
          <li className="list-group-item bg-light"><strong>Price:${currentOffering.price}</strong></li>
          <li className="list-group-item bg-light"><strong>Quantity: {currentOffering.quantity}</strong></li>
        </ul>

        <div className="card-body">
        <p>
             <strong>Price:</strong>
             ${currentOffering.price}
             {" "}<br/>
             <button onClick={addToCart} className="btn-primary">
               Add to cart
             </button>

             <button  className="btn-primary"
            disabled={!cart.find(p => p._id === currentOffering._id)} 
            onClick={removeFromCart}
             >
            Remove from Cart
          </button>
           </p>
      </div>

       <div className="card-body">
         <Link to = "/">Home</Link>
       </div>

     </div>
     ) : null }
     {
       loading ? <img src={spinner} alt="loading" /> : null
     }
     <Cart />
    </>
  )
};

export default Detail;
