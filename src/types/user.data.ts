export interface userDatasType {
        id: string;
        userName: string;
        email?: string | null;
        address: string;
        phoneNumber: string;
        admissionFee: string;
        profile?: string | null;
        joinedDate: Date;
        paymentDate: Date;
        createdAt?: Date | null;
        updatedAt?: Date | null;
}