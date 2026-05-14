const { createApp } = Vue;

createApp({
    data() {
        return {
            name: '',
            email: '',
            password: '',
            gender: 'Чоловіча',
            birthDate: '',
            user: null
        }
    },
    methods: {
        async registerUser() {
            try {
                const response = await axios.post('http://localhost:3000/api/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    gender: this.gender,
                    birthDate: this.birthDate
                });
                alert(response.data.message);
                window.location.href = 'login.html';
            } catch (error) {
                alert(error.response?.data?.error || "Помилка реєстрації");
            }
        },

        async loginUser() {
            try {
                const response = await axios.post('http://localhost:3000/api/login', {
                    email: this.email,
                    password: this.password
                });
                
                localStorage.setItem('linguevinchik_user', JSON.stringify(response.data.user));
                localStorage.setItem('isLoggedIn', 'true');
                
                alert("Вхід успішний!");
                window.location.href = 'profile.html';
            } catch (error) {
                alert(error.response?.data?.error || "Невірні дані");
            }
        },

        loadProfile() {
            const savedUser = localStorage.getItem('linguevinchik_user');
            if (savedUser) {
                this.user = JSON.parse(savedUser);
            } else {
                window.location.href = 'login.html';
            }
        },

        logout() {
            localStorage.clear();
            window.location.href = 'login.html';
        }
    },
    mounted() {
        if (window.location.pathname.includes('profile.html')) {
            this.loadProfile();
        }
    }
}).mount('#app');
