<template>
  <div class="notificator">
    <img src="@/assets/images/ok.svg" alt="" />
    <slot></slot>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.notificator {
  position: absolute;
  width: 216px;
  height: 56px;
  border-radius: 4px;
  background: var(--white);
  box-shadow: 0px 0px 16px 0px var(--gray-blue);
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  color: var(--light-gray);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  left: 32px;
  bottom: 48px;
}
@media (max-width: 577px) {
  .notificator {
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 40px;
    background: var(--light-gray);
    box-shadow: 0px 0px 20px 0px var(--gray-blue);
    height: 44px;
    color: var(--white);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
  }
}
</style>
