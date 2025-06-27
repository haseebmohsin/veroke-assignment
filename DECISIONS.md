### What trade-offs did you make and why?

- **Used polling (every 10s)** instead of WebSockets — it's simpler, free-tier‑friendly, and easy to build.

### 🕒 What would you do with more time?

- Swap in **WebSockets or server‑sent events** for real‑time updates — faster and more efficient than polling.
- Build **full authentication and persistence** (OAuth + database) so users can save and sync their watchLists.
- Add **advanced charting** (zoom, ranges, technical indicators), tooltips, and news feeds for a feature‑packed experience.

### 🌍 How would you scale this for real users?

- **Cache APIs** and proxy requests via backend to hide API keys and control rate limits.
- Use **bulk quote endpoints** instead of one‑off requests per ticker to stay efficient.
- Swap to a high‑availability data source (Alpha Vantage Premium) for stable & fast real‑time data.
- Support **infinite pagination** and card virtualization for large watchLists.
