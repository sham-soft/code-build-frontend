import storage from '@/helpers/storage';
import { requestAccess } from '@/helpers/http';

export default {
  // Записать данные пользователя в сторадж
  getUser: async () => {
    try {
      const { data } = await requestAccess.get('/user');
      storage.setUser('local', data);
    } catch {
      storage.setUser('local', {});
      console.log('Пользователь не авторизован!');
    }
  },

  // Изменить имя пользователя
  changeUserName: async params => {
    await requestAccess.put('/user/change-name', params);
    window.location.reload();
  }
};