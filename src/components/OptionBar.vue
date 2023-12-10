<script setup lang="ts">
    import { defineProps, defineEmits } from 'vue'
    import { useSound } from '@vueuse/sound'
    
    import executionSoundEffect from '../assets/execution-effect.mp3'
    import SettingsIcon from './SettingsIcon.vue'
    import FileExportIcon from './FileExportIcon.vue'
    import PlayIcon from './PlayIcon.vue'

    defineProps([
        'statements'
    ])

    const emit = defineEmits([
        'updateResult'
    ])

    const { play } = useSound(executionSoundEffect)

    async function execStatements(statements: string) {
        if (!Boolean(statements)) {
            return alert('SQL inválido! Statement está vazio!')
        }

        interface Body {
            statements: Array<string>,
            database?: String
        }

        const body: Body = {
            statements: statements.split(';').filter(statement => statement !== '' && statement !== null),
        };

        if (localStorage.hasOwnProperty('database'))
            body['database'] = localStorage.getItem('database')

        const response = await fetch('http://localhost:5500/statements', {
            method: 'POST',
            headers: {
                accept: 'application.json',
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(body)
        })

        play()

        emit('updateResult', await response.json())
    }
</script>

<template>
    <div class="flex flex-row gap-x-4 px-2 py-1 bg-green-500 rounded text-white">
        <div>
            <button class="hover:text-green-200 flex flex-row gap-x-1" type="button" @click="execStatements(statements)">
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
