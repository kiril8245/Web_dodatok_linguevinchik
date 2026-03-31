export default class StudyModel {
    constructor() {
        this.words = [
            { en: 'Penguin', ua: 'Пінгвін', wrong: ['Орел', 'Кіт'] },
            { en: 'Success', ua: 'Успіх', wrong: ['Невдача', 'Спроба'] },
            { en: 'Development', ua: 'Розробка', wrong: ['Дизайн', 'Тестування'] },
            { en: 'Language', ua: 'Мова', wrong: ['Слово', 'Літера'] }
        ];
    }
    getWords() {
        return this.words;
    }
}