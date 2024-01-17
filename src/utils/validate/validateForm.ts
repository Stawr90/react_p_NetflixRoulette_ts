
const ValidateForm = () => {
    const validateUsername = (username: string | undefined) => {
        const usernameRegExp = /^[A-Z0-9]+$/;
        return username && !usernameRegExp.test(username) ? 'Big letters and numbers' : undefined;
    };
    const validatePassword = (password: string | undefined) => {
        return password && (password.length < 8 || new Set(password).size !== password.length) ? 'Unique symbols / more than 8' : undefined;
    };
    const validateEmail = (email: string | undefined) => {
        const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
        return email && !emailRegExp.test(email) ? 'Invalid email' : undefined;
    }

    return { validateUsername, validatePassword, validateEmail };
}

export default ValidateForm;