export class UpdateCompanyRequest {
    public companyName: string;
    public industry: string;
    public location: string;
    public companySize: string;
    public address: string;
    public website: string;
    public contactInfo: string;


    constructor(companyName: string, industry: string, location: string, companySize: string, address: string, website: string, contactInfo: string) {
        this.companyName = companyName;
        this.industry = industry;
        this.location = location;
        this.companySize = companySize;
        this.address = address;
        this.website = website;
        this.contactInfo = contactInfo;
    }
}