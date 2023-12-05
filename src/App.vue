<script lang="ts">
    import { onMounted, ref, watch } from 'vue'
    import SideBar from './components/SideBar.vue'
    import PlaygroundArea from './components/PlaygroundArea.vue'
    import OptionBar from './components/OptionBar.vue'
    import { getDatabases } from './helpers/requests'

    export default {
        components: {
            SideBar, PlaygroundArea, OptionBar
        },
        setup() {
            const statements = ref<string>('')
            
            const result = ref([])
            
            const databases = ref([])

            const setStatements = (newValue: string) => statements.value = newValue

            const setResult = (newValue) => result.value = newValue

            watch(result, async (newValue, oldValue) => {
                databases.value = await getDatabases()
            })

            onMounted(async () => databases.value = await getDatabases())

            return {
                statements, setStatements,
                result, setResult,
                databases
            }
        },
    }
</script>

<template>
    <div class="m-12 grid grid-cols-10 gap-x-2">
        <side-bar class="col-span-2" :databases="databases"/>
        <div class="flex flex-col gap-y-2 col-span-8">
           <option-bar :statements="statements.value" @updateResult="setResult"/>
           <playground-area @updateStatements="setStatements" />
        </div>
    </div>
</template>
