export interface UserInfo{
    userName : string,
    storeId : string,
    userId : string,
    token:string,

    canOpen_frmPurchaseInvoice : boolean,
    canCreate_frmPurchaseInvoice : boolean,
    canEdit_frmPurchaseInvoice : boolean,
    canDelete_frmPurchaseInvoice : boolean,
    canPrint_frmPurchaseInvoice : boolean,
    custom1_frmPurchaseInvoice : boolean,

    canOpen_frmPurchaseOrder : boolean,
    canCreate_frmPurchaseOrder : boolean,
    canEdit_frmPurchaseOrder : boolean,
    canDelete_frmPurchaseOrder : boolean,
    canPrint_frmPurchaseOrder : boolean,
    custom1_frmPurchaseOrder : boolean,

    canOpen_frmPurchaseRequest : boolean,
    canCreate_frmPurchaseRequest : boolean,
    canEdit_frmPurchaseRequest : boolean,
    canDelete_frmPurchaseRequest : boolean,
    canPrint_frmPurchaseRequest : boolean,
    custom1_frmPurchaseRequest : boolean,

    canOpen_frmItemCard : boolean,
    canCreate_frmItemCard : boolean,
    canEdit_frmItemCard : boolean,
    canDelete_frmItemCard : boolean,
    canPrint_frmItemCard : boolean,
    custom1_frmItemCard : boolean,
    
    canOpen_frmCustomer : boolean
    canCreate_frmCustomer : boolean
    canEdit_frmCustomer : boolean
    canDelete_frmCustomer : boolean
    canPrint_frmCustomer : boolean
    custom1_frmCustomer : boolean
    canPreView_frmCustomer : boolean
    CanPost_frmCustomer : boolean
    PrintWithSave_frmCustomer : boolean

    // انواع العملاء
    canOpen_frmCustomerTypes : boolean,
    canCreate_frmCustomerTypes : boolean,
    canEdit_frmCustomerTypes : boolean,
    canDelete_frmCustomerTypes : boolean,
    canPrint_frmCustomerTypes : boolean,
    custom1_frmCustomerTypes : boolean,
    canPreView_frmCustomerTypes : boolean,
    CanPost_frmCustomerTypes : boolean,
    PrintWithSave_frmCustomerTypes : boolean

    // فئات العملاء
    canOpen_frmCustomerCategory : boolean,
    canCreate_frmCustomerCategory : boolean,
    canEdit_frmCustomerCategory : boolean,
    canDelete_frmCustomerCategory : boolean,
    canPrint_frmCustomerCategory : boolean,
    custom1_frmCustomerCategory : boolean,
    canPreView_frmCustomerCategory : boolean,
    CanPost_frmCustomerCategory : boolean,
    PrintWithSave_frmCustomerCategory : boolean

    // فئات الاصناف
    canOpen_frmItemCategory : boolean,
    canCreate_frmItemCategory : boolean,
    canEdit_frmItemCategory : boolean,
    canDelete_frmItemCategory : boolean,
    canPrint_frmItemCategory : boolean,
    custom1_frmItemCategory : boolean,
    canPreView_frmItemCategory : boolean,
    CanPost_frmItemCategory : boolean,
    PrintWithSave_frmItemCategory : boolean,

    // الصناديق
    canOpen_frmBox : boolean,
    canCreate_frmBox : boolean,
    canEdit_frmBox : boolean,
    canDelete_frmBox : boolean,
    canPrint_frmBox : boolean,
    custom1_frmBox : boolean,
    canPreView_frmBox : boolean,
    CanPost_frmBox : boolean,
    PrintWithSave_frmBox : boolean,

    // الموردين
    canOpen_frmVendor : boolean,
    canCreate_frmVendor : boolean,
    canEdit_frmVendor : boolean,
    canDelete_frmVendor : boolean,
    canPrint_frmVendor : boolean,
    custom1_frmVendor : boolean,
    canPreView_frmVendor : boolean,
    CanPost_frmVendor : boolean,
    PrintWithSave_frmVendor : boolean,

    // المدن
    canOpen_City : boolean,
    canCreate_City : boolean,
    canEdit_City : boolean,
    canDelete_City : boolean,
    canPrint_City : boolean,
    custom1_City : boolean,
    canPreView_City : boolean,
    CanPost_City : boolean,
    PrintWithSave_City : boolean,

    // وحدات الاصناف
    canOpen_frmItemUnites : boolean,
    canCreate_frmItemUnites : boolean,
    canEdit_frmItemUnites : boolean,
    canDelete_frmItemUnites : boolean,
    canPrint_frmItemUnites : boolean,
    custom1_frmItemUnites : boolean,
    canPreView_frmItemUnites : boolean,
    CanPost_frmItemUnites : boolean,
    PrintWithSave_frmItemUnites : boolean,

    // الوظائف
    canOpen_frmJobs : boolean,
    canCreate_frmJobs : boolean,
    canEdit_frmJobs : boolean,
    canDelete_frmJobs : boolean,
    canPrint_frmJobs : boolean,
    custom1_frmJobs : boolean,
    canPreView_frmJobs : boolean,
    CanPost_frmJobs : boolean,
    PrintWithSave_frmJobs : boolean,

    // الموظفين
    canOpen_frmEmployees : boolean,
    canCreate_frmEmployees : boolean,
    canEdit_frmEmployees : boolean,
    canDelete_frmEmployees : boolean,
    canPrint_frmEmployees : boolean,
    custom1_frmEmployees : boolean,
    canPreView_frmEmployees : boolean,
    CanPost_frmEmployees : boolean,
    PrintWithSave_frmEmployees : boolean,

     // الهيكل الادارى
     canOpen_frmDepartment : boolean,
     canCreate_frmDepartment : boolean,
     canEdit_frmDepartment : boolean,
     canDelete_frmDepartment : boolean,
     canPrint_frmDepartment : boolean,
     custom1_frmDepartment : boolean,
     canPreView_frmDepartment : boolean,
     CanPost_frmDepartment : boolean,
     PrintWithSave_frmDepartment : boolean,
 

}