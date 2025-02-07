const getCurrentUserMock = (currentUser, role) => {
  return {
    data: {
      createdAt: currentUser.createdAt.getTime(),
      email: currentUser.email,
      fullName: currentUser.fullName,
      id: currentUser.id,
      permissions: [],
      role: {
        createdAt: role.createdAt.getTime(),
        description: null,
        id: role.id,
        isAdmin: role.isAdmin,
        key: role.key,
        name: role.name,
        updatedAt: role.updatedAt.getTime(),
      },
      trialExpiryDate: currentUser.trialExpiryDate.toISOString(),
      updatedAt: currentUser.updatedAt.getTime(),
    },
    meta: {
      count: 1,
      currentPage: null,
      isArray: false,
      totalPages: null,
      type: 'User',
    },
  };
};

export default getCurrentUserMock;
