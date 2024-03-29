<template>
    <div class="reg">
        <v-icon 
            class="reg__logo" 
            path="img/logo.svg" 
        />

        <h1 class="reg__title">Зарегистрируйтесь в Code Build</h1>

        <v-input 
            v-model="form.name" 
            class="reg__name"
            formatName="formatString"
            maxLength="20"
        > 
            Имя 
        </v-input>

        <v-input
            v-model="form.email"
            class="reg__mail"
            :errorMessage="errors.email"
            @change="errors.email = ''"
            @blur="validateEmail"
        >
            E-mail
        </v-input>

        <div class="reg__consent">
            <v-check-box 
                v-model="form.checkbox" 
            />

            <div class="reg__consent-text">
                Я согласен с условиями обработки
                <a
                    class="reg__consent-link"
                    href="https://s3.timeweb.com/cm25643-code-build-media/pdf/Обработка персональных данных.pdf"
                    target="_blank"
                > 
                    персональных данных
                </a>
            </div>
        </div>

        <v-button 
            class="reg__button" 
            :type="typeButton" 
            :isLoaded="isPageLoaded" 
            @click="onSign()"
        >
            Зарегистрироваться
        </v-button>

        <div class="reg__footer">
            У вас уже есть аккаунт?
            <router-link 
                class="reg__auth" 
                to="/auth" 
            > 
                Войти 
            </router-link>
        </div>
    </div>
</template>

<script>
// Components
import VIcon from '@/components/common/VIcon';
import VInput from '@/components/common/VInput';
import VButton from '@/components/common/VButton';
import VCheckBox from '@/components/common/VCheckBox';

// Helpers
import { REGEX_EMAIL } from '@/helpers/constants';

export default {
    name: 'RegFormMain',

    components: {
        VIcon,
        VInput,
        VButton,
        VCheckBox
    },

    data() {
        return {
            isPageLoaded: true,

            form: {
                name: '',
                email: '',
                checkbox: false
            },

            errors: {
                email: ''
            }
        };
    },

    computed: {
        isValid() {
            const { name, email, checkbox } = this.form;
            return name && REGEX_EMAIL.test(email) && checkbox;
        },

        typeButton() {
            return this.isValid ? 'primary' : 'disabled';
        }
    },

    mounted() {
        const routeEmail = this.$route.params.email;
        
        if (routeEmail) {
            this.form.email = routeEmail;
        }
    },

    methods: {
        validateEmail() {
            if (!REGEX_EMAIL.test(this.form.email)) {
                this.errors.email = 'Неверный формат';
            } else {
                this.errors.email = '';
            }
        },

        async onSign() {
            if (!this.isValid) return;
            this.isPageLoaded = false;

            try {
                await this.$service.reg.signIn(this.form);
                this.$emit('changeForm', this.form);
            } catch ({ data }) {
                this.errors.email = data.message;
            } finally {
                this.isPageLoaded = true;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.reg {
    @extend .flex_column-start-center;
}

.reg__logo {
    @extend .flex_row-center-center;
    width: 107px;
    height: 75px;
    border: 3px solid $color-blue;
    border-radius: 6px;
    fill: $color-blue;
}

.reg__title {
    margin-top: 25px;
    font-size: 22px;
    text-align: center;
    color: $color-black;
}

.reg__name {
    margin-top: 70px;
}

.reg__mail {
    margin-top: 40px;
}

.reg__consent {
    @extend .flex_row-center;
    align-self: flex-start;
    margin-top: 40px;

    &-text {
        margin-left: 10px;
        line-height: 15px;
        font-size: 13px;
        color: $color-gray;
    }

    &-link {
        display: block;
        color: $color-blue;

        @media screen and (min-width: 1160px) {
            &:hover {
                color: $color-black;
            }
        }
    }
}

.reg__button {
    width: 100%;
    height: 70px;
    margin-top: auto;
    font-family: 'EuclidCircular';
    font-size: 20px;
}

.reg__footer {
    margin-top: 25px;
    font-size: 16px;
    color: $color-gray;
}

.reg__auth {
    margin-left: 5px;
    font-weight: bold;
    color: $color-black;
    background: no-repeat 0 90%;
    background-image: linear-gradient($color-blue, $color-blue);
    background-size: 100% 2px;

    @media screen and (min-width: 1160px) {
        &:hover {
            cursor: pointer;
            color: $color-blue;
        }
    }
}

@media screen and (max-width: 575px) {
    .reg__logo {
        width: 71px;
        height: 50px;
        border-width: 2px;
        border-radius: 3px;
    }

    .reg__title {
        margin-top: 15px;
        font-size: 18px;
        line-height: 20px;
        max-width: 210px;
    }

    .reg__name {
        margin-top: 35px;
    }

    .reg__mail {
        margin-top: 20px;
    }

    .reg__consent {
        margin-top: 55px;

        &-text {
            margin-left: 9px;
            line-height: 12px;
            font-size: 11px;
            color: $color-gray;
        }

        &-link {
            display: block;
            color: $color-blue;;
        }
    }

    .reg__button {
        height: 45px;
        font-size: 15px;
    }

    .reg__footer {
        margin-top: 13px;
        font-size: 12px;
    }

    .reg__auth {
        margin-left: 2px;
        font-weight: 700;
        background-size: 100% 1px;
    }
}

@media screen and (max-width: 375px) {
    .reg__consent {
        margin-top: 37px;
    }
}
</style>