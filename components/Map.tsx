//Reusable Map component (integrating map API)

//add props- thrissur
/*API Key Configuration
If your map API requires an API key, make sure to store it in your .env file for security:

makefile
Copy code
# .env
NEXT_PUBLIC_MAP_API_KEY=your_map_api_key
Then you can access it using process.env.NEXT_PUBLIC_MAP_API_KEY inside your component or API routes.

Use Case Example:
If you want to show a map on the worker dashboard, you would import the Map component into WorkerDashboard.tsx and render it as needed.
If you want a dedicated map page, just handle the integration inside app/map/page.tsx.
This keeps your app organized and maintains flexibility with your map API integration. */
