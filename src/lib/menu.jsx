import { createContext, useContext, useState } from "react";

// Shared "is the mobile menu open" signal, owned by Navbar. It lives in context
// rather than Navbar state so other sections can react to the menu opening.
const MenuContext = createContext(null);

export function MenuProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
