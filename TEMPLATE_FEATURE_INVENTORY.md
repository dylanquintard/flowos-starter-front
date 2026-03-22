# Flow Front Pizzeria Template - Functional Inventory

This inventory lists the features currently available in the template and a first SaaS packaging proposal (base plans and optional extras).

## 1) Routing and Surface Area

Main app routes are centralized in src/App.js with:
- Public routes: home, menu, planning/locations, about, contact, blog, legal pages.
- Auth routes: login, register, email verification, forgot/reset password.
- User protected routes: order flow, order confirmation, profile, user order history.
- Admin protected routes: orders, users, menu/products, ingredients, timeslots/locations, gallery, print, tickets, blog, FAQ, site info.

Legacy and SEO support:
- Legacy redirects for accented route aliases and old blog/pizza route forms.
- Catch-all route that resolves city SEO pages and blog article slugs.

## 2) Public Website Features

Marketing/public pages:
- Home page and brand presentation.
- Menu page and pizza catalog.
- Planning page (truck schedule and locations).
- About page with social proof content blocks.
- Contact page and contact form.
- Blog listing and article pages.
- Legal pages (terms, privacy, legal mentions).

SEO/local pages:
- Static local SEO page and city SEO dynamic pages.
- City-level SEO data using locations + weekly settings + SEO locations endpoint.
- Structured metadata and per-page SEO head usage.

Content blocks reusable across public pages:
- FAQ section component by path.
- Public reviews section component.
- Site announcement and sticky CTA in layout.

## 3) Identity and Session

Authentication capabilities:
- Register, login, logout.
- Email verification + resend verification.
- Forgot password + reset password.
- Session hydration with cookie-backed token fallback.
- Inactivity timeout handling and activity tracking.

Security/session mechanics:
- CSRF token bootstrap and refresh interceptor for mutating requests.
- Retry logic on invalid CSRF token responses.
- Route-level guards for user and admin zones.

## 4) Ordering and Cart (Client Side)

Catalog and product access:
- Fetch products for customers.
- Category-based browsing and product rendering.
- Ingredient data loading for customizations.

Cart flow:
- Load cart, add to cart, remove from cart, clear cart.
- Cart context state with lazy hydration and error states.

Order flow:
- Pickup availability lookup by date/location.
- Finalize order with pickup data.
- Order confirmation route.
- User order history route.
- Post-order review submission.

Customization behavior:
- Product customization modal with base ingredients and extras.
- Removed/added ingredient support.
- Recommended supplements support.

## 5) Real-Time and Operational UX

Realtime channel:
- Server-Sent Events hook with supported events:
  - realtime:connected
  - orders:admin-updated
  - orders:user-updated
  - timeslots:updated
  - locations:updated
  - cart:updated

Admin/order views consume realtime signals for near-live refresh.

## 6) Admin Backoffice Features

Admin navigation modules:
- Orders
- Tickets
- Menu
- Schedules & Locations
- Gallery
- Trucks & Printing
- Users
- Blog
- FAQ
- Site info

Orders management:
- List/filter orders (date/status).
- Update order status.
- Delete order.
- User lookup and order detail helpers.

Users management:
- Search/filter users.
- Update user roles.
- Delete users.

Menu/products/ingredients management:
- CRUD products.
- CRUD ingredients.
- Activate/deactivate ingredients.
- Link/unlink/update ingredient-product relations.
- Categories CRUD/activation (menu and ingredient kinds).
- Product image upload integration.

Schedules and locations management:
- Weekly settings CRUD by day/service.
- Concrete slots inspection and active-state toggling.
- Truck closures CRUD.
- Location manager integration.

Gallery management:
- Public gallery retrieval and admin full listing.
- Gallery image upload and CRUD.
- Activate/deactivate image.
- Mark image as home background.

Printing/truck operations:
- Print overview and jobs list.
- Truck agent CRUD and token rotation.
- Printer CRUD and assignment.
- Scheduler tick trigger.
- Reprint operations.

Tickets operations:
- Ticket/job stream with statuses.
- Ticket preview generation and deduplication by order.
- Reprint action and health indicators.

Blog CMS:
- Admin list/create/update/delete blog articles.
- Slug generation.
- Paragraph-based article editor.
- Per-paragraph image upload.

FAQ CMS:
- FAQ targets discovery by site path.
- FAQ CRUD per target path.
- Sort/resequence and activation behavior.

Site information CMS:
- Public/admin site settings retrieval.
- Update site settings across sections.
- FR/EN content support.
- Translate-to-English action.
- Header logo upload.
- OG image upload via gallery endpoint.

## 7) Multi-language and Theme

Language:
- FR/EN support through language context.
- Dual-label admin navigation and localized text utilities.

Theme:
- Theme context with toggle.
- Admin routes enforce dark mode preference.

## 8) APIs Used by Template

API client modules detected:
- admin.api.js
- user.api.js
- category.api.js
- location.api.js
- timeslot.api.js
- gallery.api.js
- blog.api.js
- faq.api.js
- contact.api.js
- review.api.js
- seo.api.js
- site-settings.api.js

This indicates broad functional coverage for a food truck storefront + backoffice operations.

## 9) What Is NOT Yet Implemented (Important Gaps)

From current template inspection:
- No explicit online payment gateway workflow in frontend code (card payment lifecycle not found as a dedicated module).
- No tenant isolation model in frontend routes or contexts (single-business template behavior).
- No subscription/billing SaaS administration UI in template scope.
- No multi-establishment switcher in UI (single establishment operational model).

## 10) SaaS Packaging Proposal (Scalable Base + Extras)

### 10.1 Functional Conditions Already Present in the Template

Menu governance and permissions:
- Menu backoffice screens are admin-gated in frontend guards (admin role required in protected routes/pages).
- Category and ingredient visibility are condition-driven through active/inactive toggles.
- Customer customization can be enabled or disabled at category level via customerCanCustomize.

Supplements and customization logic:
- Recommended supplements only appear when all conditions are true:
  - ingredient link is marked as recommended,
  - ingredient is marked as extra,
  - ingredient is active.
- Product customization fallback currently uses category/product heuristics (pizza labels and linked ingredients) if customerCanCustomize is not explicitly set.
- Ingredient link supports condition flags such as isRecommended and isAfterCooking.

Operational controls already condition-based:
- Locations, timeslots, gallery items, ingredients and categories already support activation state.
- Ordering flow depends on pickup availability/timeslot checks.

### 10.2 SaaS Mapping: Base vs Extra

Base plan (must remain scalable and production-safe for early tenants):
- Public website + local SEO baseline.
- Customer auth and profile.
- Order and cart lifecycle (pickup flow included).
- Core backoffice operations:
  - orders,
  - users,
  - schedules/locations,
  - gallery,
  - site info,
  - FAQ/blog.
- Menu governance in base, with strict role policy in SaaS:
  - super admin can always edit globally,
  - tenant admin rights can be enabled/disabled by feature flag per tenant.

Extras (feature-flagged options):
- Extra A: Supplement management advanced mode:
  - advanced recommendation rules,
  - conditional upsell rules,
  - template-level supplement presets.
- Extra B: Multi-establishment option (modifiable):
  - disabled by default,
  - can be activated per tenant after payment validation,
  - can also be included directly by admin inside a paid pack,
  - establishment-scoped catalog/schedules/ops.
- Extra C: Advanced operations:
  - print fleet analytics,
  - SLA/incident alerts,
  - automation and runbooks.
- Extra D: Payments online (planned V2 only):
  - provider integrations,
  - reconciliation dashboards,
  - payment events pipeline.
- Extra E: Advanced growth stack:
  - CRM sync,
  - campaign automation,
  - coupons/loyalty.

### 10.3 Recommended Entitlement Model for Scale

To keep the base plan scalable:
- keep a compact mandatory base (orders + operations + core CMS),
- move complexity into tenant-level feature flags,
- use additive options instead of custom code forks,
- keep one shared template codebase and toggle behavior by entitlements.

Minimal entitlement keys to introduce in SaaS panel:
- menu.manage.scope = super_admin_only | tenant_admin_allowed
- menu.supplements.mode = off | basic | advanced
- tenant.multi_establishment = off | on
- tenant.multi_establishment.payment_state = unpaid | paid | bundled
- billing.payments_online = off | on (V2)

## 11) Confirmed Product Decisions (March 18, 2026)

- V1 priority: onboard one real test client first and validate in production-like conditions.
- Payments online: deferred to V2.
- Multi-establishment: should be available as a modifiable option (not mandatory for all tenants).
- Multi-establishment commercial rule: tenant can unlock it by payment, and admin can also bundle it in selected packs.
- Menu governance direction: super-admin controlled by default, with optional delegated capabilities through paid/add-on entitlements.

## 12) Readiness for Your SaaS Direction

Template is a strong baseline for:
- Food truck vertical starter.
- Fast onboarding of first paying tenants.
- Operational pilot with real admin tooling.

Template requires platform layers before scale:
- Tenant model + isolation.
- Subscription and invoicing backbone.
- Feature flags by plan.
- Standardized onboarding/provisioning automation.
- Cross-template architecture for future restaurant template.

## 13) Road To V1 - 20 Execution Steps

This plan is optimized for one real pilot tenant in V1, with online payments in V2.

### Phase A - Product and Commercial Lock (Steps 1-4)

1. Freeze V1 commercial scope:
- Base plan includes core storefront + ordering + core operations.
- Multi-establishment remains optional.
- Online payments are excluded from V1 scope.

2. Freeze entitlement contract:
- Keep only V1-critical keys:
  - menu.manage.scope,
  - menu.supplements.mode,
  - tenant.multi_establishment,
  - tenant.multi_establishment.payment_state.

3. Define pack rules:
- Pack Base.
- Pack Base + Multi-establishment bundled.
- Pack Base + Advanced Supplements bundled.

4. Define pilot acceptance criteria:
- A pilot tenant can onboard, configure menu/hours, take real orders, and operate daily without manual code changes.

### Phase B - Data and Backend Foundation (Steps 5-9)

5. Add entitlement persistence in backend data model:
- Store entitlements per tenant in a normalized structure.

6. Add entitlement resolution logic:
- Compute effective access from direct tenant options + bundled pack options.

7. Add payment-state handling for multi-establishment:
- Support states unpaid, paid, bundled.
- Enforce that feature is active only when state is paid or bundled.

8. Add guarded backend authorization checks:
- Protect tenant-sensitive operations with entitlement checks.

9. Seed default tenant presets:
- Create default entitlement set for new tenants (safe V1 baseline).

### Phase C - Super Admin and Tenant Panels (Steps 10-14)

10. Implement super-admin entitlement console:
- View and edit tenant entitlements.
- Assign packs.
- Override per-tenant options when needed.

11. Implement tenant-facing options view:
- Show active options, locked options, and upgrade state.

12. Implement menu governance behavior:
- Enforce menu.manage.scope at UI + API level.
- Default behavior remains super-admin controlled.

13. Implement supplement mode behavior:
- off: no supplement customization.
- basic: template standard supplement flow.
- advanced: advanced rules and controls unlocked.

14. Implement multi-establishment toggle behavior:
- Feature is hidden/locked when unpaid.
- Feature is visible/active when paid or bundled.

### Phase D - Onboarding and Operations (Steps 15-17)

15. Build pilot onboarding runbook:
- Tenant creation.
- Branding and site content setup.
- Menu and schedule setup.
- Roles and access setup.

16. Build go-live checklist:
- Domain and SSL validation.
- Smoke test ordering flow.
- Admin and tenant panel permission checks.

17. Build support and incident checklist:
- Fast diagnosis for auth/order/timeslot/print incidents.
- Escalation and rollback procedure.

### Phase E - Quality Gate and Launch (Steps 18-20)

18. Add targeted regression tests:
- Entitlement matrix tests for locked/unlocked features.
- Admin permission tests for menu governance.
- Multi-establishment state tests (unpaid/paid/bundled).

19. Run pilot dry-run in pre-production:
- Simulate full onboarding-to-order journey.
- Fix blockers before real customer activation.

20. Launch pilot tenant and monitor:
- Execute first real go-live.
- Track operational KPIs and friction points for 7-14 days.
- Produce V1.1 backlog and prepare V2 payment roadmap.

### V1 Done Definition

V1 is complete when all statements are true:
- One pilot tenant runs in production with no custom code fork.
- Entitlements are operational for menu governance and multi-establishment.
- Multi-establishment can be enabled only through paid or bundled state.
- Pilot operations can be managed through documented runbooks.

## 14) Execution Backlog - 20 Technical Tickets (By Folder)

This section translates the roadmap into implementation tickets you can execute in order.

### Ticket 1 - flow-backend
Create entitlement schema in Prisma:
- Add tenant-level entitlement storage.
- Add payment state field for multi-establishment (unpaid, paid, bundled).
- Create migration and keep backward compatibility for existing tenants.

### Ticket 2 - flow-backend
Add entitlement service layer:
- Build a resolver that merges direct tenant options + bundled pack options.
- Return one effective entitlement object for authorization and UI.

### Ticket 3 - flow-backend
Add pack model and pack-assignment logic:
- Create pack definition structure.
- Add pack assignment per tenant.
- Ensure bundled options are reflected in entitlement resolution.

### Ticket 4 - flow-backend
Add authorization guards for V1 keys:
- menu.manage.scope guard.
- tenant.multi_establishment guard using payment state.

### Ticket 5 - flow-backend
Expose super-admin APIs:
- Get tenant entitlements.
- Update tenant entitlements.
- Assign/remove packs.
- Return audit metadata (who changed what, when).

### Ticket 6 - flow-backend
Expose tenant-facing APIs:
- Get current tenant effective options.
- Get lock reason for unavailable options (unpaid or not included).

### Ticket 7 - flow-backend
Seed defaults and pilot presets:
- Add base entitlement default for all new tenants.
- Add pilot seed pack(s) to speed onboarding.

### Ticket 8 - platform-admin
Add super-admin options page:
- Tenant selector.
- Pack assignment controls.
- Manual entitlement override controls.

### Ticket 9 - platform-admin
Add UI for multi-establishment monetization state:
- Show unpaid, paid, bundled state.
- Allow paid/bundled toggling for authorized super-admin only.

### Ticket 10 - platform-admin
Add menu governance controls:
- Configure menu.manage.scope per tenant.
- Explain impact in UI (super-admin only vs tenant-admin allowed).

### Ticket 11 - platform-admin
Add validation and guardrails:
- Prevent invalid combinations (for example, multi-establishment on with unpaid state).
- Show clear error banners from backend validation.

### Ticket 12 - platform-tenant
Add tenant options/plan page:
- Show active options.
- Show locked options.
- Show whether each option is direct paid or bundled.

### Ticket 13 - platform-tenant
Apply UI feature gates for multi-establishment:
- Hide or disable tenant multi-establishment controls when not entitled.
- Show upgrade-required state when unpaid.

### Ticket 14 - platform-tenant
Apply UI feature gates for menu governance:
- Enforce read-only or blocked menu admin actions when scope is super-admin only.

### Ticket 15 - flow-front
Integrate effective-options endpoint in front template runtime:
- Load entitlement snapshot at session bootstrap.
- Cache it in context for page-level gates.

### Ticket 16 - flow-front
Gate multi-establishment UX paths:
- Keep baseline single-establishment behavior by default.
- Enable multi-establishment selectors only when paid or bundled.

### Ticket 17 - flow-front
Gate advanced supplement mode:
- off: disable supplement custom controls.
- basic: keep current recommendation flow.
- advanced: unlock advanced supplement UI controls.

### Ticket 18 - tests (backend + panels + front)
Add entitlement matrix coverage:
- unpaid vs paid vs bundled for multi-establishment.
- super_admin_only vs tenant_admin_allowed for menu governance.
- basic vs advanced supplement mode behavior.

### Ticket 19 - ops/docs
Create V1 runbooks:
- Onboarding runbook.
- Go-live checklist.
- Incident and rollback checklist.

### Ticket 20 - release
Pilot launch execution:
- Dry-run in preprod.
- Production activation for first tenant.
- 7-14 day monitoring and V1.1 backlog creation.

## 15) Recommended Build Order (Fastest Safe Path)

Use this sequence to minimize rework:
1. Tickets 1-7 (backend foundation).
2. Tickets 8-11 (super-admin control plane).
3. Tickets 12-14 (tenant panel gates).
4. Tickets 15-17 (template/app runtime gates).
5. Ticket 18 (tests), then 19 (runbooks), then 20 (launch).
