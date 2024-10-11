
class ObjectNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = 'ObjectNotFound';
    }
}

class Forbidden extends Error {
    constructor(message) {
        super(message);
        this.name = 'Forbidden';
    }
}

class Unauthorized extends Error {
    constructor(message) {
        super(message);
        this.name = 'Unauthorized';
    }
}

class UnknownError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnknownError';
    }
}

class ObjectNotSupported extends Error {
    constructor(message) {
        super(message);
        this.name = 'ObjectNotSupported';
    }
}

module.exports = {
    ObjectNotFound,
    Forbidden,
    Unauthorized,
    UnknownError,
    ObjectNotSupported,
};
