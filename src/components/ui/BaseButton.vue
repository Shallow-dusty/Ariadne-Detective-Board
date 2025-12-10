<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary", // primary, danger, ghost
  },
});
</script>

<template>
  <button
    class="px-4 py-2 rounded font-serif transition-all duration-300 flex items-center gap-2"
    :class="{
      'bg-mystery-gold text-mystery-900 hover:bg-amber-400 shadow-lg shadow-amber-900/20':
        variant === 'primary',
      'bg-mystery-blood text-white hover:bg-rose-500 shadow-lg shadow-rose-900/20':
        variant === 'danger',
      'bg-transparent text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500':
        variant === 'ghost',
      'bg-slate-800 text-slate-300 hover:bg-slate-700': variant === 'secondary',
    }"
  >
    <slot />
  </button>
</template>
