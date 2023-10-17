<script setup>
import Header from "@/components/Header.vue";
import DropDown from "@/components/DropDown.vue";
import Button from "@/components/Button.vue";
import InputForm from "@/components/InputForm.vue";
import Notificator from "@/components/Notificator.vue";

import { ref } from "vue";
import { useContactStore } from "../store/store";
import { useRouter } from "vue-router";

const router = useRouter();
const contactStore = useContactStore();
const loading = ref(false);

const contactData = ref({
  id: "",
  name: "",
  mail: "",
  phone: "",
  category: null,
  date: null,
});

const errors = ref({
  name: "",
  mail: "",
  phone: "",
  category: "",
});

const links = [
  { name: "Не выбрано", value: null },
  { name: "Коллеги", value: "colleagues" },
  { name: "Родственники", value: "relatives" },
];

const selectItem = (item) => {
  contactData.value.category = item.value;
  if (item.value != null) {
    errors.value.category = "";
  } else {
    errors.value.category = "Поле не долно быть пустым";
  }
};
const saveChanges = async () => {
  const hasErrors = Object.values(errors.value).some((error) => error !== "");
  if (hasErrors) return;
  const allFieldsFilled = Object.values(contactData.value).every(
    (value) => !!value,
  );
  if (!allFieldsFilled) {
    for (const key of Object.keys(contactData.value)) {
      if (!contactData.value[key]) {
        errors.value[key] = "Поле не может быть пустым";
      }
    }
    return;
  }
  loading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await contactStore.addContact(contactData.value);
    router.push("/");
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const updateContactData = (newContactData) => {
  contactData.value = newContactData;
};

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
</script>

<template>
  <Header>
    <img src="@/assets/images/new_contact.svg" alt="" />
    Добавить контакт
  </Header>
  <div class="wrapper">
    <div class="container">
      <div class="form">
        <div class="title">
          <h1>Новый контакт</h1>
        </div>
        <div class="inputs" v-for="(item, index) in labels" :key="index">
          <InputForm
            :label="item"
            :contactData="contactData"
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
            :links="links"
            :error="errors.category"
            v-model="contactData.category"
            @selectItem="selectItem"
          />
          <div class="error" v-if="errors.category">{{ errors.category }}</div>
          <div class="error_icon" v-if="errors.category">
            <img src="@/assets/images/error.svg" alt="" />
          </div>
        </div>
        <div class="save_btn">
          <Button @click="saveChanges" :loading="loading" />
        </div>
      </div>
    </div>
  </div>

  <Notificator v-if="loading"> Контакт успешно создан </Notificator>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  margin: 0 auto;
  .container {
    width: 704px;
    height: 455px;
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

      .inputs,
      .category {
        width: 576px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
      }
      label {
        color: var(--light-gray);
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%; /* 16.8px */
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

    .save_btn {
      margin-left: 168px;
      margin-top: 32px;
    }
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
        .category {
          width: 456px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
      }
      .save_btn {
        margin-left: 180px;
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
        .category {
          width: 312px;
        }
      }
      .save_btn {
        margin-left: 84px;
      }
    }
  }
}
</style>
