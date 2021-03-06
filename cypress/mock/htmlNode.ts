import type { HTMLNode } from "../../types/htmlgraphicsTypes/htmlNode";

const shadowContainer = document.querySelector("#shadow-container");
if (!shadowContainer) throw new Error("Could not find shadow container.");

window.htmlNode = shadowContainer.attachShadow({ mode: "open" }) as HTMLNode;
