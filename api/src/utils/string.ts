export const formatName = (name: string) => {
  if (!name?.length) {
    return '';
  }

  if (/\s/.test(name) || name.includes('-')) {
    return name;
  }

  return `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;
};
