<script setup lang="ts">
    import SettingsIcon from './SettingsIcon.vue'
    import FileExportIcon from './FileExportIcon.vue'
    import PlayIcon from './PlayIcon.vue'
</script>

<template>
    <div class="flex flex-row gap-x-4 px-2 py-1 bg-green-500 rounded text-white">
        <div>
            <button class="hover:text-green-200 flex flex-row gap-x-1" type="button">
                <div class="mt-1">
                    <PlayIcon />
                </div>
                Executar
            </button>
        </div>
        <div>
            <button class="hover:text-green-200 flex flex-row gap-x-1" type="button">
                <div class="mt-1">
                    <SettingsIcon />
                </div>
                Configurações
            </button>
        </div>
        <div>
            <button class="hover:text-green-200 flex flex-row gap-x-1" type="button">
                <div class="mt-1">
                    <FileExportIcon />
                </div>
                Exportar
            </button>
        </div>
    </div>
</template>
