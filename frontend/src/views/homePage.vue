<template>
    <div id="homePageInputForm">
        Nickname:<br>
        <input type=text maxlength="15" v-model="nick" @keyup.enter="enterRoom"><br>
        <button @click="enterRoom">Enter</button>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            nick: ''
        }
    },
    computed: mapState({
        nickname: state => state.nickname,
        messagesArray: state => state.messagesArray,
    }),
    methods: {
        enterRoom() {
            if(this.nick.length > 3) {
                this.$store.dispatch('enterRoom', this.nick);
            }
        }
    }
}
</script>

<style scoped>
    #homePageInputForm {
        box-sizing: border-box;
        padding: 100px;
        height: 400px;
        width: 500px;
        text-align: center;
        margin: auto;
    }

    input {
        margin: 10px;
    }

    @media (max-width: 1010px) {
        #homePageInputForm {
            height: auto;
            width: 100%;
        }
    }
</style>