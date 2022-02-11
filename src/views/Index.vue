<script setup lang="ts">
import { Types } from "@/types";
import { ref, reactive } from "vue";

const SIZE = 10 * 1024 * 1024;
const data = ref([] as Types.FileChunk[]);
const container = reactive({
  file: null as (File | null),
});

const handleFileChange = (event: Event) => {
  const [file] = (<HTMLInputElement>event.target).files as Iterable<File>;

  if (!file) return;
  container.file = file;
};

const handleUpload = () => {
  if (!container.file) return;
  const fileChunkList = createFileChunk(container.file);

  data.value = fileChunkList.map(({ file }, index) => ({
    chunk: file,
    hash: `${container.file?.name}-${index}`,
  }));
  uploadChunks();
};

const createFileChunk = (file: File, size = SIZE) => {
  const fileChunkList = [];
  let curr = 0;

  while (curr < file.size) {
    fileChunkList.push({ file: file.slice(curr, curr + size)});
    curr += size;
  }
  return fileChunkList;
};

const uploadChunks = async() => {
  const requestList = data.value.map(({ chunk, hash }) => {
    const formData = new FormData();

    formData.append('chunk', chunk);
    formData.append('hash', hash);
    container.file && formData.append('filename', container.file.name);
    return { formData };
  })
  .map(({ formData }) => {
    /** Promise */
  });

  await Promise.all(requestList);
};
</script>

<template>
  <input type="file" @change="handleFileChange">
  <button @click="handleUpload">上傳</button>
</template>

<style scoped>

</style>