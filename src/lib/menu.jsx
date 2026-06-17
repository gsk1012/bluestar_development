import { createContext, useContext, useState } from "react";

// Shared "is the mobile menu open" signal. Navbar owns it; Hero reads it to
// pause the blended/masked star video while the menu is open — that video
// recomposites every frame on the GPU and starves the menu animation on
// phones. Pausing it lets the compositor cache a static frame so the menu
// opens smoothly. The rotating star resumes the moment the menu closes.
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
