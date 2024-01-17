import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as reduxHooks from 'react-redux';

import InfoCard from '../InfoCard';

const infoCard = {
    "img": "https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/2f48ce0d-8590-4ac9-b130-8073f34f5c83/300x450",
    "title": "One of us",
    "date": 2017,
    "timer": 119,
    "descr": "The film follows the lives of three ex-members of Brooklyn is Hasidic community: Ari Hershkowitz, Luzer Twersky, and Etty Ausch. Each struggles with being ostracized from their former community and families, while revealing how they came to leave."
};

const MockInfoCard = () => {
    return (
        <MemoryRouter>
            <InfoCard/>
        </MemoryRouter>
    )
}

jest.mock('react-redux');
const mockedUseSelector = jest.spyOn(reduxHooks, 'useSelector');

describe('InfoCard Component', () => {
    test('must accept correct data', async () => {
        mockedUseSelector.mockReturnValue(infoCard)
        const component = render(<MockInfoCard/>);
        expect(component).toMatchSnapshot();
    });

    test('should render info card', () => {
        render(<MockInfoCard/>);

        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByAltText(/one of us/i)).toBeInTheDocument();
        expect(screen.getByText(/one of us/i)).toBeInTheDocument();
        expect(screen.getByText(/2017/i)).toBeInTheDocument();
        expect(screen.getByText(/119 min/i)).toBeInTheDocument();
        expect(screen.getByText(/the film follows/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Films'})).toBeInTheDocument();
    });
});