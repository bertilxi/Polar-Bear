export const isAuth = (ctx, roles: string[] = [], all = false) => {
  const { store, error } = ctx;
  const user = store.state.user;

  if (!user) {
    return error({
      message: "No se ha iniciado sesion",
      statusCode: 403
    });
  }

  const userRoles: string[] = user.roles || [];
  if (userRoles.includes("ADMIN") || roles.length === 0) {
    return;
  }

  const hasRole = userRoles.reduce(
    (auth, role) =>
      all ? auth && roles.includes(role) : auth || roles.includes(role),
    all
  );

  if (hasRole) {
    return;
  }

  error({
    message: "No tiene los permisos necesarios",
    statusCode: 403
  });
};
