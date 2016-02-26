// Implementation in the request:
// res.status(Response.BadGateway);

// More codes at http://webmaster.iu.edu/tools-and-guides/maintenance/error-codes.phtml

export enum Response {
    OK = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    BadRequest = 400,
    Unauthorised = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    UnsupportedMediaType = 415,
    ServerError = 500,
    NotImplemented = 501,
    BadGateway = 502
}