const URL = 'http://localhost:8000/api/v1';

const links = {
    users: `${URL}/home`,
    user: `${URL}/user/`,
    createUser: `${URL}/users/create`,
    updateUser: `${URL}/users/update`,
    audits: `${URL}/audits`,
    singleAud: `${URL}/audit`,
    apps: `${URL}/apps/`,
    createApp: `${URL}/apps/create`,
    updateApp: `${URL}/apps/update`,
}

export {
    links
}