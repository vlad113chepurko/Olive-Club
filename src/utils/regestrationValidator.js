export default function validateRegistrationForm(form) {
    const errors = {};

    if (!form.name || form.name.trim().length < 2) {
        errors.name = "The name must contain at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
        errors.email = "Please enter a valid email.";
    }

    if (!form.password || form.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
    }

    if (form.password !== form.repeatPassword) {
            errors.repeatPassword = "The passwords do not match.";
    }

    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
    if (!form.phone || !phoneRegex.test(form.phone)) {
        errors.phone = "Please enter a valid phone number.";
    }

    return errors;
}
