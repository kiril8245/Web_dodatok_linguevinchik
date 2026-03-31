export default class UserModel {
    constructor() {
        this.storageKey = 'linguevinchik_user';
        this.authKey = 'linguevinchik_is_logged_in'; // Новий ключ для статусу входу
    }

    // Збереження даних (Реєстрація)
    saveUser(userData) {
        localStorage.setItem(this.storageKey, JSON.stringify(userData));
        this.setLoggedIn(true); // Одразу логінимо після реєстрації
    }

    // Отримання даних
    getUser() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : null;
    }

    // Керування статусом сесії (Замість clearUser)
    setLoggedIn(status) {
        localStorage.setItem(this.authKey, status ? 'true' : 'false');
    }

    // Перевірка статусу сесії
    isLoggedIn() {
        return localStorage.getItem(this.authKey) === 'true';
    }
}