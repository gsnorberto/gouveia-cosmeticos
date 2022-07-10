// Connect to the client server

import sanityClient  from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Imported from our sanity client settings
export const client = sanityClient({
    projectId: 'fhsjxofj',
    dataset: 'production',
    apiVersion: '2022-07-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

// give us access to the urls where our images are stored
export const urlFor = (source) => builder.image(source)