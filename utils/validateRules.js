module.exports = {

    placeOrderValRule : {
        "userId": "string|required",
        "address": "string|max:200",
        "products": {
            "*.productId": "string|required",
            "*.quantity": "integer|required"
        }
    },

    createProductValRule: {
        "name": "required|string|min:4",
        "description": "string|max:40",
        "price": "integer|required",
    },

    loginValRule: {
        "email": "required|string|email",
        "password": "required|string|min:8",
    },
    
    signupValRule: {
        "username": "required|string",
        "email": "required|string|email",
        "password": "required|string|min:8",
        "role": "string",
    },

    createReviewValRule: {
        "userId": "required|string",
        "productId": "required|string",
        "detail": "required|string|max:60",
        "rating": "required|integer|min:1|max:5",
    }
}