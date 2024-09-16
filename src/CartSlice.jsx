import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Ensure items is always an array
  },
  reducers: {
    // Add item to cart or update quantity if it exists
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++; // If item exists, increase its quantity
      } else {
        state.items.push({ name, image, cost, quantity: 1 }); // Add new item with quantity 1
      }
      console.log("Current state:", state.items); // Log the current state for debugging
    },

    // Remove item from the cart
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
      console.log("Item removed:", action.payload); // Log the removed item
    },

    // Update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate && quantity > 0) {
        // Ensure that the quantity is a positive number
        itemToUpdate.quantity = quantity;
        console.log("Updated quantity for:", name, "New quantity:", quantity); // Log the updated item
      } else if (itemToUpdate && quantity === 0) {
        // Optionally, remove the item if the quantity is set to 0
        state.items = state.items.filter(item => item.name !== name);
        console.log("Removed item with quantity 0:", name);
      }
    }
  }
});

// Export actions for use in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer to be added to the Redux store
export default CartSlice.reducer;
