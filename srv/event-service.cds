using {Event} from '../db/event';
using {Participant} from '../db/participant';
 
//return /event
service EventService {
    // /Participants
    entity Participants as projection on Participant;
    //GET /Events
    entity Events as projection on Event
    actions {
        action registerParticipant(participantId: Integer) returns Events;
        function getEventParticipants() returns array of Participants;
        action cancelEvent(cancellationReason: String) returns Events;
        action reopenEvent() returns Events;
    };
}