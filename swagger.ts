require("dotenv").config();

const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/Api/Routes/*.ts'];

const doc = {
    info: {
        title: 'My API',
        description: 'API Documentation',
    },
    host: `localhost:${process.env.PORT}/api`,
    schemes: ['http'],
    tags: [
        {
            "name": "Users",
            "description": "Endpoints related to user as well as account operations"
        },
        {
            "name": "Jobs",
            "description": "Endpoints related to Jobs "
        },
        {
            "name": "Applications",
            "description": "API for applications"
        },
        {
            "name": "Roles",
            "description": "API for roles"
        },
        {
            "name": "Logs",
            "description": "API for logs"
        },
        {
            "name": "Permissions",
            "description": "API for permissions"
        }
    ],
    securityDefinitions: {
        apiKeyAuth: { // This name should match the key in your route comment
            type: 'apiKey',
            in: 'header', // The location of the API key (header is a common location)
            name: 'Authorization', // The name of the header to be used
            description: "Please enter JWT or API Key with Bearer into field"
        }
    },
    definitions: {
        //Request
        CreateRoleRequest: {
            name: 'Candidate',
            description: 'Candidate',
            bitwisePermission: 15
        },
        UpdateRoleRequest: {
            name: 'Company',
            description: 'Company',
            bitwisePermission: 496
        },
        CreateLogRequest: {
            userId: '666bcabb147ce0ae646c73b8',
            action: '[POST] /api/user/login',
            ipAddress: '1.1.1.1',
            deviceId: '1',
            timeStamp: '2024-06-14T00:00:00.000Z'
        },
        UpdateLogRequest: {
            userId: '666bcabb147ce0ae646c73b8',
            action: '[POST] /api/user/logout',
            ipAddress: '1.1.1.1',
            deviceId: '1',
            timeStamp: '2024-06-14T00:00:00.000Z'
        },
        CreatePermissionRequest: {
            name: 'Create',
            description: 'Create',
            bitwisePermission: 1
        },
        UpdatePermissionRequest: {
            name: 'Update',
            description: 'Update',
            bitwisePermission: 2
        },
        FindPermissionRequest: {
            permissionId: '6679206fac61b614f8cf68ff',
        },
        RevokePermissionRequest: {
            roleId: '666aa77f5dca8306b94520f3',
            permissionId: '6679206fac61b614f8cf68ff',
        },
        ClaimPermissionRequest: {
            roleId: '666aa77f5dca8306b94520f3',
            permissionId: '6679206fac61b614f8cf68ff',
        },
    }
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation generated successfully.');
});
