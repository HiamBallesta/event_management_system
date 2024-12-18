using {Participant} from '../db/participant';
using {Supplier} from '../db/suplier';

service ParticipantService {
    entity Suppliers as projection on Supplier;
    entity Participants as projection on Participant 
    actions {
        function fetchParticipantDetails() returns Suppliers;
    };
}