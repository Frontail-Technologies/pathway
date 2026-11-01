# WebView integration contract (for the mobile app team)

The web app runs in **app-shell mode** inside the Pathway mobile app. In this mode the native app owns the top bar and tab bar. The web app removes its own header, footer and bottom nav and reports navigation over a message bridge.

Code: `src/lib/app-shell/index.ts`, `src/components/app-shell/app-shell-bridge.tsx`, and the app-shell block in `src/app/globals.css`.

## 1. Turning app-shell mode on

Any **one** of these works. The check runs in an inline `<head>` script before first paint, so the web chrome never flashes and pages stay statically rendered.

| Method | Example | Notes |
|--------|---------|-------|
| User-agent token (recommended) | append ` PathwayApp/1.4.0` to the WebView UA | Works for every request, including the first one |
| Query parameter | load `https://<host>/?app=1` | Remembered in the session cookie `pw_app=1` for later in-app navigations |
| Injected bridge | `window.ReactNativeWebView`, `webkit.messageHandlers.pathway`, or `window.PathwayAndroid` exists before content loads | Bridge must be injected *before* content loads |

`?app=0` clears the cookie. Use it for QA: in a desktop browser, open `/?app=1` to preview the app layout and `/?app=0` to leave it.

When the mode is on, `<html>` has the `data-app-shell` attribute. CSS hooks:
- `.web-chrome`: hidden in the app (public header, footer, bottom nav).
- `.app-only`: shown only in the app.
- `--pw-header-h` and `--pw-bottom-nav-h` collapse to the device safe-area insets.

## 2. Messages web → native

Every message is a JSON **string** with a protocol version:

```json
{ "v": 1, "type": "route", "path": "/college/iit-delhi", "title": "IIT Delhi | Pathway" }
```

| type | When | Fields | Suggested native handling |
|------|------|--------|---------------------------|
| `ready` | Once per full page load, after hydration | – | Hide the splash/loader |
| `route` | Every client-side navigation, including the first | `path` (with query), `title` | Update the title bar; push onto your back stack; enable back |
| `title` | `<title>` changed after a `route` | `title` | Update the title bar |
| `openExternal` | User tapped an off-site link or a `target="_blank"` link | `url` | Open in system browser or in-app custom tab. The web app has already cancelled the navigation |

Client-side navigations (Next.js soft navigation) **do not** fire the WebView's `onNavigationStateChange` / `shouldOverrideUrlLoading` reliably. Use the `route` message as the source of truth.

## 3. Receivers per platform

**React Native (`react-native-webview`)**
```tsx
<WebView
  source={{ uri: 'https://<host>/' }}
  applicationNameForUserAgent="PathwayApp/1.4.0"
  onMessage={(e) => handle(JSON.parse(e.nativeEvent.data))}
/>
```

**iOS (WKWebView)**: register a handler named `pathway`:
```swift
config.userContentController.add(self, name: "pathway")
webView.customUserAgent = (defaultUA ?? "") + " PathwayApp/1.4.0"
// userContentController(_:didReceive:) → message.body is the JSON string
```

**Android (WebView)**: expose an interface named `PathwayAndroid`:
```kotlin
webView.settings.userAgentString += " PathwayApp/1.4.0"
webView.addJavascriptInterface(object {
  @JavascriptInterface fun postMessage(json: String) { handle(json) }
}, "PathwayAndroid")
```

## 4. Native checklist
- Enable DOM storage (saved items, profile and demo auth use `localStorage`) and cookies (`pw_app`).
- Back button: if the web side has history (`route` count > 1), call `webView.goBack()`. Otherwise let the native stack handle it.
- Lay the WebView out below your app bar and above your tab bar, *or* full-screen with `viewport-fit=cover` (the page pads itself with safe-area insets).
- Keep `tel:`, `mailto:` and `whatsapp:` links for the native layer to intercept. The bridge only handles `http(s)`.

## 5. Student space (`/student/*`) in the app

- The student header (logo, menu, "Back to Pathway") is hidden like the public header. A sticky tab strip (Dashboard · Profile · Preferences · Saved · Notes · Enquiries) is shown on phones in both web and app, so you can still move between student pages.
- **Log out** is on the dashboard's Account card, because the header menu that also holds it is hidden in the app.
- `.pw-student-shell` scopes `--pw-header-h` to the 56px student header (safe area only in the app), so sticky tabs and section jumps line up.
- Sign-in is still a local demo (`localStorage`). Real auth handoff from the native app is phase 5.
- **There is no tutor dashboard.** Tutors exist as public profiles and in the admin area only.

## 6. Planned (not yet implemented)
Native → web messages (auth token handoff, shortlist sync, theme), sticky action bar events (`apply`, `brochure`), and a share-sheet request. Add new types to `NativeMessage` and bump `BRIDGE_PROTOCOL_VERSION` for breaking changes.
