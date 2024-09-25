import { CoreException } from '../../Common/Exceptions/CoreException';
import { CreateCompanyResponse } from "../../Features/Company/Responses/CreateCompanyResponse";
import { GetCompanyResponse } from "../../Features/Company/Responses/GetCompanyResponse";
import { ChangeStatusCompanyResponse } from "../../Features/Company/Responses/ChangeStatusCompanyResponse";
import { GetAllCompanyResponse } from '../../Features/Company/Responses/GetAllCompanyResponse';
import { ConfigSlotResponse } from '../../Features/Company/Responses/ConfigSlotResponse';

export default interface ICompanyService{
    createNewCompany(data: any): Promise<CreateCompanyResponse|CoreException>;
    getCompanyById(_id: string): Promise<GetCompanyResponse|CoreException>;
    changeStatusCompanyById(data: any): Promise<ChangeStatusCompanyResponse|CoreException>
    getAllCompany(queryData: any): Promise<GetAllCompanyResponse | CoreException>
    update(id: string, data: any): Promise<GetCompanyResponse|CoreException>;
    delete(id: string, data: any): Promise<GetCompanyResponse|CoreException>;
    configSlot(comapnyId: string, slotTime: number, slot: any): Promise<ConfigSlotResponse | CoreException>;
}