import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Login": "Login",
      "Username": "Username",
      "Password": "Password",
      "Email": "Email",
      "Enter username": "Enter username",
      "Enter password": "Enter password",
      "Enter email": "Enter email"
    }
  },
  es: {
    translation: {
      "Login": "Iniciar sesión",
      "Username": "Nombre de usuario",
      "Password": "Contraseña",
      "Email": "Correo electrónico",
      "Enter username": "Ingrese nombre de usuario",
      "Enter password": "Ingrese contraseña",
      "Enter email": "Ingrese correo electrónico"
    }
  },

};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;