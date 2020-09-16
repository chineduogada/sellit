import { useParams } from "react-router-dom";

/**
 * a hook responsible for getting the `value` of a param
 * @param {string} propParam - this is passed from `props`, if there's an assumed `value` for a `param`
 * @param {string} paramKey - the key for the param.
 *
 * @returns the `value` for the provide `param` as a `string`. Or the `propParam` if provided.
 *
 * @example
 * function ViewSpecificProduct ({slug: propSlug}){
 *  const slug = useParamsProperty(propSlug, "slug");
 *
 *  //...
 * }
 */
function useParamsProperty(propParam, paramKey) {
	let param = useParams()[paramKey];

	if (propParam) {
		return propParam;
	}

	return param;
}

export default useParamsProperty;

