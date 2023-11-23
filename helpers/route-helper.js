const getRoute = async (req) => {
  const { link } = req.params;

  try {
    const linkType = link.length === 12 ? 'admin' : 'user';

    let route;

    if (linkType === 'user') {
      route = '/vote';
    } else if (linkType === 'admin') {
      route = '/poll-results';
    }

    return route;
  } catch (error) {
    console.error(error);
    return '/';
  }
};

module.exports = { getRoute };