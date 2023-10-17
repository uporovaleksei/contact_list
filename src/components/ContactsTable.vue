<script setup>
import { useContactStore } from "../store/store";
import { defineProps, computed, ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps(["selectedFilter"]);
const contactStore = useContactStore();
const contacts = computed(() => {
  return contactStore.contacts;
});

const filteredContacts = computed(() => {
  if (props.selectedFilter === "all") {
    return contacts.value;
  } else {
    return contacts.value.filter(
      (contact) => contact.category === props.selectedFilter,
    );
  }
});

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
  <div class="container">
    <div class="table">
      <div class="table_header">
        <div class="title_name">Контакт</div>
        <div class="title_phone" v-if="windowWidth > 577">Телефон</div>
        <div class="double_title" v-if="windowWidth <= 577">
          ТЕЛЕФОН / E-MAIL
        </div>
        <div class="title_mail" v-if="windowWidth > 577">E-MAIL</div>
        <div class="title_date">Создан</div>
      </div>
      <ul>
        <li v-for="contact in filteredContacts" :key="contact.id">
          <router-link
            :to="{ name: 'CurrentContact', params: { id: contact.id } }"
          >
            <div class="name">
              <span v-if="windowWidth > 377">{{
                contact.name.charAt(0).toUpperCase()
              }}</span>
              <p>{{ contact.name }}</p>
            </div>
            <div class="double" v-if="windowWidth <= 577">
              <div class="double_phone">
                {{ contact.phone }}
              </div>
              <div class="double_mail">
                {{ contact.mail }}
              </div>
            </div>
            <div class="phone" v-if="windowWidth > 577">
              {{ contact.phone }}
            </div>
            <div class="mail" v-if="windowWidth > 577">
              {{ contact.mail }}
            </div>
            <div class="date">
              {{ contact.date }}
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 990px;
  margin: 16px auto;
  .table {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .table_header {
      display: flex;
      justify-content: space-between;
      height: 16px;
      color: #b5b5b5;
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      text-transform: uppercase;
      .title_name {
        width: 296px;
      }
      .title_phone {
        width: 112px;
      }
      .title_mail {
        width: 208px;
      }
      .title_date {
        width: 112px;
        display: flex;
        justify-content: flex-end;
      }
    }
    ul {
      display: flex;
      flex-direction: column;
      width: 100%;
      li {
        border-bottom: 1px solid var(--light-blue);

        a {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--light-blue);
          &:last-child {
            border-bottom: 0;
          }
          .name,
          .phone,
          .mail,
          .date {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: var(--light-gray);
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            height: 48px;
          }
          .double {
            display: flex;
            flex-direction: column;
            color: var(--light-gray);
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px; /* 133.333% */
          }
          .name {
            width: 296px;
            display: flex;
            gap: 8px;
            align-items: center;
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
          .phone {
            width: 112px;
          }
          .mail {
            width: 208px;
          }
          .date {
            width: 112px;
            justify-content: flex-end;
          }
        }
      }
    }
  }
}
@media (max-width: 993px) {
  .container {
    width: 100dvw;
    padding: 0 32px;
    margin: 16px 0;
  }
}
@media (max-width: 577px) {
  .container {
    width: 576px;
    padding: 0 12px;
    .table {
      .table_header {
        .title_name {
          width: 240px;
        }
        .double_title {
          width: 240px;
        }
      }
      ul {
        li {
          a {
            .name {
              width: 240px;
              p {
                display: flex;
                align-items: center;
                flex: 0 1 (50%);
                flex-wrap: wrap;
              }
            }
            .double {
              width: 240px;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 377px) {
  .container {
    width: 376px;
  }
}
</style>
