import {
    UPDATE_OFFERINGS,
    UPDATE_SUBJECTS,
    UPDATE_CURRENT_SUBJECT,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
  } from './actions';


const defaultState = {
    offerings: [],
    cart: [],
    cartOpen: false,
    subjects: [],
    currentCategory: '',
}



const reducer = (state=defaultState, action) => {
    switch (action.type) {
        //if action type value is the value of 'UPDATE_OFFERINGS', return a new state object with an updated offerings array 
        case UPDATE_OFFERINGS:
            return {
                ...state,
                offerings: [...action.offerings]
            };

            //if action type value is value of 'UPDATE_SUBJECTS', return a new state object with an updated subjects array
        case UPDATE_SUBJECTS:
            return {
                ...state,
                subjects: [...action.subjects]
            };
        
        case UPDATE_CURRENT_SUBJECT: 
            return {
                ...state,
                currentCategory: action.currentCategory
            };

        case ADD_TO_CART: 
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product]
            };

        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.offerings]
            };

        case REMOVE_FROM_CART:
            let newState = state.cart.filter(product => {
                return product._id !== action._id;
            });
            
            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };

        case UPDATE_CART_QUANTITY: 
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(product => {
                    if(action._id === product._id) {
                        product.purchaseQuantity = action.purchaseQuantity;
                    }

                    return product;
                })
            };

        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };


        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            }

        

            //if it's none of these actions, do not update the state at all and keep things the same
        default:
            return state;
    }
}


export default reducer;


