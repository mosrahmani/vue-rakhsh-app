// import Vue from 'vue'
// import Vuex from 'vuex'
// import axios from 'axios'
// import { map, filter } from 'lodash'

// Vue.use(Vuex)
// const token = localStorage.getItem('token')
// export default new Vuex.Store({
//     state: {
//         users: [],

//     },

//     mutations: {
//         auth_request(state) {
//             state.status = 'loading'
//         },
//         auth_success(state, token, user) {
//             state.status = 'success'
//             state.token = token
//             state.user = user
//         },
//         auth_error(state) {
//             state.status = 'error'
//         },
//         logout(state) {
//             state.status = ''
//             state.token = ''
//         },
//         whoami(state, me) {
//             state.me = me
//         },
//         // users
//         profile(state, profile) {
//             state.users = profile
//         },

//         // profiles
//         profiles(state, profiles) {
//             state.profiles = profiles
//         },
//         record(state, record) {
//             state.record = record
//         },
//         addNewRecord(state, addNewRecord) {
//             state.record = addNewRecord
//         },
//         profileUpdate(state, profile) {
//             state.profileUp = profile
//         },
//         userRecords(state, userRecords) {
//             state.uRecords = userRecords
//         },
//         myProfile(state, myProfile) {
//             state.myProfile = myProfile
//         },
//         CurrentStatus(state, CurrentStatus) {
//             state.CurrentStatus = CurrentStatus
//         },
//         addNewUser(state, addNewUser) {
//             state.newUser = addNewUser
//         },
//         deleteUser(state, deleteUser) {
//             state.deleteUser = deleteUser
//         },
//         EditProfile(state, EditProfile) {
//             state.EditProfile = EditProfile
//         },
//         ChangeUsername(state, ChangeUsername) {
//             state.ChangeUsername = ChangeUsername
//         },
//         ChangePassword(state, ChangePassword) {
//             state.ChangePassword = ChangePassword
//         },
//         getGroups(state, getGroups) {
//             state.groups = getGroups
//         },
//         addGroup(state, addGroup) {
//             state.newGroup = addGroup
//         },
//         deleteGroup(state, deleteGroup) {
//             state.newGroup = deleteGroup
//         },
//         editGroup(state, editGroup) {
//             state.editGroup = editGroup
//         },
//         ChangeProfile(state, ChangeProfile) {
//             state.ChangeProfile = ChangeProfile
//         },
//         ChangeProfilePhoto(state, ChangeProfilePhoto) {
//             state.ChangeProfilePhoto = ChangeProfilePhoto
//         },
//         ChangeAvatars(state, ChangeAvatars) {
//             state.ChangeAvatars = ChangeAvatars
//         },
//         masterProfiles(state, masterProfiles) {
//             state.masterProfiles = masterProfiles
//         }
//     },
//     actions: {
//         login({ dispatch, commit }, user) {
//             return new Promise((resolve, reject) => {
//                 commit('auth_request')
//                 axios({
//                     url: 'http://127.0.0.1:8000/auth/token/login/',
//                     data: user,
//                     method: 'POST'
//                 })
//                     .then(resp => {
//                         const token = resp.data.auth_token
//                         const user = resp.data.user
//                         localStorage.setItem('token', token)
//                         axios.defaults.headers.common['Authorization'] = token
//                         commit('auth_success', token, user)
//                         dispatch('whoami')
//                         resolve(resp)
//                     })
//                     .catch(err => {
//                         commit('auth_error')
//                         localStorage.removeItem('token')
//                         reject(err)
//                     })
//             })
//         },

//         logout({ commit }) {
//             return new Promise((resolve, reject) => {
//                 commit('logout')
//                 localStorage.removeItem('token')
//                 delete axios.defaults.headers.common['Authorization']
//                 localStorage.clear()
//                 resolve()
//             })
//         },

//         async whoami({ dispatch, commit }) {
//             const token = localStorage.getItem('token')
//             await axios({
//                 url: 'http://127.0.0.1:8000/auth/users/me/',
//                 method: 'GET',
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('whoami', response.data)
//                 dispatch('getProfile', response.data.id)
//                 // const myId = JSON.stringify(response.data.id)
//                 // localStorage.setItem('myId', myId)
//             })
//         },

//         async profile({ commit }) {
//             const token = localStorage.getItem('token')
//             await axios({
//                 url: 'http://127.0.0.1:8000/auth/users/',
//                 method: 'GET',
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('profile', response.data)
//             })
//         },

//         async masterProfiles({ commit }) {
//             // just get all master profile for show to anyone
//             await axios.get(`http://127.0.0.1:8000/auth/PublicProfiles/`, {
//                 headers: { Authorization: `Token ${token}` }
//             })
//                 .then(response => {
//                     commit('masterProfiles', response.data)
//                 })
//         },

//         async getProfiles({ commit }) {
//             const token = localStorage.getItem('token')
//             await axios({
//                 url: 'http://127.0.0.1:8000/auth/profile/',
//                 method: 'GET',
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('profiles', response.data)
//             })
//         },

//         async record({ dispatch, commit }, user) {
//             const token = localStorage.getItem('token')
//             let today = new Date()
//             let month = today.getMonth() + 1
//             let date = today.getFullYear() + '-' + month + '-' + today.getDate()
//             let timeNow =
//                 today.getHours() +
//                 ':' +
//                 today.getMinutes() +
//                 ':' +
//                 today.getSeconds() +
//                 '.' +
//                 today.getMilliseconds()

//             let time
//             if (user.time === null) {
//                 time = timeNow
//             } else {
//                 time = user.time
//             }

//             if (user.status === 0) {
//                 await axios({
//                     url: 'http://127.0.0.1:8000/auth/record/',
//                     method: 'POST',
//                     data: {
//                         user: user.selected,
//                         date: date,
//                         onTime: time,
//                         offTime: time
//                     },
//                     headers: {
//                         Authorization: `token ${token}`
//                     }
//                 }).then(response => {
//                     commit('record', response.data)
//                     dispatch('profile')
//                 })
//             } else if (user.status === 1) {
//                 await axios({
//                     url: `http://127.0.0.1:8000/auth/record/${user.selected}`,
//                     method: 'PUT',
//                     data: {
//                         user: user.selected,
//                         date: date,
//                         offTime: time
//                     },
//                     headers: {
//                         Authorization: `token ${token}`
//                     }
//                 }).then(response => {
//                     commit('record', response.data)
//                     dispatch('profile')
//                 })
//             }
//         },

//         async addNewRecord({ commit }, info) {
//             await axios({
//                 url: 'http://127.0.0.1:8000/auth/record/',
//                 method: 'POST',
//                 data: {
//                     user: info.user,
//                     date: info.date,
//                     onTime: info.signInTime,
//                     offTime: info.signOutTime
//                 },
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('addNewRecord', response.data)
//             })
//         },

//         async userRecords({ commit }, info) {
//             const token = localStorage.getItem('token')
//             await axios({
//                 url: `http://127.0.0.1:8000/auth/record/?user=${info.user}&start_date=${info.startDate}&end_date=${info.endDate}`,
//                 method: 'GET',
//                 data: {
//                     user: info.user,
//                     startDate: info.startDate,
//                     endDate: info.endDate
//                 },
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('userRecords', response.data)
//             })
//         },
//         async profileUpdate({ commit }, user) {
//             const token = localStorage.getItem('token')
//             let nextStatus
//             if (user.status === 1) {
//                 nextStatus = 0
//             } else {
//                 nextStatus = 1
//             }
//             await axios({
//                 url: `http://127.0.0.1:8000/auth/profile/${user.selected}`,
//                 method: 'PUT',
//                 data: {
//                     status: nextStatus
//                 },
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('profileUpdate', response.data)
//             })
//         },
//         async getProfile({ commit }, id) {
//             const token = localStorage.getItem('token')
//             await axios({
//                 url: `http://127.0.0.1:8000/auth/profile/${id}`,
//                 method: 'GET',
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('myProfile', response.data)
//                 let me = JSON.stringify(response.data)
//                 localStorage.setItem('myprofile', me)
//             })
//         },

//         async ChangeCurrentStatus({ commit }, info) {
//             const token = localStorage.getItem('token')
//             await axios({
//                 url: `http://127.0.0.1:8000/auth/profile/${info.user}`,
//                 method: 'PUT',
//                 data: {
//                     current_status: info.selected
//                 },
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('CurrentStatus', response.data)
//             })
//         },

//         async addNewUser({ dispatch, commit }, info) {
//             const token = localStorage.getItem('token')
//             await axios({
//                 url: `http://127.0.0.1:8000/auth/users/`,
//                 method: 'POST',
//                 data: {
//                     username: info.username,
//                     password: info.password,
//                     email: info.email,
//                     role: info.role,
//                     phone: info.phone
//                 },
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('addNewUser', response.data)
//                 info.id = response.data.id
//                 console.log(info)
//                 if (info.role === 1) {
//                     dispatch('EditProfile', info)
//                     dispatch('ChangeAvatars', info)
//                 }
//             })
//         },

//         async deleteUser({ commit }, user) {
//             const token = localStorage.getItem('token')
//             await axios({
//                 url: `http://127.0.0.1:8000/auth/users/${user}`,
//                 method: 'DELETE',
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('deleteUser', response.data)
//             })
//         },

//         async EditProfile({ commit }, info) {
//             const token = localStorage.getItem('token')
//             await axios({
//                 url: `http://127.0.0.1:8000/auth/profile/${info.id}`,
//                 method: 'PUT',
//                 data: {
//                     first_name: info.first_name,
//                     last_name: info.last_name,
//                     phone: info.phone,
//                     group: info.group
//                 },
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('EditProfile', response.data)
//             })
//         },
//         async ChangeUsername({ commit }, username) {
//             const token = localStorage.getItem('token')
//             await axios({
//                 url: `http://127.0.0.1:8000/auth/users/set_username/`,
//                 method: 'POST',
//                 data: {
//                     new_username: username
//                 },
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('ChangeUsername', response.data)
//             })
//         },
//         async ChangeProfile({ commit, dispatch, state }, data) {
//             let username = axios({
//                 url: `http://127.0.0.1:8000/auth/users/set_username/`,
//                 method: 'POST',
//                 data: {
//                     new_username: data.username
//                 },
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             })
//             let email = axios({
//                 url: `http://127.0.0.1:8000/auth/users/me/`,
//                 method: 'PUT',
//                 data: {
//                     email: data.email,
//                     phone: data.phone
//                 },
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             })
//             let phone = axios({
//                 url: `http://127.0.0.1:8000/auth/profile/${state.me.id}`,
//                 method: 'PUT',
//                 data: {
//                     // phone: data.phone,
//                     first_name: data.name,
//                     last_name: data.lastname
//                     // model_pic: data.profilePhoto.image
//                 },
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             })
//             Promise.all([username, email, phone]).then(
//                 axios.spread(response => {
//                     commit('ChangeProfile', response.data)
//                 })
//             )
//         },
//         async ChangeProfilePhoto({ commit, state }, profilePhoto) {
//             await axios.put(`http://127.0.0.1:8000/auth/profile-photo/${state.me.id}`, profilePhoto, {
//                 headers: { Authorization: `Token ${token}` }
//             })
//                 .then(response => {
//                     commit('ChangeProfilePhoto', response.data)
//                 })
//         },
//         async ChangeAvatars({ commit }, info) {
//             await axios.put(`http://127.0.0.1:8000/auth/profile-photo/${info.id}`, info.model_pic, {
//                 headers: { Authorization: `Token ${token}` }
//             })
//                 .then(response => {
//                     commit('ChangeAvatars', response.data)
//                 })
//         },
//         async ChangePassword({ commit }, data) {
//             const token = localStorage.getItem('token')
//             await axios({
//                 url: `http://127.0.0.1:8000/auth/users/set_password/`,
//                 method: 'POST',
//                 data: {
//                     new_password: data.new_password,
//                     current_password: data.current_password
//                 },
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('ChangePassword', response.data)
//             })
//         },
//         async getGroups({ commit }) {
//             const token = localStorage.getItem('token')
//             await axios({
//                 url: `http://127.0.0.1:8000/auth/group/`,
//                 method: 'GET',
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('getGroups', response.data)
//             })
//         },
//         async addGroup({ commit }, groupName) {
//             const token = localStorage.getItem('token')
//             await axios({
//                 url: `http://127.0.0.1:8000/auth/group/`,
//                 method: 'POST',
//                 data: {
//                     name: groupName
//                 },
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('addGroup', response.data)
//             })
//         },
//         async deleteGroup({ commit }, selectedGroup) {
//             const token = localStorage.getItem('token')
//             await axios({
//                 url: `http://127.0.0.1:8000/auth/group/${selectedGroup}`,
//                 method: 'DELETE',
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('deleteGroup', response.data)
//             })
//         },
//         async editGroup({ commit }, group) {
//             await axios({
//                 url: `http://127.0.0.1:8000/auth/group/${group.id}`,
//                 method: 'PUT',
//                 data: {
//                     name: group.name
//                 },
//                 headers: {
//                     Authorization: `token ${token}`
//                 }
//             }).then(response => {
//                 commit('editGroup', response.data)
//             })
//         }
//     },

//     getters: {
//         isAuthenticated: state => !!state.token,
//         authStatus: state => state.status,
//         users: state => state.users.filter(users => users.role === 1),
//         groupmates: state => {
//             return groupId => state.users.filter(users => {
//                 return users.profile.group === groupId
//             })
//         },
//         guardUsers: state => state.users.filter(users => users.role === 2),
//         adminUsers: state => state.users.filter(users => users.role === 4),
//         profiles: state => state.users,
//         me: state => state.me,
//         onlineUsers: state =>
//             filter(state.users, item => {
//                 return item.role === 1 && item.profile.status === 1
//             }),
//         offlineUsers: state =>
//             filter(state.users, item => {
//                 return item.role === 1 && item.profile.status === 0
//             }),
//         onlineMastersProfiles: state =>
//             filter(state.masterProfiles, item => {
//                 return item.profile.status === 1
//             }),
//         record: state => state.record,
//         uRecords: state => state.uRecords,
//         durations: state => map(state.uRecords, 'duration'),
//         myProfile: state => state.myProfile,
//         CurrentStatus: state => state.CurrentStatus,
//         groups: state => state.groups,

//         // for root permissions
//         isMasterPermission: state => { if (state.me.role === 1) return true },
//         isGuardPermission: state => { if (state.me.role === 2) return true }
//     }
// })
