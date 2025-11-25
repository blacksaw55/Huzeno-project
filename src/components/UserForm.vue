<template>
    <div class="form-container">
        <h2>User Form</h2>

        <!-- Dynamic Groups -->
        <div>
            <FormGroup v-for="(group, index) in form.groups" :key="index" :group="group"
                :canRemove="form.groups.length > 2" @remove="removeGroup(index)" />
        </div>

        <button class="add-btn" @click="addGroup">+ Add More</button>

        <!-- Birth date -->
        <div class="row">
            <label>Birth Date:</label>
            <input type="date" v-model="form.birthDate" />
        </div>

        <!-- Gender -->
        <div class="row">
            <label>Gender:</label>
            <div>
                <label><input type="radio" value="Male" v-model="form.gender" /> Male</label>
                <label><input type="radio" value="Female" v-model="form.gender" /> Female</label>
            </div>
        </div>

        <!-- Languages -->
        <div class="row">
            <label>Languages:</label>

            <label><input type="checkbox" value="Angular" v-model="form.languages" /> Angular</label>
            <label><input type="checkbox" value="VueJS" v-model="form.languages" /> VueJS</label>
            <label><input type="checkbox" value="ReactJS" v-model="form.languages" /> ReactJS</label>
        </div>

        <!-- City Multi Select -->
        <div class="row">
            <label>City:</label>
            <select v-model="form.cities" multiple size="5">
                <option v-for="c in cityList" :key="c" :value="c">{{ c }}</option>
            </select>
        </div>

        <!-- File Upload -->
        <div class="row">
            <label>Upload File:</label>
            <input type="file" @change="fileSelect" accept="image/jpeg, application/pdf" />
        </div>

        <button class="submit-btn" @click="submitForm">Submit</button>
    </div>
</template>

<script>
import FormGroup from "./FormGroup.vue";
import { useSubmittedStore } from "../store/submitted";
import { loginUser, submitFormAPI } from "../api/index";

export default {
    components: { FormGroup },

    data() {
        return {
            form: {
                groups: [
                    { name: "", email: "", mobile: "" },
                    { name: "", email: "", mobile: "" },
                ],
                birthDate: "",
                gender: "",
                languages: [],
                cities: [],
                file: null,
            },

            cityList: [
                "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
                "Pune", "Kolkata", "Jaipur", "Surat", "Indore"
            ],
        };
    },

    methods: {
        addGroup() {
            this.form.groups.push({ name: "", email: "", mobile: "" });
        },

        removeGroup(i) {
            this.form.groups.splice(i, 1);
        },

        fileSelect(e) {
            const file = e.target.files[0];
            if (!file) return;

            const allowed = ["image/jpeg", "application/pdf"];
            if (!allowed.includes(file.type)) {
                alert("Only JPEG and PDF allowed");
                return;
            }

            this.form.file = file;
        },

        formatDate(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });
        },

        async submitForm() {
            const submittedStore = useSubmittedStore();

            const fd = new FormData();

            // Groups as JSON
            fd.append("groups", JSON.stringify(this.form.groups));

            fd.append("birthDate", this.form.birthDate);
            fd.append("gender", this.form.gender);
            fd.append("languages", JSON.stringify(this.form.languages));
            fd.append("cities", JSON.stringify(this.form.cities));

            if (this.form.file) fd.append("file", this.form.file);

            // Call API
            const response = await submitFormAPI(fd);

            if (!response.success) {
                alert("Error: " + response.error);
                return;
            }

            // Format date for UI
            const formatted = {
                ...response.data,
                birthDate: this.formatDate(response.data.birthDate),
            };

            submittedStore.addSubmission(formatted);

            alert("Form submitted successfully!");
        },

    },
    mounted() {
        // Automatically login and store JWT
        loginUser();
    },
};

</script>

<style>
.form-container {
    border: 1px solid #444;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
}

.row {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
}

.add-btn {
    background: green;
    color: white;
    border: none;
    padding: 8px 12px;
    margin-bottom: 20px;
    cursor: pointer;
    border-radius: 4px;
}

.submit-btn {
    margin-top: 20px;
    background: blue;
    color: white;
    border: none;
    padding: 10px 14px;
    cursor: pointer;
    border-radius: 4px;
}
</style>
