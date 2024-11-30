<template>
  <div class="flex flex-1 flex-col items-center justify-center">
    <div
      v-if="!authenticated"
      class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-center"
    >
      <h1 class="text-2xl font-bold text-purple-400 mb-4">Download Results</h1>
      <p class="text-gray-300 mb-6">
        Enter the password to download the results CSV file.
      </p>
      <form @submit.prevent="authenticate">
        <input
          type="password"
          v-model="password"
          placeholder="Enter Password"
          class="w-full px-4 py-2 mb-4 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          class="w-full px-4 py-2 bg-purple-500 text-white font-semibold rounded-md shadow-md hover:bg-purple-600 transition"
        >
          Submit
        </button>
      </form>
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </div>

    <div
      v-else
      class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-center"
    >
      <h1 class="text-2xl font-bold text-green-400 mb-4">Access Granted</h1>
      <p class="text-gray-300 mb-6">
        Click the button below to download the CSV file.
      </p>
      <a
        :href="`${baseUrl}/api/results`"
        class="px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition"
        download="results.csv"
      >
        Download CSV
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      error: null,
      authenticated: false,
      baseUrl:
        process.env.NODE_ENV === "production" ? "" : "http://localhost:3000",
    };
  },
  methods: {
    authenticate() {
      const config = useRuntimeConfig();
      const envPassword = config.public.password;
      console.log(envPassword)
      if (this.password === envPassword) {
        this.authenticated = true;
        this.error = null;
      } else {
        this.error = "Invalid password. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(128, 90, 213, 0.7);
}
</style>
