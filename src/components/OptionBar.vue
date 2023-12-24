<script setup lang="ts">
    import { ref, defineEmits } from 'vue'
    import { onClickOutside } from '@vueuse/core'
    import { useSound } from '@vueuse/sound'
    
    import executionSoundEffect from '../assets/execution-effect.mp3'
    import SettingsIcon from './SettingsIcon.vue'
    import FileExportIcon from './FileExportIcon.vue'
    import PlayIcon from './PlayIcon.vue'
    import CloseIcon from './CloseIcon.vue'
    import { makeBackup } from './../helpers/requests'


    const showModal = ref(false);
    const modal = ref(null)

    onClickOutside(modal, () => showModal.value = false)
    defineProps(['statements'])
    
    const emit = defineEmits(['updateResult'])
    const { play } = useSound(executionSoundEffect)

    const caracalEffectEnable = ref(true)

    const setCaracalEffect = () => {
        console.log(caracalEffectEnable);
        localStorage.setItem('caracalEffectEnable', caracalEffectEnable.value ? 'enabled' : 'disabled')
    }

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

        if (localStorage.hasOwnProperty('caracalEffectEnable') && localStorage.getItem('caracalEffectEnable') == 'enabled')
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
            <button @click="showModal = true" class="hover:text-green-200 flex flex-row gap-x-1" type="button">
                <div class="mt-1">
                    <SettingsIcon />
                </div>
                Configurações
            </button>
        </div>
        <Teleport to="#settings-modal">
            <Transition name="modal">
                <div class="modal-bg" v-if="showModal">
                    <div class="modal bg-green-500" ref="modal">
                        <button @click="showModal = false" class="close-btn">
                            <close-icon/>
                        </button>
                        <div class="grid grid-cols-2 gap-6">
                            <span class="text-white">Aparência do site</span>
                            <select name="design" id="design" class="pl-1 rounded">
                                <option value="0" @select="">Padrão</option>
                                <option value="1" @select="">Clássica</option>
                            </select>
                            <span class="text-white">Som de Caracal</span>
                            <label class="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox" value="1" class="sr-only peer"
                                v-model="caracalEffectEnable"
                                @change="() => setCaracalEffect()"
                            >
                                <div class="w-11 h-6 bg-green-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-green-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
        <div>
            <button class="hover:text-green-200 flex flex-row gap-x-1" type="button" @click="() => makeBackup()">
                <div class="mt-1">
                    <FileExportIcon />
                </div>
                Exportar
            </button>
        </div>
    </div>
</template>

<style>
.modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    position: relative;
    padding: 50px 50px;
    border-radius: 5px;
    box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
}

.modal .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.modal-enter-active, .modal-leave-active {
    transition: all 0.25s ease;
}

.modal-enter-from, .modal-leave-to {
    opacity: 0;
    transform: scale(1.1);
}
</style>