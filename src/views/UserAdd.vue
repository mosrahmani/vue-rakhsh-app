<template>
  <div class="d-flex flex-column wrapper">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fs-5 fw-bold flex-grow-1">اضافه کردن کاربر جدید</h2>
        <router-link :to="{ name: 'user_list'}" class="btn bg-white">
            <span>لیست کاربران</span>
        </router-link>
      </div>
      <div>
        <div class="card card-shadow p-4">
            <form @submit.prevent="addUser()">
                <div class="mb-3" :class="{ 'form-error': $v.newUser.firstName.$error }">
                    <label class="form-label" for="firstname">نام</label>
                    <input type="text" class="form-control" id="firstname" placeholder="نام کاربر را وارد کنید" v-model="newUser.firstName" @blur="$v.newUser.firstName.$touch()">
                    <div v-if="$v.newUser.firstName.$error" class="mt-1 invalid-feedback">
                        <div v-if="!$v.newUser.firstName.required">
                            این فیلد الزامی می باشد
                        </div>
                    </div>
                </div>
                <div class="mb-3" :class="{ 'form-error': $v.newUser.lastName.$error }">
                    <label class="form-label" for="lastname">نام خانوادگی</label>
                    <input type="text" class="form-control" id="lastname" placeholder="نام خانوادگی کاربر را وارد کنید" v-model="newUser.lastName" @blur="$v.newUser.lastName.$touch()">
                    <div v-if="$v.newUser.lastName.$error" class="mt-1 invalid-feedback">
                        <div v-if="!$v.newUser.lastName.required">
                            این فیلد الزامی می باشد
                        </div>
                    </div>
                </div>
                <div class="mb-3" :class="{ 'form-error': $v.newUser.birthDay.$error }">
                    <label class="form-label" for="birtDay">تاریخ تولد</label>
                    <input type="text" class="form-control" id="birtDay" placeholder="تاریخ تولد کاربر را وارد کنید" v-model="newUser.birthDay" @blur="$v.newUser.birthDay.$touch()">
                    <date-picker
                        v-model="newUser.birthDay"
                        format="jYYYY/jMM/jDD"
                        element="birtDay"
                        view="year"
                        color="#23049d"
                        :auto-submit="true"
                        max="1400/01/01"
                    />
                    <div v-if="$v.newUser.birthDay.$error" class="mt-1 invalid-feedback">
                        <div v-if="!$v.newUser.birthDay.required">
                            این فیلد الزامی می باشد
                        </div>
                    </div>
                </div>
                <div class="mb-3" :class="{ 'select-error': $v.newUser.nationality.$error }">
                    <label class="form-label" for="lastname">ملیت</label>
                    <v-select label="name" :filterable="false" :options="options" v-model="newUser.nationality" @blur="$v.newUser.nationality.$touch()">
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
                    <div v-if="$v.newUser.nationality.$error" class="mt-1 invalid-feedback">
                        <div v-if="!$v.newUser.nationality.required">
                            این فیلد الزامی می باشد
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <div class="btn btn-light ms-3" @click="back">انصراف</div>
                    <button class="btn btn-primary btn-shadow" type="submit">اضافه کردن کاربر</button>

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
  name: 'UserAdd',
  data () {
    return {
      newUser: {},
      options: []
    }
  },
  components: {
    datePicker: VuePersianDatetimePicker
  },
  methods: {
    getCounteries () {
      fetch('https://restcountries.eu/rest/v2/all').then(res => {
        res.json().then(data => (
          this.options = data
        ))
      })
    },
    back () {
      return this.$router.go(-1)
    },
    saveUser (data) {
      var users = []
      users = this.$users
      users.push(data)
      localStorage.setItem('users', JSON.stringify(users))
    },
    addUser () {
      var id = this.$users.length + 1
      this.$v.$touch()
      if (!this.$v.newUser.$invalid) {
        var user = {
          id: id,
          firstName: this.newUser.firstName,
          lastName: this.newUser.lastName,
          birthDay: this.newUser.birthDay,
          nationality: this.newUser.nationality
        }
        this.saveUser(user)
        this.$router.replace({ name: 'user_list' })
        this.$toasted.show('کاربر موردنظر با موفقیت ایجاد شد', { type: 'success' })
      }
    }
  },
  created () {
    this.getCounteries()
  },
  validations: {
    newUser: {
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
