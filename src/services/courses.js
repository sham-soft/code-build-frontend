import apiLikes from '@/services/likes.js';
import { Filters } from '@/models/courses';
import { Course } from '../models/courses.js';
import { request, requestAccess } from '@/helpers/http';

export default {
  // Получить список курсов
  getCoursesList: async params => {
    let likes = await apiLikes.getLikeList('courses');

    const { data } = await request.get(`/courses`, { params });
    return data.map(item => new Course(item, likes));
  },

  // Получить статью по id
  getCourse: async params => {
    let likes = await apiLikes.getLikeList('courses');

    const { data } = await request.get(`/course`, { params });

    let tags = [];
    let gradient = '';

    Filters.forEach(item => {
      const isTag = data.tags.includes(item.id);
      if (isTag) {
        tags.push('#' + item.name);
        if(!gradient) gradient = item.gradient;
      }
    });

    data.tags = tags;
    data.gradient = gradient;
    return new Course(data, likes);
  },

  // Получить список пролайканных курсов
  getFavoriteCourseList: async () => {
    let likes = await apiLikes.getLikeList('courses');

    const { data } = await requestAccess.get(`/courses/favorites`);
    return data.map(item => new Course(item, likes));
  },

  // Получить фильтры для курсов
  getFilters: () => {
    return Filters;
  },

  // Получить список популярных статьей
  getPopularCourseList: async (params) => {
    let likes = await apiLikes.getLikeList('courses');

    const { data } = await request.get('/courses/popular-courses', { params });
    return data.map(item => new Course(item, likes));
  }
};