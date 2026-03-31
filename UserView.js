export default class UserView {
    getRegData() {
        const form = document.getElementById('registerForm');
        return {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value,
            gender: form.g.value,
            birthDate: form.birthDate.value
        };
    }
    getLoginData() {
        const form = document.getElementById('loginForm');
        return {
            email: form.email.value,
            password: form.password.value
        };
    }
    renderProfile(user) {
        if (!user) {
            alert('Будь ласка, увійдіть у систему');
            window.location.href = 'login.html';
            return;
        }
        document.getElementById('profileName').textContent = user.name;
        document.getElementById('profileEmail').textContent = user.email;
        document.getElementById('profileGender').textContent = user.gender;
        document.getElementById('profileDate').textContent = user.birthDate;
    }
}