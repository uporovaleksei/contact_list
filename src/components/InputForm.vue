<script setup>
import { defineProps, defineEmits, onMounted } from "vue";
import { ref, computed } from "vue";
import validateData from "../plugins/validateData";

const emit = defineEmits(["updateContactData", "getErrors"]);
const props = defineProps([
  "label",
  "placeholder",
  "dataKey",
  "contactData",
  "errors",
]);
const isPhoneInput = computed(() => props.dataKey === "phone");
const localContactData = ref(props.contactData);
onMounted(() => {
  if (!localContactData.value.id || !localContactData.value.date) {
    localContactData.value.id = validateData.calculateId();
    localContactData.value.date = validateData.calculateDate();
  }
});

function validateInputField(fieldName) {
  if (fieldName === "name") {
    validateData.validateName(localContactData.value, props.errors);
  } else if (fieldName === "mail") {
    validateData.validateEmail(localContactData.value, props.errors);
  } else if (fieldName === "phone") {
    validateData.validatePhone(localContactData.value, props.errors);
  }

  emit("updateContactData", localContactData.value);
  emit("getErrors", props.errors);
}
</script>

<template>
  <label for="input">{{ props.label }}</label>
  <input
    :class="{ input_error: props.errors[props.dataKey] }"
    v-if="!isPhoneInput"
    type="text"
    :placeholder="props.placeholder"
    v-model="localContactData[props.dataKey]"
    @input="validateInputField(props.dataKey)"
  />
  <input
    :class="{ input_error: props.errors[props.dataKey] }"
    v-if="isPhoneInput"
    type="text"
    :placeholder="props.placeholder"
    v-model="localContactData[props.dataKey]"
    @input="validateInputField(props.dataKey)"
    v-mask="'+7(###)###-##-##'"
  />
  <div class="error_icon" v-if="props.errors[props.dataKey]">
    <img src="@/assets/images/error.svg" alt="" />
  </div>
  <span class="error" v-if="props.errors[props.dataKey]">{{
    props.errors[props.dataKey]
  }}</span>
</template>

<style lang="scss" scoped>
input {
  display: flex;
  width: 408px;
  height: 40px;
  padding: 8px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid var(--opacity-gray);
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
label {
  color: var(--light-gray);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 16.8px */
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
  &:hover,
  &:focus {
    border: 1px solid var(--red);
    outline: none;
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

@media (max-width: 577px) {
  input {
    width: 272px;
  }
}
@media (max-width: 377px) {
  input {
    width: 228px;
  }
}
</style>
