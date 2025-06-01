export async function apiFetch(endpoint, options = {}) {
  const config = useRuntimeConfig(); // Только тут!
  const API_BASE_SERVER = config.public.API_BASE_SERVER;
  const headers = {
    "Content-Type": "application/json",
    // ...(token ? { Authorization: `Bearer ${token}` } : {}),
    // ...options.headers,
  };
  const res = await fetch(API_BASE_SERVER + endpoint, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorText = await res.text();
    try {
      errorText = JSON.parse(errorText);
    } catch {}
    throw new Error(errorText?.error || errorText || res.statusText);
  }

  if (res.status === 204) return null;
  return await res.json();
}
