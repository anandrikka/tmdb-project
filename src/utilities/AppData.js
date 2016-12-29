export const movieSortOptions = [
    {
        name: '',
        value: ''
    },
    {
        name: 'Most Popular',
        value: 'popularity.desc'
    },
    {
        name: 'Least Popular',
        value: 'popularity.asc'
    },
    {
        name: 'Title A-Z',
        value: 'original_title.asc'
    },
    {
        name: 'Title Z-A',
        value: 'original_title.desc'
    },
    {
        name: 'Release Date Ascending',
        value: 'release_date.asc'
    },
    {
        name: 'Release Date Descending',
        value: 'release_date.desc'
    },
    {
        name: 'Lowest Revenue',
        value: 'revenue.asc'
    },
    {
        name: 'Highest Revenue',
        value: 'revenue.desc'
    },
    {
        name: 'Lowest Rated',
        value: 'vote_average.asc'
    },
    {
        name: 'Highest Rated',
        value: 'vote_average.desc'
    }
];

export const tvSortOptions = [
    {
        name: '',
        value: ''
    },
    {
        name: 'Least Popular',
        value: 'popularity.asc'
    },
    {
        name: 'Most Popular',
        value: 'popularity.desc'
    },
    {
        name: 'Most Rated',
        value: 'vote_average.desc'
    },
    {
        name: 'Least Rated',
        value: 'vote_average.asc'
    },
    {
        name: 'Air Date Ascending',
        value: 'first_air_date.asc'
    },
    {
        name: 'Air Date Descending',
        value: 'first_air_date.desc'
    }
];

export const moviesQuickSearchOptions = [
    {
        value: '',
        name: ''
    },
    {
        name: 'Now Playing',
        value: 'nowPlaying'
    },
    {
        name: 'Upcoming',
        value: 'upcoming'
    },
    {
        name: 'Popular',
        value: 'popular'
    },
    {
        name: 'Top Rated',
        value: 'topRated'
    }
];

export const tvQuickSearchOptions = [
    {
        value: '',
        name: ''
    },
    {
        name: 'On Air',
        value: 'onAir'
    },
    {
        name: 'Airing Today',
        value: 'today'
    },
    {
        name: 'Popular',
        value: 'popular'
    },
    {
        name: 'Top Rated',
        value: 'topRated'
    }
];
