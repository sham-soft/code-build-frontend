<template>
    <div class="form">
        <h1 class="form__title">Введите код</h1>

        <h2 class="form__subtitle">
            Мы отправили письмо с паролем<br />
            на почту {{ form.email }},<br />
            введите пароль из письма<br />
        </h2>

        <v-input
            v-model="password"
            class="form__password"
            :error-message="passwordError"
            @change="passwordError = ''"
            @keyup.enter.native="confirmRegistration()"
        >
            Пароль
        </v-input>

        <div class="form__send">
            <div v-if="interval">
                Отправить новый пароль через {{ time }}
            </div>
            <div 
                v-else 
                class="form__send-again" 
                @click="sendCodeAgain()"
            >
                Отправить пароль повторно
            </div>
        </div>

        <v-button
            class="form__button"
            :type="typeButton" 
            :isLoaded="isPageLoaded"
            @click="confirmRegistration()"
        >
            Подтвердить
        </v-button>
    </div>
</template>

<script>
import VInput from '@/components/common/VInput';
import VButton from '@/components/common/VButton';

export default {
    name: 'RegFormConfirm',

    components: { 
        VInput, 
        VButton 
    },

    props: {
        form: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    
    computed: {
        time() {
            let minutes = this.interval >= 60 ? '01' : '00';
            let newInterval = this.interval >= 60 ? this.interval - 60 : this.interval;
            let seconds = newInterval > 9 ? newInterval : '0' + newInterval;
            return minutes + ':' + seconds;
        },

        isValid() {
            return this.form.email && this.password;
        },

        typeButton() {
            return this.isValid ? 'primary' : 'disabled';
        }
    },

    data() {
        return {
            isPageLoaded: true,
            interval: 119,
            password: '',
            passwordError: ''
        };
    },

    mounted() {
        this.startTimer();
    },

    methods: {
        startTimer() {
            let timer = setInterval(() => {
                if (this.interval > 0) {
                    this.interval--;
                } else clearInterval(timer);
            }, 1000);
        },

        async sendCodeAgain() {
            try {
                await this.$service.reg.signIn(this.form);
                this.interval = 119;
                this.startTimer();
                this.passwordError = '';
            } catch ({ data }) {
                this.passwordError = data.message;
            }
        },

        async confirmRegistration() {
            if (!this.isValid) return;
            this.isPageLoaded = false;

            const payload = {
                email: this.form.email,
                password: this.password
            };

            try {
                await this.$service.reg.completion(payload);
            } catch ({ data }) {
                this.passwordError = data.message;
            } finally {
                this.isPageLoaded = true;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.form {
    @extend .flex_column;
}

.form__title {
    font-size: 26px;
    color: $color-black;
}

.form__subtitle {
    margin-top: 60px;
    font-size: 20px;
    line-height: 28px;
    color: $color-black;
}

.form__password {
    margin-top: 20px;
}

.form__send {
    @extend .flex_row-center-between;
    margin-top: 40px;
    font-size: 20px;
    line-height: 24px;
    color: $color-black;
}

.form__send-again {
    cursor: pointer;
    color: $color-blue;

    &:hover {
        opacity: 0.7;
    }
}

.form__button {
    height: 70px;
    margin-top: auto;
    font-family: 'EuclidCircular';
    font-size: 20px;
}

@media screen and (max-width: 575px) {
    .form__title {
        font-size: 18px;
    }

    .form__subtitle {
        margin-top: 30px;
        font-size: 14px;
        line-height: 20px;
    }

    .form__send {
        margin-top: 20px;
        font-size: 12px;
        line-height: 14px;
    }

    .form__button {
        height: 45px;
        font-size: 15px;
    }
}
</style>