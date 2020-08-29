export function  isLoggedIn()
{
    return localStorage.getItem("isLoggedIn") == 'true'; //get ค่า ที่ locastorage ใน isLoggetIn ที่เป็น true
}

export function  logIn()
{
    return localStorage.setItem("isLoggedIn",true); // เมือ login set ค่าเป็น true
}


export function  logOut()
{
    return localStorage.setItem("isLoggedIn",false); // เมือ logout set ค่าเป็น false
}
