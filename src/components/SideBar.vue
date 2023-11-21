<script setup lang="ts">
    import DatabaseIcon from './DatabaseIcon.vue'
    import TableIcon from './TableIcon.vue'
</script>

<template>
    <div class="flex flex-col pl-2 bg-green-500 rounded text-white">
        <div class="flex flex-row gap-x-1">
            <div class="mt-1">
                <DatabaseIcon/>
            </div>
            <span>Database</span>
        </div>
    </div>
</template>
