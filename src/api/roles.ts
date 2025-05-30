export interface Role {
    id:number;
    name:string;
}

export async function getRoles():Promise<Role[]> {
    const res = await fetch("http://localhost:8000/roles");
    if(!res.ok) {
        throw new Error("Failed to fetch roles");
    }
    return await res.json();
}