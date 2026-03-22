Starter prep status

This repository is a first generic extraction from `camion-alban`.

Done in the first pass:
- neutralized the starter identity in the shared defaults
- updated HTML title and manifest branding
- updated JSON-LD defaults and base tests
- removed Alban-specific sitemap URL from `robots.txt`
- neutralized the SSR/server fallback defaults

Still to clean before publishing the starter as a standalone repo:
- rewrite local SEO pages still focused on Moselle / Thionville
- rewrite About, Contact, Menu and planning texts still tied to the pizza truck use case
- remove client-specific env helpers such as `.env.docker.camion-alban`
- remove the copied nested `.git` directory before initializing the new repository
- review smoke scripts and fixtures for hardcoded city or tenant names
- verify public routes and sitemap generation for a neutral starter

Recommended next pass:
1. Generic copy for all public pages.
2. Generic local SEO strategy or disable local landing pages by default.
3. Remove leftover client-specific files.
4. Run full test/build validation before creating the new repository.
