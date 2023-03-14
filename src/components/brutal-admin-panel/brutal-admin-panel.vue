<template>
  <div class="brutal-admin">
    <div class="brutal-admin__left-menu">
      <div class="left-menu__title">
        <span>Меню</span>
      </div>
      <div class="left-menu__items">
        <span class="left-menu__item cursor-pointer" @click="handleUsers">Пользователи</span>
        <span class="left-menu__item cursor-pointer" @click="handleCreateUser">Создать пользователя</span>
      </div>
    </div>
    <div class="brutal-admin__work-area">
      <div v-show="workArea === 'users'" class="user-list">
        <div class="user-list-header flex justify-space-between">
          <span class="avatar"> </span>
          <span class="login">Логин</span>
          <span class="username">ФИО</span>
          <span class="job">Должность</span>
          <span class="org">Подразделение</span>
        </div>
        <brutal-admin-panel-user-list
            v-for="(user, id) in users"
            :key="id"
            :users="user"/>
      </div>

      <div v-show="workArea === 'createUser'" class="create-user">
        <brutal-admin-create-user></brutal-admin-create-user>
      </div>

    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";
import {useUser} from "@/use/user";
import brutalAdminPanelUserList
  from "@/components/brutal-admin-panel/brutal-admin-user-list/brutal-admin-panel-user-list.vue";
import brutalAdminCreateUser from "@/components/brutal-admin-panel/brutal-admin-create-user";

export default defineComponent({
  name: "brutal-admin-panel",
  components: {brutalAdminPanelUserList, brutalAdminCreateUser},
  setup() {
    document.title = 'brutalITSM-admin-panel'

    const users = ref([])
    const workArea = ref('users')

    onMounted(async()=> await getUsers())

    async function getUsers() {
      const {userList} = await useUser()
      users.value = userList.value
    }

    function handleUsers() {
      workArea.value = 'users'
    }
    function handleCreateUser() {
      workArea.value = 'createUser'
    }

    return {
      users,
      handleUsers,
      handleCreateUser,
      workArea
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../assets/styles/main.scss';
.brutal-admin {
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 5px;
  display: flex;
  flex-wrap: wrap;
  width: 98%;
  height: 100%;
  &__left-menu {
    flex-basis: 19%;
    border-radius: $radius*3;
    border: 1px solid $--color-apsidgray;
  }
  &__work-area {
    position: relative;
    flex-basis: 80%;
    border-radius: $radius*3;
    left: 5px;
    border: 1px solid $--color-apsidgray;
  }
}

.left-menu {
  &__title {
    text-align: center;
    color: $--color-text;
    font-family: MorningBreeze-Bold;
    font-size: 30px;
    letter-spacing: 3px;
  }
  &__items {
    display: grid;
    color: $--color-apsidgray
  }
  &__item {
    padding: 10px;
    font-family: "MornningBreeze";
    font-size: 25px;
    color: $--color-apsidgray;
    &:hover {
      text-decoration: none;
      border-radius: $radius*3;
    }
  }
}

.user-list-header {
  margin: auto 10px;
  text-align: center;
  font-family: MorningBreeze-Bold;
  font-size: 20px;
  border-bottom: solid 2px rgba(113, 146, 152, 0.7);
  color: $--color-apsidgray;
}
.avatar {
  width: 50px;
}
.login {
  flex-basis: 10%;
}
.username {
  flex-basis: 40%;
}
.job {
  flex-basis: 20%;
}
.org {
  flex-basis: 20%;
}

</style>