[ ] - Create terraform code for GCP API and Cloudflare R2
[x] - Create .env.sample
[ ] - Fix potential race conditions on bidding & other DB writes
[ ] - Clean up providers and layout a little, my god
[ ] - Design a loading page
[ ] - Get a good logo
[ ] - Put more explicit types
[ ] - Implement caching
        - Start with images fetched from the client (notificationCell)
[ ] - Test adding two images with identical keys, if bad result use UUIDs instead
[ ] - Add date of action to notification cell
[ ] - Allow time input for auctions
        - Then, use that time to allow sorting by nearest ending auctions!
[ ] - Add errors to inputs with `error` prop and polymorphic component
[ ] - For live bids, fine-tune times with useState to have real-time item info
[ ] - Add ability to send emails & turn off emails in user settings
        - Use SES or Resend through Knock