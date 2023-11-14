export default class DataPropertyDamage
{   
    constructor(app)
    {
        this.app = app
    }
    async get(accident_id)
    {
        const response = await this.app.fetch('/propertyDamage/get/?accident_id=' + accident_id)
        return response.data
    }
}