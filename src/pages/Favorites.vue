<template>
    <div 
        v-if="isAuth" 
        class="favorites__wrap"
    >
        <div class="favorites">
            <div class="favorites__header">
                <h1 class="favorites__title">Избранное</h1>

                <v-filter-group
                    v-model="filterId"
                    class="favorites__filters"
                    :array="filterList"
                    @change="setFavoriteList"
                />
            </div>

            <card-preloader 
                v-if="isPageLoading" 
                class="favorites__preloader" 
            />

            <div class="favorites__list">
                <div 
                    v-for="(item, index) in favoriteList" 
                    :key="index"
                    class="favorites__card"
                >
                    <card-course
                        v-if="filterId === 1"
                        :course="item"
                        @click="$router.push(`/course?id=${item.id}`)"
                    />

                    <card-lesson
                        v-if="filterId === 2"
                        :lesson="item"
                        @click="$router.push(`/course?id=${item.courseId}`)"
                    />

                    <card-article
                        v-if="filterId === 3"
                        :article="item"
                        @click="$router.push(`/article?id=${item.id}`)"
                    />
                </div>
            </div>
        </div>

        <block-subscribe class="favorites__subscribe" />
    </div>
</template>

<script>
// Components
import CardCourse from '@/components/cards/CardCourse';
import CardLesson from '@/components/cards/CardLesson';
import CardArticle from '@/components/cards/CardArticle';
import CardPreloader from '@/components/cards/CardPreloader';
import BlockSubscribe from '@/components/blocks/BlockSubscribe';
import VFilterGroup from '@/components/common/VFilterGroup';
import { mapGetters } from 'vuex';

// Helpers
import { createNotification } from '@/helpers/notification';

export default {
    name: 'Favorites',

    components: {
        CardCourse,
        CardLesson,
        CardArticle,
        CardPreloader,
        BlockSubscribe,
        VFilterGroup
    },

    data() {
        return {
            filterId: 1,

            filterList: [
                {
                    id: 1,
                    name: 'Курсы'
                },
                {
                    id: 2,
                    name: 'Уроки'
                },
                {
                    id: 3,
                    name: 'Статьи'
                }
            ],

            favoriteList: [],

            isPageLoading: true
        };
    },

    computed: {
        ...mapGetters(['isAuth'])
    },

    created() {
        if (!this.isAuth) {
            this.$router.push('/');
            return;
        }

        this.setFavoriteList(this.filterId);
    },

    methods: {
        async setFavoriteList(filterId) {
            this.isPageLoading = true;
            this.filterId = filterId;

            try {
                switch (this.filterId) {
                    case 1:
                        this.favoriteList = await this.$service.courses.getFavorites();
                        break;
                    case 2:
                        this.favoriteList = await this.$service.lessons.getFavorites();
                        break;
                    case 3:
                        this.favoriteList = await this.$service.articles.getFavorites();
                        break;
                    default:
                        this.favoriteList = await this.$service.courses.getFavorites();
                }
            } catch {
                this.favoriteList = [];
                
                createNotification({
                    text: 'Не удалось загрузить выбранный список.',
                    status: 'error'
                });
            } finally {
                this.isPageLoading = false;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.favorites__wrap {
    background: $color-white-dark;
}

.favorites {
    @extend .container;
    @extend .flex_column;
}

.favorites__header {
    @extend .flex_row;
}

.favorites__title {
    font-family: 'ObjectSans';
    font-size: 40px;
    letter-spacing: -1px;
    color: $color-black;
}

.favorites__filters {
    margin-left: 50px;
}

.favorites__preloader {
    margin-top: 60px;
}

.favorites__list {
    @extend .flex_wrap;
    margin-top: 60px;
}

.favorites__card {
    margin-bottom: 30px;

    &:nth-child(3n+2) {
        margin-left: 29px;
        margin-right: 29px;
    }
}

@media screen and (max-width: 1160px) {
    .favorites {
        align-items: center;
    }

    .favorites__header {
        flex-direction: column;
        align-items: center;
    }

    .favorites__filters {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin-left: 0;
    }

    .favorites__list {
        width: 763px;
    }

    .favorites__card {
        &:nth-child(3n+2) {
            margin-left: 0;
            margin-right: 0;
        }
        &:nth-child(2n+2) {
            margin-left: 29px;
        }
    }
}

@media screen and (max-width: 767px) {
    .favorites__list {
        justify-content: center;
        width: 100%;
    }

    .favorites__card {
        &:nth-child(2n+2) {
            margin-left: 0;
        }
    }
}

@media screen and (max-width: 575px) {
    .favorites__title {
        font-size: 32px;
    }

    .favorites__filters {
        margin-top: 20px;
    }

    .favorites__preloader {
        margin-top: 30px;
    }

    .favorites__list {
        margin-top: 30px;
    }

    .favorites__card {
        margin-bottom: 20px;
    }
}
</style>