<template>
    <div id="app">
        <router-view v-if="isPageLoaded" />
        <v-preloader 
            v-else 
            class="app__preloader" 
        />
        <v-alert />
    </div>
</template>

<script>
import VAlert from '@/components/common/VAlert';
import VPreloader from '@/components/common/VPreloader';

export default {
    name: 'App',

    components: {
        VAlert,
        VPreloader 
    },

    data() {
        return {
            isPageLoaded: false
        };
    },

    async created() {
        // Перед отрисовкой страницы, получать данные пользователя
        await this.$service.users.getUser();
        this.isPageLoaded = true;
    }
};
</script>

<style lang="scss">
@import '~@/assets/scss/fonts.scss';
@import '~normalize.css/normalize.css';

#app {
    font-family: 'Circe', 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $color-black;

    display: flex;
    flex-direction: column;
    min-height: 100%;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: $color-black;
    }
}

body {
    margin: 0; /* Убираем отступы */
    user-select: none; /* Чтобы не выделялся текст */
}

html,
body,
#app {
    height: 100%;
}

.app__preloader {
    width: 80px;
    height: 80px;
    position: absolute;
    top: calc(50% - 40px);
    left: calc(50% - 40px);
}

// Отлючение дефолтных свойст браузера для тегов
* {
    margin: 0;
    padding: 0;
    text-align: left;
    box-sizing: border-box;
}

a {
    color: inherit;
    text-decoration: none;
}

button {
    text-decoration: none;
    outline: none;
    cursor: pointer;
}

ul {
    list-style: none;
}

h1,
h2 {
    font-size: 100%;
    font-weight: normal;
    margin: 0%;
}

input::-ms-reveal,
input::-ms-clear {
    display: none;
}
</style>