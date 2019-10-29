<template>
    <div id="mainApp">
        <div id="chat">
            <div v-for="(msg, index) in messagesArray" v-bind:key="index">
                <div v-bind:class="{ reveicer: msg.socketid != anotherUser }"><span class="nickname">{{ msg.sender+": "}}</span>{{ msg.message }}</div>
            </div>
            <div id="anchor"></div>
        </div>
        <div id="inputFlexContainer">
            <textarea v-model="message" @keyup.enter="sendMessage" maxlength="100"></textarea>
            <div class="Btn enter" @click="sendMessage">Enter</div>
            <div class="Btn leave" @click="leaveRoom">Leave</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            message: ''
        }
    },
    computed: mapState({
        nickname: state => state.nickname,
        messagesArray: state => state.messagesArray,
        anotherUser: state => state.anotherUser
    }),
    methods: {
        leaveRoom() {
            this.$store.dispatch('sendMessage', 'USER LEFT.');
            this.$store.dispatch('leaveRoom');
        },
        sendMessage() {
            if(this.message.length > 1) {
                this.messagesArray.push({ sender: this.nickname, message: this.message })
                this.$store.dispatch('sendMessage', this.message);
            }
            this.message = '';
        }
    },
    destroyed() {
        this.$store.dispatch('sendMessage', 'USER LEFT.');
        this.$store.dispatch('onDestroy');
    }
}
</script>

<style scoped>
    #mainApp {
        width: 600px;
        margin: 60px auto;
    }
    
    #chat {
        box-sizing: border-box;
        padding: 5px;
        height: 500px;
        width: 100%;
        background-color: rgba(250, 252, 192, 0.87);
        word-wrap: break-word;
        overflow-y: scroll;
    }
    
    #chat * {
        overflow-anchor: none;
    }

    #anchor {
        overflow-anchor: auto;
        height: 1px;
    }
    
    #inputFlexContainer {
        display: flex;
        flex-direction: row;
        height: 40px;
    }
    
    textarea {
        box-sizing: border-box;
        width: 500px;
        margin: 0;
        border: 1px solid black;
        resize : none;
        height: 40px;
    }

    .Btn {
        box-sizing: border-box;
        margin: 0;
        width: 100px;
        border: none;
        padding: 0;
        color: white;
        text-align: center;
        font-size: 20px;
        padding: 10px 0px;
        cursor: pointer;
    }

    .enter {
        background-color: rgb(97, 226, 107);
    }

    .leave {
        background-color: rgb(224, 106, 85);
    }

    .nickname {
        font-weight: 600;
    }

    .reveicer {
        background-color: rgb(175, 243, 155) !important;
    }

    @media (max-width: 600px) { 
        #mainApp {
            width: 100%;
            height: 80%;
            margin-top: 8vh;
        }

        #chat {
            height: 86vh;
            width: 100%;
        }
    
        textarea {
            height: 6vh;
            width: 80%;
        }

        #sendBtn {
            width: 20%;
            height: 6vh;
        }
    }
</style>