<template>
  <div class="user-list-row flex justify-space-between">
    <img class="avatar" :src="userImg" alt="avatar" height="50" width="50" @error="handleImgError">
    <div class="login">{{users.login}}</div>
    <div class="username hover cursor-pointer">{{ users.lastname }} {{ users.firstname }} {{users.middlename}}</div>
    <div class="job border">{{ users.jobname }}</div>
    <div class="org">{{ users.orgname }}</div>
    <div class="deleteUser cursor-pointer">
      <fa  icon="fa-solid fa-trash"/>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent} from "vue";
import {s3url} from "@/shared/path-names";
import {userInfo} from "@/plugins/router/auth-guard";


export default defineComponent({
  name: "brutal-admin-panel-user-list.vue",
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

    function handleImgError(e) {
      const target = e.target
      target.onerror = null
      target.src = '/images/nophoto.jpg'
    }

    return {
      userImg,
      handleImgError
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
.deleteUser {
  position: absolute;
  left: 99%;
  margin-right: 2px;
}

.hover {
  &:hover {
    text-decoration: none;
    font-family: MorningBreeze-Bold;
  }
}


</style>