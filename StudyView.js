export default class StudyView {
    renderLearnCard(word) {
        document.getElementById('learnWord').textContent = word.en;
        document.getElementById('learnTranslation').textContent = word.ua;
    }
    
    renderTestCard(word) {
        document.getElementById('testQuestion').textContent = `Оберіть переклад "${word.en}":`;
        const container = document.getElementById('testOptionsContainer');
        container.innerHTML = ''; // Очищаємо попередні варіанти
        
        // Змішуємо правильний і неправильні варіанти
        const options = [word.ua, ...word.wrong].sort(() => Math.random() - 0.5);
        
        options.forEach((opt, idx) => {
            container.innerHTML += `
                <div class="form-check mb-2">
                    <input class="form-check-input" type="radio" name="testQ" id="a${idx}" value="${opt}">
                    <label class="form-check-label" for="a${idx}">${opt}</label>
                </div>
            `;
        });
    }

    getSelectedAnswer() {
        const checked = document.querySelector('input[name="testQ"]:checked');
        return checked ? checked.value : null;
    }
}