// Оголошуємо об'єкт formData з полями email та message
const formData = {
  email: '',
  message: ''
};

// Отримуємо посилання на форму
const form = document.querySelector('.feedback-form');

// Ключ для локального сховища
const STORAGE_KEY = 'feedback-form-state';

// Функція для збереження даних у локальне сховище
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Функція для завантаження даних з локального сховища
const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Оновлюємо formData та локальне сховище при введенні даних
form.addEventListener('input', (event) => {
  formData[event.target.name] = event.target.value;
  saveToLocalStorage(STORAGE_KEY, formData);
});

// Завантажуємо дані з локального сховища при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  const savedData = loadFromLocalStorage(STORAGE_KEY);
  if (savedData) {
    form.email.value = savedData.email || '';
    form.message.value = savedData.message || '';
    formData.email = savedData.email || '';
    formData.message = savedData.message || '';
  }
});

// Обробляємо подію відправки форми
form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form Data:', formData);

  // Очищуємо локальне сховище, об'єкт formData та поля форми
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
});
