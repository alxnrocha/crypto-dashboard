### Objective

Implement a global search functionality to allow users to quickly find specific cryptocurrencies in the data table.

### Tasks

* Add `searchQuery` state to Zustand store.
* Connect the search input in `TopBar.tsx` to the global state.
* Filter the `CoinTable` component based on the search query (matching coin name or symbol).

### Acceptance criteria

* Search input updates the table in real-time.
* Case-insensitive matching.
* Clears search query when navigating away (optional).
