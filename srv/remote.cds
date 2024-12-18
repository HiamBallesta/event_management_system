using { API_BUSINESS_PARTNER as bussinessPartnerAPI } from './external/API_BUSINESS_PARTNER';

service BussinessPartnerService {
    entity bussinessPartner as projection on bussinessPartnerAPI.A_BusinessPartner;
}