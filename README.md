[![Netlify Status](https://api.netlify.com/api/v1/badges/fc26aa68-91a2-49d4-a035-e8f95834cf7e/deploy-status)](https://app.netlify.com/sites/birder-fervor/deploys)

# Birder Fervor

Birder Fervor is a progressive web app (in progress) that was inspired by getting lost using older birding tools while looking for an Eastern Screech Owl with my bird photographer mother. The aim of this app is to aid bird photographers in finding recent observations of birds by improving and adding features that current birder tools like Bird Dash (https://www.birddash.net/us/) and the eBird app have and do not have.

This app was designed to be responsive for both mobile and desktop users. Users can search for recent observations of species in the last 30 days in a region. They are presented with data from the referenced eBird checklist.

- As compared to Bird Dash and the eBird app, users can directly search by any location for a species by typing and being provided with matching suggestions from a dropdown. eBird API endpoints are separated into regional (state or country code) or address (address and a radius) endpoints. This app abstracts the need to decide between the two from the user and handles it behind the scenes for a smoother experience.
  - Bird Dash requires users to scroll through multiple very long dropdowns to select continent, state, and county, and does not allow an option for an address.
  - eBird requires the user to select a specific address or a region.
- This app is responsive to both mobile and desktop devices.
- Resulting observations and lists of species in a region are cached through React Query for better performance.
- Users can share searches for species by URL.

## Tech Stack

### [Radar API](https://radar.com/documentation/api)

- This address autocomplete and reverse geocoding was originally implemented using [Geoapify API](https://apidocs.geoapify.com/), but due to requiring specificity of address to get certain autocomplete results, I decided Geoapify was too restrictive and switched to Radar API. Radar API address autocomplete is used to allow the user to type any address they would like to search for. Addresses at the state or country level are converted into ISO 31661 or 31662 codes (for eBird API) and anything more specific is converted into a GPS coordinate.

- Reverse geocoding and is used to display an address based on the corresponding eBird checklist GPS coordinates, rather than the checklist location name which is often something enigmatic like "My House".

- The Geoapify API was chosen due to its simplicity and having previous experience with it, but to accomodate the number of API requests needed (development alone approached the free-tier limit) at a reasonable price it will likely be necessary to switch to an API like [Radar](https://radar.com).

### [eBird API 2.0](https://documenter.getpostman.com/view/664302/S1ENwy59#intro)

- eBird is a project by the Cornell Lab of Orinthology that collects and shares data from users globally. Users submit observed bird data via eBird checklists and some of that data is exposed via the eBird API 2.0.

### React Query

- React Query was chosen to manage API calls. React Query caching is especially helpful since the API design is a little idiosyncratic and to get certain sets of data, sometimes multiple API calls are required, but caching mitiates drops in performance.

### React Router

- Most global state is stored in the URL in order to allow users to share searches.

- Further work is to change which parts of the URL are query parameters and which are part of the path. As the app has matured, the current organization could be more logical.

### Tailwind CSS

- Tailwind CSS was chosen in order to implement responsive web design. I envision this app being used "in the field" and so it was designed to display well on mobile devices.

## Further Work

- Providing feedback if a species is searched but has not been seen in the last 30 days (not that it has never been seen in the area) such as a historic observation

- Allowing users to search by not only states as regions, but addresses using an adjustable area radius.

- Allow offline use to refer to previous lists of observations.

- Allow filtering of species and observations
