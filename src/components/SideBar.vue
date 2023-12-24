<script setup lang="ts">
    import { ref } from 'vue'
    import DatabaseIcon from './DatabaseIcon.vue'
    import DatabaseOutlineIcon from './DatabaseOutlineIcon.vue'

    const indexSelected = ref<number>(-1)

    defineProps([
        'databases'
    ])

    const setDatabase = (database: string, index: number) => {
        localStorage.setItem('database', database)
        indexSelected.value = index
    }

</script>

<template>
    <div class="flex flex-col pl-2 bg-green-500 rounded text-white">
        <div class="flex flex-row gap-x-1 mt-1 mb-2">
            <div class="mt-1">
                <database-icon/>
            </div>
            <span>Bancos</span>
        </div>
        <div class="flex flex-row gap-x-1 hover:text-green-200" v-for="(database, index) in databases">
            <div class="mt-1">
                <DatabaseOutlineIcon v-if="indexSelected.value === index"/>
                <DatabaseIcon v-else/> 
            </div>
            <button type="button"
                :data-modal-target="Object.keys(database)[0]"
                :data-modal-toggle="Object.keys(database)[0]"
                @click="setDatabase(Object.keys(database)[0], index)"
            >
                {{ Object.keys(database)[0] }}
            </button>
        </div>
    </div>
</template>
