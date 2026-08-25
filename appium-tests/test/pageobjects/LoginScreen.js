class LoginScreen {
    get emailInput() { return $('~Email Input'); }
    get passwordInput() { return $('~Password Input'); }
    get loginButton() { return $('~Login Button'); }
    get errorMessage() { return $('~Error Message'); }

    async login(email, password) {
        await this.emailInput.waitForDisplayed({ timeout: 10000 });
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}

module.exports = new LoginScreen();
