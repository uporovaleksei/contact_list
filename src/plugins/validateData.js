import { useContactStore } from "../store/store";

export default {
  validateName(contactData, errors) {
    if (contactData.name.trim().length < 3) {
      errors.name = "Слишком короткое имя";
    } else {
      errors.name = "";
    }
  },

  validateEmail(contactData, errors) {
    const mailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!mailRegex.test(contactData.mail)) {
      errors.mail = "Некорректный e-mail";
    } else {
      errors.mail = "";
    }
  },

  validatePhone(contactData, errors) {
    const phoneRegex = /^(\+7\(\d{3}\)\d{3}-\d{2}-\d{2})$/;
    if (!phoneRegex.test(contactData.phone)) {
      errors.phone = "Некорректный номер";
    } else {
      errors.phone = "";
    }
  },

  validateCategory(contactData, errors) {
    if (contactData.category !== null) {
      errors.category = "";
    } else {
      errors.category = "Поле не может быть пустым";
    }
  },

  calculateDate() {
    const today = new Date();
    const date =
      today.getDate() +
      "." +
      (today.getMonth() + 1) +
      "." +
      today.getFullYear().toString().substr(-2);
    return date;
  },

  calculateId() {
    const contactStore = useContactStore(); // Получите store здесь
    return contactStore.getContacts.length + 1;
  },
};
