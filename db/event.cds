using { managed } from '@sap/cds/common';
using { Participant } from './participant';

entity Event: managed {
    key ID: Integer;
    name: String;
    startDate: Date;
    endDate: Date;
    location: String;
    description: String;
    isActive: Boolean;
    isCancelled: Boolean;
    cancellationReason: String;
    participants: Association to many Participant on participants.event = $self;
}