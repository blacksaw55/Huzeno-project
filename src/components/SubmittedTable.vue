<template>
  <div class="table-wrapper" v-if="submitted.length">
    <h2>Submitted Data</h2>

    <table>
      <thead>
        <tr>
          <th>Groups</th>
          <th>Birth Date</th>
          <th>Gender</th>
          <th>Languages</th>
          <th>Cities</th>
          <th>File</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in submitted" :key="index">
          <!-- Groups section -->
          <td>
            <div v-for="(g, i) in JSON.parse(item.groups)" :key="i" class="group-display">
              <strong>Group {{ i + 1 }}:</strong><br />
              Name: {{ g.name }}<br />
              Email: {{ g.email }}<br />
              Mobile: {{ g.mobile }}
              <hr />
            </div>
          </td>

          <td>{{ item.birthDate }}</td>
          <td>{{ item.gender }}</td>

          <td>
            <ul>
              <li v-for="l in JSON.parse(item.languages)" :key="l">{{ l }}</li>
            </ul>
          </td>

          <td>
            <ul>
              <li v-for="c in JSON.parse(item.cities)" :key="c">{{ c }}</li>
            </ul>
          </td>

          <td>{{ item.fileName || "No File" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useSubmittedStore } from "../store/submitted";

export default {
  setup() {
    const store = useSubmittedStore();
    return {
      submitted: store.submissions
    };
  }
};
</script>

<style>
.table-wrapper {
  margin-top: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

table, td, th {
  border: 1px solid #444;
}

th {
  background: #f3f3f3;
  padding: 8px;
  text-align: left;
}

td {
  padding: 10px;
  vertical-align: top;
}

.group-display {
  margin-bottom: 8px;
}
</style>
