<script setup>
import Header from "@/components/Header.vue";
import DropDown from "@/components/DropDown.vue";
import ContactsTable from "@/components/ContactsTable.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
const selectedFilter = ref("all");
const itemSelected = (item) => {
  selectedFilter.value = item.value;
};
const links = [
  {
    name: "Все",
    value: "all",
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
const windowWidth = ref(window.innerWidth);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  console.log(windowWidth.value);
  window.addEventListener("resize", updateWindowWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowWidth);
});
</script>
<template>
  <Header />
  <div class="sub_header">
    <div class="sub_header_container">
      <div class="selector">
        <DropDown :links="links" @selectItem="itemSelected" />
      </div>
      <div class="add_contact">
        <router-link to="/new_contact" v-if="windowWidth > 377">
          <button>
            <img src="@/assets/images/plus.svg" alt="" />
            Добавить контакт
          </button>
        </router-link>
        <router-link to="/new_contact" v-if="windowWidth < 377">
          <button>
            <img src="@/assets/images/plus.svg" alt="" />
            Добавить
          </button>
        </router-link>
      </div>
    </div>
  </div>
  <ContactsTable :selectedFilter="selectedFilter" />
</template>

<style lang="scss" scoped>
.sub_header {
  width: 100%;
  height: 56px;
  border-radius: 4px;
  border: 1px solid var(--light-blue);
  background: #f9fcff;
  display: flex;
  justify-content: center;
  align-items: center;
  .sub_header_container {
    width: 990px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .add_contact {
      button {
        cursor: pointer;
        transition: 0.3s;

        background: var(--white);
        display: flex;
        padding: 8px 16px;
        justify-content: center;
        align-items: center;
        gap: 4px;
        border-radius: 28px;
        border: 1px solid var(--blue);
        color: var(--blue);
        text-align: center;
        font-size: 12px;
        font-style: normal;
        font-weight: 900;
        line-height: 16px;
        text-transform: uppercase;
        &:hover {
          box-shadow: 0 0 5px var(--blue);
        }
      }
    }
  }
}
@media (max-width: 993px) {
  .sub_header {
    width: 100dvw;
    padding: 0 32px;
    .sub_header_container {
      width: 100dvw;
    }
  }
}
@media (max-width: 577px) {
  .sub_header {
    padding: 0 12px;
  }
}
@media (max-width: 577px) {
  .sub_header {
    padding: 0 12px;
  }
}
@media (max-width: 377px) {
  .sub_header {
    .sub_header_container {
      justify-content: space-between;
    }
    button {
      width: 117px;
    }
  }
}
</style>
