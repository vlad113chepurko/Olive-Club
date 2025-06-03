export default function validateRegistrationForm(form) {
    const errors = {};

    if (!form.name || form.name.trim().length < 2) {
        errors.name = "Имя должно содержать минимум 2 символа.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
        errors.email = "Введите корректный email.";
    }

    if (!form.password || form.password.length < 6) {
        errors.password = "Пароль должен быть минимум 6 символов.";
    }

    if (form.password !== form.repeatPassword) {
        errors.repeatPassword = "Пароли не совпадают.";
    }

    return errors;
}
