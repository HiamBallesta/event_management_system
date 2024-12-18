using { API_BUSINESS_PARTNER as BusinessPartner } from '../srv/external/API_BUSINESS_PARTNER';

entity Supplier as projection on BusinessPartner.A_BusinessPartner {
    key BusinessPartner as ID,
    BusinessPartnerFullName as fullName,
    BusinessPartnerIsBlocked as isBlocked
}