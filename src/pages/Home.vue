<template>
  <div class="container">
    <h1>Vue Form Assignment</h1>
    <UserForm />
    <SubmittedTable />
  </div>
</template>

<script>
import UserForm from "../components/UserForm.vue";
import SubmittedTable from "../components/SubmittedTable.vue";

export default {
  components: { UserForm, SubmittedTable }
};
</script>

<style>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  font-family: sans-serif;
}
</style>
