export type Company = {
    name: string;
    id?: number;
    author: number;
    nip: string;
    regon?: string | null;
    pkd?: string | null;
    postalCode?: string | null;
    city?: string | null;
    street?: string | null;
    phoneNumber?: number | null;
    email?: string | null;
    notes?: string | null;
    updatedAt?: Date;
    createdAt?: Date;
}
export type Worker = {
    id: number;
    name: string;
    surname: string;
    author: number 
    secondName: string;
    sex?: string;
    trainingEntry?: Date;
    trainingPeriodic?: Date;
    medicalExamination?: Date;
    company?: Company,
    companyId: number;
    department?: string;
    employmentForm?: string;
    absence?: string;
    pesel?: number;
    IdCardNumber?: string;
    dateOfBirth?: Date;
    placeOfBirth?: string;
    disability?: boolean;
    postalCode?: string;
    city?: string;
    street?: string;
    phoneNumber?: number;
    email?: string;
    position?: string;
    positionType?: string;
    positionSection?: string;
    positionNotes?: string;
    youth?: boolean;
    nightShift?: boolean;
    notes?: string;
    updatedAt: Date;
    createdAt: Date;
}

