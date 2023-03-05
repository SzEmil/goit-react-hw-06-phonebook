import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import css from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { setStatusFilter } from 'redux/filterSlice';
export const Filter = () => {
  const dispatch = useDispatch();
  const handleInput = event => {
    const inputValue = event.target.value;
    console.log(inputValue);
    dispatch(setStatusFilter(inputValue));
  };

  return (
    <>
      <div className={clsx(css.filter)}>
        <label>Search contacts</label>
        <input
          className={clsx(css.filterInput)}
          onChange={handleInput}
          type="text"
          name="name"
          required
        />
      </div>
    </>
  );
};

Filter.propTypes = {
  input: PropTypes.string,
};
