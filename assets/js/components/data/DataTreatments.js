export default class DataTreatments
{
    constructor(app)
    {
        this.app = app
    }

    async get(message, type = 'client')
    {   
        const response = await this.app.fetch('/treatmentTypes/')
        return response.data
    }
}