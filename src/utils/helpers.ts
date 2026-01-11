export async function findParentComposeWindow(element: HTMLElement): Promise<HTMLElement | null> {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const elementsAtPoint = document.elementsFromPoint(centerX, centerY)

    for (const el of elementsAtPoint) {
        if (
            el.classList?.contains("AD") ||
            el.classList?.contains("aSt") ||
            el.classList?.contains("M9") ||
            el.hasAttribute?.("data-compose-id") ||
            el.getAttribute?.("role") === "dialog"
        ) {
            return el as HTMLElement
        }
    }

    return null
}

export async function generateShortId(): Promise<string> {
    return Math.random().toString(36).substring(2, 10);
}

export async function getComposeId(): Promise<string> {
    const url = window.location.href;

    const composeMatch = url.match(/compose=([^&]+)/);
    const composeId = composeMatch ? composeMatch[1] : null;

    return composeId;
}
