<template>
    <div class="articles__wrap">
        <div class="articles">
            <h1 class="articles__title">Все статьи</h1>

            <v-filter-group
                v-model="filterId"
                class="articles__filters"
                :array="filterList"
                @change="setArticles()"
            />

            <card-preloader 
                v-if="isPageLoading" 
                class="articles__preloader" 
            />

            <div 
                v-else 
                class="articles__list"
            >
                <card-article
                    v-for="(item, index) in articleList" 
                    :key="index"
                    class="articles__card"
                    :article="item"
                    @click="$router.push(`/article?id=${item.id}`)"
                />
            </div>
        </div>

        <block-registration class="articles__reg" />
    </div>
</template>

<script>
// Components
import CardArticle from '@/components/cards/CardArticle';
import CardPreloader from '@/components/cards/CardPreloader';
import VFilterGroup from '@/components/common/VFilterGroup';
import BlockRegistration from '@/components/blocks/BlockRegistration';

// Helpers
import { createNotification } from '@/helpers/notification';

export default {
    name: 'Articles',

    components: {
        CardArticle,
        CardPreloader,
        VFilterGroup,
        BlockRegistration
    },

    data() {
        return {
            filterId: '',
            filterList: [],
            articleList: [],
            isPageLoading: false
        };
    },

    created() {
        this.setFilters();
        this.setArticles();
    },

    methods: {
        async setArticles() {
            this.isPageLoading = true;

            try {
                this.articleList = await this.$service.articles.getArticleList({ tag: this.filterId });
            } catch {
                createNotification({
                    text: 'Не удалось загрузить статьи.',
                    status: 'error'
                });
            } finally {
                this.isPageLoading = false;
            }
        },

        async setFilters() {
            this.filterList = await this.$store.dispatch('tags/getArticleList');
        }
    }
};
</script>

<style lang="scss" scoped>
.articles__wrap {
    background: $color-white-dark;
}

.articles {
    @extend .container;
    @extend .flex_column;
}

.articles__title {
    font-family: 'ObjectSans';
    font-size: 40px;
    letter-spacing: -1px;
    color: $color-black;
}

.articles__filters {
    margin-top: 30px;
}

.articles__preloader {
    margin-top: 60px;
}

.articles__list {
    @extend .flex_wrap;
    margin-top: 60px;
}

.articles__card {
    margin-bottom: 30px;

    &:nth-child(3n+2) {
        margin-left: 29px;
        margin-right: 29px;
    }
}

@media screen and (max-width: 1160px) {
    .articles {
        align-items: center;
    }

    .articles__filters {
        display: flex;
        justify-content: center;
    }

    .articles__list {
        width: 763px;
    }

    .articles__card {
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
    .articles__list {
        justify-content: center;
        width: 100%;
    }

    .articles__card {
        &:nth-child(2n+2) {
            margin-left: 0;
        }
    }
}

@media screen and (max-width: 575px) {
    .articles__title {
        font-size: 32px;
    }

    .articles__filters {
        margin-top: 20px;
    }

    .articles__preloader {
        margin-top: 30px;
    }

    .articles__list {
        margin-top: 30px;
    }

    .articles__card {
        margin-bottom: 20px;
    }
}
</style>