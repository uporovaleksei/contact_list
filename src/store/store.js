import { defineStore } from "pinia";

export const useContactStore = defineStore({
  id: "contact",
  state: () => ({
    contacts: JSON.parse(localStorage.getItem("contacts")) || [
      {
        id: 1,
        name: "Айтишник Данила",
        phone: "+7(987)654-78-09",
        mail: "nelfeelingood@gmail.com",
        category: "colleagues",
        date: "22.09.23",
      },
      {
        id: 2,
        name: "Арендодатель Виктория",
        phone: "+7(987)654-78-10",
        mail: "nelfeelingood1@gmail.com",
        category: "colleagues",
        date: "22.09.23",
      },
      {
        id: 3,
        name: "Двери Вадим",
        phone: "+7(987)654-78-11",
        mail: "nelfeelingood2@gmail.com",
        category: "colleagues",
        date: "23.09.23",
      },
      {
        id: 4,
        name: "Доставка Андрей Стоянов",
        phone: "+7(987)654-78-12",
        mail: "nelfeelingood3@gmail.com",
        category: "colleagues",
        date: "24.09.23",
      },
    ],
  }),
  actions: {
    addContact(contact) {
      this.contacts.push(contact);
      this.saveContactsToLocalStorage();
    },
    deleteContact(contactId) {
      this.contacts = this.contacts.filter(
        (contact) => contact.id !== contactId,
      );
      this.saveContactsToLocalStorage();
    },
    getContactById(id) {
      return this.contacts.find((contact) => contact.id === id);
    },
    updateContact(updatedContact) {
      const index = this.contacts.findIndex((c) => c.id === updatedContact.id);
      if (index !== -1) {
        this.contacts[index] = updatedContact;
        this.saveContactsToLocalStorage();
      }
    },
    saveContactsToLocalStorage() {
      localStorage.setItem("contacts", JSON.stringify(this.contacts));
    },
  },
  getters: {
    getContacts() {
      return this.contacts;
    },
  },
});
