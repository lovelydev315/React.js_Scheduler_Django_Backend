from django.utils.deprecation import MiddlewareMixin

class corsMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request, response):
        response = self.get_response(request)
        response["Access-Control-Allow-Origin"] = "*"
        return response