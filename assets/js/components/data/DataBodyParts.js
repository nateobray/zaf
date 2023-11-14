export default class DataBodyParts
{
    constructor(app)
    {
        this.app = app
    }

    async get()
    {   
        const response = await this.app.fetch('/bodyParts/')
        return response.data
    }
}