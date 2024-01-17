import React from 'react';
import { Form, Field } from 'react-final-form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {sortingBtn, sortBtn, moviesSorted, fetchSortMovies} from '../moviesList/moviesSlice';
import { ICounter, IFormHeader } from 'types/TypesBase';

import './headerList.scss';

const HeaderList = ({found}: ICounter) => {
	const sortingItemsBtn = useSelector(sortingBtn);
	const styleBtn = useSelector(sortBtn);
	const dispatch = useDispatch();

	useEffect(() => {
		if (styleBtn !== null) {
			dispatch(fetchSortMovies() as any)
		}
	}, [styleBtn]);

	const submitSort = (values: IFormHeader) => {
		dispatch(moviesSorted(values.sortType));
	};

	return (
		<Form
			onSubmit={submitSort}
			render={({ handleSubmit }) => (
				<div className="headerlist">
					<div className="headerlist__movies">{found} movies found</div>
					<div className="headerlist__sort">
						Sort by
						{sortingItemsBtn.map(item => (
							<Field name="sortType" key={item.value}>
								{({input}) => (
									<>
										<input id={item.value} type="radio" name="radio"
										checked={item.value === styleBtn ? true : false}
										onChange={() => {
											input.onChange(item.value);
											handleSubmit();
										}}
										/>
										<label htmlFor={item.value}>{item.label}</label>
									</>
								)}
							</Field>
						))}
					</div>
				</div>
			)}
		/>
	)
}

export default HeaderList;