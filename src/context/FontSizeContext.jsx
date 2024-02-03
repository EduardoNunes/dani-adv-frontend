import React, { createContext, useContext, useState } from 'react';

const FontSizeContext = createContext();

export function useFontSize() {
  return useContext(FontSizeContext);
}

export function FontSizeProvider({ children }) {
  const [fontSizeModify, setFontSizeModify] = useState(0);

  const incrementFontSize = () => {
    if (fontSizeModify < 6) {
      setFontSizeModify(fontSizeModify + 2)
    }
  };

  const decrementFontSize = () => {
    if (fontSizeModify >= 2) {
      setFontSizeModify(fontSizeModify - 2)
    }
  };

  return (
    <FontSizeContext.Provider value={{ fontSizeModify, incrementFontSize, decrementFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}