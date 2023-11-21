<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import DatabaseIcon from './DatabaseIcon.vue'
    import DatabaseOutlineIcon from './DatabaseOutlineIcon.vue'

    const databases = ref([])

    async function getDatabases() {
        const response = await fetch('http://localhost:5500/database', {
            method: 'GET',
            headers: {
                accept: 'application.json',
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        })

        return response.json()
    }

    onMounted(async () => databases.value = await getDatabases()) 

    // console.log(databases.json())
</script>

<template>
    <div class="flex flex-col pl-2 bg-green-500 rounded text-white">
        <div class="flex flex-row gap-x-1 mt-1 mb-2">
            <div class="mt-1">
                <DatabaseIcon/>
            </div>
            <span>Bancos</span>
        </div>
        <div class="flex flex-row gap-x-1 hover:text-green-200" v-for="database in databases">
            <div class="mt-1">
                <DatabaseOutlineIcon/>
            </div>
            <button type="button"
                :data-modal-target="Object.keys(database)[0]"
                :data-modal-toggle="Object.keys(database)[0]"
            >
                {{ Object.keys(database)[0] }}
            </button>
        </div>
    </div>
</template>
