export const validation = (schema) => async( req , res , next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const error = err.errors[0].message
        res.json({ message :error })
    }
}