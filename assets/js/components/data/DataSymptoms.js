export default class DataSymptoms
{
    constructor(app)
    {
        this.app = app
    }

    async get()
    {   
        const response = await this.app.fetch('/symptoms/')
        return response.data
    }
}