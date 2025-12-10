<script setup>
import { computed, ref, onMounted } from "vue";
import { useCaseStore } from "../stores/useCaseStore";

const store = useCaseStore();
const svgRef = ref(null);

// Simple force-directed graph or circular layout calculation
const nodes = computed(() => {
  const count = store.suspects.length;
  const radius = 120;
  const center = { x: 200, y: 150 };

  return store.suspects.map((s, index) => {
    const angle = (index / count) * 2 * Math.PI - Math.PI / 2;
    return {
      ...s,
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    };
  });
});

const links = computed(() => {
  const lines = [];
  store.clues.forEach((clue) => {
    if (clue.linkedSuspectIds.length > 1) {
      // Create links between all suspects in this clue
      for (let i = 0; i < clue.linkedSuspectIds.length; i++) {
        for (let j = i + 1; j < clue.linkedSuspectIds.length; j++) {
          const s1 = nodes.value.find((n) => n.id === clue.linkedSuspectIds[i]);
          const s2 = nodes.value.find((n) => n.id === clue.linkedSuspectIds[j]);
          if (s1 && s2) {
            lines.push({ x1: s1.x, y1: s1.y, x2: s2.x, y2: s2.y, id: clue.id });
          }
        }
      }
    }
  });
  return lines;
});
</script>

<template>
  <div
    class="bg-mystery-900 border border-mystery-700 rounded-lg p-4 relative overflow-hidden flex flex-col items-center justify-center min-h-[350px]"
  >
    <h3
      class="absolute top-4 left-4 font-serif text-mystery-gold/50 text-sm tracking-widest uppercase"
    >
      Investigation Board
    </h3>

    <svg width="400" height="300" class="max-w-full">
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="20"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="#d97706" />
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Links (Red strings) -->
      <line
        v-for="(link, i) in links"
        :key="i"
        :x1="link.x1"
        :y1="link.y1"
        :x2="link.x2"
        :y2="link.y2"
        stroke="#e11d48"
        stroke-width="1"
        opacity="0.6"
        class="animate-pulse"
      />

      <!-- Nodes -->
      <g v-for="node in nodes" :key="node.id">
        <!-- Connection Line Halo -->
        <circle
          :cx="node.x"
          :cy="node.y"
          r="22"
          :fill="node.isKiller ? '#e11d48' : '#1e293b'"
          opacity="0.3"
          filter="url(#glow)"
        />

        <!-- Main Circle -->
        <circle
          :cx="node.x"
          :cy="node.y"
          r="18"
          :fill="node.isKiller ? '#881337' : '#0f172a'"
          :stroke="node.isKiller ? '#e11d48' : '#475569'"
          stroke-width="2"
        />

        <!-- Text Initials -->
        <text
          :x="node.x"
          :y="node.y"
          dy=".35em"
          text-anchor="middle"
          fill="white"
          font-size="12"
          font-weight="bold"
          pointer-events="none"
        >
          {{ node.name.charAt(0) }}
        </text>

        <!-- Label below -->
        <text
          :x="node.x"
          :y="node.y + 35"
          text-anchor="middle"
          class="text-[10px] fill-slate-400 font-sans"
        >
          {{ node.name }}
        </text>
      </g>
    </svg>

    <div
      v-if="links.length === 0 && nodes.length > 0"
      class="absolute bottom-4 text-xs text-slate-600"
    >
      关联线索以生成连线...
    </div>
  </div>
</template>
