import {createSwaggerSpec} from 'next-swagger-doc'

export const getApiSpec = () => createSwaggerSpec({
    apiFolder: 'src/app',
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ABConvert Frontend Interview Question APIs',
            version: '1.0.0',
        },

    }
})