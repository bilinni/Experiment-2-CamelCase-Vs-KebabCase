<template>
  <div
    class="bg-gray-800/80 p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:bg-purple-700/90 transition"
  >
    <i :class="`fas ${icon} text-3xl sm:text-4xl mb-3 sm:mb-4 text-purple-400`"></i>
    <h2 class="text-xl sm:text-2xl font-bold mb-2">{{ title }}</h2>
    <p class="text-sm sm:text-base text-gray-300">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>