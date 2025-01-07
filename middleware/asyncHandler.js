const asyncHandler = (fn) => {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next))
            .then(() => {
                next()
            })
            .catch(next);
    }
}

export default asyncHandler;
