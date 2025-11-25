import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Store JWT token in memory
let token = "";

// Call login API
export async function loginUser() {
  const res = await API.post("/login");
  token = res.data.token;
  return token;
}

// Submit form API
export async function submitFormAPI(formData) {
  try {
    const res = await API.post("/submit-form", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true, data: res.data.data };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.error || "Something went wrong",
    };
  }
}
