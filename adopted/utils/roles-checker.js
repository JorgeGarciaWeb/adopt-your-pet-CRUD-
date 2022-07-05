const rolesChecker = user => {
    return {
        isAdmin: user?.role === 'ADMIN',
        isOwner: user?.role === 'OWNER',
        isUser: user?.role === 'USER'
    }
}

module.exports = { rolesChecker }