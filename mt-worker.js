// Traductor local inglés→español (modelo opus-mt, ~115 MB la primera vez; luego queda en caché del navegador).
// Todo corre en tu dispositivo: sin claves, sin servidor, sin límites.
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2';

env.allowLocalModels = false;
env.useBrowserCache = true;

let translator = null;
let loading = null;

function load() {
  if (translator) return Promise.resolve(translator);
  if (!loading) {
    loading = pipeline('translation', 'Xenova/opus-mt-en-es', {
      dtype: 'q8',
      progress_callback: (p) => self.postMessage({ type: 'progress', p }),
    }).then((t) => (translator = t)).catch((e) => { loading = null; throw e; });
  }
  return loading;
}

self.onmessage = async (e) => {
  const { id, type, text } = e.data;
  try {
    const t = await load();
    if (type === 'load') return self.postMessage({ id, type: 'ready' });
    const out = await t(text, { max_new_tokens: 512 });
    self.postMessage({ id, type: 'result', text: out[0].translation_text });
  } catch (err) {
    self.postMessage({ id, type: 'error', message: String((err && err.message) || err) });
  }
};
