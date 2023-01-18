import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'

import { withMongo } from '../../lib/mw';

import Date from 'dayjs';

export const getServerSideProps = async (ctx) => {
    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')

    var posts = await withMongo('data', async (db) => {
        const collection = db.collection('posts')
        return await collection.find({ public: true }, { projection: { "_id": 0, "id": 1,"time": 1} }).toArray()
    });

    const fields = [];
    
    for (const post of posts) {
        fields.push({
            loc: process.env.SITE_URL + '/posts/' + post.id,
            lastmod: Date(post.time).toISOString(),
        })
    }

    /*[
        {
            loc: 'https://example.com', // Absolute url
            lastmod: new Date().toISOString(),
            // changefreq
            // priority
        },
        {
            loc: 'https://example.com/dynamic-path-2', // Absolute url
            lastmod: new Date().toISOString(),
            // changefreq
            // priority
        },
    ]*/

    return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() { }