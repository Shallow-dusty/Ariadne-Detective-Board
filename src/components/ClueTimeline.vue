<script setup>
import { ref, computed } from "vue";
import { Clock, MapPin, Link2, Plus, X } from "lucide-vue-next";
import { useCaseStore } from "../stores/useCaseStore";
import BaseButton from "./ui/BaseButton.vue";

const store = useCaseStore();

const newClue = ref({
  time: "",
  content: "",
  linkedSuspectIds: [],
});

const add = () => {
  if (!newClue.value.content) return;
  store.addClue({ ...newClue.value });
  newClue.value.content = "";
  newClue.value.time = "";
  newClue.value.linkedSuspectIds = [];
};

const toggleLink = (suspectId) => {
  const ids = newClue.value.linkedSuspectIds;
  if (ids.includes(suspectId)) {
    newClue.value.linkedSuspectIds = ids.filter((id) => id !== suspectId);
  } else {
    newClue.value.linkedSuspectIds.push(suspectId);
  }
};

// Helper to get suspect name
const getSuspectName = (id) =>
  store.suspects.find((s) => s.id === id)?.name || "Unknown";
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Input Area -->
    <div
      class="p-4 bg-mystery-800/50 border-b border-mystery-700/50 backdrop-blur-sm sticky top-0 z-10"
    >
      <div class="flex gap-2 mb-2">
        <div class="relative w-24 shrink-0">
          <Clock class="absolute left-2 top-2.5 w-4 h-4 text-slate-500" />
          <input
            v-model="newClue.time"
            type="text"
            placeholder="时间"
            class="w-full bg-mystery-900 border border-mystery-700 rounded px-2 py-2 pl-8 text-sm focus:border-mystery-gold focus:outline-none"
          />
        </div>
        <input
          v-model="newClue.content"
          type="text"
          placeholder="发现了什么线索？"
          class="flex-1 bg-mystery-900 border border-mystery-700 rounded px-3 py-2 text-sm focus:border-mystery-gold focus:outline-none"
          @keydown.enter="add"
        />
        <BaseButton @click="add" variant="primary">
          <Plus class="w-4 h-4" />
        </BaseButton>
      </div>

      <!-- Quick Link Suspects -->
      <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button
          v-for="s in store.suspects"
          :key="s.id"
          @click="toggleLink(s.id)"
          class="px-2 py-1 rounded text-xs border transition-colors whitespace-nowrap"
          :class="
            newClue.linkedSuspectIds.includes(s.id)
              ? 'bg-mystery-gold/20 border-mystery-gold text-mystery-gold'
              : 'bg-mystery-900 border-mystery-700 text-slate-500 hover:border-slate-500'
          "
        >
          @{{ s.name }}
        </button>
      </div>
    </div>

    <!-- Timeline List -->
    <div class="flex-1 overflow-y-auto p-4 space-y-6">
      <div
        v-if="store.clues.length === 0"
        class="text-center text-slate-600 py-10 italic"
      >
        暂无线索...
      </div>

      <div
        v-for="(clue, index) in store.clues"
        :key="clue.id"
        class="relative pl-6 border-l-2 border-mystery-700 last:border-transparent animate-slide-up"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <!-- Dot -->
        <div
          class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-mystery-900 border-2 border-mystery-gold box-content"
        ></div>

        <div
          class="bg-mystery-800 rounded p-3 text-sm hover:bg-mystery-700/50 transition-colors group"
        >
          <div class="flex justify-between items-start mb-1">
            <span class="text-mystery-gold font-mono text-xs font-bold">{{
              clue.time || "Unknown Time"
            }}</span>
            <button
              @click="store.removeClue(clue.id)"
              class="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X class="w-3 h-3" />
            </button>
          </div>
          <p class="text-slate-200 leading-relaxed">{{ clue.content }}</p>

          <!-- Tags -->
          <div
            v-if="clue.linkedSuspectIds.length"
            class="mt-2 flex gap-1 flex-wrap"
          >
            <span
              v-for="sid in clue.linkedSuspectIds"
              :key="sid"
              class="bg-black/30 text-slate-400 px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1"
            >
              <Link2 class="w-3 h-3" /> {{ getSuspectName(sid) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
