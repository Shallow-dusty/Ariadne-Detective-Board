<script setup>
import { computed } from "vue";
import { User, Skull, Trash2 } from "lucide-vue-next";
import { useCaseStore } from "../stores/useCaseStore";
import BaseButton from "./ui/BaseButton.vue";

const props = defineProps({
  suspect: {
    type: Object,
    required: true,
  },
});

const store = useCaseStore();

const isKiller = computed(() => props.suspect.isKiller);

const toggleKiller = () => store.toggleKiller(props.suspect.id);
const remove = () => {
  if (confirm(`确定要删除 ${props.suspect.name} 吗？`)) {
    store.removeSuspect(props.suspect.id);
  }
};
const updateNote = (e) =>
  store.updateSuspect(props.suspect.id, { note: e.target.value });
</script>

<template>
  <div
    class="relative p-4 rounded-lg border transition-all duration-300 group"
    :class="[
      isKiller
        ? 'bg-mystery-blood/10 border-mystery-blood shadow-[0_0_15px_rgba(225,29,72,0.3)]'
        : 'bg-mystery-800 border-mystery-700 hover:border-mystery-gold/50',
    ]"
  >
    <!-- Killer Badge -->
    <div
      v-if="isKiller"
      class="absolute -top-3 -right-3 bg-mystery-blood text-white px-2 py-0.5 text-xs font-bold rounded shadow-lg animate-pulse"
    >
      凶手
    </div>

    <div class="flex items-start gap-3">
      <!-- Avatar -->
      <div
        class="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shrink-0 border-2 overflow-hidden"
        :class="
          isKiller
            ? 'bg-mystery-blood text-white border-mystery-blood'
            : 'bg-mystery-700 text-slate-400 border-mystery-600'
        "
      >
        <span v-if="!suspect.avatar">{{ suspect.name.charAt(0) }}</span>
        <img v-else :src="suspect.avatar" class="w-full h-full object-cover" />
      </div>

      <!-- Info -->
      <div class="flex-1 min-w-0">
        <h3
          class="font-serif font-bold text-lg truncate"
          :class="isKiller ? 'text-mystery-blood' : 'text-slate-200'"
        >
          {{ suspect.name }}
        </h3>
        <textarea
          :value="suspect.note"
          @input="updateNote"
          class="w-full bg-black/20 text-sm text-slate-400 p-2 rounded mt-2 border border-transparent focus:border-mystery-700 focus:outline-none resize-none field-sizing-content min-h-[60px]"
          placeholder="动机 / 疑点..."
        ></textarea>
      </div>
    </div>

    <!-- Actions -->
    <div
      class="flex justify-end gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <button
        @click="toggleKiller"
        class="p-1.5 rounded hover:bg-black/30 text-slate-400 hover:text-mystery-blood"
        title="标记为凶手"
      >
        <Skull class="w-4 h-4" />
      </button>
      <button
        @click="remove"
        class="p-1.5 rounded hover:bg-black/30 text-slate-400 hover:text-red-400"
        title="删除档案"
      >
        <Trash2 class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
