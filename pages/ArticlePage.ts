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

    public readonly commentHeader = this.locator("#feedback-label");
    public readonly doNotIncludeLabel = this.locator(".dont-include-label");

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
    /**
     * Verifies that the feedback submission confirmation label is visible and contains the expected text.
     */
    async verifyFeedbackSubmissionConfirmation() {
        await expect(this.feedbackConfirmationLabel).toBeVisible();
        await expect(this.feedbackConfirmationLabel).toHaveText(
            "Thanks for your feedback."
        );
    }
    /**
     * Verifies the visibility, content, and specific text of the main article details.
     */
    async verifyArticleDetails(
        headerText: string,
        subHeaderText: string
    ): Promise<void> {
        await expect(this.articleHeader).toBeVisible();
        await expect(this.articleSubHeader).toBeVisible();
        await expect(this.publishDate).toBeVisible();

        await expect(this.articleHeader).not.toBeEmpty();
        await expect(this.articleSubHeader).not.toBeEmpty();
        await expect(this.publishDate).not.toBeEmpty();

        await expect(this.articleHeader).toHaveText(headerText);
        await expect(this.articleSubHeader).toHaveText(subHeaderText);
        await expect(this.publishDate).toContainText("Published Date:");
    }
    /**
     * Verifies the initial state of the feedback section elements.
     */
    async verifyInitialFeedbackState(): Promise<void> {
        await expect(this.helpfulYesButton).toBeVisible();
        await expect(this.helpfulNoButton).toBeVisible();
        await expect(this.feedbackSubmitButton).not.toBeVisible();
        await expect(this.feedbackConfirmationLabel).not.toBeVisible();

        await expect(this.helpfulYesButton).toBeEnabled();
        await expect(this.helpfulNoButton).toBeEnabled();

        await expect(this.helpfulYesButton).toHaveText("Yes");
        await expect(this.helpfulNoButton).toHaveText("No");
    }
    /**
     * Verifies the details of the comment section, including headers and labels.
     */
    async verifyCommentSectionDetails(
        expectedHeaderText: string
    ): Promise<void> {
        await this.assertLocatorHasText(this.commentHeader, expectedHeaderText);
        await this.assertLocatorHasText(
            this.doNotIncludeLabel,
            "Please don’t include any personal information in your comment."
        );
    }
}
