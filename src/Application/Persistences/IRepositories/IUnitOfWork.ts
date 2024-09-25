import { IBaseUnitOfWork } from "./IBaseUnitOfWork";
import JobRepository from "../../../Infrastructure/Persistences/Respositories/JobRepository";
import RoleRepository from "../../../Infrastructure/Persistences/Respositories/RoleRepository";
import NotificationRepository from '../../../Infrastructure/Persistences/Respositories/NotificationRepository';
import UserRepository from "../../../Infrastructure/Persistences/Respositories/UserRepository";
import LogRepository from "../../../Infrastructure/Persistences/Respositories/LogRepository";
import CVRepository from '../../../Infrastructure/Persistences/Respositories/CVRepository';
import CompanyRepository from '../../../Infrastructure/Persistences/Respositories/CompanyRepository';
import PermissionRepository from "../../../Infrastructure/Persistences/Respositories/PermissionRepository";
import {IRolePermissionRepository} from "./IRolePermissionRepository";
import RolePermissionRepository from "../../../Infrastructure/Persistences/Respositories/RolePermissionRepository";

export interface IUnitOfWork extends IBaseUnitOfWork{
    JobRepository: JobRepository;
    roleRepository: RoleRepository;
    notificationRepository: NotificationRepository;
    userRepository: UserRepository;
    logRepository: LogRepository;
    cvRepository: CVRepository;
    companyRepository: CompanyRepository;
    permissionRepository: PermissionRepository;
    rolePermissionRepository: RolePermissionRepository
}