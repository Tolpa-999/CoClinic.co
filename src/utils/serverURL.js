const baseURL = "https://co-clinic.vercel.app/api"

const baseAuthUrl = `${baseURL}/auth/users`

const baseUserUrl = `${baseURL}/users`

const baseBooksUrl = `${baseURL}/books`

const baseCommentUrl = `${baseURL}/comments`

const baseAdminUrl = `${baseURL}/admin`

const baseAppointmentUrl = `${baseURL}/appointment`

const baseUploadUrl = baseURL


const baseAiChat = baseURL

export const UploadUrls = {
    uploadFile: `${baseUploadUrl}/upload`
}

export const AuthUrls = {
    signUp: `${baseAuthUrl}/signup`,
    verifyEmail: `${baseAuthUrl}/verify-email`,
    signIn: `${baseAuthUrl}/signin`,
    verifyEmail: `${baseAuthUrl}/verify`,
    forgetPass: `${baseAuthUrl}/send-reset-password-code`,
    resetPass: `${baseAuthUrl}/reset-password-verify`,
    passwordReset: `${baseAuthUrl}/password-reset`,
    signOut: `${baseAuthUrl}/signout`,
    google: `${baseAuthUrl}/google`,
}

export const UserUrls = {
    update: `${baseUserUrl}/update`,
    uploadImage: `${baseUserUrl}/profileImage`,
    delete: `${baseUserUrl}/delete`,
    getAll: `${baseUserUrl}/getusers`,
    searchOne: `${baseUserUrl}/search-user`,
    getDetails: `${baseUserUrl}/user-details`,
    getById: `${baseUserUrl}`,
}
export const BookUrl = {
    upload: `${baseBooksUrl}/upload`,
    create: `${baseBooksUrl}/create`,
    delete: `${baseBooksUrl}/delete`,
    update: `${baseBooksUrl}/update`,
    getAllBooks: `${baseBooksUrl}/get`,
    getById: `${baseBooksUrl}/get`,
}
export const CommentUrls = {
    create: `${baseCommentUrl}/create`,
    getPostComments: `${baseCommentUrl}/getPostComments`,
    likeOne: `${baseCommentUrl}/like`,
    editOne: `${baseCommentUrl}/edit`,
    deleteOne: `${baseCommentUrl}/delete`,
    getAll: `${baseCommentUrl}/get`,
}

export const AdminUrls = {
    promote_demote: `${baseAdminUrl}/promote_demote`,
}
export const AppointmentUrls = {
        checkout: `${baseAppointmentUrl}/checkout`, // New endpoint
    verifyPayment: `${baseAppointmentUrl}/verify-payment`,
    create: `${baseAppointmentUrl}/create`,
    patient: `${baseAppointmentUrl}/patient`,
    doctor: `${baseAppointmentUrl}/doctor`,
    doctors: `${baseAppointmentUrl}/doctors`,
    status: `${baseAppointmentUrl}/status`,
    delete: `${baseAppointmentUrl}/delete`,
}


export const AiCahtUrls = {
    create: `${baseAiChat}/chatbot/create`,
    getChats: `${baseAiChat}/chatbot/chats`,
}
