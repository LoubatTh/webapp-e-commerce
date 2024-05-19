import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toggleCart: () => set({ isOpen: !get().isOpen }),
      setCart: (cart) => {
        set({ items: cart });
      },
      clearCart: () => set({ items: [] }),
      addItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);
        if (existingItem) {
          set({
            items: get().items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i
            ),
          });
        } else {
          set({
            items: [...get().items, { ...item, quantity: item.quantity || 1 }],
          });
        }
      },
      incrementQuantity: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },
      decrementQuantity: (id) => {
        set((state) => {
          return {
            items: state.items.reduce((newItems, item) => {
              if (item.id === id) {
                const newQuantity = item.quantity - 1;
                // Only add the item back if the new quantity is greater than 0
                if (newQuantity > 0) {
                  newItems.push({ ...item, quantity: newQuantity });
                }
              } else {
                // Keep all other items as they are
                newItems.push(item);
              }
              return newItems;
            }, []),
          };
        });
      },
    }),
    {
      name: "shopping-cart",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
