export default class DataAccident
{   
    constructor(app)
    {
        this.app = app
    }
    async get()
    {
        console.log('fetching')
        const response = await this.app.fetch('/accidents/get/')
        return response.data
    }
}