[![Netlify Status](https://api.netlify.com/api/v1/badges/fc26aa68-91a2-49d4-a035-e8f95834cf7e/deploy-status)](https://app.netlify.com/sites/birder-fervor/deploys)

# Birder Fervor

Birder Fervor is a progressive web app (in progress) that was inspired by getting lost using older birding tools while looking for an Eastern Screech Owl with my bird photographer mother. The aim of this app is to aid bird photographers in finding recent observations of birds by improving and adding features that current birder tools like Bird Dash (https://www.birddash.net/us/) and the eBird app have and do not have.

This app was designed to be responsive for both mobile and desktop users. Users can search for recent observations of species in the last 30 days in a region. They are presented with data from the referenced eBird checklist.

- As compared to Bird Dash, users can directly search regions and species by typing and being provided with matching suggestions from a dropdown, rather than scrolling through multiple very long dropdowns.
- This app is responsive to both mobile and desktop devices.
- Resulting observations and lists of species in a region are cached through React Query for better performance.
- Users can share searches for species by URL.

## Tech Stack

### [Geoapify API](https://apidocs.geoapify.com/)

- Geoapify address autocomplete is used to allow the user to type a subnational region (state/province/prefecture) they would like to search for species in and be provided with a dropdown of selections. Bird Dash currently requires a user to select a country and a subnational region from dropdowns which is not idea for the number of options to choose from. Ideally, the user could enter a subnational region or an address with a specified radius to search for species, but the later option will be implemented due to needing to use another eBird API endpoint.

- Reverse geocoding and is used to display an address based on the corresponding eBird checklist GPS coordinates, rather than the checklist location name which is often something enigmatic like "My House".

- The Geoapify API was chosen due to its simplicity and having previous experience with it, but to accomodate the number of API requests needed (development alone approached the free-tier limit) at a reasonable price it will likely be necessary to switch to an API like [Radar](https://radar.com).

### [eBird API 2.0](https://documenter.getpostman.com/view/664302/S1ENwy59#intro)

- eBird is a project by the Cornell Lab of Orinthology that collects and shares data from users globally. Users submit observed bird data via eBird checklists and some of that data is exposed via the eBird API 2.0.

### React Query

- React Query was chosen to manage API calls. React Query caching is especially helpful since the API design is a little idiosyncratic and to get certain sets of data, sometimes multiple API calls are required, but caching mitiates drops in performance.

### React Router

### Tailwind CSS

## Further Work

- Only showing species in a region that have been seen in the last 30 days.
- Allowing users to search by not only states as regions, but addresses using an area radius.
- Allow offline use to refer to previous lists of observations.
