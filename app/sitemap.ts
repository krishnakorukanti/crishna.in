import {MetadataRoute} from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://crishna.in',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://crishna.in/contact',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://crishna.in/projects',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
    ]
}