/**
 * WeChat KF (微信客服) OpenClaw Channel Plugin
 */

import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { emptyPluginConfigSchema, normalizeWebhookPath } from "openclaw/plugin-sdk";
import { getChannelConfig } from "./src/accounts.js";
import { wechatKfPlugin } from "./src/channel.js";
import { DEFAULT_WEBHOOK_PATH } from "./src/constants.js";
import { setRuntime } from "./src/runtime.js";
import { handleWechatKfWebhook } from "./src/webhook.js";

export {
  sendBusinessCardMessage,
  sendCaLinkMessage,
  sendLocationMessage,
  sendMiniprogramMessage,
  sendMsgMenuMessage,
  sendTextMessage,
  syncMessages,
} from "./src/api.js";
export { wechatKfPlugin } from "./src/channel.js";
export { computeSignature, decrypt, encrypt, verifySignature } from "./src/crypto.js";
export { getAccessToken } from "./src/token.js";

const plugin: {
  id: string;
  name: string;
  description: string;
  configSchema: ReturnType<typeof emptyPluginConfigSchema>;
  register: (api: OpenClawPluginApi) => void;
} = {
  id: "wechat-kf",
  name: "WeChat KF",
  description: "WeChat Customer Service (企业微信客服) channel plugin",
  configSchema: emptyPluginConfigSchema(),
  register(api: OpenClawPluginApi) {
    const webhookPath = normalizeWebhookPath(getChannelConfig(api.config).webhookPath ?? DEFAULT_WEBHOOK_PATH);

    setRuntime(api.runtime);
    api.registerChannel({ plugin: wechatKfPlugin });
    api.registerHttpRoute({ path: webhookPath, auth: "plugin", handler: handleWechatKfWebhook });
  },
};

export default plugin;
