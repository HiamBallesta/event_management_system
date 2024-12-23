const cds = require('@sap/cds');

class EventService extends cds.ApplicationService {
    init() {
        const {Events, Participants} = this.entities;

        //POST /event/Events(id)/registerParticipant
        /**
         * {
         *  "participantId": participantId
         * }
         */
        this.on('registerParticipant', 'Events', async request => {
            const eventId = request.params[0];
            const { participantId } = request.data;

            let event = await SELECT.from(Events, `${eventId}`);

            if (!event) return request.error(404, `Event #${eventId} doesn't exists`);
            if (!participantId) return request.error(400, `Participant ID not provided`);

            const participant = await SELECT.from(Participants, participantId);
            if (!participant) return request.error(404, `Participant #${participantId} doesn't exists`);

            await UPDATE(Participants, participantId).with({ event_ID: eventId });

            event = await SELECT.from(Events, eventId);

            return event;
        });

        this.on('getEventParticipants', 'Events', async request => {
            const eventId = request.params[0];
            console.log(eventId);
            const participants = await SELECT.from(Participants).where({event_ID: eventId});

            return participants;
        });

        this.on('cancelEvent', 'Events', async request => {
            const eventId = request.params[0];

            const { cancellationReason } = request.data;
            await UPDATE(Events, eventId).with({ isCancelled: true, cancellationReason: cancellationReason, isActive: false});

            const event = await SELECT.from(Events, eventId);

            return event;

        })

        this.on('reopenEvent', 'Events', async request => {
            const eventId = request.params[0];

            await UPDATE(Events, eventId).with({ isCancelled: false, cancellationReason: null, isActive: true});

            const event = await SELECT.from(Events, eventId);

            return event;

        })

        return super.init();
    }
}

module.exports = EventService;