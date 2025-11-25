<template>
  <div class="group-box">
    <div class="row">
      <label>Name:</label>
      <input type="text" v-model="group.name" placeholder="Enter name" />
    </div>

    <div class="row">
      <label>Email:</label>
      <input type="email" v-model="group.email" placeholder="Enter email" />
    </div>

    <div class="row">
      <label>Mobile:</label>
      <input
        type="text"
        v-model="formattedMobile"
        @input="formatMobile"
        placeholder="(844) 448-0110"
        maxlength="14"
      />
    </div>

    <button
      v-if="canRemove"
      class="remove-btn"
      @click="$emit('remove')"
    >
      Remove
    </button>
  </div>
</template>

<script>
export default {
  props: {
    group: Object,
    canRemove: Boolean,
  },

  computed: {
    formattedMobile: {
      get() {
        return this.group.mobile;
      },
      set(val) {
        this.group.mobile = val;
      },
    },
  },

  methods: {
    formatMobile(e) {
      let digits = e.target.value.replace(/\D/g, "").slice(0, 10);

      let formatted = digits;

      if (digits.length >= 4 && digits.length < 7) {
        formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else if (digits.length >= 7) {
        formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      }

      this.group.mobile = formatted;
    },
  },
};
</script>

<style>
.group-box {
  border: 1px solid #999;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
}

.row {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}

.remove-btn {
  background: red;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 4px;
}
</style>
