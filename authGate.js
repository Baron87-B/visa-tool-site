(function () {
  const accessHash = "d11c795b826de9b025a428811b81b7657ee4efce752691722af7441c053a35b2";
  const storageKey = "visaToolAccessGranted";
  const gate = document.getElementById("authGate");
  const form = document.getElementById("authForm");
  const input = document.getElementById("authSecretInput");
  const error = document.getElementById("authError");
  const lockButton = document.getElementById("authLockButton");

  function unlock() {
    document.body.classList.add("auth-unlocked");
    if (gate) gate.setAttribute("aria-hidden", "true");
  }

  function lock() {
    localStorage.removeItem(storageKey);
    document.body.classList.remove("auth-unlocked");
    if (gate) gate.removeAttribute("aria-hidden");
    if (input) input.value = "";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setTimeout(() => input?.focus(), 0);
  }

  async function sha256Hex(value) {
    const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
    return Array.from(new Uint8Array(buffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  if (localStorage.getItem(storageKey) === accessHash) {
    unlock();
  } else {
    setTimeout(() => input?.focus(), 0);
  }

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!input) return;
    if (error) error.textContent = "";

    try {
      const enteredHash = await sha256Hex(input.value.trim());
      if (enteredHash === accessHash) {
        localStorage.setItem(storageKey, accessHash);
        unlock();
        return;
      }
      if (error) error.textContent = "口令不正确，请检查后重试。";
      input.select();
    } catch (err) {
      if (error) error.textContent = "当前浏览器不支持本地口令校验，请换用新版浏览器。";
    }
  });

  lockButton?.addEventListener("click", lock);
})();
