const slugify = (text) => {
	text = text.trim();
	text = text.replace(/[\.,]/g, "");
	text = text.trim();

	const slug = text.replace(/[\s\t_]/g, "-");

	return slug;
};

module.exports = slugify;

