<template>
    <div class="courses__wrap">
        <div class="courses">
            <h1 class="courses__title">Все видеокурсы</h1>

            <v-filter-group
                v-model="filterId"
                class="courses__filters"
                :array="filterList"
                @change="setCourses()"
            />

            <card-preloader 
                v-if="isPageLoading" 
                class="courses__preloader" 
            />

            <div 
                v-else 
                class="courses__list"
            >
                <card-course
                    v-for="(item, index) in courseList" 
                    :key="index"
                    class="courses__card"
                    :course="item"
                    @click="$router.push(`/course?id=${item.id}`)"
                />
            </div>
        </div>

        <block-registration class="courses__reg" />
    </div>
</template>

<script>
// Components
import CardCourse from '@/components/cards/CardCourse';
import CardPreloader from '@/components/cards/CardPreloader';
import VFilterGroup from '@/components/common/VFilterGroup';
import BlockRegistration from '@/components/blocks/BlockRegistration';

// Helpers
import { createNotification } from '@/helpers/notification';

export default {
    name: 'Courses',

    components: {
        CardCourse,
        CardPreloader,
        VFilterGroup,
        BlockRegistration
    },

    data() {
        return {
            filterId: '',
            filterList: [],
            courseList: [],
            isPageLoading: false
        };
    },

    created() {
        this.setFilters();
        this.setCourses();
    },

    methods: {
        async setCourses() {
            this.isPageLoading = true;

            try {
                this.courseList = await this.$service.courses.getCoursesList({ tag: this.filterId });
            } catch {
                createNotification({
                    text: 'Не удалось загрузить курсы.',
                    status: 'error'
                });
            } finally {
                this.isPageLoading = false;
            }
        },

        async setFilters() {
            this.filterList = await this.$store.dispatch('tags/getCourseList');
        }
    }
};
</script>

<style lang="scss" scoped>
.courses__wrap {
    background: $color-white-dark;
}

.courses {
    @extend .container;
    @extend .flex_column;
}

.courses__title {
    font-family: 'ObjectSans';
    font-size: 40px;
    letter-spacing: -1px;
    color: $color-black;
}

.courses__filters {
    margin-top: 30px;
}

.courses__preloader {
    margin-top: 60px;
}

.courses__list {
    @extend .flex_wrap;
    margin-top: 60px;
}

.courses__card {
    margin-bottom: 30px;

    &:nth-child(3n+2) {
        margin-left: 29px;
        margin-right: 29px;
    }
}

@media screen and (max-width: 1160px) {
    .courses {
        align-items: center;
    }

    .courses__filters {
        display: flex;
        justify-content: center;
    }

    .courses__list {
        width: 763px;
    }

    .courses__card {
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
    .courses__list {
        justify-content: center;
        width: 100%;
    }

    .courses__card {
        &:nth-child(2n+2) {
            margin-left: 0;
        }
    }
}

@media screen and (max-width: 575px) {
    .courses__title {
        font-size: 32px;
    }

    .courses__filters {
        margin-top: 20px;
    }

    .courses__preloader {
        margin-top: 30px;
    }

    .courses__list {
        margin-top: 30px;
    }

    .courses__card {
        margin-bottom: 20px;
    }
}
</style>