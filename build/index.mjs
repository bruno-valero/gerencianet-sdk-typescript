var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports, module) {
    module.exports = {
      name: "dotenv",
      version: "16.4.5",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        "test:coverage": "tap --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@definitelytyped/dtslint": "^0.0.133",
        "@types/node": "^18.11.3",
        decache: "^4.6.1",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.5.0",
        tap: "^16.3.0",
        tar: "^6.1.11",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module) {
    "use strict";
    var fs2 = __require("fs");
    var path = __require("path");
    var os = __require("os");
    var crypto = __require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      const vaultPath = _vaultPath(options);
      const result = DotenvModule.configDotenv({ path: vaultPath });
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _log(message) {
      console.log(`[dotenv@${version}][INFO] ${message}`);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs2.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path.resolve(process.cwd(), ".env.vault");
      }
      if (fs2.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      _log("Loading env from encrypted .env.vault");
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path2 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs2.readFileSync(path2, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path2} ${e.message}`);
          }
          lastError = e;
        }
      }
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsedAll, options);
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config,
      decrypt,
      parse,
      populate
    };
    module.exports.configDotenv = DotenvModule.configDotenv;
    module.exports._configVault = DotenvModule._configVault;
    module.exports._parseVault = DotenvModule._parseVault;
    module.exports.config = DotenvModule.config;
    module.exports.decrypt = DotenvModule.decrypt;
    module.exports.parse = DotenvModule.parse;
    module.exports.populate = DotenvModule.populate;
    module.exports = DotenvModule;
  }
});

// node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/dotenv/lib/env-options.js"(exports, module) {
    "use strict";
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    if (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {
      options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;
    }
    module.exports = options;
  }
});

// node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/dotenv/lib/cli-options.js"(exports, module) {
    "use strict";
    var re = /^dotenv_config_(encoding|path|debug|override|DOTENV_KEY)=(.+)$/;
    module.exports = function optionMatcher(args) {
      return args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
    };
  }
});

// src/domain-driven-design/core/apis/api-request.ts
import axios2, { AxiosError as AxiosError2 } from "axios";

// src/domain-driven-design/core/apis/contas-end-points.ts
var contasEndpoints = {
  URL: {
    PRODUCTION: `https://apis.gerencianet.com.br`,
    SANDBOX: `https://apis-h.gerencianet.com.br`
  },
  ENDPOINTS: {
    authorize: () => ({
      route: `/oauth/token`,
      method: `post`
    }),
    createAccount: () => ({
      route: `/cadastro/conta-simplificada`,
      method: `post`
    }),
    createAccountCertificate: ({ identificador }) => ({
      route: `/cadastro/conta-simplificada/${identificador}/certificado`,
      method: `post`
    }),
    getAccountCredentials: ({ identificador }) => ({
      route: `/cadastro/conta-simplificada/${identificador}/credenciais`,
      method: `get`
    }),
    accountConfigWebhook: () => ({
      route: `/cadastro/webhook`,
      method: `post`
    }),
    accountDeleteWebhook: ({ identificador }) => ({
      route: `/cadastro/webhook/${identificador}Webhook`,
      method: `delete`
    }),
    accountDetailWebhook: ({ identificador }) => ({
      route: `/cadastro/webhook/${identificador}Webhook`,
      method: `get`
    }),
    accountListWebhook: () => ({
      route: `/cadastro/webhooks`,
      method: `get`
    })
  }
};

// src/domain-driven-design/core/apis/default-end-points.ts
var defaultEndpoints = {
  URL: {
    PRODUCTION: `https://api.gerencianet.com.br/v1`,
    SANDBOX: `https://sandbox.gerencianet.com.br/v1`
  },
  ENDPOINTS: {
    authorize: () => ({
      route: `/authorize`,
      method: `post`
    }),
    sendSubscriptionLinkEmail: ({ id }) => ({
      route: `/charge/${id}/subscription/resend`,
      method: `post`
    }),
    oneStepSubscription: ({ id }) => ({
      route: `/plan/${id}/subscription/one-step`,
      method: `post`
    }),
    settleCarnet: ({ id }) => ({
      route: `/carnet/${id}/settle`,
      method: `put`
    }),
    oneStepSubscriptionLink: ({ id }) => ({
      route: `/plan/${id}/subscription/one-step/link`,
      method: `post`
    }),
    sendLinkEmail: ({ id }) => ({
      route: `/charge/${id}/link/resend`,
      method: `post`
    }),
    createOneStepLink: () => ({
      route: `/charge/one-step/link`,
      method: `post`
    }),
    createCharge: () => ({
      route: `/charge`,
      method: `post`
    }),
    detailCharge: ({ id }) => ({
      route: `/charge/${id}`,
      method: `get`
    }),
    updateChargeMetadata: ({ id }) => ({
      route: `/charge/${id}/metadata`,
      method: `put`
    }),
    updateBillet: ({ id }) => ({
      route: `/charge/${id}/billet`,
      method: `put`
    }),
    definePayMethod: ({ id }) => ({
      route: `/charge/${id}/pay`,
      method: `post`
    }),
    cancelCharge: ({ id }) => ({
      route: `/charge/${id}/cancel`,
      method: `put`
    }),
    createCarnet: () => ({
      route: `/carnet`,
      method: `post`
    }),
    detailCarnet: ({ id }) => ({
      route: `/carnet/${id}`,
      method: `get`
    }),
    updateCarnetParcel: ({ id, parcel }) => ({
      route: `/carnet/${id}/parcel/${parcel}`,
      method: `put`
    }),
    updateCarnetMetadata: ({ id }) => ({
      route: `/carnet/${id}/metadata`,
      method: `put`
    }),
    getNotification: ({ token }) => ({
      route: `/notification/${token}`,
      method: `get`
    }),
    listPlans: () => ({
      route: `/plans`,
      method: `get`
    }),
    createPlan: () => ({
      route: `/plan`,
      method: `post`
    }),
    deletePlan: ({ id }) => ({
      route: `/plan/${id}`,
      method: `delete`
    }),
    createSubscription: ({ id }) => ({
      route: `/plan/${id}/subscription`,
      method: `post`
    }),
    detailSubscription: ({ id }) => ({
      route: `/subscription/${id}`,
      method: `get`
    }),
    defineSubscriptionPayMethod: ({ id }) => ({
      route: `/subscription/${id}/pay`,
      method: `post`
    }),
    cancelSubscription: ({ id }) => ({
      route: `/subscription/${id}/cancel`,
      method: `put`
    }),
    updateSubscriptionMetadata: ({ id }) => ({
      route: `/subscription/${id}/metadata`,
      method: `put`
    }),
    getInstallments: () => ({
      route: `/installments`,
      method: `get`
    }),
    sendBilletEmail: ({ id }) => ({
      route: `/charge/${id}/billet/resend`,
      method: `post`
    }),
    createChargeHistory: ({ id }) => ({
      route: `/charge/${id}/history`,
      method: `post`
    }),
    sendCarnetEmail: ({ id }) => ({
      route: `/carnet/${id}/resend`,
      method: `post`
    }),
    sendCarnetParcelEmail: ({ id, parcel }) => ({
      route: `/carnet/${id}/parcel/${parcel}/resend`,
      method: `post`
    }),
    createCarnetHistory: ({ id }) => ({
      route: `/carnet/${id}/history`,
      method: `post`
    }),
    cancelCarnet: ({ id }) => ({
      route: `/carnet/${id}/cancel`,
      method: `put`
    }),
    cancelCarnetParcel: ({ id, parcel }) => ({
      route: `/carnet/${id}/parcel/${parcel}/cancel`,
      method: `put`
    }),
    linkCharge: ({ id }) => ({
      route: `/charge/${id}/link`,
      method: `post`
    }),
    defineLinkPayMethod: ({ id }) => ({
      route: `/charge/${id}/link`,
      method: `post`
    }),
    updateChargeLink: ({ id }) => ({
      route: `/charge/${id}/link`,
      method: `put`
    }),
    updatePlan: ({ id }) => ({
      route: `/plan/${id}`,
      method: `put`
    }),
    createSubscriptionHistory: ({ id }) => ({
      route: `/subscription/${id}/history`,
      method: `post`
    }),
    defineBalanceSheetBillet: ({ id }) => ({
      route: `/charge/${id}/balance-sheet`,
      method: `post`
    }),
    settleCharge: ({ id }) => ({
      route: `/charge/${id}/settle`,
      method: `put`
    }),
    settleCarnetParcel: ({ id, parcel }) => ({
      route: `/carnet/${id}/parcel/${parcel}/settle`,
      method: `put`
    }),
    createOneStepCharge: () => ({
      route: `/charge/one-step`,
      method: `post`
    })
  }
};

// src/domain-driven-design/core/apis/open-finance-end-points.ts
var openFinanceEndpoints = {
  URL: {
    PRODUCTION: `https://apis.gerencianet.com.br/open-finance`,
    SANDBOX: `https://apis-h.gerencianet.com.br/open-finance`
  },
  ENDPOINTS: {
    authorize: () => ({
      route: `/oauth/token`,
      method: `post`
    }),
    ofListParticipants: () => ({
      route: `/participantes/`,
      method: `GET`
    }),
    ofStartPixPayment: () => ({
      route: `/pagamentos/pix`,
      method: `POST`
    }),
    ofListPixPayment: () => ({
      route: `/pagamentos/pix`,
      method: `GET`
    }),
    ofConfigUpdate: () => ({
      route: `/config`,
      method: `PUT`
    }),
    ofConfigDetail: () => ({
      route: `/config`,
      method: `GET`
    }),
    ofDevolutionPix: ({
      identificadorPagamento
    }) => ({
      route: `/pagamentos/pix/${identificadorPagamento}/devolver`,
      method: `post`
    })
  }
};

// src/domain-driven-design/core/apis/pagamentos-end-points.ts
var pagamentosEndpoints = {
  URL: {
    PRODUCTION: `https://apis.gerencianet.com.br/pagamento`,
    SANDBOX: `https://apis-h.gerencianet.com.br/pagamento`
  },
  ENDPOINTS: {
    authorize: () => ({
      route: `/oauth/token`,
      method: `post`
    }),
    payDetailBarCode: ({ codBarras }) => ({
      route: `/codBarras/${codBarras}`,
      method: `GET`
    }),
    payRequestBarCode: ({ codBarras }) => ({
      route: `/codBarras/${codBarras}`,
      method: `POST`
    }),
    payDetailPayment: ({ idPagamento }) => ({
      route: `/${idPagamento}`,
      method: `GET`
    }),
    payListPayments: () => ({
      route: `/resumo`,
      method: `GET`
    })
  }
};

// src/domain-driven-design/core/apis/pix-end-points.ts
var pixEndpoints = {
  URL: {
    PRODUCTION: "https://pix.api.efipay.com.br",
    SANDBOX: "https://pix-h.api.efipay.com.br"
  },
  ENDPOINTS: {
    authorize: () => ({
      route: "/oauth/token",
      method: "post"
    }),
    pixCreateDueCharge: ({ txid }) => ({
      route: `/v2/cobv/${txid}`,
      method: `put`
    }),
    pixUpdateDueCharge: ({ txid }) => ({
      route: `/v2/cobv/${txid}`,
      method: `patch`
    }),
    pixDetailDueCharge: ({ txid }) => ({
      route: `/v2/cobv/${txid}`,
      method: `get`
    }),
    pixListDueCharges: () => ({
      route: `/v2/cobv/`,
      method: `get`
    }),
    createReport: () => ({
      route: `/v2/gn/relatorios/extrato-conciliacao`,
      method: `post`
    }),
    detailReport: ({ id }) => ({
      route: `/v2/gn/relatorios/${id}`,
      method: `get`
    }),
    pixCreateCharge: ({ txid }) => ({
      route: `/v2/cob/${txid}`,
      method: `put`
    }),
    pixUpdateCharge: ({ txid }) => ({
      route: `/v2/cob/${txid}`,
      method: `patch`
    }),
    pixCreateImmediateCharge: () => ({
      route: `/v2/cob`,
      method: `post`
    }),
    pixDetailCharge: ({ txid }) => ({
      route: `/v2/cob/${txid}`,
      method: `get`
    }),
    pixListCharges: () => ({
      route: `/v2/cob`,
      method: `get`
    }),
    pixDetailReceived: ({ e2eId }) => ({
      route: `/v2/pix/${e2eId}`,
      method: `get`
    }),
    pixReceivedList: () => ({
      route: `/v2/pix`,
      method: `get`
    }),
    pixSend: ({ idEnvio }) => ({
      route: `/v2/gn/pix/${idEnvio}`,
      method: `put`
    }),
    pixSendDetail: ({ e2eId }) => ({
      route: `/v2/gn/pix/enviados/${e2eId}`,
      method: `get`
    }),
    pixSendList: () => ({
      route: `/v2/gn/pix/enviados`,
      method: `get`
    }),
    pixDevolution: ({ id, e2eId }) => ({
      route: `/v2/pix/${e2eId}/devolucao/${id}`,
      method: `put`
    }),
    pixDetailDevolution: ({ id, e2eId }) => ({
      route: `/v2/pix/${e2eId}/devolucao/${id}`,
      method: `get`
    }),
    pixConfigWebhook: ({ chave }) => ({
      route: `/v2/webhook/${chave}`,
      method: `put`
    }),
    pixDetailWebhook: ({ chave }) => ({
      route: `/v2/webhook/${chave}`,
      method: `get`
    }),
    pixListWebhook: () => ({
      route: `/v2/webhook`,
      method: `get`
    }),
    pixDeleteWebhook: ({ chave }) => ({
      route: `/v2/webhook/${chave}`,
      method: `delete`
    }),
    pixCreateLocation: () => ({
      route: `/v2/loc`,
      method: `post`
    }),
    pixLocationList: () => ({
      route: `/v2/loc`,
      method: `get`
    }),
    pixDetailLocation: ({ id }) => ({
      route: `/v2/loc/${id}`,
      method: `get`
    }),
    pixGenerateQRCode: ({ id }) => ({
      route: `/v2/loc/${id}/qrcode`,
      method: `get`
    }),
    pixUnlinkTxidLocation: ({ id }) => ({
      route: `/v2/loc/${id}/txid`,
      method: `delete`
    }),
    pixCreateEvp: () => ({
      route: `/v2/gn/evp`,
      method: `post`
    }),
    pixListEvp: () => ({
      route: `/v2/gn/evp`,
      method: `get`
    }),
    pixDeleteEvp: ({ chave }) => ({
      route: `/v2/gn/evp/${chave}`,
      method: `delete`
    }),
    getAccountBalance: () => ({
      route: `/v2/gn/saldo`,
      method: `get`
    }),
    updateAccountConfig: () => ({
      route: `/v2/gn/config`,
      method: `put`
    }),
    listAccountConfig: () => ({
      route: `/v2/gn/config`,
      method: `get`
    }),
    pixSplitDetailCharge: ({ txid }) => ({
      route: `/v2/gn/split/cob/${txid}`,
      method: `get`
    }),
    pixSplitLinkCharge: ({ txid }) => ({
      route: `/v2/gn/split/cob/${txid}/vinculo/:splitConfigId`,
      method: `put`
    }),
    pixSplitUnlinkCharge: ({ txid }) => ({
      route: `/v2/gn/split/cob/${txid}/vinculo/:splitConfigId`,
      method: `delete`
    }),
    pixSplitDetailDueCharge: ({ txid }) => ({
      route: `/v2/gn/split/cobv/${txid}`,
      method: `get`
    }),
    pixSplitLinkDueCharge: ({ txid }) => ({
      route: `/v2/gn/split/cobv/${txid}/vinculo/:splitConfigId`,
      method: `put`
    }),
    pixSplitUnlinkDueCharge: ({ txid }) => ({
      route: `/v2/gn/split/cobv/${txid}/vinculo/:splitConfigId`,
      method: `delete`
    }),
    pixSplitConfig: () => ({
      route: `/v2/gn/split/config`,
      method: `post`
    }),
    pixSplitConfigId: ({ id }) => ({
      route: `/v2/gn/split/config/${id}`,
      method: `put`
    }),
    pixSplitDetailConfig: ({ id }) => ({
      route: `/v2/gn/split/config/${id}`,
      method: `get`
    }),
    pixSendDetailId: ({ idEnvio }) => ({
      route: `/v2/gn/pix/enviados/id-envio/${idEnvio}`,
      method: `get`
    })
  }
};

// src/domain-driven-design/core/apis/constants-callbacks.ts
var constantsCallbacks = {
  APIS: {
    PIX: pixEndpoints,
    DEFAULT: defaultEndpoints,
    OPENFINANCE: openFinanceEndpoints,
    PAGAMENTOS: pagamentosEndpoints,
    CONTAS: contasEndpoints
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/auth.ts
import fs from "fs";
import https from "https";
import axios, { AxiosError } from "axios";
var Auth = class {
  constants;
  client_id;
  client_secret;
  baseUrl;
  agent;
  authRoute;
  #options;
  constructor(options) {
    this.constants = constantsCallbacks;
    this.client_id = options.client_id;
    this.client_secret = options.client_secret;
    this.baseUrl = options.baseUrl;
    this.#options = options;
    if (options.agent) {
      this.agent = options.agent;
    }
    if (options.authRoute) {
      this.authRoute = options.authRoute;
    }
  }
  get options() {
    return this.#options;
  }
  async getAccessToken() {
    if (!this.baseUrl) return null;
    const environment = this.options.sandbox ? "SANDBOX" : "PRODUCTION";
    let postParams;
    if (this.constants.APIS.DEFAULT.URL.PRODUCTION === this.baseUrl || this.constants.APIS.DEFAULT.URL.SANDBOX === this.baseUrl) {
      postParams = {
        method: "POST",
        url: `${this.baseUrl}${this.constants.APIS.DEFAULT.ENDPOINTS.authorize().route}`,
        headers: {
          "api-sdk": "typescript-1.0.2"
        },
        data: {
          grant_type: "client_credentials"
        },
        auth: {
          username: this.client_id,
          password: this.client_secret
        }
      };
    } else {
      const data_credentials = `${this.client_id}:${this.client_secret}`;
      const auth = Buffer.from(data_credentials).toString("base64");
      const agent = this.getAgent();
      if (!agent) throw new Error("cannot build http agent");
      this.agent = agent;
      postParams = {
        method: "POST",
        url: `${this.baseUrl}${this.authRoute.route}`,
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
          "api-sdk": "typescript-1.0.2"
        },
        httpsAgent: this.agent,
        data: {
          grant_type: "client_credentials"
        }
      };
    }
    try {
      const { data } = await axios(postParams);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error.response:", error.response);
        console.log("error.cause:", error.cause);
      } else {
        console.log("error:", error);
      }
      return null;
    }
  }
  getAgent() {
    try {
      if (this.options.certificate) {
        if (this.options.pemKey) {
          this.#options.agent = new https.Agent({
            cert: fs.readFileSync(this.options.certificate),
            key: fs.readFileSync(this.options.pemKey),
            passphrase: ""
          });
        } else {
          this.#options.agent = new https.Agent({
            pfx: fs.readFileSync(this.options.certificate),
            passphrase: ""
          });
        }
      }
      return this.#options.agent;
    } catch (error) {
      throw new Error(
        `FALHA AO LER O CERTIFICADO. 
Verifique se o caminho informado est\xE1 correto: ${this.options.certificate}
`
      );
    }
  }
};
var auth_default = Auth;

// src/domain-driven-design/core/apis/api-request.ts
var ApiRequest = class {
  #constants;
  #endpoints;
  #options;
  #auth;
  #baseUrl;
  #type;
  #operation;
  constructor(type, operation, options) {
    this.#constants = constantsCallbacks;
    this.#endpoints = this.#constants.APIS[operation];
    this.#baseUrl = this.#endpoints.URL[type];
    this.#type = type;
    this.#operation = operation;
    const optionsComplete = {
      ...options,
      sandbox: type === "SANDBOX",
      // eslint-disable-next-line
      // @ts-ignore
      baseUrl: this.#baseUrl,
      // eslint-disable-next-line
      // @ts-ignore
      authRoute: this.#endpoints.ENDPOINTS.authorize()
    };
    this.#options = optionsComplete;
    this.#auth = new auth_default(optionsComplete);
  }
  get type() {
    return this.#type;
  }
  get operation() {
    return this.#operation;
  }
  get environment() {
    return this.#options.sandbox ? "SANDBOX" : "PRODUCTION";
  }
  get endpoints() {
    return this.#endpoints;
  }
  get options() {
    return this.#options;
  }
  get auth() {
    return this.#auth;
  }
  get baseUrl() {
    return this.#baseUrl;
  }
  get config() {
    return {
      environment: this.environment,
      endpoints: this.endpoints,
      options: this.options,
      auth: this.auth,
      baseUrl: this.baseUrl
    };
  }
  makeHeaders({ accessToken }) {
    const headers = {
      "api-sdk": `efi-typescript-${"1.0.2"}`,
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
      "x-skip-mtls-checking": !this.options.validateMtls
    };
    const optionalHeaders = {
      ...headers
    };
    if (this.options.partnerToken) {
      optionalHeaders["partner-token"] = this.options.partnerToken;
    }
    return optionalHeaders;
  }
  makeRequest({
    accessToken,
    method,
    searchParams,
    routeUrl,
    body
  }) {
    const headers = this.makeHeaders({ accessToken });
    const url = new URL(routeUrl);
    Object.entries(searchParams ?? {}).forEach(([key, value]) => {
      url.searchParams.append(
        key,
        value instanceof Date ? value.toISOString() : String(value)
      );
    });
    const req = {
      method,
      url: url.toString(),
      headers,
      data: body
    };
    const request = { ...req };
    if (this.options.baseUrl !== this.#constants.APIS.DEFAULT.URL.PRODUCTION && this.options.baseUrl !== this.#constants.APIS.DEFAULT.URL.SANDBOX) {
      request.httpsAgent = this.auth.getAgent();
    }
    return request;
  }
  async sendRequest({
    route,
    body,
    method,
    searchParams,
    ResponseClass
  }) {
    const token = await this.auth.getAccessToken();
    if (!token) return null;
    const { access_token: accessToken } = token;
    const url = `${this.baseUrl}${route}`;
    const request = this.makeRequest({
      accessToken,
      body,
      method,
      routeUrl: url,
      searchParams
    });
    try {
      const { data } = (
        // eslint-disable-next-line
        // @ts-ignore
        await axios2(request)
      );
      const response = new ResponseClass(data);
      return response;
    } catch (error) {
      if (error instanceof AxiosError2) {
        console.log("error on request:", error.response?.data);
      } else {
        console.log("error on request:", error);
      }
      return null;
    }
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/user-account.ts
import dayjs from "dayjs";

// src/domain-driven-design/domains/apis/enterprise/entities/value-objects/address/cep.ts
import { mask } from "remask";
var Cep = class {
  #value;
  constructor(cep) {
    const cepRaw = cep.replaceAll(/[^0-9]+/gi, "");
    this.#value = cepRaw;
  }
  get value() {
    return this.#value;
  }
  isValid() {
    const cepRaw = this.value;
    const cepLength = cepRaw.length;
    const correctLength = "00000000".length;
    return cepLength === correctLength;
  }
  format() {
    return mask(this.value, "99999-999");
  }
  compareData(cep) {
    return this.value === cep.value;
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/value-objects/address/state.ts
import z from "zod";
var statesShortSchema = z.enum([
  "AM",
  "PA",
  "RR",
  "AP",
  "AC",
  "RO",
  "TO",
  "MA",
  "PI",
  "CE",
  "RN",
  "PB",
  "PE",
  "AL",
  "SE",
  "BA",
  "MG",
  "ES",
  "RJ",
  "SP",
  "PR",
  "SC",
  "RS",
  "MS",
  "MT",
  "GO",
  "DF"
]);
var statesStatesVerboseSchema = z.enum([
  "Amazonas",
  "Par\xE1",
  "Roraima",
  "Amap\xE1",
  "Acre",
  "Rond\xF4nia",
  "Tocantins",
  "Maranh\xE3o",
  "Piau\xED",
  "Cear\xE1",
  "Rio Grande do Norte",
  "Para\xEDba",
  "Pernambuco",
  "Alagoas",
  "Sergipe",
  "Bahia",
  "Minas Gerais",
  "Esp\xEDrito Santo",
  "Rio de Janeiro",
  "S\xE3o Paulo",
  "Paran\xE1",
  "Santa Catarina",
  "Rio Grande do Sul",
  "Mato Grosso do Sul",
  "Mato Grosso",
  "Goi\xE1s",
  "Distrito Federal"
]);
var stateInstanceSchema = z.custom(
  (data) => data instanceof State,
  "must be a valide State"
);
var State = class {
  state;
  constructor(state) {
    this.state = state;
  }
  shortToVerboseMapper(state) {
    const mapper = {
      AM: "Amazonas",
      PA: "Par\xE1",
      RR: "Roraima",
      AP: "Amap\xE1",
      AC: "Acre",
      RO: "Rond\xF4nia",
      TO: "Tocantins",
      MA: "Maranh\xE3o",
      PI: "Piau\xED",
      CE: "Cear\xE1",
      RN: "Rio Grande do Norte",
      PB: "Para\xEDba",
      PE: "Pernambuco",
      AL: "Alagoas",
      SE: "Sergipe",
      BA: "Bahia",
      MG: "Minas Gerais",
      ES: "Esp\xEDrito Santo",
      RJ: "Rio de Janeiro",
      SP: "S\xE3o Paulo",
      PR: "Paran\xE1",
      SC: "Santa Catarina",
      RS: "Rio Grande do Sul",
      MS: "Mato Grosso do Sul",
      MT: "Mato Grosso",
      GO: "Goi\xE1s",
      DF: "Distrito Federal"
    };
    return mapper[state];
  }
  get short() {
    return this.state;
  }
  get verbose() {
    return this.shortToVerboseMapper(this.state);
  }
  compareData(state) {
    return this.short === state.short;
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/value-objects/address/address.ts
var Address = class {
  #props;
  constructor({
    cep,
    number,
    street,
    neighborhood,
    complement,
    city,
    state
  }) {
    this.#props = {
      cep: new Cep(cep),
      number,
      street,
      neighborhood,
      complement,
      city,
      state: new State(state)
    };
  }
  get cep() {
    return new Cep(this.#props.cep.value);
  }
  get number() {
    return this.#props.number;
  }
  get street() {
    return this.#props.street;
  }
  get neighborhood() {
    return this.#props.neighborhood;
  }
  get complement() {
    return this.#props.complement;
  }
  get city() {
    return this.#props.city;
  }
  get state() {
    return new State(this.#props.state.short);
  }
  toObject() {
    return {
      cep: this.cep.format(),
      number: this.number,
      street: this.street,
      neighborhood: this.neighborhood,
      complement: this.complement,
      city: this.city,
      state: this.state.short
    };
  }
  get plainText() {
    const raw = this.toObject();
    return `${raw.street}, ${raw.number}, ${raw.neighborhood}, ${raw.city}-${raw.state}`;
  }
  compareData(address) {
    const cepEqual = this.cep.compareData(address.cep);
    const numberEqual = this.number === address.number;
    const streetEqual = this.street === address.street;
    const neighborhoodEqual = this.neighborhood === address.neighborhood;
    const complementEqual = this.complement === address.complement;
    const cityEqual = this.city === address.city;
    const stateEqual = this.state.compareData(address.state);
    const addressEqual = cepEqual && numberEqual && streetEqual && neighborhoodEqual && complementEqual && cityEqual && stateEqual;
    return addressEqual;
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/value-objects/user/cnpj.ts
import { mask as mask2 } from "remask";
var Cnpj = class {
  #value;
  constructor(data) {
    const cnpj = data.replaceAll(/[^0-9]+/gi, "");
    this.#value = cnpj;
  }
  get value() {
    return this.#value;
  }
  isValid() {
    const calculaDigitoCNPJ = (cnpj, pesoInicial) => {
      const arrNum = cnpj.split("").map(Number);
      let peso = pesoInicial;
      const soma = arrNum.reduce((acc, curr) => {
        acc += curr * peso;
        peso = peso === 2 ? 9 : peso - 1;
        return acc;
      }, 0);
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };
    const criaDigitosCNPJ = (cnpj) => {
      const cnpjBase = cnpj.slice(0, 12);
      const digito1 = calculaDigitoCNPJ(cnpjBase, 5);
      const digito2 = calculaDigitoCNPJ(cnpjBase + digito1, 6);
      return cnpjBase + digito1 + digito2;
    };
    const validaCNPJ = (text) => {
      const cnpjClear = text.replace(/[^0-9]+/g, "");
      if (cnpjClear.length !== 14 || /^(\d)\1{13}$/.test(cnpjClear))
        return false;
      return criaDigitosCNPJ(cnpjClear) === cnpjClear;
    };
    return validaCNPJ(this.value);
  }
  format() {
    return mask2(this.value, ["99.999.999/9999-99"]);
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/value-objects/user/cpf.ts
import { mask as mask3 } from "remask";
var Cpf = class {
  #value;
  constructor(data) {
    const cpf = data.replaceAll(/[^0-9]+/gi, "");
    this.#value = cpf;
  }
  get value() {
    return this.#value;
  }
  isValid() {
    const criaDigitos = (num) => {
      const arrNum = num.split("");
      const length = arrNum.length;
      const digito = arrNum.map((letter, index) => {
        const number = Number(letter);
        return number * (length + 1 - index);
      }).reduce((acc, num2) => acc + num2, 0);
      const digitoCalc1 = 11 - digito % 11;
      const digitoCalc2 = digitoCalc1 > 9 ? "0" : String(digitoCalc1);
      if (arrNum.length === 11) {
        const result2 = arrNum.join("");
        return result2;
      }
      const arrNum2 = [...arrNum, digitoCalc2];
      const result = arrNum2.join("");
      return criaDigitos(result);
    };
    const validaCPF = (text) => {
      if (!text) return false;
      const cpfClear = text.replaceAll(/[^0-9]+/g, "");
      if (cpfClear.length !== 11) return false;
      if (cpfClear[0].repeat(cpfClear.length) === cpfClear) return false;
      const cpfArray = cpfClear.split("");
      const cpfToNumber = cpfArray.map(Number);
      const cpfJoined = cpfToNumber.join("");
      const parte1 = cpfJoined.slice(0, -2);
      const cpfValido = criaDigitos(parte1);
      const cpf = cpfJoined;
      return cpf === cpfValido;
    };
    return validaCPF(this.value);
  }
  format() {
    return mask3(this.value, ["999.999.999-99"]);
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/value-objects/user/email.ts
import z2 from "zod";
var Email = class {
  #value;
  constructor(data) {
    const email = data.replaceAll(/[^0-9]+/gi, "");
    this.#value = email;
  }
  get value() {
    return this.#value;
  }
  isValid() {
    const isEmail = z2.string().email().safeParse(this.value).success;
    return isEmail;
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/user-account.ts
var UserAccount = class {
  #props;
  constructor(props) {
    const birthDate = props.clienteFinal.dataNascimento?.split("/");
    const dataIsoString = birthDate ? `${birthDate[2]}-${birthDate[1]}-${birthDate[0]}T12:00:00` : void 0;
    this.#props = {
      clienteFinal: {
        cpf: props.clienteFinal.cpf ? new Cpf(props.clienteFinal.cpf) : void 0,
        nomeCompleto: props.clienteFinal.nomeCompleto,
        dataNascimento: dataIsoString ? new Date(dataIsoString) : void 0,
        nomeMae: props.clienteFinal.nomeMae,
        celular: props.clienteFinal.celular,
        email: props.clienteFinal.email ? new Email(props.clienteFinal.email) : void 0,
        razaoSocial: props.clienteFinal.razaoSocial,
        cnpj: props.clienteFinal.cnpj ? new Cnpj(props.clienteFinal.cnpj) : void 0,
        endereco: props.clienteFinal.endereco ? new Address({
          cep: props.clienteFinal.endereco.cep,
          number: props.clienteFinal.endereco.numero,
          street: props.clienteFinal.endereco.logradouro,
          neighborhood: props.clienteFinal.endereco.bairro,
          complement: props.clienteFinal.endereco.complemento,
          city: props.clienteFinal.endereco.cidade,
          state: props.clienteFinal.endereco.estado
        }) : void 0
      },
      meioDeNotificacao: props.meioDeNotificacao,
      escoposIntegrados: props.escoposIntegrados
    };
  }
  get clienteFinal() {
    return {
      ...this.#props.clienteFinal,
      dataNascimento: dayjs(this.#props.clienteFinal.dataNascimento)
    };
  }
  get meioDeNotificacao() {
    return this.#props.meioDeNotificacao;
  }
  get escoposIntegrados() {
    return this.#props.escoposIntegrados;
  }
  toObject() {
    const address = this.clienteFinal.endereco?.toObject();
    return {
      clienteFinal: {
        celular: this.clienteFinal.celular,
        cpf: this.clienteFinal.cpf?.value,
        dataNascimento: this.clienteFinal.dataNascimento.format(
          "DD/MM/YYYY"
        ),
        email: this.clienteFinal.email?.value,
        endereco: address ? {
          bairro: address.neighborhood,
          cep: address.cep,
          cidade: address.city,
          complemento: address.complement,
          estado: address.state,
          logradouro: address.street,
          numero: address.number
        } : void 0,
        nomeCompleto: this.clienteFinal.nomeCompleto,
        nomeMae: this.clienteFinal.nomeMae,
        cnpj: this.clienteFinal.cnpj?.value,
        razaoSocial: this.clienteFinal.razaoSocial
      },
      escoposIntegrados: this.escoposIntegrados,
      meioDeNotificacao: this.meioDeNotificacao
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/value-objects/calendar-due-charge-response.ts
import dayjs2 from "dayjs";
var CalendarDueCharge = class {
  #props;
  constructor({
    criacao,
    dataDeVencimento,
    validadeAposVencimento
  }) {
    this.#props = {
      criacao: new Date(criacao),
      dataDeVencimento: /* @__PURE__ */ new Date(`${dataDeVencimento}T12:00:00`),
      validadeAposVencimento
    };
  }
  get criacao() {
    return dayjs2(this.#props.criacao);
  }
  get dataDeVencimento() {
    return dayjs2(this.#props.dataDeVencimento);
  }
  get validadeAposVencimento() {
    return this.#props.validadeAposVencimento;
  }
  /**
   *
   * @returns Retorna a `dataDeVencimento` no formato `YYYY-MM-DD`
   */
  formatDataDeVencimento() {
    return this.dataDeVencimento.format(
      "YYYY-MM-DD"
    );
  }
  toObject() {
    return {
      criacao: this.criacao.toDate(),
      dataDeVencimento: this.dataDeVencimento.toDate(),
      validadeAposVencimento: this.validadeAposVencimento
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/value-objects/pix-location.ts
import dayjs3 from "dayjs";
var PixLocation = class {
  #props;
  constructor({ id, location, tipoCob, criacao }) {
    this.#props = {
      id,
      location,
      tipoCob,
      criacao: criacao ? /* @__PURE__ */ new Date() : void 0
    };
  }
  get id() {
    return this.#props.id;
  }
  /**
   * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
   */
  get location() {
    return this.#props.location;
  }
  get tipoCob() {
    return this.#props.tipoCob;
  }
  get criacao() {
    return this.#props.criacao ? dayjs3(this.#props.criacao) : void 0;
  }
  toObject() {
    return {
      id: this.id,
      /**
       * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
       */
      location: this.location,
      tipoCob: this.tipoCob,
      criacao: this.criacao?.toDate()
    };
  }
};

// src/domain-driven-design/core/entities/unique-entity-id.ts
import { randomUUID } from "crypto";
import z3 from "zod";
var uniqueEntityIdInstanceSchema = z3.custom(
  (data) => data instanceof UniqueEntityId,
  "must be an UniqueEntityId"
);
var UniqueEntityId = class {
  _value;
  constructor(id) {
    this._value = id ?? randomUUID();
  }
  get value() {
    return this._value;
  }
  equals(id) {
    return id.value === this.value;
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/value-objects/id.ts
var Id = class {
  #value;
  #size;
  constructor({ size, value }) {
    this.#size = size;
    if (value) {
      this.#value = value;
    } else {
      this.#value = this.generateNew(size);
    }
  }
  get value() {
    return this.#value;
  }
  generateNew(size) {
    size = size || this.#size;
    function getOnlyAlphaNumeric(str) {
      return str.replaceAll(/[^0-9a-z]/gi, "");
    }
    let id = getOnlyAlphaNumeric(new UniqueEntityId().value);
    while (id.length < size) {
      id += getOnlyAlphaNumeric(new UniqueEntityId().value);
    }
    const data = id.slice(0, size);
    return data;
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/value-objects/tx-id.ts
var TxId = class extends Id {
  constructor(id) {
    const min = 26;
    const max = 35;
    const mean = Math.ceil((min + max) / 2);
    super({ size: mean, value: id });
  }
  generate() {
    return this.generateNew();
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/value-objects/monetary-value.ts
var MonetaryValue = class {
  #valueInCents;
  constructor(value) {
    const valueString = String(value);
    const onlyNumberAttributes = valueString.replaceAll(/([^0-9.,]+)/gi, "");
    const getNumberSymbols = (number) => {
      const symbols2 = {
        thousands: "",
        decimal: ""
      };
      number.split("").forEach((char) => {
        const isSymbol = [",", "."].includes(char);
        if (!isSymbol) return;
        if (!symbols2.thousands) {
          symbols2.thousands = char;
        } else if (symbols2.thousands !== char && !symbols2.decimal) {
          symbols2.decimal = char;
        }
      });
      let response;
      if (!symbols2.decimal && symbols2.thousands) {
        response = { decimal: symbols2.thousands, thousands: "" };
      } else {
        response = { ...symbols2 };
      }
      return response;
    };
    const getNumberInCents = (number, symbols2) => {
      if (!symbols2.decimal && !symbols2.thousands) {
        return Number(number);
      } else {
        const valueNumber = Number(
          onlyNumberAttributes.replaceAll(symbols2.thousands, "").replace(symbols2.decimal, ".")
        );
        const valueRounded = Number(valueNumber.toFixed(2));
        const valueInCents = valueRounded * 100;
        return valueInCents;
      }
    };
    const symbols = getNumberSymbols(onlyNumberAttributes);
    const numberInCents = getNumberInCents(onlyNumberAttributes, symbols);
    this.#valueInCents = numberInCents;
  }
  get cents() {
    return this.#valueInCents;
  }
  get units() {
    return this.cents / 100;
  }
  /**
   * Valor original da cobrança com os centavos separados por ".", exemplo: "10.00"
   */
  get originalValue() {
    return this.units.toFixed(2);
  }
  getFormatParameters(props) {
    const locale = props?.locale ?? "pt-BR";
    const currency = props?.currency ?? "BRL";
    return { locale, currency };
  }
  format(props) {
    const { currency, locale } = this.getFormatParameters(props);
    return Intl.NumberFormat(locale, {
      style: "currency",
      currency
    }).format(this.units);
  }
  toObject(props) {
    const formatProps = props?.formatProps;
    const format = this.format(formatProps);
    return {
      cents: this.cents,
      units: this.units,
      /**
       * Valor original da cobrança com os centavos separados por ".", exemplo: "10.00"
       */
      originalValue: this.originalValue,
      format
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-due-charge/value-objects/pix-due-charge-value/@abstract-pix-due-charge-value-contract.ts
var PixDueChargeValueContract = class {
  #props;
  constructor(props) {
    this.#props = {
      original: new MonetaryValue(props.original),
      multa: props.multa,
      juros: props.juros,
      abatimento: props.abatimento,
      desconto: props.desconto
    };
  }
  /**
   * Detalhes sobre a transação
   */
  get props() {
    return {
      /**
       * Valor original da cobrança.string `\d{1,10}\ .\d{2}`
       */
      original: this.#props.original,
      /**
       * Multa aplicada à cobrança. `object`
       */
      multa: this.#props.multa,
      /**
       * Juros aplicado à cobrança. `object`
       */
      juros: this.#props.juros,
      /**
       * Abatimento aplicado à cobrança. `object`
       */
      abatimento: this.#props.abatimento,
      /**
       * Descontos aplicados à cobrança. `object`
       */
      desconto: this.#props.desconto
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-due-charge/value-objects/pix-due-charge-value/pix-due-charge-details/pix-due-charge-value-details-abatimento.ts
var PixDueChargeValueDetailsAbatimento = class extends PixDueChargeValueContract {
  get data() {
    return this.props.abatimento;
  }
  get details() {
    if (!this.props.abatimento) return void 0;
    let value;
    if (!this.props.abatimento.modalidade || ![1, 2].includes(this.props.abatimento.modalidade)) {
      value = 0;
    }
    if (this.props.abatimento.modalidade === 1) {
      value = Number(this.props.abatimento.valorPerc);
    } else {
      value = Number(this.props.abatimento.valorPerc) / 100 * this.props.original.units;
    }
    const modalidadeType = this.props.abatimento.modalidade === 1 ? "Valor Fixo" : "Valor Percentual";
    return {
      value: new MonetaryValue(value),
      modalidade: {
        type: modalidadeType
      }
    };
  }
  toObject(props) {
    const formatProps = props?.formatProps;
    return {
      data: this.data,
      details: {
        modalidade: this.details?.modalidade,
        value: this.details?.value.format(formatProps)
      }
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-due-charge/value-objects/pix-due-charge-value/pix-due-charge-details/pix-due-charge-value-details-desconto.ts
var PixDueChargeValueDetailsDesconto = class extends PixDueChargeValueContract {
  get data() {
    return this.props.abatimento;
  }
  get details() {
    const modalidadeType = [1, 2].includes(
      this.props.desconto.modalidade
    ) ? "fixo" : [3, 5].includes(this.props.desconto.modalidade) ? "por antecipa\xE7\xE3o dias corridos" : "por antecipa\xE7\xE3o dias \xFAteis";
    const modalidadeInterest = [1, 3, 4].includes(
      this.props.desconto.modalidade
    ) ? "Valor" : "Percentual";
    const details = {
      modalidade: {
        type: modalidadeType,
        interest: modalidadeInterest
      },
      descontoDataFixa: this.props.desconto.descontoDataFixa.map((item) => {
        return {
          data: item.data,
          value: new MonetaryValue(
            modalidadeInterest === "Valor" ? Number(item.valorPerc) : this.props.original.units * (Number(item.valorPerc) / 100)
          )
        };
      })
    };
    return details;
  }
  toObject(props) {
    const formatProps = props?.formatProps;
    return {
      data: this.data,
      details: {
        modalidade: this.details.modalidade,
        value: this.details.descontoDataFixa.map(({ data, value }) => {
          return { data, value: value.format(formatProps) };
        })
      }
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-due-charge/value-objects/pix-due-charge-value/pix-due-charge-details/pix-due-charge-value-details-juros.ts
var PixDueChargeValueDetailsJuros = class extends PixDueChargeValueContract {
  get data() {
    return this.props.juros;
  }
  get details() {
    let value;
    if (!this.props.juros.modalidade || ![1, 2, 3, 4, 5, 6, 7, 8].includes(this.props.juros.modalidade)) {
      value = 0;
    }
    const type = [1, 2, 3, 4].includes(
      this.props.juros.modalidade
    ) ? "dias corridos" : "dias \xFAteis";
    const interest = [1, 5].includes(
      this.props.juros.modalidade
    ) ? "Valor" : "Percentual";
    const periodicity = [1, 2, 5, 6].includes(
      this.props.juros.modalidade
    ) ? "dia" : [3, 7].includes(this.props.juros.modalidade) ? "m\xEAs" : "ano";
    const valuePerc = interest === "Percentual" ? `${this.props.juros.valorPerc}%` : new MonetaryValue(this.props.juros.valorPerc).format({
      locale: "pt-BR",
      currency: "BRL"
    });
    const format = `${valuePerc} ao ${periodicity} (${type})`;
    if (interest === "Percentual") {
      value = this.props.original.units * (Number(this.props.juros.valorPerc) / 100);
    } else {
      value = Number(this.props.juros.valorPerc);
    }
    return {
      value: new MonetaryValue(value),
      modalidade: {
        type,
        interest,
        periodicity,
        format
      }
    };
  }
  toObject(props) {
    const formatProps = props?.formatProps;
    return {
      data: this.data,
      details: {
        modalidade: this.details.modalidade,
        value: this.details.value.format(formatProps)
      }
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-due-charge/value-objects/pix-due-charge-value/pix-due-charge-details/pix-due-charge-value-details-multa.ts
var PixDueChargeValueDetailsMulta = class extends PixDueChargeValueContract {
  get data() {
    return this.props.multa;
  }
  get details() {
    let value;
    if (!this.props.multa.modalidade || ![1, 2].includes(this.props.multa.modalidade)) {
      value = 0;
    }
    if (this.props.multa.modalidade === 1) {
      value = Number(this.props.multa.valorPerc);
    } else {
      value = Number(this.props.multa.valorPerc) / 100 * this.props.original.units;
    }
    return new MonetaryValue(value);
  }
  toObject(props) {
    const formatProps = props?.formatProps;
    return {
      data: this.data,
      details: this.details.toObject({ formatProps })
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-due-charge/value-objects/pix-due-charge-value/pix-due-charge-details/index.ts
var PixDueChargeValueDetails = class extends PixDueChargeValueContract {
  #multa;
  #juros;
  #abatimento;
  #desconto;
  constructor(props) {
    super(props);
    this.#multa = new PixDueChargeValueDetailsMulta(props);
    this.#juros = new PixDueChargeValueDetailsJuros(props);
    this.#abatimento = new PixDueChargeValueDetailsAbatimento(props);
    this.#desconto = new PixDueChargeValueDetailsDesconto(props);
  }
  get multa() {
    return this.#multa;
  }
  get juros() {
    return this.#juros;
  }
  get abatimento() {
    return this.#abatimento;
  }
  get desconto() {
    return this.#desconto;
  }
  toObject(props) {
    const formatProps = props?.formatProps;
    return {
      multa: this.multa.toObject({ formatProps }),
      juros: this.juros.toObject({ formatProps }),
      abatimento: this.abatimento.toObject({ formatProps }),
      desconto: this.desconto.toObject({ formatProps })
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-due-charge/value-objects/pix-due-charge-value/index.ts
var PixDueChargeValue = class extends PixDueChargeValueContract {
  #details;
  constructor(props) {
    super(props);
    this.#details = new PixDueChargeValueDetails(props);
  }
  get details() {
    return this.#details;
  }
  get value() {
    return this.props.original;
  }
  toObject(props) {
    const formatProps = props?.formatProps;
    return {
      details: this.details.toObject({ formatProps }),
      value: this.value.format(formatProps)
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-due-charge/pix-due-charge-response.ts
var PixDueChargeResponse = class {
  #props;
  constructor(props) {
    this.#props = {
      calendario: new CalendarDueCharge({
        criacao: props.calendario.criacao,
        dataDeVencimento: props.calendario.dataDeVencimento,
        validadeAposVencimento: props.calendario.validadeAposVencimento
      }),
      txid: new TxId(props.txid),
      revisao: props.revisao,
      loc: new PixLocation({
        id: props.loc.id,
        location: props.loc.location,
        tipoCob: props.loc.tipoCob
      }),
      location: props.location,
      status: props.status,
      devedor: new UserAccount({
        clienteFinal: {
          nomeCompleto: props.devedor.nome,
          cpf: props.devedor.cpf,
          cnpj: props.devedor.cnpj,
          email: props.devedor.email,
          endereco: {
            bairro: "",
            numero: "",
            complemento: "",
            cep: props.devedor.cep,
            cidade: props.devedor.cidade,
            estado: props.devedor.uf,
            logradouro: props.devedor.logradouro
          }
        }
      }),
      recebedor: new UserAccount({
        clienteFinal: {
          nomeCompleto: props.recebedor.nome,
          cpf: props.recebedor.cpf,
          cnpj: props.recebedor.cnpj,
          email: props.recebedor.email,
          endereco: {
            bairro: "",
            numero: "",
            complemento: "",
            cep: props.recebedor.cep,
            cidade: props.recebedor.cidade,
            estado: props.recebedor.uf,
            logradouro: props.recebedor.logradouro
          }
        }
      }),
      valor: new PixDueChargeValue(props.valor),
      chave: props.chave,
      solicitacaoPagador: props.solicitacaoPagador,
      pixCopiaECola: props.pixCopiaECola
    };
  }
  get calendario() {
    return this.#props.calendario;
  }
  get txid() {
    return this.#props.txid;
  }
  get revisao() {
    return this.#props.revisao;
  }
  get loc() {
    return this.#props.loc;
  }
  /**
   * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
   */
  get location() {
    return this.#props.location;
  }
  get status() {
    return this.#props.status;
  }
  get devedor() {
    return this.#props.devedor;
  }
  get valor() {
    return this.#props.valor;
  }
  get chave() {
    return this.#props.chave;
  }
  get solicitacaoPagador() {
    return this.#props.solicitacaoPagador;
  }
  get pixCopiaECola() {
    return this.#props.pixCopiaECola;
  }
  toObject(props) {
    const formatProps = props?.valueFormat;
    return {
      calendario: this.calendario.toObject(),
      /**
       * Cada transação Pix possui um **Identificador da Transação**, chamado `txid`, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora.
       *
       * Um `txid` é uma string alfanumérica com comprimentos mínimo de 26 e máximo de 35 caracteres. Um txid válido, portanto, deve obedecer à seguinte expressão regular (regex): `^[a-zA-Z0-9]{26,35}$`.
       * Você pode validar strings txid sob a regex [aqui](https://regex101.com/r/iZ08y4/1).
       */
      txid: this.txid.value,
      revisao: this.revisao,
      loc: this.loc.toObject(),
      /**
       * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
       */
      location: this.location,
      status: this.status,
      devedor: this.devedor.toObject(),
      valor: this.valor.toObject({ formatProps }),
      chave: this.chave,
      solicitacaoPagador: this.solicitacaoPagador,
      pixCopiaECola: this.pixCopiaECola
    };
  }
};

// src/domain-driven-design/core/apis/api-array-response.ts
import dayjs4 from "dayjs";

// src/domain-driven-design/core/apis/api-response.ts
var ApiResponse = class {
  toJson(replacer, space) {
    return JSON.stringify(this.toObject(), replacer, space);
  }
};

// src/domain-driven-design/core/apis/api-array-response.ts
var ApiArrayResponse = class extends ApiResponse {
  props;
  constructor(props, CobClass) {
    super();
    this.props = {
      arrayData: props.arrayData.map((item) => new CobClass(item)),
      parametros: {
        inicio: new Date(props.parametros.inicio),
        fim: new Date(props.parametros.fim),
        paginacao: {
          paginaAtual: props.parametros.paginacao.paginaAtual,
          itensPorPagina: props.parametros.paginacao.itensPorPagina,
          quantidadeDePaginas: props.parametros.paginacao.quantidadeDePaginas,
          quantidadeTotalDeItens: props.parametros.paginacao.quantidadeTotalDeItens
        }
      }
    };
  }
  /**
   * Filtro dos registros cuja data de criação seja maior ou igual que a data de início. Respeita RFC 3339.
   */
  get inicio() {
    return dayjs4(this.props.parametros.inicio);
  }
  /**
   * Filtro dos registros cuja data de criação seja menor ou igual que a data de fim. Respeita RFC 3339.
   */
  get fim() {
    return dayjs4(this.props.parametros.fim);
  }
  /**
   * Paginação - indica a página atual.
   */
  get paginaAtual() {
    return this.props.parametros.paginacao.paginaAtual;
  }
  /**
   * Paginação - indica a quantidade de itens por página.
   */
  get itensPorPagina() {
    return this.props.parametros.paginacao.itensPorPagina;
  }
  /**
   * Paginação - indica a quantidade total de páginas.
   */
  get quantidadeDePaginas() {
    return this.props.parametros.paginacao.quantidadeDePaginas;
  }
  /**
   * Paginação - indica a quantidade total de itens.
   */
  get quantidadeTotalDeItens() {
    return this.props.parametros.paginacao.quantidadeTotalDeItens;
  }
  /**
   * Cobranças - retorna uma lista de cobranças, correspondendo à paginação atual.
   */
  get arrayData() {
    return this.props.arrayData;
  }
  toJson(replacer, space) {
    return JSON.stringify(this.toObject(), replacer, space);
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-due-charge/pix-due-charge-response-array.ts
var PixDueChargeResponseArray = class extends ApiArrayResponse {
  constructor(props) {
    const data = {
      arrayData: props.cobs,
      parametros: props.parametros
    };
    super(data, PixDueChargeResponse);
  }
  get cobs() {
    return this.arrayData;
  }
  toObject() {
    return {
      parametros: {
        inicio: this.inicio.toDate(),
        fim: this.fim.toDate(),
        paginaAtual: this.paginaAtual,
        itensPorPagina: this.itensPorPagina,
        quantidadeDePaginas: this.quantidadeDePaginas,
        quantidadeTotalDeItens: this.quantidadeTotalDeItens
      },
      cobs: this.cobs.map((item) => item.toObject())
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-due-charge/index.ts
var PixDueCharge = class _PixDueCharge extends ApiRequest {
  /**
   * Cadastrar uma cobrança com vencimento e um identificador de transação (`txid`).
   *
   * @param PixDueChargeCreateProps
   * @returns `PixDueChargeResponse | null`
   */
  async create({ body, txid }) {
    const { method, route } = this.endpoints.ENDPOINTS.pixCreateDueCharge({
      txid
    });
    const resp = await this.sendRequest({
      method,
      route,
      body,
      ResponseClass: PixDueChargeResponse
    });
    return resp;
  }
  /**
   * Revisar (modificar) uma cobrança a partir do seu `txid`.
   *
   * @param PixDueChargeUpdateProps
   * @returns `PixDueChargeResponse | null`
   */
  async update({ body, txid }) {
    const { method, route } = this.endpoints.ENDPOINTS.pixUpdateDueCharge({
      txid
    });
    const resp = await this.sendRequest({
      method,
      route,
      body,
      ResponseClass: PixDueChargeResponse
    });
    return resp;
  }
  /**
   * Consultar uma cobrança com vencimento a partir do `txid`.
   *
   * @param PixDueChargeFindUniqueProps
   * @returns `PixDueChargeResponse | null`
   */
  async findUnique({ searchParams, txid }) {
    const { method, route } = this.endpoints.ENDPOINTS.pixDetailDueCharge({
      txid
    });
    const resp = await this.sendRequest({
      method,
      route,
      searchParams,
      ResponseClass: PixDueChargeResponse
    });
    return resp;
  }
  /**
   * Consultar cobranças com vencimento através de parâmetros como início, fim, cpf, cnpj e status.
   *
   * @param PixDueChargeFindManyProps
   * @returns `PixDueChargeResponseArray | null`
   */
  async findMany({ searchParams }) {
    const { method, route } = this.endpoints.ENDPOINTS.pixListDueCharges();
    const resp = await this.sendRequest({
      method,
      route,
      searchParams,
      ResponseClass: PixDueChargeResponseArray
    });
    return resp;
  }
  // eslint-disable-next-line
  // @ts-ignore
  useCredentials({
    clientId,
    clientSecret
  }) {
    const type = this.type;
    const options = this.options;
    const pix = new _PixDueCharge(type, "PIX", {
      ...options,
      client_id: clientId,
      client_secret: clientSecret
    });
    return pix;
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/value-objects/calendar-imediate-charge-response.ts
import dayjs5 from "dayjs";
var CalendarImediateCharge = class {
  #props;
  constructor({ criacao, expiracao }) {
    this.#props = {
      criacao: new Date(criacao),
      expiracao
    };
  }
  get criacao() {
    return dayjs5(this.#props.criacao);
  }
  get expiracao() {
    return this.#props.expiracao;
  }
  getExpirationDate() {
    const date = this.criacao;
    return date.add(this.expiracao, "second");
  }
  toObject() {
    return {
      criacao: this.criacao.toDate(),
      expiracao: this.expiracao
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-imediate-charge/pix-imediate-charge-response.ts
var PixImediateChargeResponse = class extends ApiResponse {
  props;
  constructor(props) {
    super();
    this.props = {
      calendario: new CalendarImediateCharge({
        criacao: props.calendario.criacao,
        expiracao: props.calendario.expiracao
      }),
      /**
       * Cada transação Pix possui um **Identificador da Transação**, chamado `txid`, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora.
       *
       * Um `txid` é uma string alfanumérica com comprimentos mínimo de 26 e máximo de 35 caracteres. Um txid válido, portanto, deve obedecer à seguinte expressão regular (regex): `^[a-zA-Z0-9]{26,35}$`.
       * Você pode validar strings txid sob a regex [aqui](https://regex101.com/r/iZ08y4/1).
       */
      txid: new TxId(props.txid),
      revisao: props.revisao,
      loc: new PixLocation({
        id: props.loc.id,
        /**
         * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
         */
        location: props.loc.location,
        tipoCob: props.loc.tipoCob
      }),
      /**
       * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
       */
      location: props.location,
      status: props.status,
      devedor: new UserAccount({
        clienteFinal: {
          nomeCompleto: props.devedor.nome,
          cpf: props.devedor.cpf,
          cnpj: props.devedor.cnpj
        }
      }),
      valor: new MonetaryValue(props.valor.original),
      chave: props.chave,
      solicitacaoPagador: props.solicitacaoPagador,
      pixCopiaECola: props.pixCopiaECola
    };
  }
  get calendario() {
    return this.props.calendario;
  }
  get txid() {
    return this.props.txid;
  }
  get revisao() {
    return this.props.revisao;
  }
  get loc() {
    return this.props.loc;
  }
  /**
   * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
   */
  get location() {
    return this.props.location;
  }
  get status() {
    return this.props.status;
  }
  get devedor() {
    return this.props.devedor;
  }
  get valor() {
    return this.props.valor;
  }
  get chave() {
    return this.props.chave;
  }
  get solicitacaoPagador() {
    return this.props.solicitacaoPagador;
  }
  get pixCopiaECola() {
    return this.props.pixCopiaECola;
  }
  toObject(props) {
    const formatProps = props?.valueFormat;
    return {
      calendario: this.calendario.toObject(),
      /**
       * Cada transação Pix possui um **Identificador da Transação**, chamado `txid`, que no contexto de representação de uma cobrança, é único por CPF/CNPJ da pessoa usuária recebedora.
       *
       * Um `txid` é uma string alfanumérica com comprimentos mínimo de 26 e máximo de 35 caracteres. Um txid válido, portanto, deve obedecer à seguinte expressão regular (regex): `^[a-zA-Z0-9]{26,35}$`.
       * Você pode validar strings txid sob a regex [aqui](https://regex101.com/r/iZ08y4/1).
       */
      txid: this.txid.value,
      revisao: this.revisao,
      loc: this.loc.toObject(),
      /**
       * Um location é a URL do tipo [URL de capacidade](https://www.w3.org/TR/capability-urls/) que serve de **endereço para uma cobrança**. Em outras palavras, é através de um location que se torna possível resgatar as informações relacionadas a uma cobrança e, assim, realizar as movimentações.
       */
      location: this.location,
      status: this.status,
      devedor: this.devedor.toObject(),
      valor: this.valor.toObject({ formatProps }),
      chave: this.chave,
      solicitacaoPagador: this.solicitacaoPagador,
      pixCopiaECola: this.pixCopiaECola
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-imediate-charge/pix-imediate-charge-response-array.ts
var PixImediateChargeResponseArray = class extends ApiArrayResponse {
  constructor(props) {
    const data = {
      arrayData: props.cobs,
      parametros: props.parametros
    };
    super(data, PixImediateChargeResponse);
  }
  get cobs() {
    return this.arrayData;
  }
  toObject() {
    return {
      parametros: {
        inicio: this.inicio.toDate(),
        fim: this.fim.toDate(),
        paginaAtual: this.paginaAtual,
        itensPorPagina: this.itensPorPagina,
        quantidadeDePaginas: this.quantidadeDePaginas,
        quantidadeTotalDeItens: this.quantidadeTotalDeItens
      },
      cobs: this.cobs.map((item) => item.toObject())
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-imediate-charge/index.ts
var PixImediateCharge = class _PixImediateCharge extends ApiRequest {
  /**
   * O txid é criado pelo usuário recebedor e está sob sua responsabilidade. No entanto, caso deseje que o txid será definido pela Efí, basta omitir est informação.
   *
   * @param props ```ts
   * interface PixImediateChargeCreateProps
   * ```
   * @returns ```ts
   * Promise<(interface PixImediateChargeResponse) | null>
   * ```
   */
  async create({ txid, body }) {
    const { method, route } = txid ? this.endpoints.ENDPOINTS.pixCreateCharge({
      txid
    }) : this.endpoints.ENDPOINTS.pixCreateImmediateCharge();
    const resp = await this.sendRequest({
      body,
      method,
      route,
      ResponseClass: PixImediateChargeResponse
    });
    return resp;
  }
  /**
   * Endpoint para revisar (modificar) uma cobrança a partir do seu `txid`.
   * @param PixImediateChargeUpdateProps
   * @returns `PixImediateChargeResponse | null`
   */
  async update({ txid, body }) {
    const { method, route } = this.endpoints.ENDPOINTS.pixUpdateCharge({
      txid
    });
    const resp = await this.sendRequest({
      body,
      method,
      route,
      ResponseClass: PixImediateChargeResponse
    });
    return resp;
  }
  /**
   * Endpoint para consultar uma cobrança a partir do `txid`.
   * @param PixImediateChargeFindUniqueProps
   * @returns `PixImediateChargeResponseType | null`
   */
  async findUnique({ txid, searchParams }) {
    const { method, route } = this.endpoints.ENDPOINTS.pixDetailCharge({
      txid
    });
    const resp = await this.sendRequest({
      method,
      route,
      searchParams,
      ResponseClass: PixImediateChargeResponse
    });
    return resp;
  }
  /**
   * Endpoint para consultar várias cobranças.
   *
   * Este endpoint possui filtros para afunilar os resultados da busca, tais como CPF/CNPJ e status. Dentre todos os filtros disponíveis, os filtros inicio e fim são obrigatórios e representam o intervalo de datas em que as cobranças consultadas devem estar compreendidas.
   *
   * @param PixImediateChargeResponseArray
   * @returns
   */
  async findMany({ searchParams }) {
    const { method, route } = this.endpoints.ENDPOINTS.pixListCharges();
    const resp = await this.sendRequest({
      method,
      route,
      searchParams,
      ResponseClass: PixImediateChargeResponseArray
    });
    return resp;
  }
  // eslint-disable-next-line
  // @ts-ignore
  useCredentials({
    clientId,
    clientSecret
  }) {
    const type = this.type;
    const options = this.options;
    const pix = new _PixImediateCharge(type, "PIX", {
      ...options,
      client_id: clientId,
      client_secret: clientSecret
    });
    return pix;
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-manage/pix-manage-response.ts
import dayjs7 from "dayjs";

// src/domain-driven-design/domains/apis/enterprise/entities/pix/value-objects/e2e-id.ts
var E2eId = class extends Id {
  constructor(id) {
    super({ size: 35, value: id });
  }
  generate() {
    return this.generateNew();
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-manage/pix-manage-return-response.ts
import dayjs6 from "dayjs";
var PixManageReturnResponse = class extends ApiResponse {
  #props;
  constructor(props) {
    super();
    this.#props = {
      id: props.id,
      rtrId: props.rtrId,
      valor: new MonetaryValue(props.valor),
      horario: {
        solicitacao: new Date(props.horario.solicitacao)
      },
      status: props.status
    };
  }
  get id() {
    return this.#props.id;
  }
  get rtrId() {
    return this.#props.rtrId;
  }
  /**
   * Valor da devolução
   *
   * string `\d{1,10}\.\d{2}`
   */
  get valor() {
    return this.#props.valor;
  }
  /**
   * Contém o horário em que a devolução foi feita.
   *
   */
  get horario() {
    return {
      /**
       * Horário em que a devolução foi feita.
       *
       * ISO-String no formato `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`
       */
      solicitacao: dayjs6(this.#props.horario.solicitacao)
    };
  }
  /**
   * O campo status no retorno do webhook representa a situação da requisição de envio direto de um Pix para uma chave Pix, podendo assumir os seguintes estados:
   *
   * `"EM_PROCESSAMENTO","REALIZADO", "NAO_REALIZADO"`
   */
  get status() {
    return this.#props.status;
  }
  toObject(props) {
    const formatProps = props?.formatProps;
    return {
      id: this.id,
      rtrId: this.rtrId,
      valor: this.valor.toObject({ formatProps }),
      horario: {
        solicitacao: this.horario.solicitacao.toDate()
      },
      status: this.status
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-manage/pix-manage-response.ts
var PixManageResponse = class extends ApiResponse {
  #props;
  constructor(props) {
    super();
    this.#props = {
      endToEndId: new E2eId(props.endToEndId),
      txid: new TxId(props.txid),
      valor: new MonetaryValue(props.valor),
      horario: new Date(props.horario),
      infoPagador: props.infoPagador,
      devolucoes: props.devolucoes?.map((item) => {
        return new PixManageReturnResponse(item);
      })
    };
  }
  get endToEndId() {
    return this.#props.endToEndId;
  }
  get txid() {
    return this.#props.txid;
  }
  get valor() {
    return this.#props.valor;
  }
  get horario() {
    return dayjs7(this.#props.horario);
  }
  get infoPagador() {
    return this.#props.infoPagador;
  }
  get devolucoes() {
    return this.#props.devolucoes;
  }
  toObject(props) {
    const formatProps = props?.formatProps;
    return {
      endToEndId: this.endToEndId.value,
      txid: this.txid.value,
      valor: this.valor.toObject({ formatProps }),
      horario: this.horario.toDate(),
      infoPagador: this.infoPagador,
      devolucoes: this.devolucoes?.map((item) => {
        return item.toObject();
      })
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-manage/index.ts
var PixManage = class _PixManage extends ApiRequest {
  /**
   *
   * ---
   *
   *  Consultar um Pix através de um `e2eId`.
   *
   * ---
   *
   * ### Atenção
   * Este endpoint retorna apenas informações sobre Pix recebidos.
   *
   * ---
   *
   * @param PixManageConsultProps
   * @returns `PixManageResponse | null`
   */
  async consult({ e2eId }) {
    const { method, route } = this.endpoints.ENDPOINTS.pixDetailReceived({
      e2eId
    });
    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixManageResponse
    });
    return resp;
  }
  /**
   *
   * ---
   *
   * Consultar vários Pix recebidos.
   *
   * ---
   *
   * @param PixWebhooksConsultManyProps
   * @returns `PixManageResponse | null`
   */
  async consultMany({ searchParams }) {
    const { method, route } = this.endpoints.ENDPOINTS.pixReceivedList();
    const resp = await this.sendRequest({
      method,
      route,
      searchParams,
      ResponseClass: PixManageResponse
    });
    return resp;
  }
  /**
   *
   * ---
   *
   * Solicitar uma devolução usando o `e2eId` do Pix e o `ID da devolução`. O motivo atribuído à PACS.004 será “Devolução solicitada pelo usuário recebedor do pagamento original”, com a sigla “MD06”, conforme consta na aba RTReason da PACS.004 no Catálogo de Mensagens do Pix.
   *
   * ---
   *
   * ### Instruções
   * Você pode simular a rejeição da devolução usando o valor de **R$ 0,01**. Essas devoluções serão rejeitadas e notificadas para simular o fluxo de produção. Devoluções com valores diferentes de **R$ 0,01**, seguirão o fluxo normal de devolução com várias outras validações. Se estiverem em conformidade, serão confirmadas e notificadas, simulando o fluxo de produção.
   *
   * ---
   *
   * @param PixWebhooksReturnProps
   * @returns `PixManageReturnResponse | null`
   */
  async return({ e2eId, id, body }) {
    const { method, route } = this.endpoints.ENDPOINTS.pixDevolution({
      e2eId,
      id
    });
    const resp = await this.sendRequest({
      method,
      route,
      body,
      ResponseClass: PixManageReturnResponse
    });
    return resp;
  }
  /**
   * ---
   *
   * Consultar uma devolução através de um `e2eId` do Pix e do `ID da devolução`.
   *
   * ---
   *
   * ### Instruções
   * É possível consultar informações de uma devolução simulada pelo endpoint de Envio de Devolução no ambiente de homologação.
   *
   * A funcionalidade ocorre exatamente como no ambiente de produção.
   *
   * ---
   *
   * @param PixWebhooksReturnProps
   * @returns `PixManageReturnResponse | null`
   */
  async consultReturn({ e2eId, id }) {
    const { method, route } = this.endpoints.ENDPOINTS.pixDetailDevolution({
      e2eId,
      id
    });
    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixManageReturnResponse
    });
    return resp;
  }
  // eslint-disable-next-line
  // @ts-ignore
  useCredentials({
    clientId,
    clientSecret
  }) {
    const type = this.type;
    const options = this.options;
    const pix = new _PixManage(type, "PIX", {
      ...options,
      client_id: clientId,
      client_secret: clientSecret
    });
    return pix;
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-send-and-payment/pix-send-and-payment-send-response.ts
var PixSendAndPaymentSendResponse = class extends ApiResponse {
  #props;
  constructor(props) {
    super();
    this.#props = props;
  }
  get props() {
    return this.#props;
  }
  toObject(...props) {
    return props;
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-send-and-payment/index.ts
var PixSendAndPayment = class _PixSendAndPayment extends ApiRequest {
  /**
   * Destinado a realizar o envio direto de um Pix para uma chave Pix cadastrada em um PSP seja da Efí ou outro. Esse endpoint poderá sofrer alterações quando entrar no escopo de padronização do BACEN. Neste caso, os clientes habilitados serão avisados com antecedência.
   *
   * Para utilização do endpoint de Requisitar envio de Pix, além da liberação do escopo `pix.send` na conta, **é necessário que a chave Pix do pagador tenha um webhook associado a ela**. Por meio do webhook a Efí irá informar a você se o envio do Pix foi realizado com sucesso ou não.
   *
   * Caso a sua aplicação tenha sido criada anterior à data 29/07/2024, será necessário alterar os escopos (?), desativando e ativando novamente o escopo `pix.send`, dentro de API Pix, para utilizar o recurso.
   *
   * ---
   *
   * ## Testes em Homologação
   *
   * Se você precisa testar o endpoint de envio de Pix, temos um ambiente funcional de homologação onde é possível simular todos os status retornados pela nossa API e pelo webhook.
   *
   * - Se o valor do Pix está entre **R$ 0.01** à **R$ 10.00**: Pix é confirmado, informação virá via Webhook.
   * - Se o valor do Pix está entre **R$ 10.01** à **R$ 20.00**: Pix é rejeitado, informação virá via Webhook.
   * - Se o valor do Pix é acima de **R$ 20.00**: Pix é rejeitado já na requisição, informação não virá via Webhook.
   * - Os pagamentos enviados com valor de **R$ 4,00** irão gerar duas devoluções recebidas no valor de **R$ 2,00**.
   * - Os pagamentos enviados com valor de **R$ 5,00** irão gerar uma devolução recebida no valor de **R$ 5,00**.
   * - Os pagamentos enviados via chave só serão confirmados ou rejeitados se for utilizada a chave de homologação: `efipay@sejaefi.com.br`. Caso contrário, um erro de chave inválida será informado.
   * - Os pagamentos enviados via dados bancários não sofrem alterações.
   *
   * ### Atenção!
   *
   * Para melhorar o desempenho do serviço e evitar conflitos de saldo, recomendamos que **o envio de Pix por API seja condicionado à conclusão da transação anterior, que é notificada por meio do webhook**. Se essa prática não for seguida e várias requisições de envio forem feitas ao mesmo tempo, o integrador pode enfrentar problemas no envio.
   *
   * @param PixSendAndPaymentSendProps
   */
  async send({ body, idEnvio }) {
    const { method, route } = this.endpoints.ENDPOINTS.pixSend({
      idEnvio
    });
    const resp = await this.sendRequest({
      body,
      method,
      route,
      ResponseClass: PixSendAndPaymentSendResponse
    });
    return resp;
  }
  // eslint-disable-next-line
  // @ts-ignore
  useCredentials({
    clientId,
    clientSecret
  }) {
    const type = this.type;
    const options = this.options;
    const pix = new _PixSendAndPayment(type, "PIX", {
      ...options,
      client_id: clientId,
      client_secret: clientSecret
    });
    return pix;
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-webhooks/pix-webhook-add-response.ts
var PixWebhooksAddResponse = class extends ApiResponse {
  #props;
  constructor(props) {
    super();
    this.#props = props;
  }
  /**
   * Url para onde a notificação vai ser enviada
   */
  get webhookUrl() {
    return this.#props.webhookUrl;
  }
  toObject() {
    return {
      /**
       * Url para onde a notificação vai ser enviada
       */
      webhookUrl: this.webhookUrl
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-webhooks/pix-webhook-delete-response.ts
var PixWebhooksDeleteResponse = class extends ApiResponse {
  #props;
  constructor(props) {
    super();
    this.#props = props;
  }
  get props() {
    return this.#props;
  }
  get status() {
    return "webhook deleted!";
  }
  toObject() {
    return {
      status: this.status
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-webhooks/pix-webhook-response.ts
import dayjs8 from "dayjs";
var PixWebhooksResponse = class extends ApiResponse {
  #props;
  constructor(props) {
    super();
    this.#props = props;
  }
  /**
   * Url para onde a notificação vai ser enviada
   */
  get webhookUrl() {
    return this.#props.webhookUrl;
  }
  /**
   * O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.
   *
   * Os tipos de chave podem ser: telefone, e-mail, cpf/cnpj ou EVP.
   *
   * O formato das chaves pode ser encontrado na seção "Formatação das chaves do DICT no BR Code" do [Manual de Padrões para iniciação do Pix.](https://www.bcb.gov.br/estabilidadefinanceira/pix)
   *
   * - string (Chave DICT do recebedor) `≤ 77 characters`
   */
  get chave() {
    return this.#props.chave;
  }
  /**
   * Horário em que o webhook foi criado.
   *
   * @return instância do `dayjs`
   */
  get criacao() {
    return dayjs8(this.#props.criacao);
  }
  toObject() {
    return {
      /**
       * Url para onde a notificação vai ser enviada
       */
      webhookUrl: this.webhookUrl,
      /**
       * O campo chave determina a chave Pix registrada no DICT que será utilizada para a cobrança. Essa chave será lida pelo aplicativo do PSP do pagador para consulta ao DICT, que retornará a informação que identificará o recebedor da cobrança.
       *
       * Os tipos de chave podem ser: telefone, e-mail, cpf/cnpj ou EVP.
       *
       * O formato das chaves pode ser encontrado na seção "Formatação das chaves do DICT no BR Code" do [Manual de Padrões para iniciação do Pix.](https://www.bcb.gov.br/estabilidadefinanceira/pix)
       *
       * - string (Chave DICT do recebedor) `≤ 77 characters`
       */
      chave: this.chave,
      /**
       * Horário em que o webhook foi criado.
       *
       * ISO-String no formato `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`
       */
      criacao: this.criacao.toDate()
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-webhooks/pix-webhook-response-array.ts
var PixWebhooksResponseArray = class extends ApiArrayResponse {
  constructor(props) {
    const data = {
      arrayData: props.webhooks,
      parametros: props.parametros
    };
    super(data, PixWebhooksResponse);
  }
  get webhooks() {
    return this.arrayData;
  }
  toObject() {
    return {
      parametros: {
        inicio: this.inicio.toDate(),
        fim: this.fim.toDate(),
        paginaAtual: this.paginaAtual,
        itensPorPagina: this.itensPorPagina,
        quantidadeDePaginas: this.quantidadeDePaginas,
        quantidadeTotalDeItens: this.quantidadeTotalDeItens
      },
      webhooks: this.webhooks.map((item) => item.toObject())
    };
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix-modules/pix-webhooks/index.ts
var PixWebhooks = class _PixWebhooks extends ApiRequest {
  /**
   * Configuração do serviço de notificações acerca de Pix recebidos. Pix oriundos de cobranças estáticas só serão notificados se estiverem associados a um txid.
   *
   * ---
   *
   * - ### Lembrete
   * Uma URL de webhook pode estar associada a várias chaves Pix. **Por outro lado, uma chave Pix só pode estar vinculada a uma única URL de webhook**.
   *
   * ---
   *
   * - ### Informação
   * Ao cadastrar seu webhook, enviaremos uma notificação de teste para a URL cadastrada, porém quando de fato uma notificação for enviada, o caminho `/pix` será acrescentado ao final da URL cadastrada. Para não precisar de duas rotas distintas, você poder adicionar um parâmetro `?ignorar=` ao final da URL cadastrada, para que o `/pix` não seja acrescentado na rota da sua URL.
   *
   */
  async add({ body, chave }) {
    const { method, route } = this.endpoints.ENDPOINTS.pixConfigWebhook({
      chave
    });
    const resp = await this.sendRequest({
      body,
      method,
      route,
      ResponseClass: PixWebhooksAddResponse
    });
    return resp;
  }
  async findUnique({ chave }) {
    const { method, route } = this.endpoints.ENDPOINTS.pixDetailWebhook({
      chave
    });
    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixWebhooksResponse
    });
    return resp;
  }
  async findMany({ searchParams }) {
    const { method, route } = this.endpoints.ENDPOINTS.pixListWebhook();
    const resp = await this.sendRequest({
      method,
      route,
      searchParams,
      ResponseClass: PixWebhooksResponseArray
    });
    return resp;
  }
  async delete({ chave }) {
    const { method, route } = this.endpoints.ENDPOINTS.pixDeleteWebhook({
      chave
    });
    const resp = await this.sendRequest({
      method,
      route,
      ResponseClass: PixWebhooksDeleteResponse
    });
    return resp;
  }
  // eslint-disable-next-line
  // @ts-ignore
  useCredentials({
    clientId,
    clientSecret
  }) {
    const type = this.type;
    const options = this.options;
    const pix = new _PixWebhooks(type, "PIX", {
      ...options,
      client_id: clientId,
      client_secret: clientSecret
    });
    return pix;
  }
};

// src/domain-driven-design/domains/apis/enterprise/entities/pix/pix.ts
var PixRequest = class _PixRequest extends ApiRequest {
  #imediateCharge;
  #dueCharge;
  #sendAndPayment;
  #webhooks;
  #manage;
  constructor({ type, options }) {
    super(type, "PIX", options);
    options.authRoute = this.endpoints.ENDPOINTS.authorize();
    this.#imediateCharge = new PixImediateCharge(type, "PIX", options);
    this.#dueCharge = new PixDueCharge(type, "PIX", options);
    this.#sendAndPayment = new PixSendAndPayment(type, "PIX", options);
    this.#webhooks = new PixWebhooks(type, "PIX", options);
    this.#manage = new PixManage(type, "PIX", options);
  }
  /**
   * Responsável pela gestão de cobranças imediatas. As cobranças, no contexto da API Pix representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.
   */
  get imediateCharge() {
    return this.#imediateCharge;
  }
  /**
   * responsável pela gestão de cobranças imediatas. As cobranças, no contexto da API Pix representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.
   */
  get dueCharge() {
    return this.#dueCharge;
  }
  /**
   *  Traz as funcionalidades disponíveis para a gestão do Envio de Pix e do Pagamento de QR Codes Pix
   */
  get sendAndPayment() {
    return this.#sendAndPayment;
  }
  /**
   * gerenciamento de notificações por parte do PSP recebedor a pessoa usuária recebedora.
   */
  get webhooks() {
    return this.#webhooks;
  }
  /**
   * Gestão das transações Pix, isto é, a manutenção dos recebimentos e devoluções Pix.
   */
  get manage() {
    return this.#manage;
  }
  // eslint-disable-next-line
  // @ts-ignore
  useCredentials({
    clientId,
    clientSecret
  }) {
    const type = this.type;
    const options = this.options;
    const pix = new _PixRequest({
      type,
      options: {
        ...options,
        client_id: clientId,
        client_secret: clientSecret
      }
    });
    return pix;
  }
};

// node_modules/dotenv/config.js
(function() {
  require_main().config(
    Object.assign(
      {},
      require_env_options(),
      require_cli_options()(process.argv)
    )
  );
})();

// src/env.ts
import z4 from "zod";
var envSchema = z4.object({
  // CERTIFICATES
  CERTIFICADO_HOMOLOGACAO_PATH: z4.string().min(1, 'environment variable "CERTIFICADO_HOMOLOGACAO_PATH" is missing'),
  CERTIFICADO_PRODUCAO_PATH: z4.string().min(1, 'environment variable "CERTIFICADO_PRODUCAO_PATH" is missing'),
  // CREDENTIALS
  CLIENT_ID_HOMOLOGACAO: z4.string().min(1, 'environment variable "CLIENT_ID_HOMOLOGACAO" is missing'),
  CLIENT_SECRET_HOMOLOGACAO: z4.string().min(1, 'environment variable "CLIENT_SECRET_HOMOLOGACAO" is missing'),
  CLIENT_ID_PRODUCAO: z4.string().min(1, 'environment variable "CLIENT_ID_PRODUCAO" is missing'),
  CLIENT_SECRET_PRODUCAO: z4.string().min(1, 'environment variable "CLIENT_SECRET_PRODUCAO" is missing'),
  PIX_KEY: z4.string().min(1, 'environment variable "PIX_KEY" is missing')
});
var _env = envSchema.safeParse(process.env);
if (!_env.success)
  throw new Error(
    `Environment variables error. Make sure that you have been created a  ".env" file at the root of your project.
    
    Also make sure that all environment variables have been set. See the documentation to learn about the environment variables that is required at "https://www.npmjs.com/package/@bruno-valero/gerencianet-sdk-typescript?activeTab=readme"

    Error details:

    ${JSON.stringify(_env.error.format(), null, 2)}
    `
  );
var env = _env.data;

// src/index.ts
function makeOptions({ type, operation, data }) {
  if (!type) throw new Error("type is missing");
  if (![
    "PIX",
    "DEFAULT",
    "OPENFINANCE",
    "PAGAMENTOS",
    "CONTAS",
    void 0
  ].includes(operation))
    throw new Error(
      'operation must be one of those: "PIX" | "DEFAULT" | "OPENFINANCE" | "PAGAMENTOS" | "CONTAS" | undefined = undefined'
    );
  const opt = {
    client_id: data?.client_id || env.CLIENT_ID_HOMOLOGACAO,
    client_secret: data?.client_secret || env.CLIENT_SECRET_HOMOLOGACAO,
    certificate: data?.certificate || env.CERTIFICADO_HOMOLOGACAO_PATH
  };
  return opt;
}
var EfiPay = class {
  #pix;
  constructor(type, options) {
    this.#pix = new PixRequest({
      type,
      options: makeOptions({
        type,
        operation: "PIX",
        data: {
          certificate: options?.certificate,
          client_id: options?.client_id,
          client_secret: options?.client_secret
        }
      })
    });
  }
  /**
   * A API Pix Efí oferece recursos avançados para integração com sua aplicação, permitindo que você crie soluções personalizadas e ofereça opções de pagamento inovadoras aos seus clientes. Com nossa API é possível criar cobranças, verificar os Pix recebidos, devolver e enviar Pix.
   *
   * Para integrar a API Pix Efí ao seu sistema ou sua plataforma, é necessário ter uma Conta Digital Efí. Uma vez com acesso, você poderá obter as credenciais e o certificado necessários para a comunicação com a API Pix Efí.
   *
   * [Condira a Documentação oficial para mais detalhes](https://dev.efipay.com.br/docs/api-pix/credenciais)
   */
  get pix() {
    return this.#pix;
  }
};
var src_default = EfiPay;
export {
  src_default as default
};
