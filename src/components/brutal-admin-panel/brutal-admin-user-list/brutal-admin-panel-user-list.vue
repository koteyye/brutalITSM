<template>
  <div class="user-list-row flex justify-space-between">
    <img class="avatar" :src="userImg" alt="avatar" height="50" width="50" @error="handleImgError">
    <div class="login">{{users.login}}</div>
    <div class="username hover cursor-pointer">{{ users.lastname }} {{ users.firstname }} {{users.middlename}}</div>
    <div class="job border">{{ users.job }}</div>
    <div class="org">{{ users.org }}</div>
    <div class="deleteUser cursor-pointer">
      <brutal-button icon="fa-solid fa-trash" @click="handleDeleteUser(users.id)"></brutal-button>
    </div>
  </div>

  <div class="delete-user-modal">
    <brutal-admin-panel-delete-user-modal v-if="showModal" @close="handleClose" @modalResponse="modalResponse"/>
  </div>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import {s3url} from "@/shared/path-names";
import {userInfo} from "@/plugins/router/auth-guard";
import BrutalButton from "@/components/button/brutal-button.vue";
import brutalAdminPanelDeleteUserModal
  from "@/components/brutal-admin-panel/brutal-admin-user-list/brutal-admin-panel-delete-user-modal.vue";
import {deleteUser} from "@/use/user";


export default defineComponent({
  name: "brutal-admin-panel-user-list.vue",
  components: {BrutalButton, brutalAdminPanelDeleteUserModal},
  props: {
    users: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props) {

    const avaPath = props.users.avatar.backetName + '/' + props.users.avatar.fileName
    const userImg = computed(() => avaPath != null ? `${s3url}/${avaPath}` : '')
    const showModal = ref(false)
    const delUserId = ref('')

    function handleImgError(e) {
      const target = e.target
      target.onerror = null
      target.src = '/images/nophoto.jpg'
    }

    function handleDeleteUser(id) {
      showModal.value = true
      delUserId.value = id
    }

    function handleClose() {
      showModal.value = false
    }

    function modalResponse(res) {
      if (!res) {
        showModal.value = false
      } else {
        const {result} = deleteUser(delUserId.value)
        showModal.value = false
        location.reload()
      }
    }

    return {
      userImg,
      handleImgError,
      handleDeleteUser,
      showModal,
      modalResponse,
      handleClose
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/main.scss';

.user-list-row {
  margin: auto 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  font-family: MorningBreeze;
  font-size: 15px;
  align-items: center;
  margin-right: 25px;
}

.row_data {
  display: flex;
}

.avatar {
  border-radius: 100%;
  color: $--color-apsidgray;
}

.login {
  flex-basis: 10%;
  color: $--color-apsidgray;
}
.username {
  flex-basis: 40%;
  color: $--color-apsidgray;
}
.job {
  flex-basis: 20%;
  color: $--color-apsidgray;
}
.org {
  flex-basis: 20%;
  color: $--color-apsidgray;
}
.deleteUser {
  position: absolute;
  left: 95%;
  margin-right: 2px;
}

.hover {
  &:hover {
    text-decoration: none;
    font-family: MorningBreeze-Bold;
  }
}


</style>