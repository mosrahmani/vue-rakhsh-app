<template>
  <div class="card profile">
    <div>
      <div class="space-between">
        <div class="d-flex">
          <div class="profile__avatar">
            <!-- <img src="" /> -->
          </div>
          <div class="profile__info">
            <strong>n</strong>
            <span>j</span>
          </div>
        </div>
        <div class="y-centering">
          <span>
            <span class="mr-1">l</span>
            <i class="las la-heart icon"></i>
          </span>
          <span
            role="button"
            class="mr-1"
          >
            <i class="lar la-comment-dots icon"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="comment input-control">
      <input type="text" placeholder="write something ..." />
      <button><i class="las la-paper-plane"></i></button>
    </div>
  </div>
</template>

<script>
// import DoctorIcon from "./DoctorIcon";

export default {
  name: 'UserCard',
  data () {
    return {

    }
  },
  computed: {

  },
  filters: {
    join (value) {
      if (!value) return ''
      return value.join(', ')
    }
  },
  methods: {
    imagePath (id) {
    //   return require(`../assets/img/avatars/${id}.jpg`)
    }
  },
  props: {
    profile: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss">
.profile {
  &__avatar {
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
    border: 1px solid #ccc;
    padding: 0.25rem;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 1rem;
    strong {
      font-weight: 900;
      font-size: 1.1rem;
    }
    span {
      font-weight: 500;
      color: #555;
      font-size: 0.9rem;
    }
  }
}
.comment {
  margin-top: 1rem;
  position: relative;
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0.4rem;
    padding: 0.75rem 1rem;
    border: 0;
    border-radius: 0.8rem;
    background-color: #23049d;
    box-shadow: 0 0.6rem 1.6rem 0.5rem rgba(35, 4, 157, 0.15);
    color: #fff;
  }
  input {
    padding-right: 3.2rem;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 1rem;
    padding: 1rem;
    &:focus {
      border: 1px solid #23049d;
      color: #23049d;
    }
  }
}

</style>
