// shourovbot/alihsan/shourova.js
'use strict';

const fs = require('fs');
const path = require('path');

// requires (from this file's location: shourovbot/alihsan)
const login = require('../system/login');                 // shourovbot/system/login
const startUptimeServer = require('../../server/uptime'); // server/uptime (repo root)

// ---------- Paths ----------
const CONFIG_PATH = path.join(__dirname, '..', '..', 'Shourov.json');   // repo root config.json
const FBSTATE_PATH = path.join(__dirname, '..', '..', 'Shourovstate.json'); // repo root fbstate.json

// ---------- Load config safely ----------
let config = null;
try {
  const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
  config = JSON.parse(raw);
  console.log('✓ Config loaded');
} catch (err) {
  console.error('❌ Failed to load config.json:', err.message);
  process.exit(1);
}

// ---------- Robust language loader (JSON or key=value/colon format fallback) ----------
(function loadLanguageSafely() {
  let langCode = 'en';
  try {
    if (config && config.language) {
      langCode = String(config.language).toLowerCase();
    } else if (process.env.LANG_CODE) {
      langCode = String(process.env.LANG_CODE).toLowerCase();
    } else if (process.env.LANG) {
      langCode = String(process.env.LANG).split(/[_\.]/)[0].toLowerCase();
    }
  } catch (e) {
    langCode = 'en';
  }

  const candidates = [
    path.join(__dirname, 'languages', `${langCode}.lang`),
    path.join(__dirname, 'languages', 'en.lang'),
    path.join(__dirname, '..', 'languages', `${langCode}.lang`),
    path.join(__dirname, '..', 'languages', 'en.lang')
  ];

  let found = null;
  for (const p of candidates) {
    if (fs.existsSync(p)) { found = p; break; }
  }

  if (!found) {
    console.error('❌ Failed to load language file: no candidate language files found (checked: ' + candidates.join(', ') + ')');
    // don't exit — allow fallback minimal language object
    global.language = { "ERR_LANG": "language not found" };
    return;
  }

  const raw = fs.readFileSync(found, 'utf8');

  try {
    global.language = JSON.parse(raw);
    console.log('✓ Language loaded (JSON):', path.basename(found));
    return;
  } catch (jsonErr) {
    // fall through
  }

  const result = {};
  const lines = raw.split(/\r?\n/);
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    if (line.startsWith('#') || line.startsWith('//')) continue;
    const m = line.match(/^([^=:#]+?)\s*(?:=|:)\s*(.+)$/);
    if (m) {
      const key = m[1].trim();
      const val = m[2].trim();
      result[key] = val;
    } else {
      const p = line.split(/\s+/, 2);
      if (p.length === 2) result[p[0]] = p[1];
    }
  }

  if (Object.keys(result).length === 0) {
    console.error('❌ Failed to parse language file (no key=value pairs found):', found);
    global.language = { "ERR_LANG_PARSE": "language parse failed" };
    return;
  }

  global.language = result;
  console.log('✓ Language loaded (key=value fallback):', path.basename(found));
})();

// ---------- Protection checks ----------
if (!config) {
  console.error('❌ No config loaded — aborting.');
  process.exit(1);
}

if (config.author !== "ALIHSAN SHOUROV") {
  console.error('❌ CRITICAL ERROR: Author protection violated!');
  process.exit(1);
}

if (config.ownerId !== "100071971474157") {
  console.error('❌ CRITICAL ERROR: Owner ID protection violated!');
  process.exit(1);
}

console.log('✓ Author protection: PASSED');
console.log('✓ Owner ID protection: PASSED');
console.log('');

// ===== START: robust globals & fallback services =====
global.client = global.client || {};
global.client.handleReply = Array.isArray(global.client.handleReply) ? global.client.handleReply : [];

global.nodemodule = global.nodemodule || {};
// Try to populate some commonly used modules into global.nodemodule so commands that expect them won't crash
(function ensureNodeModules() {
  const modules = ['fs-extra','axios','request','jimp','canvas','path','child_process','form-data'];
  modules.forEach(name => {
    if (!global.nodemodule[name]) {
      try {
        global.nodemodule[name] = require(name);
      } catch (e) {
        // do not throw, just warn
        // many environments won't have canvas etc installed; commands should check presence
        // console.warn(`module ${name} not available: ${e.message}`);
        global.nodemodule[name] = undefined;
      }
    }
  });
})();
if (!global.nodemodule['fs-extra']) {
  // provide a minimal fs-extra fallback that exposes the methods commonly used
  try {
    const fse = require('fs');
    global.nodemodule['fs-extra'] = {
      ensureDirSync: (p) => { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); },
      ensureDir: async (p) => { if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }); },
      pathExists: async (p) => { return fs.existsSync(p); },
      pathExistsSync: (p) => fs.existsSync(p),
      writeFileSync: fs.writeFileSync,
      readFileSync: fs.readFileSync,
      createReadStream: fs.createReadStream,
      createWriteStream: fs.createWriteStream,
      unlink: fs.unlink,
      unlinkSync: fs.unlinkSync,
      move: async (src, dest, opts) => {
        return new Promise((resolve, reject) => {
          fs.rename(src, dest, (err) => { if (err) return reject(err); resolve(); });
        });
      }
    };
    console.log('✓ fs-extra fallback provided (basic)');
  } catch (e) {
    console.warn('⚠ fs-extra fallback unavailable:', e.message);
  }
}

global._fallbackUsers = global._fallbackUsers || {
  _store: new Map(),
  async getNameUser(uid) {
    const rec = this._store.get(String(uid));
    if (rec && rec.name) return rec.name;
    return `User${String(uid).slice(-4)}`;
  },
  async getData(uid) {
    const rec = this._store.get(String(uid)) || {};
    return rec;
  },
  async setData(uid, data) {
    this._store.set(String(uid), Object.assign(this._store.get(String(uid)) || {}, data));
    return;
  },
  setNameUser(uid, name) { this._store.set(String(uid), Object.assign(this._store.get(String(uid))||{}, { name })); }
};

global._fallbackThreads = global._fallbackThreads || {
  _store: new Map(),
  async getData(threadID) { return this._store.get(String(threadID)) || {}; },
  async setData(threadID, data) { this._store.set(String(threadID), Object.assign(this._store.get(String(threadID)) || {}, data)); },
  async getInfo(threadID){ return this._store.get(String(threadID)) || {}; },
  leftParticipantFbId(){ return null; }
};

global._fallbackCurrencies = global._fallbackCurrencies || {
  _balances: new Map(),
  async getBalance(uid){ return this._balances.get(String(uid)) || 0; },
  async setBalance(uid, v){ this._balances.set(String(uid), v); }
};

// provide basic UsersService / ThreadsService wrappers so commands that call .getData / .getNameUser don't fail
global.UsersService = global.UsersService || {
  getNameUser: async (uid) => {
    if (global._REAL_USERS && typeof global._REAL_USERS.getNameUser === 'function') return await global._REAL_USERS.getNameUser(uid);
    return await global._fallbackUsers.getNameUser(uid);
  },
  getData: async (uid) => {
    if (global._REAL_USERS && typeof global._REAL_USERS.getData === 'function') return await global._REAL_USERS.getData(uid);
    return await global._fallbackUsers.getData(uid);
  },
  setData: async (uid, data) => {
    if (global._REAL_USERS && typeof global._REAL_USERS.setData === 'function') return await global._REAL_USERS.setData(uid, data);
    return await global._fallbackUsers.setData(uid, data);
  }
};

global.ThreadsService = global.ThreadsService || {
  getData: async (tid) => {
    if (global._REAL_THREADS && typeof global._REAL_THREADS.getData === 'function') return await global._REAL_THREADS.getData(tid);
    return await global._fallbackThreads.getData(tid);
  },
  setData: async (tid, data) => {
    if (global._REAL_THREADS && typeof global._REAL_THREADS.setData === 'function') return await global._REAL_THREADS.setData(tid, data);
    return await global._fallbackThreads.setData(tid, data);
  }
};

// minimal global.data map structure many commands expect
global.data = global.data || {};
global.data.threadData = global.data.threadData || new Map();
global.data.userData = global.data.userData || new Map();
global.data.threadInfo = global.data.threadInfo || new Map();
global.data.userBanned = global.data.userBanned || new Map();
global.data.threadBanned = global.data.threadBanned || new Map();
global.data.botID = global.data.botID || null;
global.data.userName = global.data.userName || {};

// config defaults
global.config = global.config || config || {};
global.config.BOTNAME = global.config.BOTNAME || (config && config.BOTNAME) || 'MyBot';
global.config.PREFIX = global.config.PREFIX || (config && config.PREFIX) || '/';
global.config.ADMINBOT = global.config.ADMINBOT || (config && config.ADMINBOT) || [];

// ===== END fallback block =====


// ---------- Start uptime server (optional, safe) ----------
try {
  if (typeof startUptimeServer === 'function') {
    startUptimeServer(config);
    console.log('✓ Uptime server started (if configured)');
  } else {
    console.warn('⚠ Uptime module not exported as function; skipping uptime start.');
  }
} catch (err) {
  console.error('❌ Failed to start uptime server:', err.message);
  // do not exit; uptime is optional
}

// ---------- Load fbstate if exists ----------
let appState = null;
try {
  if (fs.existsSync(FBSTATE_PATH)) {
    appState = JSON.parse(fs.readFileSync(FBSTATE_PATH, 'utf8'));
    console.log('✓ Facebook state (fbstate.json) loaded');
  } else {
    console.warn('⚠ fbstate.json not found — first-time login may require credentials.');
  }
} catch (err) {
  console.error('❌ Error reading fbstate.json:', err.message);
}

// ---------- Start Facebook login & listener ----------
login({ appState }, (err, api) => {
  if (err) {
    console.error('❌ Facebook login error:', err);
    return;
  }

  console.log('✓ Facebook login successful');

  try {
    api.setOptions({
      listenEvents: true,
      selfListen: false,
      updatePresence: true,
      forceLogin: true,
      mqttDisabled: false
    });
  } catch (e) {
    console.warn('⚠ api.setOptions failed (maybe different API version):', e.message);
  }

  // Save fbstate on login update (optional)
  try {
    if (api.getAppState && typeof api.getAppState === 'function') {
      const newState = api.getAppState();
      fs.writeFileSync(FBSTATE_PATH, JSON.stringify(newState, null, 2), 'utf8');
      console.log('✓ fbstate.json updated');
    }
  } catch (e) {
    // ignore if not supported
  }

  console.log('═══════════════════════════════════════════');
  console.log('̳S̳̳H̳̳O̳̳U̳̳R̳̳O̳̳V̳-̳B̳̳O̳̳T̳ ̳R̳̳E̳̳A̳̳D̳̳Y̳');
  console.log('═══════════════════════════════════════════');
// --- Load commands & events ONCE ---
const COMMANDS_DIR = path.join(__dirname,  '..', '..', 'scripts', 'commands');
const EVENTS_DIR = path.join(__dirname,  '..', '..', 'scripts', 'events');

// declare once
const eventHandlers = [];
const commands = new Map();

// load commands
try {
  if (fs.existsSync(COMMANDS_DIR)) {
    const cmdFiles = fs.readdirSync(COMMANDS_DIR).filter(f => f.endsWith('.js'));
    console.log('Commands found:', cmdFiles);
    for (const f of cmdFiles) {
      try {
        const cmdPath = path.join(COMMANDS_DIR, f);
        delete require.cache[require.resolve(cmdPath)];
        const cmd = require(cmdPath);

        // allow both module.exports.config.name and module.exports.name
        let cmdName = null;
        if (cmd.config && cmd.config.name) cmdName = cmd.config.name;
        else if (cmd.name) cmdName = cmd.name;
        else if (typeof cmd === 'function' && cmd.name) cmdName = cmd.name;

        if (cmdName) {
          commands.set(String(cmdName).toLowerCase(), cmd);
          console.log('Loaded command', f, '->', cmdName);
        } else {
          console.log('Skipped command file (no name):', f);
        }
      } catch (e) {
        console.error('Error loading command', f, e && e.message);
      }
    }
  } else {
    console.log('Commands dir not found:', COMMANDS_DIR);
  }
} catch (e) {
  console.error('Error reading commands dir:', e && e.message);
}

// load events
try {
  if (fs.existsSync(EVENTS_DIR)) {
    const evFiles = fs.readdirSync(EVENTS_DIR).filter(f => f.endsWith('.js'));
    console.log('Events found:', evFiles);
    for (const f of evFiles) {
      try {
        const evPath = path.join(EVENTS_DIR, f);
        delete require.cache[require.resolve(evPath)];
        const ev = require(evPath);
        if (ev && typeof ev.run === 'function') {
          eventHandlers.push(ev);
          console.log('Loaded event', f);
        } else {
          console.log('Skipped event file (no run):', f);
        }
      } catch (e) {
        console.error('Error loading event', f, e && e.message);
      }
    }
  } else {
    console.log('Events dir not found:', EVENTS_DIR);
  }
} catch (e) {
  console.error('Error reading events dir:', e && e.message);
}

// debug info
console.log('DEBUG: eventHandlers count =', eventHandlers.length);
console.log('DEBUG: commands map size =', commands.size);
console.log('DEBUG: commands keys =', Array.from(commands.keys()));

// Expose commands map so modules (like help) can find it reliably
if (!global.client) global.client = {};
global.client.commands = commands;
console.log('DEBUG: global.client.commands exposed ->', Array.from(global.client.commands.keys()));

   // If your system uses event handlers/commands, they can be required/used here.
  if (api.listen) {
    api.listen(async (errListen, event) => {
      if (errListen) {
        console.error('Listen error:', errListen);
        return;
      }

      const threadID = event.threadID ||
                       (event.thread_key && event.thread_key.thread_fbid) ||
                       event.senderID || null;

      console.log('EVENT RECEIVED:', event.type, 'thread:', threadID);

      // AUTO-REPLY (quick test) — change to false to disable
      const autoReply = false; // true = on, false = off
      if (autoReply && event && (event.type === 'message' || event.type === 'message_reply')) {
        try {
          const tid = event.threadID || (event.thread_key && event.thread_key.thread_fbid) || event.senderID;
          if (tid && typeof api.sendMessage === 'function') {
            api.sendMessage({ body: 'AutoReply: message received ✅' }, tid, ()=>{});
            console.log('Auto-replied to', tid);
          } else if (tid && typeof api.send === 'function') {
            api.send({ body: 'AutoReply: message received ✅' }, tid, ()=>{});
            console.log('Auto-replied (api.send) to', tid);
          }
        } catch(e) {
          console.error('Auto-reply error:', e && e.message);
        }
      }

      // ---------- 1) Run global event handlers ----------
      for (const evHandler of eventHandlers) {
        try {
          await evHandler.run({ event, api, config, language: global.language });
        } catch (e) {
          console.error('Event handler error:', e && (e.stack || e.message));
        }
      }

// ---------- 1.5) HANDLE EVENT (auto trigger commands) ----------
try {
  for (const [, cmd] of commands) {
    if (typeof cmd.handleEvent === "function") {
      await cmd.handleEvent({
        api,
        event,
        config,
        language: global.language
      });
    }
  }
} catch (e) {
  console.error("handleEvent error:", e && (e.stack || e.message));
}
      
      // ---------- 2) Run message handler (if exists) ----------
      try {
        const messageHandlerPath = path.join(__dirname, '..', '..', 'scripts', 'events', 'message.js');
        if (fs.existsSync(messageHandlerPath)) {
          delete require.cache[require.resolve(messageHandlerPath)];
          const messageHandler = require(messageHandlerPath);

          if (messageHandler && typeof messageHandler.run === 'function') {
            await messageHandler.run({ event, api, config, language: global.language, commands });
          }
        }
      } catch (e) {
        console.error('Message handler error:', e && (e.stack || e.message));
      }

      // ---------- handleReply lookup (if user replied to a bot message) ----------
      try {
        if (event.messageReply && Array.isArray(global.client.handleReply)) {
          const repliedToId = event.messageReply.messageID;
          const idx = global.client.handleReply.findIndex(x => x.messageID === repliedToId);
          if (idx !== -1) {
            const hr = global.client.handleReply[idx];
            const moduleCmd = commands.get(hr.name) || (global.client.commands && global.client.commands.get(hr.name));
            if (moduleCmd && typeof moduleCmd.handleReply === 'function') {
              try {
                await moduleCmd.handleReply({
                  api,
                  event,
                  handleReply: hr,
                  Users: (global.UsersService || global._fallbackUsers),
                  Threads: (global.ThreadsService || global._fallbackThreads),
                  Currencies: (global.CurrenciesService || global._fallbackCurrencies)
                });
              } catch (e) {
                console.error('handleReply execution failed:', e && (e.stack || e.message));
              }
            }
          }
        }
      } catch (e) {
        console.error('handleReply lookup failed:', e && (e.stack || e.message));
      }

      // ---------- 3) Command handler ----------
      try {
        if (event.type === 'message' || event.type === 'message_reply') {
          const text = (event.body || '').toString().trim();
          if (text) {
            const parts = text.split(/\s+/);
            const rawFirst = (parts[0] || '').toString().trim().toLowerCase();
            let cmdName = rawFirst;

            // remove / or ! prefix
            if (cmdName.startsWith('/') || cmdName.startsWith('!')) {
              cmdName = cmdName.slice(1);
            }

            const args = parts.slice(1);

            if (commands.has(cmdName)) {
              const cmd = commands.get(cmdName);

              // choose real services if available, otherwise fallback
              const UsersService = (typeof global.UsersService !== 'undefined') ? global.UsersService : global._fallbackUsers;
              const ThreadsService = (typeof global.ThreadsService !== 'undefined') ? global.ThreadsService : global._fallbackThreads;
              const CurrenciesService = (typeof global.CurrenciesService !== 'undefined') ? global.CurrenciesService : global._fallbackCurrencies;

              try {
                await cmd.run({
                  event,
                  api,
                  config,
                  args,
                  commands,
                  language: global.language,
                  Users: UsersService,
                  Threads: ThreadsService,
                  Currencies: CurrenciesService
                });
              } catch (e) {
                console.error('Command execution failed:', e && (e.stack || e.message));
              }
            }
          }

          // Seen / read marking (best-effort)
          try {
            if (threadID) {
              if (typeof api.markAsRead === 'function') api.markAsRead(threadID, ()=>{});
              else if (typeof api.setMessageRead === 'function') api.setMessageRead(threadID, ()=>{});
              else if (typeof api.markSeen === 'function') api.markSeen(threadID, ()=>{});
            }
          } catch(e) {
            console.warn('Mark-as-read failed:', e && e.message);
          }
        }
      } catch (errCmd) {
        console.error('Command handler error:', errCmd && (errCmd.stack || errCmd.message));
      }

    }); // end api.listen callback
  } // end if (api.listen)

}); // close login callback

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT. Exiting...');
  process.exit(0);
});
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Exiting...');
  process.exit(0);
});
