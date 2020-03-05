# !Tetris Back-end

This is the back-end repository for my Tetris clone. It was built with Node, and uses Express and Knex.

The models are a user, with a username and password, and a score, with points and a reference to a user. Authentication is handled by hashing the user's password with bcrypt, and encoding/decoding with JWT.

# Links
- Front-end Repo: https://github.com/CarlKarlQarl/Legally-Distinct-Tetris
- Back-end Repo: https://github.com/CarlKarlQarl/Legally-Distinct-Tetris-Backend
- Local repos (because I'm going to forget):
    - /Users/flatironschool/Flatirons/5Mod/capstone/tetris
    - /Users/flatironschool/Flatirons/5Mod/capstone/tetris-backend
- Database name: psql tetris_backend_db1

# Known Issues and Future Changes
- This the first real thing I've built in Node, and it should show. Everything feels pretty piecemeal and nearly copy-pasted, which is to say, it works and does nothing particularlly special. Even without much knowledge about Node/Express/Knex, it feels very haphazard and amatuer. I'd happy to revisit this.
- I don't think I'm referencing user ID's correctly in the score model. Again, it is working, but I don't think I have anything in place to keep scores from getting orphaned/there is no referential integrity!