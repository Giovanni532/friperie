"use server"

export async function IsAdmin(email){
    if(email === process.env.EMAIL_ADMIN_FIREBASE) {
        return true
    }
    return false
}

/* COMMENT APPELER LA FONCTION */

// IsAdmin(user.email)