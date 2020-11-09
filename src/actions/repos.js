import {
    REPOS_SEARCH_REQUEST,
    REPOS_SEARCH_SUCCESS,
    REPOS_SEARCH_EMPTY,
    REPOS_SEARCH_NOT_FOUND,
    REPOS_CLEAR
} from "../actions/types";
import { addHistoryItem } from "./history";
import axios from "axios";

export const searchRepos = input => async (dispatch, getState) => {
    const { repos: { user: userState, error: errorState } } = getState();
    if (userState || errorState) {
        dispatch({ type: REPOS_CLEAR });
    }

    if (input !== "") {
        dispatch({ type: REPOS_SEARCH_REQUEST });

        try {
            const reposRes = await axios.get(`https://api.github.com/users/${input}/repos?page=1&per_page=100`);
            const profileRes = await axios.get(`https://api.github.com/search/users?q=${input}`);

            const matchingProfile = profileRes.data.items.find(item =>
                item.login.toLowerCase() === input.toLowerCase());

            if (!matchingProfile) {
                dispatch({ type: REPOS_SEARCH_NOT_FOUND });
            }
            else {
                const user = {
                    name: matchingProfile.login,
                    avatar: matchingProfile.avatar_url
                };
                const repos = reposRes.data;
                repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                if (repos.length > 0) {
                    dispatch({
                        type: REPOS_SEARCH_SUCCESS,
                        payload: { user, repos }
                    });
                }
                else {
                    dispatch({
                        type: REPOS_SEARCH_EMPTY,
                        payload: { user }
                    });
                }

                dispatch(addHistoryItem(matchingProfile.login));
            }
        }
        catch {
            dispatch({ type: REPOS_SEARCH_NOT_FOUND });
        }
    }
}