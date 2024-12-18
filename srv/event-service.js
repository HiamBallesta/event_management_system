const cds = require('@sap/cds');

class EventService extends cds.ApplicationService {
    init() {
        const {Event, Participant} = cds.entities('sap.capire.event_management_system');

        //POST /event/Events(id)/registerParticipant
        /**
         * {
         *  "participantId": participantId
         * }
         */
        this.on('registerParticipant', 'Events', async request => {
            const eventId = request.params[0];
            const { participantId } = request.data;

            let event = await SELECT.from(Event, eventId);

            if (!event) return request.error(404, `Event #${eventId} doesn't exists`);
            if (!participantId) return request.error(400, `Participant ID not provided`);

            const participant = await SELECT.from(Participant, participantId);
            if (!participant) return request.error(404, `Participant #${participantId} doesn't exists`);

            await UPDATE(Participant, participantId).with({ event_ID: eventId });

            event = await SELECT.from(Event, eventId);

            return event;
        });

        this.on('getEventParticipants', 'Events', async request => {
            const eventId = request.params[0];
            console.log(eventId);
            const participants = await SELECT.from(Participant).where({event_ID: eventId});

            return participants;
        });

        this.on('cancelEvent', 'Events', async request => {
            const eventId = request.params[0];

            const { cancellationReason } = request.data;
            await UPDATE(Event, eventId).with({ isCancelled: true, cancellationReason: cancellationReason, isActive: false});

            const event = await SELECT.from(Event, eventId);

            return event;

        })

        this.on('reopenEvent', 'Events', async request => {
            const eventId = request.params[0];

            await UPDATE(Event, eventId).with({ isCancelled: false, cancellationReason: null, isActive: true});

            const event = await SELECT.from(Event, eventId);

            return event;

        })

        return super.init();
    }
}

module.exports = EventService;