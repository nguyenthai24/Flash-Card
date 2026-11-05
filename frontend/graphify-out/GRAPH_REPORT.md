# Graph Report - frontend  (2026-10-30)

## Corpus Check
- Corpus is ~16,623 words - fits in a single context window. You may not need a graph.

## Summary
- 732 nodes · 1199 edges · 69 communities (52 shown, 17 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Theme Color Palette
- Mantine Component Wrappers
- Styled UI Components
- Frontend Dependency Manifest
- API Client and Session Auth
- Shared Layout Styles
- Build and Type Dependencies
- TypeScript Configuration
- Header Navigation Components
- Study Set Page
- Email Verification Pages
- Shared Application Constants
- Authentication Form Components
- Mantine Date Input Wrappers
- Registration Routes and Forms
- Login Routes and Entry Point
- Error and Not Found Handling
- Application Route Constants
- Root Layout and Global Libraries
- Password Reset Routes
- Validation and Text Patterns
- OAuth Callback and Result Routes
- Server Data Fetch and Filter Types
- Query Client Provider
- Forgot Password Flows
- API Status Codes
- User Verification States
- Authentication Layout and Services
- Select Component Wrappers
- Form Validation Messages
- Account Sidebar Sections
- UI Animation Keyframes
- Theme and UI Providers
- Main Layout and Footer
- User and Device Enums
- Navigation Link Primitives
- Styled Components Theme
- Study Mode Navigation
- Lint Configuration
- React Timers and Lifecycle Hooks
- Next.js Starter Documentation
- Progressive Web App Manifest
- Sidebar Navigation Component
- Responsive Breakpoints
- Swiper Stylesheet Support
- OAuth Integration Configuration
- Development and Build Scripts
- API V2 Status Codes
- API Response Pagination Types
- Language Flags and Locale
- Browser Storage Keys
- Authentication Redirect Routes
- UI Shadow Tokens
- Social Login Provider Types
- Authentication API Boundaries
- Verification Token Security
- Authentication Cookie Names
- Environment Variable Typings
- OAuth Callback Contract
- Password Policy Validation
- React Hook Form Dependency
- Markdown Rendering Dependency
- 404 Page Illustration
- 500 Error Illustration
- Empty List Illustration

## God Nodes (most connected - your core abstractions)
1. `@mantine/core` - 49 edges
2. `styled-components` - 31 edges
3. `next` - 30 edges
4. `LoginScreen()` - 20 edges
5. `theme` - 19 edges
6. `RegistrationScreen()` - 19 edges
7. `ResetPasswordScreen()` - 17 edges
8. `react` - 16 edges
9. `compilerOptions` - 16 edges
10. `react-icons` - 14 edges

## Surprising Connections (you probably didn't know these)
- `MainLayoutPage()` --calls--> `MainLayout()`  [EXTRACTED]
  src/app/(main)/layout.tsx → src/components/Layouts/Main/index.tsx
- `StudySetPage()` --calls--> `StudySet()`  [EXTRACTED]
  src/app/(main)/study-set/[id]/page.tsx → src/features/study-set/index.tsx
- `OAuthCallbackPage()` --calls--> `OAuthCallbackScreen()`  [EXTRACTED]
  src/app/auth/callback/page.tsx → src/features/auth/screens.tsx
- `LegacyRegisterPage()` --calls--> `RegistrationScreen()`  [EXTRACTED]
  src/app/dang-ky/page.tsx → src/features/auth/screens.tsx
- `SignInPage()` --calls--> `LoginScreen()`  [EXTRACTED]
  src/app/dang-nhap/page.tsx → src/features/auth/screens.tsx

## Import Cycles
- None detected.

## Communities (69 total, 17 thin omitted)

### Community 0 - "Theme Color Palette"
Cohesion: 0.03
Nodes (58): BACKGROUND, BACKGROUND_PRIMARY, BACKGROUND_SECONDARY, BACKGROUND_TOPUP, BG_BUTTON, BG_BUTTON_1, BG_BUTTON_HOVER, BG_HEADER (+50 more)

### Community 1 - "Mantine Component Wrappers"
Cohesion: 0.06
Nodes (25): MantineButton, MantineCheckbox, MantineContainer, MantineFileInput, MantineGroup, MantineImage, MantineInput, MantineInputWrapper (+17 more)

### Community 2 - "Styled UI Components"
Cohesion: 0.10
Nodes (18): styled-components, WrapperSelect, StyledButtonOutline, AccordionOveride, AnchorOveride, CkEditorOveride, ComboBoxOveride, DatePickerInputOveride (+10 more)

### Community 3 - "Frontend Dependency Manifest"
Cohesion: 0.06
Nodes (33): dependencies, client-only@^0.0.1, crypto-js@^4.2.0, formik@^2.4.9, @mantine/core@^9.5.0, @mantine/hooks@^9.5.0, @mantine/nprogress@^9.5.0, next@16.2.12 (+25 more)

### Community 4 - "API Client and Session Auth"
Cohesion: 0.09
Nodes (23): axios@^1.19.0, universal-cookie@^8.1.2, axios, universal-cookie, axiosCRM, axiosOAuth, axiosVihub, cachingErrorCodes (+15 more)

### Community 5 - "Shared Layout Styles"
Cohesion: 0.07
Nodes (26): Aside, AsideNote, AsideTitle, Brand, BrandMark, Divider, Eyebrow, focusRing (+18 more)

### Community 6 - "Build and Type Dependencies"
Cohesion: 0.11
Nodes (24): devDependencies, postcss@^8.5.25, postcss-preset-mantine@^1.18.0, postcss-simple-vars@^7.0.1, @types/crypto-js@^4.2.2, @types/node@^20, @types/react@^19, @types/react-dom@^19 (+16 more)

### Community 7 - "TypeScript Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Header Navigation Components"
Cohesion: 0.29
Nodes (10): @mantine/core, react-icons, HeaderAction(), HeaderLogo(), HeaderNavigation(), HeaderNavItem(), HeaderNavItemProps, Header() (+2 more)

### Community 9 - "Study Set Page"
Cohesion: 0.19
Nodes (12): StudySetPage(), StudySetPageProps, AnchorCustom(), FlashCardViewer(), StudySetHeader(), StudySetHeaderProps, StyledButton, StudyWord (+4 more)

### Community 10 - "Email Verification Pages"
Cohesion: 0.21
Nodes (13): metadata, VerifyEmailPage(), LegacyVerifyEmailPage(), metadata, AuthDivider, AuthStack, SocialLoginButtons(), RESULTS (+5 more)

### Community 11 - "Shared Application Constants"
Cohesion: 0.15
Nodes (13): ACCOUNT_SIDEBAR_NAME, DEFAULT_PAGESIZE, HEADER_DOMAIN_KEY, HEADER_IS_SDK_KEY, HEADER_LANGUAGE_KEY, HEADER_URL_KEY, IMAGE_MAX_SIZE, MESSAGES (+5 more)

### Community 12 - "Authentication Form Components"
Cohesion: 0.16
Nodes (14): AuthNoticeProps, AuthPasswordField(), AuthShellProps, AuthTextField(), CheckRowProps, FieldProps, NOTICE_STYLE, PRIMARY_ROOT (+6 more)

### Community 13 - "Mantine Date Input Wrappers"
Cohesion: 0.16
Nodes (7): @mantine/dates@^9.5.0, @mantine/dates, IDatePickerInputCustomProps, IDateTimePickerCustomProps, DATE_FORMAT, DATE_TIME_FORMAT, MantineDatePickerInput

### Community 14 - "Registration Routes and Forms"
Cohesion: 0.21
Nodes (10): LegacyRegisterPage(), metadata, metadata, RegisterPage(), RegistrationScreen(), EMAIL_PATTERN, getConfirmPasswordError(), getEmailError() (+2 more)

### Community 15 - "Login Routes and Entry Point"
Cohesion: 0.19
Nodes (10): metadata, SignInPage(), LoginPage(), metadata, Home(), metadata, AuthRow, CheckRow() (+2 more)

### Community 16 - "Error and Not Found Handling"
Cohesion: 0.21
Nodes (6): Error(), INotFoundProps, NotFound(), IImageCustomProps, ImageCustom(), PATHS

### Community 17 - "Application Route Constants"
Cohesion: 0.15
Nodes (12): CHANGE_NEW_PASSWORD, FORGOT_PASSWORD, HOME, LOGIN, NOTFOUND_404, OAUTH_AUTHOR, OAUTH_CALLBACK, OAUTH_SIGNIN_SOCIAL (+4 more)

### Community 18 - "Root Layout and Global Libraries"
Cohesion: 0.21
Nodes (10): dayjs@^1.11.21, swiper@^14.0.7, dayjs, swiper, font, metadata, RootLayout(), viewport (+2 more)

### Community 19 - "Password Reset Routes"
Cohesion: 0.21
Nodes (10): LegacyResetPasswordPage(), LegacyResetPasswordPageProps, metadata, metadata, ResetPasswordPage(), ResetPasswordPageProps, AuthNotice(), PasswordRequirements() (+2 more)

### Community 20 - "Validation and Text Patterns"
Cohesion: 0.17
Nodes (11): BASE64, DATE, EMAIL, ESCAPE_HTML_TAG, ESCAPE_SPECIAL_CHARATER, ESCAPE_SPECIAL_CHARATERV2, IDENTITY, PASSWORD (+3 more)

### Community 21 - "OAuth Callback and Result Routes"
Cohesion: 0.24
Nodes (9): metadata, OAuthCallbackPage(), metadata, VerifyEmailResultPage(), VerifyEmailResultPageProps, AuthLink, AuthShell(), OAuthCallbackScreen() (+1 more)

### Community 22 - "Server Data Fetch and Filter Types"
Cohesion: 0.20
Nodes (8): COOKIES_KEYS, IBaseCategory, IBaseFilter, IBaseFilterV2, IFetchParams, IIconProps, IPageProps, IQueryParams

### Community 23 - "Query Client Provider"
Cohesion: 0.24
Nodes (8): @mantine/notifications@^9.5.0, @tanstack/react-query@^5.101.4, @tanstack/react-query-devtools@^5.101.4, @mantine/notifications, @tanstack/react-query, @tanstack/react-query-devtools, getQueryClient, queryClient

### Community 24 - "Forgot Password Flows"
Cohesion: 0.27
Nodes (8): ForgotPasswordPage(), metadata, LegacyForgotPasswordPage(), metadata, AuthForm, SubmitButton(), ForgotPasswordScreen(), SubmitButtonLike()

### Community 25 - "API Status Codes"
Cohesion: 0.20
Nodes (10): EAPI_STATUS_CODE, ACCOUNT_BANNED, ACCOUNT_LOCKED, ACCOUNT_NOT_VERIFY, CONFLICT, INVALID_USER, OTP_REQUIRED, PASSWORD_REQUIRED (+2 more)

### Community 26 - "User Verification States"
Cohesion: 0.20
Nodes (10): EUSER_SUB_VALID_STATUS, APPLE_VERIFIED, BILL_VERIFIED, FB_VERIFIED, GG_VERIFIED, OTP_VERIFIED, PHONE_VERIFIED, QUICK_PLAY (+2 more)

### Community 27 - "Authentication Layout and Services"
Cohesion: 0.33
Nodes (4): AuthLayout(), IAuthLayoutProps, Content, Wrapper

### Community 28 - "Select Component Wrappers"
Cohesion: 0.31
Nodes (4): SelectCustom(), ISelectImageProps, SelectImage(), FlashCardViewerProps

### Community 29 - "Form Validation Messages"
Cohesion: 0.22
Nodes (8): INVALID_CHARATER, INVALID_CONFIRM_PASSWORD, INVALID_EMAIL, INVALID_IDENTITY, INVALID_PASSWORD, INVALID_PHONE_NUMBER, INVALID_WEBSITE, REQUIRED

### Community 30 - "Account Sidebar Sections"
Cohesion: 0.22
Nodes (8): ACCOUNT_AUTHENTICATE, ACCOUNT_GAME_PLAYED, ACCOUNT_INFO, ACCOUNT_LOG_HISTORY, ACCOUNT_POINT_HISTORY, ACCOUNT_SECURITY, ACCOUNT_SUPPORT, ACCOUNT_TRANSACTION_HISTORY

### Community 31 - "UI Animation Keyframes"
Cohesion: 0.22
Nodes (8): scaleIn, scaleInV2, scaleOut, scaleOutV2, slideIn, slideOut, textScaleIn, textScaleOut

### Community 32 - "Theme and UI Providers"
Cohesion: 0.36
Nodes (6): @mantine/modals@^9.5.0, @mantine/modals, useTokenChange(), GlobalStyle, mantineTheme, MantineProvider()

### Community 33 - "Main Layout and Footer"
Cohesion: 0.39
Nodes (5): IMainLayoutPageProps, MainLayoutPage(), Footer(), IMainLayoutProps, MainLayout()

### Community 34 - "User and Device Enums"
Cohesion: 0.25
Nodes (7): EDEVICE_TYPE, ANDROID, DESKTOP, IOS, EGENDER, FAMALE, MALE

### Community 35 - "Navigation Link Primitives"
Cohesion: 0.38
Nodes (4): nextConfig, next, AnchorCustomProps, StyledAnchor

### Community 37 - "Styled Components Theme"
Cohesion: 0.33
Nodes (5): theme, MantineContainer, DefaultTheme, OptionsFlags, styled-components

### Community 38 - "Study Mode Navigation"
Cohesion: 0.38
Nodes (5): StudyModeNavigation(), StudyModeNavigationProps, StyledButton, StyledButtonBase, StyledButtonProps

### Community 39 - "Lint Configuration"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.2.12, eslint, eslint-config-next

### Community 41 - "Next.js Starter Documentation"
Cohesion: 0.33
Nodes (6): app/page.tsx editing entry point, create-next-app scaffold, Geist font, next/font optimization, Next.js frontend project, Vercel platform deployment

### Community 42 - "Progressive Web App Manifest"
Cohesion: 0.33
Nodes (5): description, icons, name, short_name, start_url

### Community 43 - "Sidebar Navigation Component"
Cohesion: 0.47
Nodes (4): ISidebarMenuITem, ISidebarProps, Sidebar(), SidebarWrapper

### Community 44 - "Responsive Breakpoints"
Cohesion: 0.33
Nodes (5): LG, MD, SM, XL, XS

### Community 45 - "Swiper Stylesheet Support"
Cohesion: 0.33
Nodes (5): swiper/css, swiper/css/navigation, swiper/css/pagination, swiper/css/scrollbar, swiper/css/thumbs

### Community 46 - "OAuth Integration Configuration"
Cohesion: 0.40
Nodes (5): Authorization-code and state validation, Environment-specific OAuth redirect URI, OAuth application registration, Social provider buttons as integration placeholders, Trusted-server OAuth token exchange

### Community 47 - "Development and Build Scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 48 - "API V2 Status Codes"
Cohesion: 0.40
Nodes (5): EAPI_STATUS_CODE_V2, BAD_REQUEST, DATA_NOT_FOUND, FAIL, SUCCESS

### Community 49 - "API Response Pagination Types"
Cohesion: 0.40
Nodes (4): IPagination, IPaginationV2, IPaginationV3, IResponse

### Community 51 - "Browser Storage Keys"
Cohesion: 0.50
Nodes (3): ACCESS_TOKEN, CHAT_AI_HISTORY, REFRESH_TOKEN

### Community 52 - "Authentication Redirect Routes"
Cohesion: 0.50
Nodes (3): GAME, OAUTH, VIXU

### Community 53 - "UI Shadow Tokens"
Cohesion: 0.50
Nodes (3): SHADOW, SHADOW_1, SHADOW_TABLE

### Community 54 - "Social Login Provider Types"
Cohesion: 0.50
Nodes (4): ESOCIAL_TYPE, APPLE, FACEBOOK, GOOGLE

## Knowledge Gaps
- **46 isolated node(s):** `SUCCESS`, `ACCOUNT_LOCKED`, `ACCOUNT_BANNED`, `ACCOUNT_NOT_VERIFY`, `INVALID_USER` (+41 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 359 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Navigation Link Primitives` to `Main Layout and Footer`, `Frontend Dependency Manifest`, `Shared Layout Styles`, `Build and Type Dependencies`, `Header Navigation Components`, `Email Verification Pages`, `Sidebar Navigation Component`, `Authentication Form Components`, `Shared Application Constants`, `Registration Routes and Forms`, `Login Routes and Entry Point`, `Error and Not Found Handling`, `Root Layout and Global Libraries`, `Password Reset Routes`, `OAuth Callback and Result Routes`, `Server Data Fetch and Filter Types`, `Forgot Password Flows`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **What connects `SUCCESS`, `ACCOUNT_LOCKED`, `ACCOUNT_BANNED` to the rest of the system?**
  _46 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Theme Color Palette` be split into smaller, more focused modules?**
  _Cohesion score 0.03389830508474576 - nodes in this community are weakly interconnected._
- **Why does `@mantine/core` connect `Header Navigation Components` to `Theme and UI Providers`, `Main Layout and Footer`, `Styled UI Components`, `Frontend Dependency Manifest`, `Mantine Component Wrappers`, `Styled Components Theme`, `Build and Type Dependencies`, `Study Mode Navigation`, `Study Set Page`, `Sidebar Navigation Component`, `Authentication Form Components`, `Error and Not Found Handling`, `Multi Select Component`, `Authentication Layout and Services`, `Select Component Wrappers`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Should `Mantine Component Wrappers` be split into smaller, more focused modules?**
  _Cohesion score 0.06464646464646465 - nodes in this community are weakly interconnected._
- **Why does `styled-components` connect `Styled UI Components` to `Frontend Dependency Manifest`, `Navigation Link Primitives`, `Shared Layout Styles`, `Build and Type Dependencies`, `Study Mode Navigation`, `Header Navigation Components`, `Study Set Page`, `Styled Components Theme`, `Sidebar Navigation Component`, `Root Layout and Global Libraries`, `Authentication Layout and Services`, `UI Animation Keyframes`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Should `Styled UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.10317460317460317 - nodes in this community are weakly interconnected._