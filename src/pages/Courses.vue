<template>
  <div class="courses__wrap">
    <div class="courses">
      <h1 class="courses__title">Все видеокурсы</h1>

      <v-filter-group
        v-model="filterId"
        class="courses__filters"
        :array="filterList"
        @change="getCourses()"
      />

      <card-preloader v-if="pageLoading" class="courses__preloader" />

      <div v-else class="courses__list">
        <div v-for="(item, index) in courseList" :key="index">
          <card-course
            class="mb-30px"
            :class="{ 'ml-29px mr-29px': (index - 1) % 3 === 0 }"
            :course="item"
            @click="$router.push(`/course?id=${item.id}`)"
          />
        </div>
      </div>
    </div>

    <block-registration class="courses__reg" />
  </div>
</template>

<script>
import CardCourse from '@/components/cards/CardCourse';
import CardPreloader from '@/components/cards/CardPreloader';
import VFilterGroup from '@/components/common/VFilterGroup';
import BlockRegistration from '@/components/blocks/BlockRegistration';

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

      pageLoading: false
    };
  },

  methods: {
    async getCourses() {
      this.pageLoading = true;
      this.courseList = await this.$service.courses.getCoursesList({ tag: this.filterId });
      this.pageLoading = false;
    }
  },
  
  async created() {
    this.filterList = await this.$service.courses.getTags();
    this.getCourses();
  }
};
</script>

<style lang="scss" scoped>
.courses__wrap {
  background: #f4f4f4;
}

.courses {
  @extend .container;

  &__title {
    font-family: 'ObjectSans';
    font-size: 40px;
    letter-spacing: -1px;
    color: $color-black;
  }

  &__filters {
    width: 1000px;
    margin-top: 30px;
  }

  &__preloader {
    margin-top: 60px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 60px;
  }
}
</style>