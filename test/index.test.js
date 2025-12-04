const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('capitalizeWords', () => {
    test('should capitalize the first letter of each word', () => {
        const input = 'hello world from jest';
        const expected = 'Hello World From Jest';
        expect(capitalizeWords(input)).toBe(expected);
    });

    test('should handle empty strings', () => {
        const input = '';
        const expected = '';
        expect(capitalizeWords(input)).toBe(expected);
    });

    test('string with special characters', () => {
        const input = 'hello-world! this is a test.';
        const expected = 'Hello-World! This Is A Test.';
        expect(capitalizeWords(input)).toBe(expected);
    });

    test('single word string', () => {
        const input = 'javascript';
        const expected = 'Javascript';
        expect(capitalizeWords(input)).toBe(expected);
    });
});

describe('filterActiveUsers', () => {
    test('should return only active users from a list with active/inactive users', () => {
        const users = [
            { name: 'Alice', isActive: true },
            { name: 'Bob', isActive: false },
            { name: 'Charlie', isActive: true }
        ];
        const expected = [
            { name: 'Alice', isActive: true },
            { name: 'Charlie', isActive: true }
        ];
        expect(filterActiveUsers(users)).toEqual(expected);
    });

    test('should return an empty array if no users are active', () => {
        const users = [
            { name: 'Dave', isActive: false },
            { name: 'Eve', isActive: false }
        ];
        const expected = [];
        expect(filterActiveUsers(users)).toEqual(expected);
    });

    test('empty user array', () => {
        const users = [];
        const expected = [];
        expect(filterActiveUsers(users)).toEqual(expected);
    });

    test('all users active', () => {
        const users = [
            { name: 'Frank', isActive: true },
            { name: 'Grace', isActive: true }
        ];
        const expected = [
            { name: 'Frank', isActive: true },
            { name: 'Grace', isActive: true }
        ];
        expect(filterActiveUsers(users)).toEqual(expected);
    }); 
});

describe('logAction', () => {
    test('should log the action with username and timestamp', () => {
        const action = 'login';
        const username = 'testUser';
        const logMessage = logAction(action, username);
        expect(logMessage).toMatch(new RegExp(`^User ${username} performed ${action} at `));
    });

    test('action or username undefined', () => {
        const action = 'login';
        const username = 'testUser';

        const log1 = logAction();
        expect(log1).toMatch(new RegExp(`^User undefined performed undefined at `));

        const log2 = logAction(action);
        expect(log2).toMatch(new RegExp(`^User undefined performed ${action} at `));

        const log3 = logAction(undefined, username);
        expect(log3).toMatch(new RegExp(`^User ${username} performed undefined at `));  
    })
    test('empty action and username', () => {
        const action = '';
        const username = '';
        const logMessage = logAction(action, username);
        expect(logMessage).toMatch(new RegExp(`^User  performed  at `));
    });
    test('special characters in action and username', () => {
        const action = 'sign-up!';
        const username = 'user@123';
        const logMessage = logAction(action, username);
        expect(logMessage).toMatch(new RegExp(`^User ${username} performed ${action} at `));
    });
    test('long action and username', () => { 
        const action = 'a'.repeat(1000);
        const username = 'b'.repeat(1000);
        const logMessage = logAction(action, username);
        expect(logMessage).toMatch(new RegExp(`^User ${username} performed ${action} at `));
    });
});