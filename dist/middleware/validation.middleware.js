import { errorResponse } from "../util/response.js";
export const schemaValidation = (schema) => {
    return (req, res, next) => {
        try {
            const { error } = schema.validate(Object.assign(Object.assign(Object.assign({}, req.body), req.params), req.query));
            if (error) {
                return errorResponse(res, 400, error.details[0].message);
            }
            next();
        }
        catch (error) {
            console.log("Validation Error:", error);
            return errorResponse(res, 500, "Internal server error during validation");
        }
    };
};
//# sourceMappingURL=validation.middleware.js.map