import queryString from "query-string";
import { useLocation } from "react-router-dom";

/**
 * a hook responsible for parsing the queryString in the `URL` and getting the `value` of the 'key' provided.
 * @param {string} propQuery - this is passed from `props` if there's an assumed `value` for a `query`
 * @param {string} queryKey - the key in the queryString.
 *
 * @returns the `value` for the provided `query` as a `string`. Or the propQuery is provided.
 *
 * @example
 * function ViewSpecificProduct ({userId: propUserId}){
 *  const userId = useQuery(propUserId, "userId");
 *
 *  //...
 * }
 */
function useQuery(propQuery, queryKey) {
	const { search } = useLocation();

	if (propQuery) {
		return propQuery;
	}

	return queryString.parse(search)[queryKey];
}

export default useQuery;

