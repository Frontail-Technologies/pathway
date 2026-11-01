/**
 * App-shell (native WebView) mode.
 *
 * When Pathway is loaded inside the Pathway mobile app, the native layer owns
 * the top bar and the tab bar. The web app then hides its own chrome
 * (header, footer, bottom nav) and talks to the native layer through a small
 * message bridge. See docs/system-design/webview-integration.md.
 *
 * Detection happens in an inline script before first paint (no flash of web
 * chrome, and pages stay statically rendered). Any one of these enables it:
 *   - `?app=1` on the entry URL (persisted in a session cookie)
 *   - a `PathwayApp/<version>` token in the WebView user agent
 *   - an injected bridge object (ReactNativeWebView, webkit handler, Android)
 * `?app=0` clears the cookie (useful for QA in a normal browser).
 */

export const APP_SHELL_ATTRIBUTE = 'data-app-shell'
export const APP_SHELL_COOKIE = 'pw_app'
export const APP_SHELL_QUERY_PARAM = 'app'
export const APP_SHELL_USER_AGENT_TOKEN = 'PathwayApp/'

/** iOS: WKScriptMessageHandler name. Android: @JavascriptInterface object name. */
export const IOS_MESSAGE_HANDLER = 'pathway'
export const ANDROID_INTERFACE = 'PathwayAndroid'

/**
 * Runs inline in <head>, before the body paints. Kept dependency-free and
 * ES5-safe because old Android System WebViews still exist in the wild.
 */
export const appShellBootScript = `(function(){try{
var d=document.documentElement,w=window,
q=new URLSearchParams(location.search).get('${APP_SHELL_QUERY_PARAM}'),
c=/(?:^|;\\s*)${APP_SHELL_COOKIE}=1(?:;|$)/.test(document.cookie),
u=navigator.userAgent.indexOf('${APP_SHELL_USER_AGENT_TOKEN}')!==-1,
b=!!(w.ReactNativeWebView||(w.webkit&&w.webkit.messageHandlers&&w.webkit.messageHandlers.${IOS_MESSAGE_HANDLER})||w.${ANDROID_INTERFACE});
if(q==='0'){document.cookie='${APP_SHELL_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax';return}
if(q==='1'||c||u||b){d.setAttribute('${APP_SHELL_ATTRIBUTE}','');if(!c)document.cookie='${APP_SHELL_COOKIE}=1; Path=/; SameSite=Lax'}
}catch(e){}})();`

export function isAppShell(): boolean {
  return typeof document !== 'undefined' && document.documentElement.hasAttribute(APP_SHELL_ATTRIBUTE)
}

/** Messages the web app sends to the native layer. Versioned so native can evolve safely. */
export type NativeMessage =
  | { type: 'ready' }
  | { type: 'route'; path: string; title: string }
  /** Sent when <title> changes after a route message (Next applies it asynchronously). */
  | { type: 'title'; title: string }
  | { type: 'openExternal'; url: string }

type BridgeWindow = Window & {
  ReactNativeWebView?: { postMessage: (data: string) => void }
  webkit?: { messageHandlers?: Record<string, { postMessage: (data: unknown) => void } | undefined> }
  PathwayAndroid?: { postMessage: (data: string) => void }
}

export const BRIDGE_PROTOCOL_VERSION = 1

/** True when a native receiver is present (not just `?app=1` in a browser). */
export function hasNativeBridge(): boolean {
  if (typeof window === 'undefined') return false
  const w = window as BridgeWindow
  return Boolean(w.ReactNativeWebView || w.webkit?.messageHandlers?.[IOS_MESSAGE_HANDLER] || w.PathwayAndroid)
}

/** Sends a message to the native layer. Returns false if no bridge is present. */
export function postToNative(message: NativeMessage): boolean {
  if (typeof window === 'undefined') return false
  const w = window as BridgeWindow
  const payload = JSON.stringify({ v: BRIDGE_PROTOCOL_VERSION, ...message })
  try {
    if (w.ReactNativeWebView) {
      w.ReactNativeWebView.postMessage(payload)
      return true
    }
    const ios = w.webkit?.messageHandlers?.[IOS_MESSAGE_HANDLER]
    if (ios) {
      ios.postMessage(payload)
      return true
    }
    if (w.PathwayAndroid) {
      w.PathwayAndroid.postMessage(payload)
      return true
    }
  } catch {
    // A broken bridge must never break the page.
  }
  return false
}
