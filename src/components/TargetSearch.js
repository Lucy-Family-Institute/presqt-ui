/** @jsx jsx */
import {jsx} from '@emotion/core';
import { useState } from 'react';
import {actionCreators} from "../redux/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {formatSearch} from "../redux/utils";
import { SearchInput } from '@bit/segmentio.evergreen.search-input';
import textStyles from "../styles/text";

export default function TargetSearch() {
  const dispatch = useDispatch();

  /** SELECTOR DEFINITIONS
   * apiTokens    : Object of <targets: tokens> submitted in the current session
   * sourceTarget : Object of the current source selected
   **/
  const apiTokens = useSelector(state => state.authorization.apiTokens);
  const sourceTarget = useSelector(state => state.targets.source);

  /** STATE DEFINITIONS
   * [searchValue, updateSearch] : Search value state
   **/
  const [searchValue, setSearchValue] = useState('');

  const token = apiTokens[sourceTarget.name];

  const submitSearch = () => {
    dispatch(actionCreators.resources.removeFromErrorList(
      actionCreators.resources.loadFromSourceTargetSearch.toString())
    );
    dispatch(actionCreators.resources.loadFromSourceTargetSearch(
      sourceTarget.name, token, searchValue)
    );
  };

  return (
    <div css={{marginBottom: 10}}>
      <SearchInput
        type="text"
        placeholder={"Search all " + sourceTarget.readable_name + " resources"}
        value={searchValue}
        onChange={event => setSearchValue(event.target.value)}
      />
      <button type="submit" onClick={submitSearch}>
        Search
      </button>
    </div>
  )
};