class DashboardScreen {
    get welcomeText() { return $('~Welcome Text'); }
    get analyzeSkinButton() { return $('~Analyze Skin'); }
    get diseaseLibraryButton() { return $('~Disease Library'); }

    async isDashboardDisplayed() {
        await this.welcomeText.waitForDisplayed({ timeout: 15000 });
        return await this.welcomeText.isDisplayed();
    }
}

module.exports = new DashboardScreen();
