import feedbackService from "../../service/feedback.service";
import feedbackDb from "../../repository/feedback.db";
import { Feedback } from "../../model/Feedback";
import { UnauthorizedError } from "express-jwt";
import { FeedbackInput } from "../../types";

// jest.mock("../repository/feedback.db");

let mockFeedbackDbGetFeedback: jest.Mock;
let mockFeedbackDbAddFeedback: jest.Mock;

beforeEach(() => {
    mockFeedbackDbGetFeedback = jest.fn();
    mockFeedbackDbAddFeedback = jest.fn();

    (feedbackDb.getFeedback as jest.Mock) = mockFeedbackDbGetFeedback;
    (feedbackDb.addFeedback as jest.Mock) = mockFeedbackDbAddFeedback;
});

afterEach(() => {
    jest.clearAllMocks();
});

test("returns feedback for admin role", async () => {
    const mockFeedback = [
        new Feedback({ name: "John", email: "john@example.com", message: "Great service!" }),
        new Feedback({ name: "Jane", email: "jane@example.com", message: "Very helpful!" }),
    ];
    mockFeedbackDbGetFeedback.mockResolvedValue(mockFeedback);

    const result = await feedbackService.getFeedback({ role: "admin" });

    expect(mockFeedbackDbGetFeedback).toHaveBeenCalled();
    expect(result).toEqual(mockFeedback);
});

test("throws UnauthorizedError for non-admin role", async () => {
    await expect(feedbackService.getFeedback({ role: "user" }))
        .rejects.toThrow(UnauthorizedError);
});

test("adds feedback when valid input is provided", async () => {
    const feedbackInput: FeedbackInput = { name: "John", email: "john@example.com", message: "Great service!" };
    const newFeedback = new Feedback(feedbackInput);

    mockFeedbackDbAddFeedback.mockResolvedValue(newFeedback);

    const result = await feedbackService.addFeedback(feedbackInput);

    expect(mockFeedbackDbAddFeedback).toHaveBeenCalledWith(expect.objectContaining(feedbackInput));
    expect(result).toEqual(newFeedback);
});

test("throws an error when name is missing in feedback input", async () => {
    const feedbackInput = { email: "john@example.com", message: "Great service!" } as FeedbackInput;

    await expect(feedbackService.addFeedback(feedbackInput))
        .rejects.toThrow("Name is required");

    expect(mockFeedbackDbAddFeedback).not.toHaveBeenCalled();
});

test("throws an error when email is missing in feedback input", async () => {
    const feedbackInput = { name: "John", message: "Great service!" } as FeedbackInput;

    await expect(feedbackService.addFeedback(feedbackInput))
        .rejects.toThrow("Email is required");

    expect(mockFeedbackDbAddFeedback).not.toHaveBeenCalled();
});

test("throws an error when message is missing in feedback input", async () => {
    const feedbackInput = { name: "John", email: "john@example.com" } as FeedbackInput;

    await expect(feedbackService.addFeedback(feedbackInput))
        .rejects.toThrow("Message is required");

    expect(mockFeedbackDbAddFeedback).not.toHaveBeenCalled();
});
