
// user
export interface user {
    email: string
    organization: string
    name: string
}

// message
export interface messsage { 
    message: string
}

// user profile
export interface userProfile {
    department: string
    title: string
    isAdmin: boolean
}

// certifications
export interface certifications {
    certifications: certification[]
}
export interface certification {
    certID: string
    certName: string
    ICC: boolean
    UCC: boolean
}

// certification history
export interface certHistory {
    certHistory: certRecord[]
}
export interface certRecord {
    entryId: number
    user: string
    certId: string
    date: string
}