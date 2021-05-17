<template>
  <div class="d-flex flex-column wrapper">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fs-5 fw-bold flex-grow-1">لیست کاربران</h2>
        <router-link :to="{ name: 'user_add'}" class="btn btn-primary">
            <i class="las la-plus ms-2"></i>
            <span>کاربر جدید</span>
        </router-link>
      </div>
      <div class="row">
        <div v-if="users.length === 0">
            <div class="alert alert-danger w-100 d-flex align-items-center">
                <i class="las la-exclamation-triangle ms-2"></i>
                کاربری جهت نمایش وجود ندارد
            </div>
        </div>
        <div v-else>
            <div class="card card-shadow mb-3 mb-md-4 d-flex flex-row align-items-center p-4" v-for="user in paginated" :key="user.id" >
                <div class="d-flex">
                    <div class="avatar border rounded-pill p-1">
                        <img class="rounded-pill img-fluid" src="@/assets/img/avatar.jpg" alt="">
                        <img class="avatar-flag" :src="user.nationality.flag" v-tooltip="{content: user.nationality.translations.fa , placement: 'bottom-center',}">
                    </div>
                    <div class="d-flex flex-column justify-content-center me-3">
                        <h4 class="fs-6">{{ `${user.firstName} ${user.lastName}` }}</h4>
                        <small class="text-muted fw-light">
                            {{ user.birthDay | age }} سال
                        </small>
                    </div>
                </div>
                <div class="me-auto">
                    <span role="button" class="ms-1" @click="deleteUser(user.id)" v-tooltip="{content:' حذف کاربر' , placement: 'bottom-center',}">
                        <i class="lar la-trash-alt icon"></i>
                    </span>
                    <router-link :to="{ name: 'user_edit', params: { userId: user.id }}" v-tooltip="{content: 'ویرایش اطلاعات کاربری' , placement: 'bottom-center',}">
                        <i class="las la-user-edit icon"></i>
                    </router-link>
                </div>
            </div>
        </div>
        <pagination :records="$users.length" v-model="page" :per-page="pageSize" :options="options"></pagination>
      </div>
  </div>
</template>
<script>
export default {
  name: 'UserList',
  data () {
    return {
      users: [],
      page: 1,
      pageSize: 5,
      options: {
        edgeNavigation: false,
        format: false
      }
    }
  },
  filters: {
    age (birtDay) {
      var array = birtDay.split('/')
      var age = 1399 - array[0]
      return age
    }
  },
  methods: {
    deleteUser (id) {
      var users = []
      users = this.$users
      var index = users.findIndex((obj) => obj.id === id)

      users.splice(index, 1)
      this.users.splice(index, 1)
      localStorage.setItem('users', JSON.stringify(users))

      this.$toasted.show('کاربر موردنظر با موفقیت حذف شد', {
        type: 'error'
      })
    }
  },
  computed: {
    indexStart () {
      return (this.page - 1) * this.pageSize
    },
    indexEnd () {
      return this.indexStart + this.pageSize
    },
    paginated () {
      return this.users.slice(this.indexStart, this.indexEnd)
    }
  },
  created () {
    this.users = JSON.parse(localStorage.getItem('users')) || []
  }
}
</script>
<style lang="sass">
.avatar
    position: relative
    width: 3.6rem;
    height: 3.6rem;
    img
        margin: 0
    &-flag
        max-width: 1.4rem
        // height: 1rem
        position: absolute
        bottom: 0
        right: -.4rem
</style>
