export interface LoginResponse{
    access_token:string;
    token_type:string;
}

export async function loginUser(credentials:{username:string;password:string;}):Promise<LoginResponse>{
    const formData = new URLSearchParams();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);
    
    const res = await fetch("http://localhost:8000/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
        },
        body:formData.toString(),
    });

    const data = await res.json()
    console.log("Login API Response:" , data);

    if (!res.ok){
        throw new Error(data.detail || "Login Failed")
    }
    return data;
}


export async function registerUser(userData:{username: string; email:string;password:string;}):Promise<void>{
    const res = await fetch("http://localhost:8000/signup",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(userData),
    });

    if (!res.ok){
        const data = await res.json();
        throw new Error(data.detail || "Registration Failed");
    }
}

export async function logoutUser():Promise<void>{
    const res = await fetch("http://localhost:8000/logout",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({}),
    });

    if (!res.ok){
        const data = await res.json();
        throw new Error(data.detail || "Logout Failed");
    }

}