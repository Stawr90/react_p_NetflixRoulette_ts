import React from 'react';
import { Form, Field } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';

import { searchingBtn, searchBtn, searchTitleOrGenre, valueSearch, searchChange, fetchSearchMovies} from './searchSlice';

import './searchForm.scss';

const SearchForm = () => {
    const serchingItemsBtn = useSelector(searchingBtn);
    const checkedBtn = useSelector(searchBtn);
    const value = useSelector(valueSearch);
    const dispatch = useDispatch();

    const submitSearch = () => {
        if (value !== '') {
            dispatch(fetchSearchMovies() as any);
        }
    }

    return (
        <>
            <Form
                onSubmit={submitSearch}
                render={({ handleSubmit }) => (
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form__subtitle">
                            <span>find your movie</span>
                        </div>

                        <Field name="search">
                            {({ input }) => (
                            <input {...input} value={value} placeholder="Please enter a movie" className="form__input"
                                onChange={(e) => dispatch(searchChange((e.target.value).trim()))}/>
                            )}
                        </Field>
                        <div className="form__allbtn">
                            <div className="form__radiobtn">
                                <span>search by</span>
                                {serchingItemsBtn.map(item => (
                                    <div key={item.value} className="form_radio_btn">
                                        <Field name="searchType" type="radio" value={item.value}>
                                            {({ input }) => (
                                                <>
                                                    <input id={item.id} type="radio" name="radio" 
                                                    checked={item.value === checkedBtn ? true : false}
                                                    onChange={() => {
                                                        input.onChange(item.value);
                                                        dispatch(searchTitleOrGenre(item.value));
                                                    }}
                                                    />
                                                    <label htmlFor={item.id}>{item.label}</label>
                                                </>
                                            )}
                                        </Field>
                                    </div>
                                ))}
                            </div>
                            <button className="app__btn" type="submit">search</button>
                        </div>
                        
                    </form>
                )}
            />
        </>
    )
}

export default SearchForm;