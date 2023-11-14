export default class DataPersonalInfo
{   
    constructor(app)
    {
        this.app = app
    }
    
    async get()
    {
        console.log('fetching')
        const response = await this.app.fetch('/users/get/')
        return response.data
    }
}