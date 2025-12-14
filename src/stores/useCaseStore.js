import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { ref, computed } from "vue";

export const useCaseStore = defineStore("case", () => {
  // State - Automatically persisted to localStorage
  const scriptTitle = useStorage("ariadne-title", "无名剧本");

  const suspects = useStorage("ariadne-suspects", [
    { id: 1, name: "嫌疑人A", isKiller: false, note: "动机不明", avatar: null },
  ]);

  const clues = useStorage("ariadne-clues", [
    {
      id: 1,
      time: "19:00",
      content: "案发时间点",
      linkedSuspectIds: [],
      type: "info",
    },
  ]);

  // Actions
  const addSuspect = (name) => {
    const id = Date.now();
    suspects.value.push({
      id,
      name: name || "新嫌疑人",
      isKiller: false,
      note: "",
      avatar: null,
    });
  };

  const removeSuspect = (id) => {
    suspects.value = suspects.value.filter((s) => s.id !== id);
  };

  const toggleKiller = (id) => {
    const s = suspects.value.find((s) => s.id === id);
    if (s) s.isKiller = !s.isKiller;
  };

  const updateSuspect = (id, updates) => {
    const index = suspects.value.findIndex((s) => s.id === id);
    if (index !== -1) {
      suspects.value[index] = { ...suspects.value[index], ...updates };
    }
  };

  const addClue = (clueData) => {
    clues.value.push({
      id: Date.now(),
      time:
        clueData.time ||
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      content: clueData.content || "",
      image: clueData.image || null, // Base64 string
      linkedSuspectIds: clueData.linkedSuspectIds || [],
      type: clueData.type || "normal",
    });
  };

  const removeClue = (id) => {
    clues.value = clues.value.filter((c) => c.id !== id);
  };

  const resetCase = () => {
    if (confirm("确定要重置所有数据吗？此操作不可撤销。")) {
      scriptTitle.value = "无名剧本";
      suspects.value = [];
      clues.value = [];
    }
  };

  const exportState = () => {
    const state = {
      version: 1,
      title: scriptTitle.value,
      suspects: suspects.value,
      clues: clues.value,
      timestamp: Date.now(),
    };
    return JSON.stringify(state, null, 2);
  };

  const importState = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      // Basic validation
      if (!data.suspects || !Array.isArray(data.suspects))
        throw new Error("Invalid suspects data");
      if (!data.clues || !Array.isArray(data.clues))
        throw new Error("Invalid clues data");

      scriptTitle.value = data.title || "Imported Case";
      suspects.value = data.suspects;
      clues.value = data.clues;
      return true;
    } catch (e) {
      console.error("Import failed:", e);
      alert("导入失败：文件格式错误");
      return false;
    }
  };

  // Getters
  const killer = computed(() => suspects.value.find((s) => s.isKiller));

  return {
    scriptTitle,
    suspects,
    clues,
    addSuspect,
    removeSuspect,
    toggleKiller,
    updateSuspect,
    addClue,
    removeClue,
    resetCase,
    exportState,
    importState,
    killer,
  };
});
