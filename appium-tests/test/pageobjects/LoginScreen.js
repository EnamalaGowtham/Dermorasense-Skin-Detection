class LoginScreen {
    get emailInput() { return $('~email-input'); }
    get passwordInput() { return $('~password-input'); }
    get loginButton() { return $('~login-button'); }
    get errorMessage() { return $('~Error Message'); } // Assuming error message isn't tested yet or uses text

    async login(email, password) {
        await this.emailInput.waitForDisplayed({ timeout: 10000 });
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}

module.exports = new LoginScreen();
