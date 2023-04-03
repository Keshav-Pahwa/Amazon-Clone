import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
};

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
    
		// So here we get the product details from the Product module and we add the action payload to to the state items array
		addToBasket: (state, action) => {
			state.items = [...state.items, action.payload];
		},
		removeFromBasket: (state, action) => {
			const index = state.items.findIndex(basketItem => basketItem.id === action.payload.id)

			let newBasket = [ ...state.items ]
	  
			if (index >= 0) {
				// If the item exists in the basket remove it
			  newBasket.splice(index, 1)
			} 
			// If the item does not exit throw a warning
			else console.warn(`Can't remove the product (id: ${ action.payload.id }) as its not in the basket.`)
	  
			state.items = newBasket
		},
	},
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0)

export default basketSlice.reducer;
