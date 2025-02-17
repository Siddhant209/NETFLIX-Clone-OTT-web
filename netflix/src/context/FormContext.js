import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";

// ✅ Create Context
const FormContext = createContext();

// ✅ Create a Provider Component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({}); 
  return (
    <FormContext.Provider value={{formData, setFormData}}>{children}</FormContext.Provider>
  );
};

// ✅ Custom Hook for easy access
export const useFormContext = () => {
  return useContext(FormContext);
};
