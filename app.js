import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

async function getMovies()
{
    try {
        const response = await fetch('https://www.imdb.com/chart/top/');
        const body = await response.text();
        const $ = cheerio.load(body);

        const movies = [];
    $('.lister-list tr').each((index, element) => {
      const titleColumn = $(element).find('.titleColumn').text().trim();
      const imdbRating = $(element).find('.imdbRating strong').text().trim();
      movies.push({
        title: titleColumn,
        rating: imdbRating,
      });
    });

    movies.forEach((movie) => {
      console.log(`${movie.title}: ${movie.rating}`);
    });
    } catch (error) {
        console.log(error);
    }
}

getMovies();