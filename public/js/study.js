const { createApp } = Vue;

createApp({
    data() {
        return {
            words: [],
            currentWord: { en: 'Завантаження...', ua: '' },
            options: [], 
        }
    },
    methods: {
        async fetchWords() {
            try {
                const response = await axios.get('/api/words');
                this.words = response.data;
                this.nextWord(); 
            } catch (error) {
                console.error("Помилка при завантаженні:", error);
            }
        },
        nextWord() {
            if (this.words.length === 0) return;
            
            
            const randomIndex = Math.floor(Math.random() * this.words.length);
            this.currentWord = this.words[randomIndex];
            
            this.generateOptions();
        },
        generateOptions() {
            let choices = [this.currentWord.ua];
            
            while (choices.length < 3 && this.words.length >= 3) {
                let randomWord = this.words[Math.floor(Math.random() * this.words.length)].ua;
                if (!choices.includes(randomWord)) {
                    choices.push(randomWord);
                }
            }
            
            this.options = choices.sort(() => Math.random() - 0.5);
        },
        checkAnswer() {
            if (this.selectedAnswer === this.currentWord.ua) {
                alert("Правильно!");
                this.nextWord();
                this.selectedAnswer = '';
            } else {
                alert("Спробуйте ще раз!");
            }
        }
    },
    mounted() {
        this.fetchWords(); 
    }
}).mount('#app');
