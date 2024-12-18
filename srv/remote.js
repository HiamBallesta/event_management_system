const cds = require('@sap/cds');

class RemoteService extends cds.ApplicationService {
    async init() {
        const bussinessPartnerAPI = await cds.connect.to('API_BUSINESS_PARTNER');

        this.on('READ', 'bussinessPartner', req => {
            return bussinessPartnerAPI.run(req.query);
        });
    }
}

module.exports = RemoteService;