<template>
  <div class="d-flex flex-column wrapper">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fs-5 fw-bold flex-grow-1">ویرایش پروفایل</h2>
        <router-link :to="{ name: 'user_list'}" class="btn bg-white">
            <span>لیست کاربران</span>
        </router-link>
      </div>
      <div>
        <div class="card card-shadow p-4">
            <form v-if="user" @submit.prevent="editUser()">
                <div class="mb-3" :class="{ 'form-error': $v.user.firstName.$error }">
                    <label class="form-label" for="firstName">نام</label>
                    <input type="text" class="form-control" id="firstName" placeholder="name@example.com" :value="user.firstName" @input="updateFiled($event)" @blur="$v.user.firstName.$touch()">
                    <div v-if="$v.user.firstName.$error" class="mt-1 invalid-feedback">
                        <div v-if="!$v.user.firstName.required">
                            این فیلد الزامی می باشد
                        </div>
                    </div>
                </div>
                <div class="mb-3" :class="{ 'form-error': $v.user.lastName.$error }">
                    <label class="form-label" for="lastName">نام خانوادگی</label>
                    <input type="text" class="form-control" id="lastName" placeholder="name@example.com" :value="user.lastName" @input="updateFiled($event)" @blur="$v.user.lastName.$touch()">
                    <div v-if="$v.user.lastName.$error" class="mt-1 invalid-feedback">
                        <div v-if="!$v.user.lastName.required">
                            این فیلد الزامی می باشد
                        </div>
                    </div>
                </div>
                <div class="mb-3" :class="{ 'form-error': $v.user.birthDay.$error }">
                    <label class="form-label" for="birthDay">تاریخ تولد</label>
                    <input type="text" class="form-control" id="birthDay" placeholder="name@example.com" :value="user.birthDay" @input="updateFiled($event)" @blur="$v.user.birthDay.$touch()">
                    <date-picker
                        v-model="user.birthDay"
                        format="jYYYY/jMM/jDD"
                        element="birtDay"
                        view="year"
                        color="#23049d"
                        :editable="true"
                        :auto-submit="true"
                        max="1400/01/01"
                    />
                    <div v-if="$v.user.birthDay.$error" class="mt-1 invalid-feedback">
                        <div v-if="!$v.user.birthDay.required">
                            این فیلد الزامی می باشد
                        </div>
                    </div>
                </div>
                <div class="mb-3" :class="{ 'select-error': $v.user.nationality.$error }">
                    <label class="form-label" for="nationality">ملیت</label>
                    <v-select label="name" :filterable="false" :options="options" id="nationality" v-model="user.nationality" @blur="$v.user.nationality.$touch()">
                        <template slot="no-options">
                            <span class="fw-light">
                                ملیت کاربر را جستجو کنید
                            </span>
                        </template>
                        <template slot="option" slot-scope="option">
                        <div class="d-flex align-items-center">
                            <img :src='option.flag'/>
                            {{ option.translations.fa }}
                            </div>
                        </template>
                        <template slot="selected-option" slot-scope="option">
                        <div class="selected d-flex align-items-center">
                            <img :src='option.flag'/>
                            {{ option.translations.fa }}
                        </div>
                        </template>
                    </v-select>
                    <div v-if="$v.user.nationality.$error" class="mt-1 invalid-feedback">
                        <div v-if="!$v.user.nationality.required">
                            این فیلد الزامی می باشد
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <div class="btn btn-light ms-3" @click="back">انصراف</div>
                    <button class="btn btn-primary btn-shadow" type="submit">اعمال تغییرات</button>
                </div>
            </form>
        </div>
      </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'

export default {
  name: 'UserEdit',
  data () {
    return {
      user: {},
      options: []
    }
  },
  components: {
    datePicker: VuePersianDatetimePicker
  },
  methods: {
    getCounteries () {
      fetch(
        'https://restcountries.eu/rest/v2/all'
      ).then(res => {
        res.json().then(data => (
          this.options = data
        ))
      })
    },
    back () {
      return this.$router.go(-1)
    },
    updateFiled (e) {
      this.$set(this.user, e.target.id, e.target.value)
    },

    editUser () {
      var users = []
      users = JSON.parse(localStorage.getItem('users'))

      var id = this.$route.params.userId
      var index = users.findIndex((obj) => obj.id === id)

      this.$v.$touch()
      if (!this.$v.user.$invalid) {
        users[index].firstName = this.user.firstName
        users[index].lastName = this.user.lastName
        users[index].birthDay = this.user.birthDay
        users[index].nationality = this.user.nationality
        localStorage.setItem('users', JSON.stringify(users))
        this.$router.replace({ name: 'user_list' })
        this.$toasted.show('اطلاعات کاربر موردنظر با موفقیت بروزرسانی شد', { type: 'success' })
      }
    }
  },
  mounted () {
  },
  created () {
    this.user = this.$users.find(obj => obj.id === this.$route.params.userId)
    this.getCounteries()
  },
  validations: {
    user: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      birthDay: {
        required
      },
      nationality: {
        required
      }
    }
  }
}
</script>
<style lang="sass">

</style>
