import { createRouteHandler } from 'uploadthing/next';
import { ourFileRouter } from './core';

// Next.js API route for Uploadthing
export const { GET, POST } = createRouteHandler({ router: ourFileRouter });
