export interface User {
    
        id: number,
        name: string,
        fname: string,
        mname: string,
        status: 0 | 1 | 2 ,
        lastUpdatedAt: Date,
        avatar: string,
        balance: number
    
}