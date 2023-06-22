module.exports.createSlug = (str) => {
    const slug = str
        .toLowerCase() // Convert the string to lowercase
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with a hyphen
        .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
        .trim(); // Trim any whitespace
    
  return slug;
}