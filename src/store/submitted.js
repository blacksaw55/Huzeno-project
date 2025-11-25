import { defineStore } from "pinia";

export const useSubmittedStore = defineStore("submitted", {
  state: () => ({
    submissions: []
  }),

  actions: {
    addSubmission(data) {
      this.submissions.push(data);
    }
  }
});
