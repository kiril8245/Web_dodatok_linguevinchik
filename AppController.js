export default class AppController {
    constructor(userModel, studyModel, userView, studyView) {
        this.userModel = userModel;
        this.studyModel = studyModel;
        this.userView = userView;
        this.studyView = studyView;
        this.currentWordIdx = 0;
    }

    init() {
        const path = window.location.pathname;
        if (path.includes('register.html')) this.setupRegister();
        else if (path.includes('login.html')) this.setupLogin();
        else if (path.includes('profile.html')) this.setupProfile();
        else if (path.includes('study.html')) this.setupStudy();
    }

  setupRegister() {
        document.getElementById('registerForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = this.userView.getRegData();
            this.userModel.saveUser(data); // Це автоматично поставить loggedIn(true)
            alert('Реєстрація успішна!');
            window.location.href = 'profile.html';
        });
    }

   setupLogin() {
        document.getElementById('loginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputData = this.userView.getLoginData();
            const savedUser = this.userModel.getUser();

            // Перевіряємо, чи є користувач і чи збігаються паролі
            if (savedUser && savedUser.email === inputData.email && savedUser.password === inputData.password) {
                this.userModel.setLoggedIn(true); // Фіксуємо успішний вхід
                alert('Вхід успішний!');
                window.location.href = 'profile.html';
            } else {
                alert('Невірний email або пароль! Або ви ще не зареєстровані.');
            }
        });
    }

    setupProfile() {
        // Захист сторінки: якщо не залогінений - викидаємо на сторінку входу
        if (!this.userModel.isLoggedIn()) {
            window.location.href = 'login.html';
            return;
        }

        this.userView.renderProfile(this.userModel.getUser());
        
        // Кнопка виходу
        document.getElementById('btnLogout')?.addEventListener('click', () => {
            this.userModel.setLoggedIn(false); // ТІЛЬКИ змінюємо статус, дані не видаляємо
            window.location.href = 'login.html';
        });
    }

    setupStudy() {
        const words = this.studyModel.getWords();
        
        const updateCards = () => {
            const word = words[this.currentWordIdx];
            this.studyView.renderLearnCard(word);
            this.studyView.renderTestCard(word);
        };
        
        updateCards(); // Початкове відмальовування

        document.getElementById('btnNextWord')?.addEventListener('click', () => {
            this.currentWordIdx = (this.currentWordIdx + 1) % words.length;
            updateCards();
        });

        document.getElementById('btnCheckTest')?.addEventListener('click', () => {
            const answer = this.studyView.getSelectedAnswer();
            const correctAnswer = words[this.currentWordIdx].ua;
            
            if (!answer) alert("Будь ласка, оберіть варіант!");
            else if (answer === correctAnswer) alert("Правильно! 🎉");
            else alert(`Помилка! Правильна відповідь: ${correctAnswer} ❌`);
        });
    }
}