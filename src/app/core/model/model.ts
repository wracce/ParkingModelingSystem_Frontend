export type UserType = "ROLE_ADMINISTRATOR" | "ROLE_MANAGER";

export interface UserInfo {

  id: number;
  fio: string;
  username: string;
  password: string;
  userRole: string;
}


export interface AddUserDialogData {
  // supplierOperation: SupplierOperation;
  // partnersList: Partner[];
  // productsList: Product[];
}


