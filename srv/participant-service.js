const cds = require('@sap/cds');
const {SELECT} = cds.ql;

class ParticipantService extends cds.ApplicationService {
    async init() {
        const bussinessPartnerAPI = await cds.connect.to('API_BUSINESS_PARTNER');
        const {Participants, Suppliers} = this.entities;

        this.on('READ', 'Suppliers', req => {
            return bussinessPartnerAPI.run(req.query);
        });

        this.on('fetchParticipantDetails', async request => {
            const participantId = request.params[0];

            if (!participantId) return request.error(400, `Participant ID not provided`);
            
            const participant = await SELECT.from(Participants, participantId);

            if (!participant) return request.error(404, `Participant #${participantId} doesn't exists`);

            if (!participant.businessPartnerID) {
                return request.error(404, `Participant #${participantId} doesn't have a valid bussiness partner ID`);
            } 

            const supplier = await bussinessPartnerAPI.run(SELECT.from(Suppliers, participant.businessPartnerID));

            if (!supplier) {
                return request.error(404, `Supplier #${participant.businessPartnerID} doesn't exists`);
            }

            return supplier;
        });

        return super.init();
    }
}

module.exports = ParticipantService;