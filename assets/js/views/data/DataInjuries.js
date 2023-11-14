export default class DataInjuries
{   
    constructor(app)
    {
        this.app = app
    }
    async get()
    {
        const response = await this.app.fetch('/injuries/get/')
        return response.data
    }
}