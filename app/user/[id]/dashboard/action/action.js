"use server"

export async function isAdmin(email){
    if(email === process.env.EMAIL_ADMIN_FIREBASE) {
        return true
    }
    return false
}