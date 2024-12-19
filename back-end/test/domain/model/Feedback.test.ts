import { Feedback } from "../../../model/Feedback";

test('given: valid values, when: creating feedback, then: feedback is created successfully', () => {
    const feedbackData = {
        name: "gertje",
        email: "gertje@email.com",
        message: "Great service!",
    };

    const feedback = new Feedback(feedbackData);

    expect(feedback.getName()).toBe("gertje");
    expect(feedback.getEmail()).toBe("gertje@email.com");
    expect(feedback.getMessage()).toBe("Great service!");
    expect(feedback.getCreatedAt()).toBeInstanceOf(Date);
});

test('given: missing name, when: creating feedback, then: error is thrown', () => {
    const feedbackData = {
        email: "gertje@email.com",
        message: "Great service!",
    };

    expect(() => new Feedback(feedbackData as any)).toThrowError('Name is required!');
});

test('given: missing email, when: creating feedback, then: error is thrown', () => {
    const feedbackData = {
        name: "gertje",
        message: "Great service!",
    };

    expect(() => new Feedback(feedbackData as any)).toThrowError('Email is required!');
});

test('given: missing message, when: creating feedback, then: error is thrown', () => {
    const feedbackData = {
        name: "gertje",
        email: "gertje@email.com",
    };

    expect(() => new Feedback(feedbackData as any)).toThrowError('Message is required!');
});




