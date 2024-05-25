import { Meta, StoryFn } from '@storybook/react';

import { IMovieCard } from './types';
import MovieCard from './MovieCard';
import React from 'react';

const meta = {
    title: 'Components/MovieCard',
    component: MovieCard,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                inline: false,
                iframeHeight: 400,
            }
        }
    },
    argTypes: {
        title: { control: 'text' },
        genreId: { control: 'number ' },
        movieId: { control: 'number' },
        posterPath: { control: 'text' },
        voteAverage: { control: 'number' },
    },
    tags: { "autodocs": "" },
} as unknown as Meta;

export type { Meta as default };
const Template: StoryFn<IMovieCard> = (args) => <MovieCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'John Wick: Chapter 4',
    voteAverage: 8.1,
    genreId: 28,
    movieId: 503736,
    posterPath: 'https://image.tmdb.org/t/p/w500/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg',
}