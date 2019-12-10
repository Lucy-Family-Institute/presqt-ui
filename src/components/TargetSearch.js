/** @jsx jsx */
import {jsx} from '@emotion/core';
import { useState } from 'react';
import {actionCreators} from "../redux/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {formatSearch} from "../redux/utils";

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
  const [searchValue, updateSearch] = useState('');

  const token = apiTokens[sourceTarget.name];

  const submitSearch = () => {
    const searchValueNoSpaces = formatSearch(searchValue);
    dispatch(actionCreators.resources.loadFromSourceTarget(
      sourceTarget, token, searchValueNoSpaces)
    )
  };

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        placeholder={"Search all " + sourceTarget.readable_name + " resources"}
        onChange={event => updateSearch(event.target.value)}
      />
      <button type="submit" onClick={submitSearch}>
        Search
      </button>
    </div>
  )
};