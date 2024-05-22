export interface SignUp{
    uname:string,
    upass:string,
    uemail:string
}

export interface UserSignUp
{
    name:string,
    email:string,
    pass:string
}

export interface userSignIn
{
    email:string,
    pass:string   
}

export interface SignIn
{
    uemail:string,
    upass:string
}
export interface product
{
    pname:string,
    category:string,
    color:string,
    price: number,
    description:string,
    image:string,
    id:number,

    sellerId:number,
    
    quantity:undefined | number,
    productId:undefined |number
}

export interface cart
{
    pname:string,
    category:string,
    color:string,
    price: number,
    description:string,
    image:string,
// Does not needed id 
    id:number,    
    quantity:undefined | number,
    userId:number,
    productId:number   
}

export interface priceSummary
{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}


export interface order
{
    // email:string,
    // address:string,
    // totalPrice:number | undefined,
    // userId:number
    

    fname: string,
    email: string,
    address: string,
    paymentMethod: string,
    totalAmount:string,
    userId: number,
    id:undefined|number
}