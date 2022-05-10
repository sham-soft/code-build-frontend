<template>
    <div 
        v-click-outside="onClickOutside"
        class="menu" 
        :class="componentClasses"
    >
        <div 
            class="menu__main" 
            @click="isDropdown = !isDropdown"
        >
            <v-icon
                v-if="!isDropdown || isDesktop"
                class="menu__icon-user"
                path="img/user.svg"
            />

            <v-icon 
                v-else
                class="menu__icon-close" 
                path="img/close.svg" 
                @click.stop.native="isDropdown = false"
            />

            <div class="menu__user">
                <span class="menu__name">{{ user.name }}</span>
                <v-icon
                    class="menu__icon-angle-bracket"
                    path="img/angleBracketMenu.svg"
                />
            </div>
        </div>

        <menu-user-dropdown 
            v-if="isDropdown" 
            @close="onClickOutside" 
        />
    </div>
</template>

<script>
// Components
import { mapState } from 'vuex';
import VIcon from '@/components/common/VIcon';
import MenuUserDropdown from '@/components/header/MenuUserDropdown';

// Mixins
import window from '@/mixins/window';

export default {
    name: 'MenuUser',

    components: {
        VIcon,
        MenuUserDropdown
    },

    mixins: [window],

    computed: {
        componentClasses() {
            return {
                menu_open: this.isDropdown,
            };
        },

        ...mapState({
            user: state => state.user,
        })
    },

    data() {
        return {
            isDropdown: false
        };
    },

    methods: {
        onClickOutside() {
            this.isDropdown = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.menu {
    @extend .flex_row-center;
    position: relative;
    font-size: 18px;
    color: $color-black;
}

.menu__main {
    @extend .flex_row;
}

.menu__icon-user {
    @extend .flex_row-center-center;
    width: 44px;
    height: 44px;
    border: 1px solid $color-blue;
    border-radius: 8px;
    stroke: $color-blue;
    padding: 13px;
}

.menu__icon-close {
    display: none;
    width: 38px;
    height: 38px;
    stroke: $color-blue;
    padding: 8px;
}

.menu__user {
    @extend .flex_row-center;
    margin-left: 20px;

    &:hover {
        cursor: pointer;

        .menu__icon-angle-bracket {
            stroke: $color-blue;
        }
    }
}

.menu__name {
    max-width: 250px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.menu__icon-angle-bracket {
    width: 9px;
    height: 7px;
    stroke: $color-gray;
    margin-left: 12px;
}

// Модификаторы
.menu_open {
    .menu__icon-angle-bracket {
        transform: rotate(180deg)
    }
}

@media screen and (max-width: 1023px) {
    .menu__icon-user {
        width: 38px;
        height: 38px;
        padding: 11px;
    }

    .menu__icon-close {
        display: block;
    }

    .menu__user {
        display: none;
    }

    .menu__name {
        max-width: 140px;
    }
}
</style>