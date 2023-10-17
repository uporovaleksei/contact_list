<script setup>
import { ref, defineEmits, defineProps } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const props = defineProps(["links", "error", "currentCategory"]);
const isOpen = ref(false);
const selectedItem = ref(props.links[0]);
if (props.currentCategory != null) {
  selectedItem.value =
    props.links.find((item) => item.value === props.currentCategory) || null;
}
const emit = defineEmits(["selectItem"]);
const selectItem = (item) => {
  isOpen.value = false;
  selectedItem.value = item;
  if (selectedItem.value != null) {
    props.error == "";
  }
  emit("selectItem", selectedItem.value);
};
</script>
<template>
  <div class="dropdown" :class="{ long: route.path != '/' }">
    <div
      class="selected-item"
      @click="isOpen = !isOpen"
      :class="{ active: isOpen }"
    >
      <div
        class="item"
        :class="{ error: props.error, active: selectedItem.value != null }"
      >
        {{ selectedItem.name }}
        <img
          class="arrow"
          v-if="!props.error"
          :class="{ rotate: isOpen }"
          src="@/assets/images/down.svg"
          alt=""
        />
      </div>
    </div>
    <transition name="fade">
      <ul v-if="isOpen">
        <li
          :class="{ active: selectedItem == item }"
          v-for="(item, index) in props.links"
          :key="index"
          @click="selectItem(item)"
        >
          {{ item.name }}
          <img
            v-if="selectedItem == item"
            src="@/assets/images/accept.svg"
            alt=""
          />
        </li>
      </ul>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  cursor: pointer;
  width: 235px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  .selected-item {
    border: 1px solid var(--opacity-gray);
    border-radius: 4px;
    display: flex;
    width: 235px;
    align-items: center;
    background: var(--white);
    justify-content: space-between;
    .item {
      padding: 10px 8px;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      text-transform: uppercase;
      color: var(--light-gray);
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px;
      transition: 0.3s;

      img {
        transition: 0.3s;
        transform: rotate(0);
        &.rotate {
          transform: rotate(-180deg);
        }
      }
    }

    transition: 0.3s;
    &.active {
      border: 1px solid var(--blue);
      font-weight: 700;
    }
    &:hover {
      border: 1px solid var(--blue);
      .item {
        font-weight: 400;
      }
      &:active {
        border: 1px solid var(--blue);
        font-weight: 700;
      }
    }
  }
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 48px;
    background-color: var(--white);
    border: 1px solid var(--border-gray);
    overflow: hidden;
    list-style: none;
    border-radius: 2px;
    align-self: flex-start;
    margin: 0;
    z-index: 100;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 16px 10px 8px 10px;
      cursor: pointer;
      color: var(--light-gray);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      text-transform: uppercase;
      transition: 0.3s;
      &.active {
        background: var(--white);
        color: var(--light-gray);
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 20px;
        text-transform: uppercase;
      }
      &:hover {
        background: var(--light-blue);
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}

.long {
  display: flex;
  width: 408px;
  height: 40px;
  align-items: center;
  flex-shrink: 0;
  .selected-item {
    width: 100%;
    .item {
      color: var(--middle-gray);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 160%; /* 22.4px */
      text-transform: none;
    }
    .active {
      color: var(--light-gray);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 160%;
    }
  }
  ul {
    li {
      text-transform: none;
    }
  }
}

.error {
  border-radius: 4px;
  border: 1px solid var(--red);
  background: var(--white);
  color: var(--red);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
}
@media (max-width: 577px) {
  .dropdown {
    width: 272px;
  }
}
@media (max-width: 377px) {
  .dropdown {
    width: 228px;
  }
}
</style>
