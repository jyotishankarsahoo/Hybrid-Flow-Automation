import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ArticlePage extends BasePage {
    public readonly articleHeader = this.locator("h1.gb-header");
    public readonly articleSubHeader = this.articleHeader
        .locator("..")
        .locator("p.subheader");
    public readonly publishDate = this.locator(".mod-date");

    public readonly helpfulYesButton = this.locator("#yes-button");
    public readonly helpfulNoButton = this.locator("#no-button");
    public readonly feedbackCommentTextArea = this.locator(
        "textarea.form-text-area"
    );
    public readonly feedbackSubmitButton = this.locator("#submit-feedback");
    public readonly feedbackConfirmationLabel = this.locator("#rating-done");

    async clickOnThumbsUp() {
        await this.clickElement(this.helpfulYesButton);
    }

    async clickOnThumbsDown() {
        await this.clickElement(this.helpfulNoButton);
    }

    async enterFeedbackComment(comment: string) {
        await this.fillField(this.feedbackCommentTextArea, comment);
    }

    async submitFeedback() {
        await this.clickElement(this.feedbackSubmitButton);
    }

    async verifyFeedbackSubmissionConfirmation() {
        await expect(this.feedbackConfirmationLabel).toBeVisible();
        await expect(this.feedbackConfirmationLabel).toHaveText(
            "Thanks for your feedback."
        );
    }
}
