import type { NextApiRequest, NextApiResponse } from "next";

/*
 * API route that receives tracking events from the client
 * and forwards them to Grafana Loki for log aggregation and visualization.
 * Called by trackEvent() in src/utils/tracking.ts
*/

const LOKI_URL =
  process.env.LOKI_URL || "https://logs-prod-039.grafana.net/loki/api/v1/push";
const LOKI_AUTH = process.env.LOKI_AUTH || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    // Extract span and event name from OTel-shaped payload
    const span = req.body?.resourceSpans?.[0]?.scopeSpans?.[0]?.spans?.[0];
    const eventName = span?.name || "unknown";

    // Extract attributes from OTel format into a flat object
    const attributes: Record<string, string> = {};
    span?.attributes?.forEach(
      (attr: { key: string; value: { stringValue: string } }) => {
        attributes[attr.key] = attr.value.stringValue;
      },
    );

    // Forward event to Grafana Loki as a log stream
    await fetch(LOKI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: LOKI_AUTH },
      body: JSON.stringify({
        streams: [
          {
            stream: {
              service: "star-wars-gui",
              event_type: eventName,
            },
            values: [
              [
                // Loki expects nanoseconds
                String(Date.now() * 1000000), 
                JSON.stringify({ event: eventName, ...attributes }),
              ],
            ],
          },
        ],
      }),
    });

    res.status(200).json({ status: "ok" });
  } catch (e) {
    console.error("Tracking error:", e);
    res.status(500).json({ error: "Tracking failed" });
  }
}
