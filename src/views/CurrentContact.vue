<script setup>
import { useContactStore } from "../store/store";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import DropDown from "@/components/DropDown.vue";
import Button from "@/components/Button.vue";
import Notificator from "@/components/Notificator.vue";
import InputForm from "@/components/InputForm.vue";
const notificatorText = ref("");
const router = useRouter();
const contactStore = useContactStore();
const route = useRoute();
const contact = computed(() => {
  return contactStore.contacts.find((contact) => contact.id == route.params.id);
});

const updatedContact = ref("");
updatedContact.value = { ...contact.value };
const contactName = ref(updatedContact.value.name);
const loading = ref(false);
const links = [
  {
    name: "Не выбрано",
    value: null,
  },
  {
    name: "Коллеги",
    value: "colleagues",
  },
  {
    name: "Родственники",
    value: "relatives",
  },
];
const errors = ref({
  name: "",
  mail: "",
  phone: "",
  category: "",
});
const labels = ref(["Имя", "Телефон", "E-mail"]);
const placeholders = ref([
  "Например «Андрей»",
  "+7(___)-___-__-__",
  "Например «pochta@domain.ru»",
]);
const dataKey = ref(["name", "phone", "mail"]);

const getErrors = (error) => {
  errors.value = error;
};

const updateContactData = (newContactData) => {
  updatedContact.value = newContactData;
};

const saveChanges = async () => {
  const hasErrors = Object.values(errors.value).some((error) => error !== "");
  if (hasErrors) return;
  const allFieldsFilled = Object.values(updatedContact.value).every(
    (value) => !!value,
  );
  if (!allFieldsFilled) {
    for (const key of Object.keys(updatedContact.value)) {
      if (!updatedContact.value[key]) {
        errors.value[key] = "Поле не может быть пустым";
      }
    }
    return;
  }
  loading.value = true;
  notificatorText.value = "Контакт успешно изменён";

  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await contactStore.updateContact(updatedContact.value);
    router.push("/");
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

async function deleteContact() {
  const contactId = updatedContact.value.id;
  loading.value = true;
  notificatorText.value = "Контакт удалён";
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await router.push("/");
    await contactStore.deleteContact(contactId);
    location.reload();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
const selectItem = (item) => {
  updatedContact.value.category = item.value;
};

function clearError(fieldName) {
  errors.value[fieldName] = "";
}
</script>

<template>
  <Header>
    <div class="name">
      <span>{{ contactName.charAt(0).toUpperCase() }}</span>
      {{ contactName }}
    </div>
  </Header>
  <div class="wrapper">
    <div class="container">
      <div class="form">
        <div class="title">
          <h1>Контакт</h1>
        </div>
        <div class="inputs" v-for="(item, index) in labels" :key="index">
          <InputForm
            :label="item"
            :contactData="updatedContact"
            :placeholder="placeholders[index]"
            :dataKey="dataKey[index]"
            :errors="errors"
            @updateContactData="updateContactData"
            @getErrors="getErrors"
          />
        </div>
        <div class="category">
          <label for="DropDown">Категория</label>
          <DropDown
            @click="clearError('category')"
            :links="links"
            :error="errors.category"
            :currentCategory="updatedContact.category"
            v-model="updatedContact.category"
            @selectItem="selectItem"
          />
          <div class="error" v-if="errors.category">{{ errors.category }}</div>
          <div class="error_icon" v-if="errors.category">
            <img src="@/assets/images/error.svg" alt="" />
          </div>
        </div>
        <div class="date">
          <label for="date">Создан</label>
          <p>{{ contact.date }}</p>
        </div>
        <div class="action_btns">
          <Button @click="saveChanges" :loading="loading" />
          <button id="delete_btn" @click="deleteContact">
            <img src="@/assets/images/delete.svg" alt="" />
            <p>Удалить контакт</p>
          </button>
        </div>
      </div>
    </div>
  </div>

  <Notificator v-if="loading">
    {{ notificatorText }}
  </Notificator>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  margin: 0 auto;
  .container {
    width: 704px;
    height: 511px;
    margin: 0 auto;
    margin-top: 24px;
    background: var(--white);
    box-shadow: 0px 0px 6px 0px var(--dark-blue);
    .form {
      width: 576px;
      height: 100%;
      padding: 48px 64px 64px 64px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      input {
        display: flex;
        width: 408px;
        height: 40px;
        padding: 8px;
        align-items: center;
        flex-shrink: 0;
        border-radius: 4px;
        border: 1px solid var(--light-gray);
        background: var(--white);
        transition: 0.3s;
        color: var(--light-gray);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%; /* 22.4px */
        cursor: pointer;
        &:hover,
        &:focus {
          border: 1px solid var(--blue);
          outline: none;
        }
      }
      .input_error {
        border-radius: 4px;
        border: 1px solid var(--red);
        background: var(--white);
        color: var(--red);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%; /* 22.4px */
      }
      label {
        color: var(--light-gray);
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%; /* 16.8px */
      }
      .title {
        margin-bottom: 8px;
        h1 {
          color: var(--light-gray);
          font-size: 32px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
      }
      .inputs,
      .category,
      .date {
        width: 576px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
      }
      .date {
        p {
          width: 408px;
          display: flex;
          justify-content: flex-start;
        }
      }
    }
    .error {
      position: absolute;
      right: 0;
      bottom: -16px;
      border: 0;
      color: var(--red);
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px; /* 160% */
    }
    .error_icon {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
    }

    .action_btns {
      margin-left: 168px;
      display: flex;
      gap: 24px;
      align-items: center;
      margin-top: 32px;
      #delete_btn {
        display: flex;
        align-items: center;
        background: transparent;
        border: 0;
        gap: 2px;
        color: var(--blue);
        text-align: right;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        cursor: pointer;
      }
    }
  }
}
.name {
  width: 296px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  span {
    width: 24px;
    height: 24px;
    background: var(--yellow);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--light-gray);
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}

@media (max-width: 993px) {
  .wrapper {
    width: 100dvw;
    margin: 0;
  }
}
@media (max-width: 577px) {
  .wrapper {
    padding: 24px 12px;
    width: 100dvw;

    .container {
      width: 552px;
      .form {
        .inputs,
        .category,
        .date {
          width: 456px;
        }
        .date {
          p {
            width: 272px;
          }
        }
      }
    }
  }
}
@media (max-width: 377px) {
  .wrapper {
    padding: 24px 12px;
    width: 100dvw;

    .container {
      width: 352px;
      .form {
        padding: 32px 20px 48px 20px;
        width: 352px;

        .inputs,
        .category,
        .date {
          width: 312px;
        }
        .date {
          p {
            width: 228px;
          }
        }
      }
      .action_btns {
        margin-left: 30px;
      }
    }
  }
}
</style>
