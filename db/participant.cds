using { managed } from '@sap/cds/common';
using { Event } from './event';
using { Supplier } from './suplier';

entity Participant : managed {
    key ID: Integer;
    firstName: String;
    lastName: String;
    email: String;
    phone: String;
    event: Association to Event;
    businessPartnerID: String;
}