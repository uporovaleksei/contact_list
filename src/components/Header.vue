<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<template>
  <header>
    <div class="main" v-if="route.path === '/'">
      <div class="logo">
        <img src="@/assets/images/logo.svg" alt="" />
        <h1>Книга контактов</h1>
      </div>
    </div>
    <div class="pages" v-else>
      <div class="content">
        <slot></slot>
      </div>
    </div>
    <img
      class="close"
      src="@/assets/images/close.svg"
      @click="goBack"
      v-if="route.path !== '/'"
      alt=""
    />
  </header>
</template>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 48px;
  background: var(--gray);
  padding: 0 48px;
  display: flex;
  align-items: center;
  .pages {
    width: 100%;
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      width: 100%;
      color: var(--opacity-gray);
      text-align: center;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 16px;
    h1 {
      color: var(--dark-white);
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      text-transform: uppercase;
    }
  }
  .close {
    cursor: pointer;
    transition: 0.3 s;
    &:hover {
      scale: 0.96;
    }
  }
}
@media (max-width: 993px) {
  header {
    padding: 0 32px;
    width: 100dvw;
  }
}
@media (max-width: 577px) {
  header {
    padding: 0 12px;
  }
}
</style>
