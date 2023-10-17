<script setup>
import { defineProps } from "vue";

const props = defineProps(["loading"]);
</script>

<template>
  <button>
    <img v-if="!props.loading" src="@/assets/images/save.svg" alt="Save" />
    <img
      v-else
      class="loader-icon"
      src="@/assets/images/loader.svg"
      alt="Loader"
    />
    Сохранить
  </button>
</template>

<style lang="scss" scoped>
button {
  display: flex;
  justify-content: center;
  color: var(--light-gray);
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 16.8px */
  width: 136px;
  height: 40px;
  padding: 12px 16px;
  align-items: flex-start;
  gap: 4px;
  border-radius: 4px;
  background: var(--yellow);
  outline: none;
  border: 0;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background: var(--yellow-hover);
  }
  &:active {
    background: var(--yellow-active);
  }
}

.loader-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
