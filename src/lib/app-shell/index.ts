export const APP_SHELL_ATTRIBUTE = 'data-app-shell'
export const APP_SHELL_COOKIE = 'pw_app'
export const APP_SHELL_QUERY_PARAM = 'app'
export const APP_SHELL_USER_AGENT_TOKEN = 'PathwayApp/'

export const IOS_MESSAGE_HANDLER = 'pathway'
export const ANDROID_INTERFACE = 'PathwayAndroid'

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

export type NativeMessage =
  | { type: 'ready' }
  | { type: 'route'; path: string; title: string }
  | { type: 'title'; title: string }
  | { type: 'openExternal'; url: string }

type BridgeWindow = Window & {
  ReactNativeWebView?: { postMessage: (data: string) => void }
  webkit?: { messageHandlers?: Record<string, { postMessage: (data: unknown) => void } | undefined> }
  PathwayAndroid?: { postMessage: (data: string) => void }
}

export const BRIDGE_PROTOCOL_VERSION = 1

export function hasNativeBridge(): boolean {
  if (typeof window === 'undefined') return false
  const w = window as BridgeWindow
  return Boolean(w.ReactNativeWebView || w.webkit?.messageHandlers?.[IOS_MESSAGE_HANDLER] || w.PathwayAndroid)
}

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
  }
  return false
}
