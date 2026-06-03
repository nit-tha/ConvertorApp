import { initAgent } from "https://cdn.jsdelivr.net/npm/clippyjs/dist/index.mjs";
import * as agents from "https://cdn.jsdelivr.net/npm/clippyjs/dist/agents/index.mjs";

// Silence Clippy's animation sound effects while keeping speech bubbles
const _NativeAudio = window.Audio;
window.Audio = function(...args) {
    const el = new _NativeAudio(...args);
    el.volume = 0;
    return el;
};

// Wait for page to fully load before showing Clippy
window.addEventListener("load", async () => {
    const CLIPPY_PREF_KEY = "clippyDisabled";
    const toggleLink = document.getElementById("clippyToggleLink");

    if (localStorage.getItem(CLIPPY_PREF_KEY) === null) {
        localStorage.setItem(CLIPPY_PREF_KEY, "1");
    }

    function isClippyDisabled() {
        const value = localStorage.getItem(CLIPPY_PREF_KEY);
        return value === "1" || value === "true";
    }

    function setClippyDisabled(disabled) {
        localStorage.setItem(CLIPPY_PREF_KEY, disabled ? "1" : "0");
    }

    function updateToggleText() {
        if (!toggleLink) return;
        toggleLink.textContent = isClippyDisabled() ? "🤖 Show Clippy" : "🤖 Hide Clippy";
    }

    try {
        const agent = await initAgent(agents.Clippy);

        const tips = [
            "Tip: Use the Epoch converter to quickly convert Unix timestamps!",
            "Tip: You can compare two texts side by side using the Diff Comparer.",
            "Tip: The JSON formatter also converts XML to JSON.",
            "Tip: Try the Color Converter to switch between HEX, RGB and HSL.",
            "Tip: Use Case Master to quickly change text casing in bulk.",
            "It looks like you're using a developer tool. Need any help?",
            "Tip: Use the Date -> Epoch converter to quickly convert dates to Unix timestamps.",
            "Tip: Use the Count Data tool to get word, characters counts in seconds.",
            "Tip: URL Encode/Decode is great for debugging query string parameters.",
            "Tip: Use the Duplicate Remover to clean up messy lists in seconds.",
            "Tip: The SQL Formatter makes unreadable queries easy to review.",
            "Tip: Markdown Converter (NL MD HTML) turns your .md content into clean HTML.",
            "Tip: Need to test timezones? The Timezone Clock shows multiple zones at once.",
            "Tip: The Date -> Epoch also has ID calculator to calculate very big numbers.",
            "Tip: Use the Diff Comparer to spot subtle differences between JSON payloads.",
            "Tip: The Code Formatter supports minifying and beautifying in one click.",
            "Tip: Generate secure passwords with custom length and character rules using PassCraft.",
            "Tip: The XML to JSON tool preserves attributes and nested structures.",
            "Tip: Use the Geo Sight tool to get location names and coordinates.",
            "Tip: Dark mode is available — click the moon icon in the top corner!"
        ];

        let lastTipIndex = -1;
        let isTipRunning = false;
        let tipInterval = null;
        let firstTipTimeout = null;

        function clearTipTimers() {
            if (firstTipTimeout) {
                clearTimeout(firstTipTimeout);
                firstTipTimeout = null;
            }
            if (tipInterval) {
                clearInterval(tipInterval);
                tipInterval = null;
            }
            isTipRunning = false;
        }

        function removeClippyArtifacts() {
            const nodes = document.querySelectorAll(".clippy, .clippy-balloon, .clippy-tip, .clippy-container, .clippy-body");
            nodes.forEach((node) => node.remove());
        }

        function showRandomTip() {
            if (isTipRunning || isClippyDisabled()) return;
            isTipRunning = true;

            let idx;
            do { idx = Math.floor(Math.random() * tips.length); } while (idx === lastTipIndex);
            lastTipIndex = idx;

            agent.stopCurrent();
            agent.animate();

            setTimeout(() => {
                agent.speak(tips[idx]);

                // Release lock after the bubble has had enough time to be read.
                const bubbleReadMs = Math.max(5000, tips[idx].length * 55);
                setTimeout(() => {
                    isTipRunning = false;
                }, bubbleReadMs);
            }, 400);
        }

        function startTipCycle() {
            clearTipTimers();
            firstTipTimeout = setTimeout(() => {
                showRandomTip();
            }, 1500);

            tipInterval = setInterval(() => {
                showRandomTip();
            }, 15000);
        }

        function hideClippy() {
            setClippyDisabled(true);
            clearTipTimers();
            agent.stopCurrent();
            if (typeof agent.hide === "function") {
                agent.hide();
            }
            removeClippyArtifacts();
            updateToggleText();
        }

        function showClippy() {
            setClippyDisabled(false);
            agent.show();
            startTipCycle();
            updateToggleText();
        }

        if (toggleLink) {
            toggleLink.addEventListener("click", (event) => {
                event.preventDefault();
                if (isClippyDisabled()) {
                    showClippy();
                } else {
                    hideClippy();
                }
                updateToggleText();
            });
        }

        updateToggleText();
        if (isClippyDisabled()) {
            hideClippy();
        } else {
            showClippy();
        }

    } catch (e) {
        // Silently fail — Clippy is optional fun, not critical
        console.warn("Clippy could not load:", e);
    }
});
