// utils/normalizeImageField.js

function bufferToBase64(image) {
  if (!image) return ""; // Нет картинки

  // Если это уже строка (base64) — просто верни
  if (typeof image === "string") return image;

  // Если это mongo Buffer
  if (
    typeof image === "object" &&
    image.type === "Buffer" &&
    Array.isArray(image.data)
  ) {
    // Node.js (backend)
    if (typeof Buffer !== "undefined") {
      return Buffer.from(image.data).toString("base64");
    }
    // Browser (frontend, fallback)
    try {
      // Преобразуем массив байт в строку, а потом в base64
      let binary = "";
      for (let i = 0; i < image.data.length; i++) {
        binary += String.fromCharCode(image.data[i]);
      }
      return btoa(binary);
    } catch (e) {
      return ""; // не смогли сконвертить — просто пусто
    }
  }
  return ""; // Если совсем непонятный формат
}

export { bufferToBase64 };
