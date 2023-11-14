export default class DataTreatments
{   
    constructor(app)
    {
        this.app = app
    }
    async get()
    {
        const response = await this.app.fetch('/treatments/get/')
        return response.data
    }
}